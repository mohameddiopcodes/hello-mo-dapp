//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract HelloMo {
    uint256 helloCount;
    uint256 private seed;

    event NewHello(address indexed from, uint256 timestamp, string message);

    struct Hello {
        address from;
        string message;
        uint256 timestamp;
    }
    
    mapping(address => uint256) public lastWavedAt;

    Hello[] hellos;
    constructor() payable {
        console.log("Hello World");
    }

    function sayHello(string memory _message) public {
        require(
            lastWavedAt[msg.sender] + 45 seconds < block.timestamp,
            "Wait 15m"
        );

        lastWavedAt[msg.sender] = block.timestamp;

        helloCount += 1;
        console.log("%s said hello", msg.sender);
        hellos.push(Hello(msg.sender, _message, block.timestamp));
        emit NewHello(msg.sender, block.timestamp, _message);

        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %s", seed);

        if (seed < 5) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }
    }

    function getAllHellos() public view returns (Hello[] memory) {
        return hellos;
    }

    function getTotalHellos() public view returns (uint256) {
        console.log("We have %d total hellos", helloCount);
        return helloCount;
    }
}
