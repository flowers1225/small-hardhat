import { task, types } from "hardhat/config";
import { getMyTokenAddress, storeMyTokenAddress } from "../scripts/helper";

import { SmallToken__factory } from "../typechain-types";

// import  "@nomicfoundation/hardhat-toolbox"

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("accounts_balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs, {ethers}) => {
    const balance = await ethers.provider.getBalance(taskArgs.account);

    console.log(ethers.utils.formatEther(balance), "ETH");
  });


task("deploy", "Deploy SmallToken contract").setAction(async (_, hre) => {
  const { network } = hre;
  const [dev] = await hre.ethers.getSigners();

  console.log("Deploying smallToken to ", network.name, " by ", dev.address);

  const myToken = await new SmallToken__factory(dev).deploy();

  console.log(`Deployed smallToken to: ${myToken.address}`);

  storeMyTokenAddress(network.name, myToken.address);
});

task("mint", "Mint smallToken token").setAction(async (_, hre) => {
  const { network } = hre;
  const [, alice] = await hre.ethers.getSigners();

  const myToken = new SmallToken__factory(alice).attach(
    getMyTokenAddress(network.name)
  );

  const tx = await myToken.mint();
  console.log("Tx details: ", await tx.wait());
});

task("balance", "Get smallToken token balance")
  .addParam("address", "The address to check", null, types.string)
  .setAction(async (_, hre) => {
    const { network } = hre;
    const [dev] = await hre.ethers.getSigners();

    const myToken = new SmallToken__factory(dev).attach(
      getMyTokenAddress(network.name)
    );

    const balance = await myToken.balanceOf(dev.address);
    console.log("Dev token balance: ", hre.ethers.utils.formatEther(balance.toString()));
  });