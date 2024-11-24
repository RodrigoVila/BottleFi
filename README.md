# BottleFi

🚧 ** WIP ** 🚧

## Motivation

Counterfeit wine and liquors accounts for over 20% of the global market, resulting in billions of dollars in losses.
BottleFi addresses this issue for bottled beverages by providing a solution that ensures authenticity, security, and transparency. Using blockchain technology, BottleFi makes it possible to trace the origin and ownership of each bottle, offering a reliable method for verifying genuine products.

## How it Works

Each bottle is assigned a token (like a "birth certificate") that is stored on a public ledger and linked to a unique QR code or NFC tag. When a user scans the code or tag, the system verifies its authenticity by checking the public ledger and provides real-time information about the bottle's origin and current ownership. Upon the bottle's sale, the ledger updates to reflect the transaction, preventing resale and counterfeiting.

## Blockchain Technology

Blockchain is the foundation of BottleFi, providing a secure, immutable, and transparent ledger that tracks each bottle's lifecycle. Key benefits of using blockchain include:

- **Security**: A decentralized and secure way to store data, making it tamper-proof and resistant to fraud.

- **Transparency**: Every transaction and ownership change is recorded on a public, immutable ledger, ensuring transparency and traceability accessible to everyone.

- **Authenticity**: The immutable nature of blockchain guarantees that each bottle's token is unique and cannot be duplicated or altered.

## Tech used

### Blockchain

- [Solidity](https://soliditylang.org/)
- [Hardhat](https://hardhat.org/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)

### Frontend

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## How to Run This Project

Check out the live demo at [https://bottlefi.vercel.app](https://bottlefi.vercel.app).

or

### 1. Clone the repository and go to project folder

```sh
git clone https://github.com/RodrigoVila/BottleFi.git
cd BottleFi
```

### 2. Install Blockchain Dependencies

```sh
npm install
```

### 3. Add Infura account and wallet key and start the Local Blockchain Node

a) [Create an infura account](https://developer.metamask.io/) and create a Sepolia API key.

b) Get one of your Metamask account private keys (_IMPORTANT NOTE: DO NOT USE KEYS WHERE YOU HAVE REAL FUNDS._)

c) Create a .env file at the root folder and add your keys

```sh
INFURA_API_KEY=<YOUR_INFURA_KEY>
DEPLOY_PRIVATE_KEY=<YOUR_NOT_IMPORTANT_METAMASK_PRIVATE_KEY> (Read important note above)
```

d) Run local node

```sh
npm run hardhat:node
```

### 4. Compile and deploy Contracts to the Local Network

Open a new terminal and run

```sh
npm run compile
npm run deploy:localhost
```

### 5. Add contract addresses to the .env file

Copy the contract addresses from the console output. You will see something like this:

```sh
Roles contract deployed to: <<COPY_THIS_ROLES_CONTRACT_ADDRESS>>
NFT contract deployed to: <<COPY_THIS_NFT_CONTRACT_ADDRESS>>
```

Create an .env file at the frontend folder and add these addresses to the .env file under these keys:

```sh
VITE_ROLES_CONTRACT_ADDRESS=<<COPIED_ROLES_CONTRACT_ADDRESS>>
VITE_NFT_CONTRACT_ADDRESS=<<COPIED_NFT_CONTRACT_ADDRESS>>
```

### 6. Install Frontend Dependencies

Within the frontend folder, run:

```sh
npm install
```

### 7. Run the app

```sh
npm run dev
```

## How to use the APP

### Steps:

1. **Log in to MetaMask**: Ensure you are connected to Sepolia/Hardhat test network.
   2a. **Sepolia**: Obtain some Sepolia ETH from a [faucet](https://www.coingecko.com/learn/sepolia-eth)
   2b. **Hardhat**: Hardhat automatically gives you 10000 test ETH. Chech the console for accounts to use

2. **Create a Role**:

   - **Supplier**: This is like an admin role and can perform all transactions (create, transfer, and sell).
   - **Vendor**: This role can only sell tokens.

3. **Mint a Token**:

   - Provide a name, a short description, and a token image.
   - The newly created token will appear on the dashboard.

4. **Transfer the Token**:

   - Transfer the token to another account.
   - The token remains valid after the transfer.

5. **Sell the Token**:
   - Sell the token back to yourself or to another account.
   - The token will no longer be valid after the sale.

## Testing

To run the smart contract tests, go to project root and run

```sh
npm run test
```

To run frontend tests, go to frontend folder and run

```sh
cd frontend
npm run test
```
