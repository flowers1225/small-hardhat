# Sample Hardhat Project

# Bash

- ### 基本
```bash
$ npx hardhat help

// compile 编译
$ npx hardhat compile

// start  本地服务
$ npx hardhat node

// test 测试用例
$ npx hardhat test
$ REPORT_GAS=true npx hardhat test

// deploy
$ npx hardhat run --network localhost scripts/deploySmllToken.ts

```

- ### hardhat-deploy
```bash
// 
// hardhat.config.ts 设置 namedAccounts
// hardhat.config.ts 中引入 import "hardhat-deploy"

// 部署代理合约
$ npx hardhat deploy --network localhost --tags ProxyAdmin

// 部署逻辑合约
$ npx hardhat deploy --network localhost --tags 'name'


// tasks 
// hardhat.config.ts中引入tasks文件

$ npx hardhat 'contracts function name / tasks name' --network localhost 

```

- ### 验证
```bash
// 查看验证网络
$ npx hardhat verify --list-networks

$ npx hardhat verify --network bscTestnet address 


```

[hardhat-deploy](https://github.com/wighawag/hardhat-deploy/tree/master#1-hardhat-deploy)