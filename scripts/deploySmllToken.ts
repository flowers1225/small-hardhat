import { ethers,network } from "hardhat";

async function main ()
{
  const SmallToken = await ethers.getContractFactory("SmallToken");
  const smallToken = await SmallToken.deploy()

  await smallToken.deployed()

  console.log('Deployd SmallToken on', network.name, "by", smallToken.deployTransaction.from);

  console.log('Deployd SmallToken to: ', smallToken.address);
  
  console.log('Transaction hash: ', smallToken.deployTransaction.hash);

}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})