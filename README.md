# BottleFi

## Table of Contents

1. [Motivation](#motivation)
2. [How BottleFi works](#how-bottlefi-works)
3. [Limitations and scalability](#limitations-and-scalability)
   - [Label generation](#label-generation-limitation)
   - [Token generation](#minting-bottles-limitation)
4. [Blockchain technology](#blockchain-technology)
5. [Tech used](#tech-used)
   - [Blockchain](#blockchain)
   - [Frontend](#frontend)
6. [How to run this project](#how-to-run-this-project)
   - [Create a Metamask account](#create-a-metamask-account)
   - [Option 1 - Sepolia live demo](#1-sepolia-live-demo)
   - [Option 2 - Run your own Hardhat node](#2-run-your-own-hardhat-node)
7. [How to use the app](#how-to-use-the-app)
8. [Testing](#testing)

## 🎯 Motivation

Counterfeit wine and liquors accounts for over 20% of the global market, resulting in billions of dollars in losses.
BottleFi addresses this issue for bottled beverages by providing a solution that ensures authenticity, security, and transparency. Using blockchain technology, BottleFi makes it possible to trace the origin and ownership of each bottle, offering a reliable method for verifying genuine products.

## 🛠️ How BottleFi works

Each bottle is assigned a token (like a "birth certificate") that is stored on a public ledger and linked to a unique QR code or NFC tag. When a user scans the code or tag, the system verifies its authenticity by checking the public ledger and provides real-time information about the bottle's origin and current ownership. Upon the bottle's sale, the ledger updates to reflect the transaction, preventing resale and counterfeiting.

## ⚠️ Limitations and scalability

This app was designed to prevent counterfeit by uniquely validating and tracking bottles using blockchain technology. However, there are two notable scalability challenges currently under development:

### Label generation

Printing labels with unique QR codes for each bottle poses a scalability challenge. For instance, if 10,000 bottles need unique QR codes, generating and managing the necessary resources for printing these labels could become inefficient and resource-intensive.

#### Potential solution:

Using NFC tags hidden somewhere within the bottle could address this issue. NFC tags provide a unique, tamper-resistant way to identify each bottle, reducing the reliance on printed QR codes. This approach not only enhances security but also simplifies the identification process for consumers and validators.

### Token generation

The app currently uses the ERC721 standard, which ensures each bottle is uniquely identifiable through a token. However, the standard requires minting tokens one at a time. Using the earlier example of 10,000 bottles, this approach becomes inefficient and costly in terms of gas fees.

#### Proposed and tested solutions:

##### Using ERC1155 standard:

In this approach, a product (e.g., a specific wine type) is represented as a non-fungible token, while individual bottles are fungible and share the same token ID.
Challenge: This makes it impossible to uniquely identify individual bottles, which is critical for validation and counterfeit prevention.
Nested Mappings for Minting:

##### A data structure like mapping["productId"]["tokenId"] 

Challenge: While this approach maintains uniqueness, minting 10,000 bottles would still require a for loop, leading to high gas fees and inefficiency.

### Current exploration:

I am currently exploring a custom solution that does not rely on existing token standards. Instead, this approach would focus on storing only critical data on-chain (e.g., identifiers for validation) and keeping less critical metadata off-chain. This hybrid approach aims to address scalability issues without compromising the ability to validate or track individual bottles.

## 🔗 Blockchain technology

Blockchain is the foundation of BottleFi, providing a secure, immutable, and transparent ledger that tracks each bottle's lifecycle. Key benefits of using blockchain include:

- **Security**: A decentralized and secure way to store data, making it tamper-proof and resistant to fraud.

- **Transparency**: Every transaction and ownership change is recorded on a public, immutable ledger, ensuring transparency and traceability accessible to everyone.

- **Authenticity**: The immutable nature of blockchain guarantees that each bottle's token is unique and cannot be duplicated or altered.

## 💻 Tech used

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

## 🚀 How to run this project

### Create a Metamask account

First, you will need a Metamask Account. Follow [this guide](https://support.metamask.io/es/getting-started/getting-started-with-metamask/) in order to get a one.

### 2 ways to run this project:
1) Use the Live Demo (You will need Sepolia test ETH). 
2) Run your own Hardhat Node

### 1) Sepolia live demo

#### Get Sepolia test ETH.

Follow <ins>one</ins> of this guides in order to get Sepolia test ETH. You will need them to interact with the app.

- [Alchemy Guide](https://www.alchemy.com/overviews/sepolia-eth)
- [Chanlink Guide](https://blog.chain.link/sepolia-eth/)
- [Medium Guide (QuickNode)](https://medium.com/@Skydrome/how-to-get-sepolia-eth-from-faucets-3ea3660142c0)

#### Open live demo.
  [Open live demo here](https://bottlefi.vercel.app). Then refer to "How to use the APP" section below to understand how this app works.

### 2) Run your own Hardhat node

#### 1. Clone the repository and go to project folder

```sh
git clone https://github.com/RodrigoVila/BottleFi.git
cd BottleFi
```

#### 2. Install Blockchain Dependencies

```sh
npm install
```
#### 3. Add Infura account and wallet key and start the local Blockchain node

a) [Create an infura account](https://developer.metamask.io/) and create a Sepolia API key.

b) Create a Infura dedicated gateway 

Follow [this guide](https://www.infura.io/blog/post/introducing-ipfs-dedicated-gateways)

c) Create a .env file at the frontend folder and add your keys

```sh
VITE_INFURA_IPFS_API_KEY=<YOUR_INFURA_KEY>
VITE_INFURA_IPFS_API_KEY_SECRET=<ONE_OF_YOUR_PROVIDED_HARDHAT_PRIVATE_KEY>
VITE_INFURA_GATEWAY_SUBDOMAIN=<<YOUR_ADDRESS.infura-ipfs.io>>
```
- You can get VITE_INFURA_IPFS_API_KEY from your active endpoints
- VITE_INFURA_IPFS_API_KEY_SECRET is under settings
- VITE_INFURA_GATEWAY_SUBDOMAIN follow previous point (letter "b")

d) Run local node

```sh
npm run hardhat:node
```

e) Use one of the provided Hardhat accounts.

Copy one of the provided Private Keys at your console where the Node is running. Import that account at Metamask using the private key.
- Open Metamask
- Click on your account (Middle top button)
- Click on Add new account
- Click on import account
- Make sure that selected type is "Private Key"
- Paste one of your Hardhat accounts
- Use this account to interact with the app. Maybe you want to add another one to try different roles (Supplier, Vendor)

#### 4. Compile and deploy contracts to the local network

Open a new terminal and run

```sh
npm run compile
npm run deploy:localhost
```

#### 5. Add contract addresses to the .env file

Copy the contract addresses from the console output. You will see something like this:

```sh
Roles contract deployed to: <<COPY_THIS_ROLES_CONTRACT_ADDRESS>>
NFT contract deployed to: <<COPY_THIS_NFT_CONTRACT_ADDRESS>>
```

Add addresses to the .env file under these keys:

```sh
VITE_ROLES_CONTRACT_ADDRESS=<<COPIED_ROLES_CONTRACT_ADDRESS>>
VITE_NFT_CONTRACT_ADDRESS=<<COPIED_NFT_CONTRACT_ADDRESS>>
```

So far, our .env should have 5 keys
```bash
VITE_ROLES_CONTRACT_ADDRESS=
VITE_NFT_CONTRACT_ADDRESS=
VITE_INFURA_IPFS_API_KEY=
VITE_INFURA_IPFS_API_KEY_SECRET=
VITE_INFURA_GATEWAY_SUBDOMAIN=
```

#### 6. Install frontend dependencies

Within the frontend folder, run:

```sh
npm install
```

#### 7. Add Hardhat network to your Metamask account

Follow [this guide](https://support.chainstack.com/hc/en-us/articles/4408642503449-Using-MetaMask-with-a-Hardhat-node) to add Hardhat to your networks.


#### 8. Run the app

```sh
npm run dev
```

## 🖱️ How to use the APP

### Steps:

1. **Log in to MetaMask**: Ensure you are connected to Sepolia/Hardhat test network.
Ensure that you have test ETH on your balance. Hardhat asigns 10000 test ETH. For Sepolia you need to get test from a faucet. Read the "Get Sepolia Test ETH" section to understand how to get them.

2. **Create a role**:

   - **Supplier**: This is like an admin role and can perform all transactions (create, transfer, and sell).
   - **Vendor**: This role can only sell tokens.

3. **Mint a token**:

   - Provide a name, a short description, and a token image.
   - The newly created token will appear on the dashboard.

4. **Transfer tokens**:

   - Transfer the token to another account.
   - The token remains valid after the transfer.

5. **Sell tokens**:
   - Sell the token back to yourself or to another account.
   - The token will no longer be valid after the sale.

```sh
npm run test
```

## 🧪 Testing

To run the smart contract tests, go to project root and run

```sh
npm run test
```

To run frontend tests, go to frontend folder and run

```sh
cd frontend
npm run test
```
