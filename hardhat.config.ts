import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// import "hardhat-deploy"; // 部署可升级合约插件
import "hardhat-deploy"

import "./tasks";
import "./tasks/myContract";


import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://localhost:8545",
    },
    bscTestnet: {
      url: process.env.RPC_BSC_TEST,
      accounts:  process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    }
  },
  // 地址与名称对应关系 hardhat-deploy 扩展配置
  namedAccounts: {
    deployer: {
      default: 0,
      localhost: 0,
    },
  },
  mocha: {
    timeout: 10000,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  // gasReporter: {
  //   enabled: true,
  //   currency: 'USD',
  //   coinmarketcap: process.env.COINMARKETCAP_API_KEY
  // },
  etherscan: {
    apiKey: {
      bscTestnet:  process.env.BSCSCAN_KEY !== undefined ? process.env.BSCSCAN_KEY : '',
    }
  }
};

export default config;
