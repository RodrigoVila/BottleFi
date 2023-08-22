import { expect } from "chai";
import { ethers } from "hardhat";

describe("Roles contract", function () {
  it("Should register supplier only once", async function () {
    await renderSut("supplier");
  });

  it("Should register vendor only once", async function () {
    await renderSut("vendor");
  });
});

export const renderSut = async (type: "supplier" | "vendor") => {
  const [owner] = await ethers.getSigners();

  const rolesContract = await ethers.deployContract("Roles");
  await rolesContract.waitForDeployment();

  const name = `${type} name`;
  const desc = `${type} desc`;

  const register =
    type === "supplier"
      ? rolesContract.registerSupplier(name, desc)
      : rolesContract.registerVendor(name, desc);

  const address = owner.address;

  const role =
    type === "supplier"
      ? await rolesContract.SUPPLIER_ROLE()
      : await rolesContract.VENDOR_ROLE();

  await expect(register)
    .to.emit(rolesContract, "ProfileRegistered")
    .withArgs(address, role, name);

  const addedProfile =
    type === "supplier"
      ? await rolesContract.suppliers(address)
      : await rolesContract.vendors(address);

  expect(addedProfile).to.include(name);

  const register2 =
    type === "supplier"
      ? rolesContract.registerSupplier(name, desc)
      : rolesContract.registerVendor(name, desc);

  await expect(register2).to.be.revertedWith(`Already registered as a ${type}`);

  return { rolesContract }; //Used for NFT contract test
};
