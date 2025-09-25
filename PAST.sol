/*
██╗  ██╗ █████╗ ████████╗
██║ ██╔╝██╔══██╗╚══██╔══╝
█████╔╝ ███████║   ██║   
██╔═██╗ ██╔══██║   ██║   
██║  ██╗██║  ██║   ██║   
╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   
        K   A   T
*/

// Powered by GitHub Copilot Remix, Ethereum & Binance

pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

contract PAST {
    address public owner;
    string public message;

    event MessageUpdated(string oldMessage, string newMessage);

    constructor() {
        owner = msg.sender;
        message = "Powered by GitHub Copilot Remix, Ethereum & Binance";
    }

    function updateMessage(string memory newMessage) public {
        require(msg.sender == owner, "Only owner can update message");
        emit MessageUpdated(message, newMessage);
        message = newMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function transferOwnership(address newOwner) public {
        require(msg.sender == owner, "Only owner can transfer ownership");
        owner = newOwner;
    }
}