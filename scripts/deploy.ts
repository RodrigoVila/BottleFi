import { ethers } from "hardhat";

// TODO: Check this deploy function. It was from a 2021 post.
// I think Hardhat has new ways to do this
async function main() {

  // We get the contract to deploy
  const RolesContract = await ethers.getContractFactory('Roles');
  const rolescontract = await RolesContract.deploy();

  await rolescontract.deployed();

  console.log('RolesContract deployed to:', rolescontract.address);

  const NFTContract = await ethers.getContractFactory('NFT');
  const nftcontract = await NFTContract.deploy(rolescontract.address);

  console.log('NFT deployed to:', nftcontract.address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
