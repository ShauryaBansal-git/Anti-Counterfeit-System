# Anti-Counterfeit Verification System

A hybrid blockchain and full-stack web application designed to track, audit, and verify physical product authenticity using hardware tags (NFC/RFID), Solidity smart contracts on Ethereum/EVM networks, and a Node.js/MongoDB backend.

---

## 📁 Directory Structure

```text
anti-counterfeit-system/
├── blockchain/            # Hardhat, Solidity Smart Contracts, Tests & Deploy Scripts
│   ├── contracts/         # AntiCounterfeit.sol & Interfaces
│   ├── scripts/           # Deployment scripts
│   ├── test/              # Unit tests (Mocha/Chai)
│   ├── hardhat.config.js  # EVM compiler & network settings
│   └── .env.example       # Template for blockchain environment variables
│
├── backend/               # Node.js, Express & MongoDB REST API
│   ├── config/            # DB connection & Ethers.js Web3 wrappers
│   ├── controllers/       # Business logic (Auth, Asset registration, Verification)
│   ├── models/            # Mongoose schemas (User, Asset)
│   ├── routes/            # REST API endpoints
│   └── .env.example       # Template for backend environment variables
│
├── .gitignore             # Secrets, build artifacts, and node_modules rules
└── README.md              # Team onboarding & project documentation
```

---

## 💻 Prerequisites

Make sure the following tools are installed on your machine before starting:

* **Node.js**: `v18.0.0` or higher (`node -v`)
* **npm**: `v9.0.0` or higher (`npm -v`)
* **MongoDB**: Local MongoDB instance running on `mongodb://127.0.0.1:27017` or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster.
* **Git**: Installed and authenticated with your GitHub account.

---

## ⚡ Local Setup & Execution Guide

Follow these steps in order to run both modules locally on your system.

### 1. Clone the Repository

```bash
git clone https://github.com/YourOrganization/anti-counterfeit-system.git
cd anti-counterfeit-system
```

---

### 2. Blockchain Module Setup

1. Open your terminal in the project root and navigate to the `blockchain/` folder:
   ```bash
   cd blockchain
   npm install
   ```

2. Create your environment file:
   ```bash
   cp .env.example .env
   ```

3. Configure `blockchain/.env` for local execution:
   ```env
   SEPOLIA_RPC_URL=http://127.0.0.1:8545
   PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ETHERSCAN_API_KEY=dummy_key
   ```
   *(Note: The `PRIVATE_KEY` above is Hardhat's default local Account #0 key without the `0x` prefix).*

4. **Spin up local blockchain & deploy contract:**
   * Open a **New Terminal Tab**, navigate to `blockchain/`, and start the local EVM node:
     ```bash
     cd blockchain
     npx hardhat node
     ```
   * Switch back to your **Primary Terminal Tab** and run contract unit tests:
     ```bash
     npx hardhat test
     ```
   * Deploy the smart contract to your local network:
     ```bash
     npx hardhat run scripts/deploy.js --network localhost
     ```
   * **Copy the deployed contract address** printed in the console (e.g., `0x5FbDB2315678afecb367f032d93F642f64180aa3`).

---

### 3. Backend Module Setup

1. Open a terminal tab, navigate to the `backend/` folder, and install dependencies:
   ```bash
   cd ../backend
   npm install
   ```

2. Create your environment file:
   ```bash
   cp .env.example .env
   ```

3. Configure `backend/.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/anti_counterfeit
   JWT_SECRET=super_secret_jwt_key_change_in_production
   BLOCKCHAIN_RPC_URL=http://127.0.0.1:8545
   CONTRACT_ADDRESS=PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE
   ADMIN_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

4. **Export Smart Contract ABI:**
   Copy the `abi` array from `blockchain/artifacts/contracts/AntiCounterfeit.sol/AntiCounterfeit.json` and paste it into `backend/config/AntiCounterfeitABI.json`.

5. **Start the backend development server:**
   ```bash
   npm run dev
   ```

---

## 🔑 Environment Variables Reference

| Variable | Scope | Description | Default / Example |
| :--- | :--- | :--- | :--- |
| `PORT` | Backend | HTTP port for REST server | `5000` |
| `MONGO_URI` | Backend | MongoDB database connection string | `mongodb://127.0.0.1:27017/anti_counterfeit` |
| `JWT_SECRET` | Backend | Cryptographic key used to sign Auth tokens | Any secure string |
| `BLOCKCHAIN_RPC_URL` | Both | EVM RPC Endpoint | `http://127.0.0.1:8545` |
| `CONTRACT_ADDRESS` | Backend | Deployed AntiCounterfeit contract address | Generated on `hardhat run` |
| `PRIVATE_KEY` | Blockchain | Deployer wallet private key (without `0x`) | Hardhat Account #0 Key |

---

## 🔀 Git Workflow & Collaboration Rules

Direct pushes to the `main` branch are **blocked** by branch protection rulesets. All code updates must be submitted through Pull Requests.

### 1. Branch Naming Conventions
Always branch off `main` using standard prefixes:
* **Features:** `feature/description` (e.g., `feature/asset-verification-controller`)
* **Bug Fixes:** `fix/description` (e.g., `fix/web3-provider-reconnect`)
* **Maintenance:** `chore/description` (e.g., `chore/update-hardhat-deps`)

### 2. Commit Standards
Follow conventional commit formats:
```bash
git commit -m "feat: implement asset verification route"
git commit -m "fix: resolve contract event signature decoding error"
git commit -m "docs: update setup steps in README"
```

### 3. Pull Request (PR) Requirements
Before merging into `main`:
1. Ensure unit tests pass locally (`npx hardhat test`).
2. Pull the latest code from `main` to resolve conflicts locally (`git pull origin main`).
3. Open a Pull Request on GitHub and request at least **1 team member review approval**.
4. Use **Squash and Merge** when merging to keep the Git history linear.

---

## 🛡️ Security Guidelines

* **Never commit `.env` files or raw private keys to Git.** Verify `.env` is listed inside `.gitignore` before committing.
* Never use private keys associated with real mainnet funds in development or testing files.
