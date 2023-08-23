import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  // We get the contract to deploy
  const RolesContract = await ethers.getContractFactory("Roles");
  const rolescontract = await RolesContract.deploy();
  await rolescontract.waitForDeployment();

  const rolesContractAddress = await rolescontract.getAddress();

  console.log("Roles contract deployed to:", rolesContractAddress);

  const NFTContract = await ethers.getContractFactory("NFT");
  const nftcontract = await NFTContract.deploy(rolesContractAddress);
  await nftcontract.waitForDeployment();

  const nftContractAddress = await nftcontract.getAddress();

  console.log("NFT contract deployed to:", nftContractAddress);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
