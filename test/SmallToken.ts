import {ethers} from "hardhat"
import {expect} from "chai"
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";


describe("SmallToken Test", () => {
  async function deployMyTokenFixture ()
  {
    const [dev, alice] = await ethers.getSigners()

    const SmallToken = await ethers.getContractFactory('SmallToken')
    const smallToken = await SmallToken.deploy()

    return {dev, alice, smallToken}
  }

  async function mintAliceFixture() {
    const { dev, alice, smallToken } = await loadFixture(deployMyTokenFixture);
    await smallToken.connect(alice).mint();

    return { dev, alice, smallToken };
  }

  describe("Deloyment", () => {

    it("should have the correct name and symbol", async function () {
      const {smallToken} = await loadFixture(deployMyTokenFixture)

      expect(await smallToken.name()).to.equal("SmallToken");
      expect(await smallToken.symbol()).to.equal("SMT");
    });


    it("should have the correct owner after deployment", async function () {
      const { smallToken, dev } = await loadFixture(deployMyTokenFixture);

      expect(await smallToken.owner()).to.equal(dev.address);
    });

  })

  describe("Transfer", function () {
    it("should not be able to transfer", async function () {
      const { smallToken, dev, alice } = await loadFixture(mintAliceFixture);

      await expect(
        smallToken.connect(alice).transfer(dev.address, 2000)
      ).to.be.revertedWith("Transfer not allowed");
    });
  });

})
