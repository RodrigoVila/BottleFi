import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";

describe("NFT contract", function () {
  async function tokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const rolesContract = await ethers.deployContract("Roles");
    await rolesContract.waitForDeployment();
    const rolesContractAddress = await rolesContract.getAddress();

    const NFTContract = await ethers.getContractFactory("NFT");
    const nftContract = await NFTContract.deploy(rolesContractAddress);
    await nftContract.waitForDeployment();

    return { owner, addr1, rolesContract, nftContract };
  }
  it("Should mint a token when called by a supplier", async function () {
    const { owner, rolesContract, nftContract } = await loadFixture(
      tokenFixture
    );

    const uri = "http://test.com";
    const mint = nftContract.mint(uri);
    await expect(mint).to.be.revertedWith("Only Suppliers");

    await rolesContract.registerSupplier("Fake Supplier", "Fake Desc");

    const mint2 = nftContract.mint(uri);
    await expect(mint2)
      .to.emit(nftContract, "Mint")
      .withArgs(0, uri, anyValue, owner.address);
  });

  it("Should transfer a token when called by a supplier", async function () {
    const { owner, addr1, rolesContract, nftContract } = await loadFixture(
      tokenFixture
    );

    const transfer1 = nftContract.transfer(addr1.address, 0);
    await expect(transfer1).to.be.revertedWith("Only Suppliers");

    await rolesContract.registerSupplier("Fake Supplier", "Fake Desc");
    await nftContract.mint("http://test.com");

    const transfer2 = nftContract.transfer(addr1.address, 0);
    await expect(transfer2).to.changeTokenBalances(
      nftContract,
      [owner, addr1],
      [-1, 1]
    );
  });

  it("Should sell a token when called by a supplier / should invalidate token after sell", async function () {
    const { owner, addr1, rolesContract, nftContract } = await loadFixture(
      tokenFixture
    );

    const sell1 = nftContract.sell(addr1.address, 0);
    await expect(sell1).to.be.revertedWith("Only Suppliers or Vendors");

    await rolesContract.registerSupplier("Fake Supplier", "Fake Desc");
    await nftContract.mint("http://test.com");

    expect(await nftContract.isValidToken(0)).to.be.true;

    const sell2 = nftContract.sell(addr1.address, 0);
    await expect(sell2).to.changeTokenBalances(
      nftContract,
      [owner, addr1],
      [-1, 1]
    );

    expect(await nftContract.isValidToken(0)).to.be.false;
  });

  it("Should sell (but not transfer) when called by a vendor", async function () {
    const { owner, addr1, rolesContract, nftContract } = await loadFixture(
      tokenFixture
    );
    //We register supplier, then mint and transfer token to addr1
    await rolesContract.registerSupplier("Fake Supplier", "Fake Desc");
    await nftContract.mint("http://test.com");
    await nftContract.transfer(addr1.address, 0);

    // Then create a vendor account with addr1
    await rolesContract
      .connect(addr1)
      .registerVendor("Fake Vendor", "Fake Desc");

    // As transfer is not active with vendor acc, tx is rejected
    await expect(
      nftContract.connect(addr1).transfer(owner.address, 0)
    ).to.be.revertedWith("Only Suppliers");

    // Finally, vendor can sell and event is emitted
    const sellFromVendor = nftContract.connect(addr1).sell(owner.address, 0);
    await expect(sellFromVendor)
      .to.emit(nftContract, "Sell")
      .withArgs(addr1.address, owner.address, 0);
  });

  it("Should revert if transfer is not called by the owner", async function () {
    const { owner, addr1, rolesContract, nftContract } = await loadFixture(
      tokenFixture
    );
    await rolesContract.registerSupplier("Fake Supplier", "Fake Desc");
    await nftContract.mint("http://test.com");

    await rolesContract
      .connect(addr1)
      .registerSupplier("Fake Supplier2", "Fake Desc2");

    await expect(
      nftContract.connect(addr1).transfer(owner.address, 0)
    ).to.be.revertedWith("Only owner of this token can transfer");
  });

  it("Should revert if sell is not called by the owner", async function () {
    const { owner, addr1, rolesContract, nftContract } = await loadFixture(
      tokenFixture
    );
    await rolesContract.registerSupplier("Fake Supplier", "Fake Desc");
    await nftContract.mint("http://test.com");

    await rolesContract
      .connect(addr1)
      .registerSupplier("Fake Supplier2", "Fake Desc2");

    await expect(
      nftContract.connect(addr1).sell(owner.address, 0)
    ).to.be.revertedWith("Only owner of this token can sell");
  });

  it("Should return an array of tokens owned by an address", async function () {
    const { rolesContract, nftContract } = await loadFixture(tokenFixture);
    //We register supplier, then mint and transfer token to addr1
    await rolesContract.registerSupplier("Fake Supplier", "Fake Desc");
    await nftContract.mint("ab");
    await nftContract.mint("cd");
    await nftContract.mint("ef");

    expect((await nftContract.tokensOfOwner()).length).to.equal(3);
  });

  it("Should return token details by ID", async function () {
    const { rolesContract, nftContract } = await loadFixture(tokenFixture);
    const uri = "http://www.uri.com";

    await rolesContract.registerSupplier("Fake Supplier", "Fake Desc");
    await nftContract.mint(uri);

    const tokenId = 0;
    const block = await ethers.provider.getBlock("latest");
    const isValid = true;

    expect(await nftContract.getTokenById(tokenId)).to.deep.equal([
      tokenId,
      uri,
      block?.timestamp,
      isValid,
    ]);
  });
});
