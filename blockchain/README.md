# Anti-Counterfeit Verification System — Blockchain Module

A production-ready Solidity + Hardhat module implementing an on-chain
anti-counterfeit asset registry, built on OpenZeppelin's `AccessControl`.

## Overview

Physical goods are tagged with a hardware, NFC, or RFID identifier. Only the
`keccak256` hash of that identifier (`assetTagHash`) is stored on-chain,
preserving the privacy of the raw tag data while still allowing anyone to
verify authenticity by re-hashing the tag they scanned and querying the
contract.

### Roles

| Role                  | Permissions                                              |
|-----------------------|-----------------------------------------------------------|
| `DEFAULT_ADMIN_ROLE`  | Grant/revoke `MANUFACTURER_ROLE` and `VERIFIER_ROLE`      |
| `MANUFACTURER_ROLE`   | Register new assets, update asset status                  |
| `VERIFIER_ROLE`       | Update asset status (including flagging counterfeits)     |

### Asset Lifecycle (`Status` enum)
