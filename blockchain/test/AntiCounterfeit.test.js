const { expect } = require("chai");
const { ethers } = require("hardhat");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe("AntiCounterfeit", function () {
  let AntiCounterfeit;
  let antiCounterfeit;
  let admin, manufacturer, verifier, otherAccount, secondManufacturer;

  const ASSET_TAG_HASH = ethers.keccak256(ethers.toUtf8Bytes("NFC-TAG-0001"));
  const METADATA_URI = "ipfs://QmExampleMetadataHashForAsset0001";

  const Status = {
    Manufactured: 0,
    InTransit: 1,
    Verified: 2,
    Flagged: 3,
  };

  beforeEach(async function () {
    [admin, manufacturer, verifier, otherAccount, secondManufacturer] = await ethers.getSigners();

    AntiCounterfeit = await ethers.getContractFactory("AntiCounterfeit");
    antiCounterfeit = await AntiCounterfeit.deploy(admin.address);
    await antiCounterfeit.waitForDeployment();

    const MANUFACTURER_ROLE = await antiCounterfeit.MANUFACTURER_ROLE();
    const VERIFIER_ROLE = await antiCounterfeit.VERIFIER_ROLE();

    await antiCounterfeit.connect(admin).grantRole(MANUFACTURER_ROLE, manufacturer.address);
    await antiCounterfeit.connect(admin).grantRole(VERIFIER_ROLE, verifier.address);
  });

  describe("Deployment & Role Management", function () {
    it("should grant DEFAULT_ADMIN_ROLE to the specified admin address", async function () {
      const DEFAULT_ADMIN_ROLE = await antiCounterfeit.DEFAULT_ADMIN_ROLE();
      expect(await antiCounterfeit.hasRole(DEFAULT_ADMIN_ROLE, admin.address)).to.equal(true);
    });

    it("should revert deployment with a zero admin address", async function () {
      await expect(AntiCounterfeit.deploy(ethers.ZeroAddress)).to.be.revertedWith(
        "AntiCounterfeit: zero admin address"
      );
    });

    it("should correctly grant MANUFACTURER_ROLE", async function () {
      const MANUFACTURER_ROLE = await antiCounterfeit.MANUFACTURER_ROLE();
      expect(await antiCounterfeit.hasRole(MANUFACTURER_ROLE, manufacturer.address)).to.equal(true);
    });

    it("should correctly grant VERIFIER_ROLE", async function () {
      const VERIFIER_ROLE = await antiCounterfeit.VERIFIER_ROLE();
      expect(await antiCounterfeit.hasRole(VERIFIER_ROLE, verifier.address)).to.equal(true);
    });

    it("should revert when a non-admin attempts to grant a role", async function () {
      const MANUFACTURER_ROLE = await antiCounterfeit.MANUFACTURER_ROLE();
      await expect(
        antiCounterfeit.connect(otherAccount).grantRole(MANUFACTURER_ROLE, secondManufacturer.address)
      ).to.be.reverted;
    });

    it("should allow the admin to revoke a previously granted role", async function () {
      const MANUFACTURER_ROLE = await antiCounterfeit.MANUFACTURER_ROLE();
      await antiCounterfeit.connect(admin).revokeRole(MANUFACTURER_ROLE, manufacturer.address);
      expect(await antiCounterfeit.hasRole(MANUFACTURER_ROLE, manufacturer.address)).to.equal(false);
    });
  });

  describe("Asset Registration", function () {
    it("should allow an account with MANUFACTURER_ROLE to register an asset and emit AssetRegistered", async function () {
      await expect(antiCounterfeit.connect(manufacturer).registerAsset(ASSET_TAG_HASH, METADATA_URI))
        .to.emit(antiCounterfeit, "AssetRegistered")
        .withArgs(ASSET_TAG_HASH, manufacturer.address, METADATA_URI, anyValue);

      const asset = await antiCounterfeit.getAsset(ASSET_TAG_HASH);
      expect(asset.assetTagHash).to.equal(ASSET_TAG_HASH);
      expect(asset.manufacturer).to.equal(manufacturer.address);
      expect(asset.status).to.equal(Status.Manufactured);
      expect(asset.metadataURI).to.equal(METADATA_URI);
    });

    it("should revert if a caller without MANUFACTURER_ROLE tries to register an asset", async function () {
      await expect(
        antiCounterfeit.connect(otherAccount).registerAsset(ASSET_TAG_HASH, METADATA_URI)
      ).to.be.reverted;
    });

    it("should revert when registering a duplicate assetTagHash", async function () {
      await antiCounterfeit.connect(manufacturer).registerAsset(ASSET_TAG_HASH, METADATA_URI);
      await expect(
        antiCounterfeit.connect(manufacturer).registerAsset(ASSET_TAG_HASH, METADATA_URI)
      ).to.be.revertedWithCustomError(antiCounterfeit, "AssetAlreadyRegistered");
    });

    it("should revert when metadataURI is empty", async function () {
      await expect(
        antiCounterfeit.connect(manufacturer).registerAsset(ASSET_TAG_HASH, "")
      ).to.be.revertedWithCustomError(antiCounterfeit, "EmptyMetadataURI");
    });

    it("should record an initial provenance entry upon registration", async function () {
      await antiCounterfeit.connect(manufacturer).registerAsset(ASSET_TAG_HASH, METADATA_URI);
      const history = await antiCounterfeit.getAssetHistory(ASSET_TAG_HASH);
      expect(history.length).to.equal(1);
      expect(history[0].status).to.equal(Status.Manufactured);
      expect(history[0].updatedBy).to.equal(manufacturer.address);
    });
  });

  describe("Asset Verification", function () {
    beforeEach(async function () {
      await antiCounterfeit.connect(manufacturer).registerAsset(ASSET_TAG_HASH, METADATA_URI);
    });

    it("should return correct asset details and emit AssetVerified for a genuine asset", async function () {
      await expect(antiCounterfeit.connect(otherAccount).verifyAsset(ASSET_TAG_HASH)).to.emit(
        antiCounterfeit,
        "AssetVerified"
      );

      const asset = await antiCounterfeit.getAsset(ASSET_TAG_HASH);
      expect(asset.status).to.equal(Status.Manufactured);
    });

    it("should be callable by any address (verification is not role-restricted)", async function () {
      await expect(antiCounterfeit.connect(otherAccount).verifyAsset(ASSET_TAG_HASH)).to.not.be.reverted;
    });

    it("should revert verification for an unregistered / tampered assetTagHash", async function () {
      const fakeHash = ethers.keccak256(ethers.toUtf8Bytes("FAKE-TAG-9999"));
      await expect(
        antiCounterfeit.connect(otherAccount).verifyAsset(fakeHash)
      ).to.be.revertedWithCustomError(antiCounterfeit, "AssetNotRegistered");
    });

    it("should report isValid = false once an asset has been flagged as counterfeit", async function () {
      await antiCounterfeit.connect(verifier).updateStatus(ASSET_TAG_HASH, Status.Flagged);
      const result = await antiCounterfeit.connect(otherAccount).verifyAsset.staticCall(ASSET_TAG_HASH);
      expect(result[1]).to.equal(false);
      expect(result[0].status).to.equal(Status.Flagged);
    });

    it("should report isValid = true for a non-flagged asset", async function () {
      const result = await antiCounterfeit.connect(otherAccount).verifyAsset.staticCall(ASSET_TAG_HASH);
      expect(result[1]).to.equal(true);
    });
  });

  describe("Status Updates & Counterfeit Flagging", function () {
    beforeEach(async function () {
      await antiCounterfeit.connect(manufacturer).registerAsset(ASSET_TAG_HASH, METADATA_URI);
    });

    it("should allow VERIFIER_ROLE to update an asset's status", async function () {
      await expect(antiCounterfeit.connect(verifier).updateStatus(ASSET_TAG_HASH, Status.InTransit))
        .to.emit(antiCounterfeit, "StatusUpdated")
        .withArgs(ASSET_TAG_HASH, Status.Manufactured, Status.InTransit, verifier.address, anyValue);

      const asset = await antiCounterfeit.getAsset(ASSET_TAG_HASH);
      expect(asset.status).to.equal(Status.InTransit);
    });

    it("should allow MANUFACTURER_ROLE to update an asset's status", async function () {
      await antiCounterfeit.connect(manufacturer).updateStatus(ASSET_TAG_HASH, Status.InTransit);
      const asset = await antiCounterfeit.getAsset(ASSET_TAG_HASH);
      expect(asset.status).to.equal(Status.InTransit);
    });

    it("should revert if the caller has neither VERIFIER_ROLE nor MANUFACTURER_ROLE", async function () {
      await expect(
        antiCounterfeit.connect(otherAccount).updateStatus(ASSET_TAG_HASH, Status.InTransit)
      ).to.be.revertedWithCustomError(antiCounterfeit, "UnauthorizedStatusUpdater");
    });

    it("should revert on an out-of-range status value", async function () {
      await expect(
        antiCounterfeit.connect(verifier).updateStatus(ASSET_TAG_HASH, 99)
      ).to.be.revertedWithCustomError(antiCounterfeit, "InvalidStatusValue");
    });

    it("should revert updateStatus for a non-existent asset", async function () {
      const fakeHash = ethers.keccak256(ethers.toUtf8Bytes("FAKE-TAG-0002"));
      await expect(
        antiCounterfeit.connect(verifier).updateStatus(fakeHash, Status.InTransit)
      ).to.be.revertedWithCustomError(antiCounterfeit, "AssetNotRegistered");
    });

    it("should emit both StatusUpdated and AssetFlagged when flagging a counterfeit item", async function () {
      await expect(antiCounterfeit.connect(verifier).updateStatus(ASSET_TAG_HASH, Status.Flagged))
        .to.emit(antiCounterfeit, "StatusUpdated")
        .withArgs(ASSET_TAG_HASH, Status.Manufactured, Status.Flagged, verifier.address, anyValue)
        .and.to.emit(antiCounterfeit, "AssetFlagged")
        .withArgs(ASSET_TAG_HASH, verifier.address, anyValue);

      const asset = await antiCounterfeit.getAsset(ASSET_TAG_HASH);
      expect(asset.status).to.equal(Status.Flagged);
    });

    it("should NOT emit AssetFlagged for non-flagging status transitions", async function () {
      await expect(
        antiCounterfeit.connect(manufacturer).updateStatus(ASSET_TAG_HASH, Status.InTransit)
      ).to.not.emit(antiCounterfeit, "AssetFlagged");
    });

    it("should append every transition to the asset's provenance history", async function () {
      await antiCounterfeit.connect(manufacturer).updateStatus(ASSET_TAG_HASH, Status.InTransit);
      await antiCounterfeit.connect(verifier).updateStatus(ASSET_TAG_HASH, Status.Verified);

      const history = await antiCounterfeit.getAssetHistory(ASSET_TAG_HASH);
      expect(history.length).to.equal(3);
      expect(history[0].status).to.equal(Status.Manufactured);
      expect(history[1].status).to.equal(Status.InTransit);
      expect(history[2].status).to.equal(Status.Verified);
      expect(history[1].updatedBy).to.equal(manufacturer.address);
      expect(history[2].updatedBy).to.equal(verifier.address);
    });
  });

  describe("Read Helpers", function () {
    it("assetRegistered should return false for an unregistered hash", async function () {
      expect(await antiCounterfeit.assetRegistered(ASSET_TAG_HASH)).to.equal(false);
    });

    it("assetRegistered should return true after registration", async function () {
      await antiCounterfeit.connect(manufacturer).registerAsset(ASSET_TAG_HASH, METADATA_URI);
      expect(await antiCounterfeit.assetRegistered(ASSET_TAG_HASH)).to.equal(true);
    });

    it("getAsset should revert for an unregistered assetTagHash", async function () {
      await expect(antiCounterfeit.getAsset(ASSET_TAG_HASH)).to.be.revertedWithCustomError(
        antiCounterfeit,
        "AssetNotRegistered"
      );
    });

    it("getAssetHistory should revert for an unregistered assetTagHash", async function () {
      await expect(antiCounterfeit.getAssetHistory(ASSET_TAG_HASH)).to.be.revertedWithCustomError(
        antiCounterfeit,
        "AssetNotRegistered"
      );
    });
  });
});
