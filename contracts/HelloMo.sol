//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract HelloMo {
    uint256 hellos;

    constructor() {
        console.log("Hello World");
    }

    function sayHello() public {
        hellos += 1;
        console.log("%s said hello", msg.sender);
    }

    function getTotalHellos() public view returns (uint256) {
        console.log("We have %d total hellos", hellos);
        return hellos;
    }
}
