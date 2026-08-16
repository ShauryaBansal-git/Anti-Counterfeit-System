// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./Interfaces/IAntiCounterfeit.sol";

/// @title AntiCounterfeit
/// @author Principal Smart Contract Engineering Team
/// @notice On-chain registry for tracking the authenticity and provenance of
///         physical assets (hardware/NFC/RFID tagged goods) to combat counterfeiting.
/// @dev Uses OpenZeppelin AccessControl for role-gated operations. Asset identity is
///      represented off-chain by a physical tag; only the keccak256 hash of that tag's
///      unique identifier is stored on-chain (assetTagHash) to avoid leaking raw tag data.
contract AntiCounterfeit is AccessControl, IAntiCounterfeit {
    /// @notice Role granted to manufacturers permitted to register new assets.
    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");

    /// @notice Role granted to trusted verifiers (e.g. customs, retailers, auditors).
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    /// @dev Primary asset storage, keyed by assetTagHash.
    mapping(bytes32 => Asset) private _assets;

    /// @dev Tracks whether a given assetTagHash has been registered.
    mapping(bytes32 => bool) private _assetExists;

    /// @dev Full provenance/status-change history per asset.
    mapping(bytes32 => StatusChange[]) private _assetHistory;

    /// @dev Reverts when attempting to register an assetTagHash that already exists.
    error AssetAlreadyRegistered(bytes32 assetTagHash);

    /// @dev Reverts when operating on an assetTagHash that has not been registered.
    error AssetNotRegistered(bytes32 assetTagHash);

    /// @dev Reverts when an invalid raw uint8 status value is supplied.
    error InvalidStatusValue(uint8 newStatus);

    /// @dev Reverts when the caller holds neither VERIFIER_ROLE nor MANUFACTURER_ROLE.
    error UnauthorizedStatusUpdater(address caller);

    /// @dev Reverts when an empty metadata URI is supplied at registration time.
    error EmptyMetadataURI();

    /// @param defaultAdmin Address to be granted DEFAULT_ADMIN_ROLE at deployment time.
    constructor(address defaultAdmin) {
        require(defaultAdmin != address(0), "AntiCounterfeit: zero admin address");
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _setRoleAdmin(MANUFACTURER_ROLE, DEFAULT_ADMIN_ROLE);
        _setRoleAdmin(VERIFIER_ROLE, DEFAULT_ADMIN_ROLE);
    }

    /// @dev Ensures the referenced asset has been registered before proceeding.
    modifier onlyExistingAsset(bytes32 assetTagHash) {
        if (!_assetExists[assetTagHash]) revert AssetNotRegistered(assetTagHash);
        _;
    }

    /// @inheritdoc IAntiCounterfeit
    function registerAsset(bytes32 assetTagHash, string calldata metadataURI)
        external
        override
        onlyRole(MANUFACTURER_ROLE)
    {
        if (_assetExists[assetTagHash]) revert AssetAlreadyRegistered(assetTagHash);
        if (bytes(metadataURI).length == 0) revert EmptyMetadataURI();

        Asset memory newAsset = Asset({
            assetTagHash: assetTagHash,
            manufacturer: msg.sender,
            timestamp: block.timestamp,
            status: Status.Manufactured,
            metadataURI: metadataURI
        });

        _assets[assetTagHash] = newAsset;
        _assetExists[assetTagHash] = true;

        _assetHistory[assetTagHash].push(
            StatusChange({status: Status.Manufactured, updatedBy: msg.sender, timestamp: block.timestamp})
        );

        emit AssetRegistered(assetTagHash, msg.sender, metadataURI, block.timestamp);
    }

    /// @inheritdoc IAntiCounterfeit
    /// @dev Solidity does not permit `view` functions to emit events. Because the interface
    ///      requires `verifyAsset` to emit an `AssetVerified` event on every check, this
    ///      function is intentionally declared as a state-changing (non-view) external
    ///      function rather than `view`. It performs no storage writes; the only "state
    ///      change" is the emitted log, which serves as an immutable, publicly auditable
    ///      verification trail. Consumers that need a strictly read-only, gas-free lookup
    ///      should call `getAsset` instead.
    function verifyAsset(bytes32 assetTagHash)
        external
        override
        onlyExistingAsset(assetTagHash)
        returns (Asset memory asset, bool isValid)
    {
        asset = _assets[assetTagHash];
        isValid = asset.status != Status.Flagged;

        emit AssetVerified(assetTagHash, msg.sender, asset.status, block.timestamp);

        return (asset, isValid);
    }

    /// @inheritdoc IAntiCounterfeit
    function updateStatus(bytes32 assetTagHash, uint8 newStatus)
        external
        override
        onlyExistingAsset(assetTagHash)
    {
        if (!hasRole(VERIFIER_ROLE, msg.sender) && !hasRole(MANUFACTURER_ROLE, msg.sender)) {
            revert UnauthorizedStatusUpdater(msg.sender);
        }
        if (newStatus > uint8(Status.Flagged)) revert InvalidStatusValue(newStatus);

        Status oldStatus = _assets[assetTagHash].status;
        Status newStatusEnum = Status(newStatus);

        _assets[assetTagHash].status = newStatusEnum;

        _assetHistory[assetTagHash].push(
            StatusChange({status: newStatusEnum, updatedBy: msg.sender, timestamp: block.timestamp})
        );

        emit StatusUpdated(assetTagHash, oldStatus, newStatusEnum, msg.sender, block.timestamp);

        if (newStatusEnum == Status.Flagged) {
            emit AssetFlagged(assetTagHash, msg.sender, block.timestamp);
        }
    }

    /// @inheritdoc IAntiCounterfeit
    function getAssetHistory(bytes32 assetTagHash)
        external
        view
        override
        onlyExistingAsset(assetTagHash)
        returns (StatusChange[] memory)
    {
        return _assetHistory[assetTagHash];
    }

    /// @inheritdoc IAntiCounterfeit
    function getAsset(bytes32 assetTagHash)
        external
        view
        override
        onlyExistingAsset(assetTagHash)
        returns (Asset memory)
    {
        return _assets[assetTagHash];
    }

    /// @notice Convenience helper to check registration status without reverting.
    /// @param assetTagHash The hash of the asset's physical tag identifier.
    /// @return True if the asset has been registered.
    function assetRegistered(bytes32 assetTagHash) external view returns (bool) {
        return _assetExists[assetTagHash];
    }
}
