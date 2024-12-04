import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  paths: {
    artifacts: "./frontend/artifacts",
  },
  /*  
      Uncomment this only if deploying contracts to Sepolia Netowrk. Not needed for localhost.
      Set the corresponding ENV variables
      INFURA_API_KEY from the Infura Developer Console (You need to create a new key)
      DEPLOY_PRIVATE_KEY is the private key of the account you will use for deploy the contract.
      IMPORTANT NOTE: Don't use your personal account as your keys might be exposed. That account need to have some Sepolia test eth.
      See Readme for more information
  */

  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`${process.env.DEPLOY_PRIVATE_KEY}`],
    },
  },
};

export default config;
