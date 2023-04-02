// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SmallToken is ERC20 {
  
  address public owner;
  
  mapping (address => bool) alreadyMinted;

  event Mint(address indexed user, uint256 amount);
  event Burn(address indexed user, uint256 amount);

  constructor () ERC20("SmallToken", "SMT") {

    owner = msg.sender;

    _mint(msg.sender, 100 * 10 ** decimals());

  }
  
  modifier onlyOwner {
    require(msg.sender == owner, "Only owner");
    _;
  }

  function mint () external {
    require(!alreadyMinted[msg.sender], "Already Minted");

    console.log("\n balanceOf before mint is ", balanceOf(msg.sender), "\n");

    _mint(msg.sender, 1000);

    console.log("\n balanceOf after mint is ", balanceOf(msg.sender), "\n");

    emit Mint(msg.sender, 1000);
  }

  function burn (address _user) external onlyOwner {
    uint256 _amout = balanceOf(_user);

    console.log('\n burn balanceOf is ', _amout, "\n");

    delete alreadyMinted[_user];

    emit Burn(_user, _amout);
  }

  function _beforeTokenTransfer( address _from, address _to, uint256) internal pure override {
    require(
        _from == address(0) || _to == address(0),
        "Transfer not allowed"
    );
  }
}