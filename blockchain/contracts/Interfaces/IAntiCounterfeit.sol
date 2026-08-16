// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title IAntiCounterfeit
/// @notice Interface for the Anti-Counterfeit Verification System.
/// @dev Defines the canonical data structures, events, and external functions
///      that any conforming implementation of the anti-counterfeit registry must expose.
interface IAntiCounterfeit {
    /// @notice Lifecycle states an asset can be in.
    enum Status {
        Manufactured,
        InTransit,
        Verified,
        Flagged
    }

    /// @notice Core on-chain record for a physical asset tracked by the system.
    /// @param assetTagHash keccak256 hash of the physical hardware/NFC/RFID identifier.
    /// @param manufacturer Address of the manufacturer that registered the asset.
    /// @param timestamp Unix timestamp of the asset's initial registration.
    /// @param status Current lifecycle status of the asset.
    /// @param metadataURI URI (e.g. IPFS) pointing to off-chain metadata for the asset.
    struct Asset {
        bytes32 assetTagHash;
        address manufacturer;
        uint256 timestamp;
        Status status;
        string metadataURI;
    }

    /// @notice A single provenance record capturing a status transition.
    struct StatusChange {
        Status status;
        address updatedBy;
        uint256 timestamp;
    }

    /// @notice Emitted when a manufacturer registers a new asset.
    event AssetRegistered(
        bytes32 indexed assetTagHash,
        address indexed manufacturer,
        string metadataURI,
        uint256 timestamp
    );

    /// @notice Emitted whenever an asset is looked up / verified.
    event AssetVerified(
        bytes32 indexed assetTagHash,
        address indexed verifier,
        Status status,
        uint256 timestamp
    );

    /// @notice Emitted whenever an asset's status is updated.
    event StatusUpdated(
        bytes32 indexed assetTagHash,
        Status oldStatus,
        Status newStatus,
        address indexed updatedBy,
        uint256 timestamp
    );

    /// @notice Emitted specifically whenever an asset is flagged as suspicious/counterfeit.
    event AssetFlagged(bytes32 indexed assetTagHash, address indexed flaggedBy, uint256 timestamp);

    /// @notice Registers a new physical asset on-chain.
    function registerAsset(bytes32 assetTagHash, string calldata metadataURI) external;

    /// @notice Verifies an asset's authenticity and emits an AssetVerified event.
    /// @return asset The full on-chain record for the asset.
    /// @return isValid True if the asset exists and is not currently flagged.
    function verifyAsset(bytes32 assetTagHash) external returns (Asset memory asset, bool isValid);

    /// @notice Updates the lifecycle status of an existing asset.
    function updateStatus(bytes32 assetTagHash, uint8 newStatus) external;

    /// @notice Returns the full provenance/status-change history for an asset.
    function getAssetHistory(bytes32 assetTagHash) external view returns (StatusChange[] memory);

    /// @notice Returns the current on-chain record for an asset (pure read, no event).
    function getAsset(bytes32 assetTagHash) external view returns (Asset memory);
}
