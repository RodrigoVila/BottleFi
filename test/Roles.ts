import { expect } from "chai";
import { ethers } from "hardhat";

describe("Roles contract", function () {
  it("Should register supplier (only once)", async function () {
    await renderSut("supplier");
  });

  it("Should register vendor (only once)", async function () {
    await renderSut("vendor");
  });
});

export const renderSut = async (type: "supplier" | "vendor") => {
  const [owner] = await ethers.getSigners();

  const rolesContract = await ethers.deployContract("Roles");
  await rolesContract.waitForDeployment();

  const name = `${type} name`;
  const desc = `${type} desc`;

  const register = rolesContract.register(name, desc, type);

  const address = owner.address;

  const role =
    type === "supplier"
      ? await rolesContract.SUPPLIER_ROLE()
      : await rolesContract.VENDOR_ROLE();

  await expect(register)
    .to.emit(rolesContract, "RoleAssigned")
    .withArgs(address, role, name);

  const addedProfile =
    type === "supplier"
      ? await rolesContract.isSupplier(address)
      : await rolesContract.isVendor(address);

  expect(addedProfile).to.be.true;

  const register2 = rolesContract.register(name, desc, type);

  await expect(register2).to.be.revertedWith(`Already registered as a ${type}`);
};
