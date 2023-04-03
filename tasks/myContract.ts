import { task, types } from "hardhat/config";
import { readAddressList } from "../scripts/helper";

import { StandarImpl__factory } from "../typechain-types";


task("getVersion").setAction(async (_, hre) => {
  const {network} = hre
  const [dev] = await hre.ethers.getSigners()
  const addressList = readAddressList()

  const myContract = new StandarImpl__factory(dev).attach(
    addressList[network.name].MyContract
  );

  const value = await myContract.VERSION();
  
  console.log("value: ", value); 
})

task("getValue").setAction(async (_, hre) => {
  const {network} = hre
  const [dev] = await hre.ethers.getSigners()
  const addressList = readAddressList()

  const myContract = new StandarImpl__factory(dev).attach(
    addressList[network.name].MyContract
  );

  const value = await myContract.value();

  console.log("value: ", value.toString()); 
})


task("setValue")
  .addParam("value", "The value to set", undefined, types.int)
  .setAction(async (taskArgs, hre) => {
    const { network } = hre;
    const [dev] = await hre.ethers.getSigners();
    const addressList = readAddressList();

    const myContract = new StandarImpl__factory(dev).attach(
      addressList[network.name].MyContract
    );
    const tx = await myContract.setValue(taskArgs.value);
    console.log("tx: ", await tx.wait());

    const currentValue = await myContract.value();
    console.log("currentValue: ", currentValue.toString());
  });