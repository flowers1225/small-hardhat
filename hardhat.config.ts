import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// import "hardhat-deploy"; // 部署可升级合约插件
import "hardhat-deploy"

import "./tasks";


import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://localhost:8545",
    },
    bscTest: {
      url: process.env.RPC_BSC_TEST,
      accounts:  process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    }
  },
  mocha: {
    timeout: 10000,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
  // gasReporter: {
  //   enabled: true,
  //   currency: 'USD',
  //   coinmarketcap: process.env.COINMARKETCAP_API_KEY
  // },
  // etherscan: {
  //   apiKey: process.env.BSCSCAN_KEY
  // }
};

export default config;
