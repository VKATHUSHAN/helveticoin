// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../../src/HelvetiCoin.sol";

contract HelvetiCoinTest is Test {
    HelvetiCoin public helvetiCoin;
    
    address public owner = address(0x1);
    address public minter = address(0x2);
    address public user1 = address(0x3);
    address public user2 = address(0x4);
    address public blacklisted = address(0x5);
    
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18;
    
    event MinterAdded(address indexed minter);
    event MinterRemoved(address indexed minter);
    event AddressBlacklisted(address indexed account);
    event AddressUnblacklisted(address indexed account);
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);

    function setUp() public {
        vm.prank(owner);
        helvetiCoin = new HelvetiCoin(owner);
    }

    function testDeployment() public {
        assertEq(helvetiCoin.name(), "HelvetiCoin");
        assertEq(helvetiCoin.symbol(), "HCHF");
        assertEq(helvetiCoin.decimals(), 18);
        assertEq(helvetiCoin.MAX_SUPPLY(), MAX_SUPPLY);
        assertEq(helvetiCoin.owner(), owner);
        assertTrue(helvetiCoin.minters(owner));
        assertEq(helvetiCoin.totalSupply(), 0);
    }

    function testAddMinter() public {
        vm.prank(owner);
        vm.expectEmit(true, false, false, false);
        emit MinterAdded(minter);
        helvetiCoin.addMinter(minter);
        
        assertTrue(helvetiCoin.minters(minter));
    }

    function testRemoveMinter() public {
        vm.prank(owner);
        helvetiCoin.addMinter(minter);
        
        vm.prank(owner);
        vm.expectEmit(true, false, false, false);
        emit MinterRemoved(minter);
        helvetiCoin.removeMinter(minter);
        
        assertFalse(helvetiCoin.minters(minter));
    }

    function testFailAddMinterNotOwner() public {
        vm.prank(user1);
        helvetiCoin.addMinter(minter);
    }

    function testFailAddMinterZeroAddress() public {
        vm.prank(owner);
        helvetiCoin.addMinter(address(0));
    }

    function testMint() public {
        uint256 mintAmount = 1000 * 10**18;
        
        vm.prank(owner);
        vm.expectEmit(true, false, false, true);
        emit TokensMinted(user1, mintAmount);
        helvetiCoin.mint(user1, mintAmount);
        
        assertEq(helvetiCoin.balanceOf(user1), mintAmount);
        assertEq(helvetiCoin.totalSupply(), mintAmount);
    }

    function testFailMintNotMinter() public {
        uint256 mintAmount = 1000 * 10**18;
        
        vm.prank(user1);
        helvetiCoin.mint(user2, mintAmount);
    }

    function testFailMintExceedsMaxSupply() public {
        uint256 exceedingAmount = MAX_SUPPLY + 1;
        
        vm.prank(owner);
        helvetiCoin.mint(user1, exceedingAmount);
    }

    function testFailMintToBlacklisted() public {
        uint256 mintAmount = 1000 * 10**18;
        
        vm.prank(owner);
        helvetiCoin.blacklistAddress(blacklisted);
        
        vm.prank(owner);
        helvetiCoin.mint(blacklisted, mintAmount);
    }

    function testBurn() public {
        uint256 mintAmount = 1000 * 10**18;
        uint256 burnAmount = 100 * 10**18;
        
        vm.prank(owner);
        helvetiCoin.mint(user1, mintAmount);
        
        vm.prank(user1);
        vm.expectEmit(true, false, false, true);
        emit TokensBurned(user1, burnAmount);
        helvetiCoin.burn(burnAmount);
        
        assertEq(helvetiCoin.balanceOf(user1), mintAmount - burnAmount);
        assertEq(helvetiCoin.totalSupply(), mintAmount - burnAmount);
    }

    function testBurnFrom() public {
        uint256 mintAmount = 1000 * 10**18;
        uint256 burnAmount = 100 * 10**18;
        
        vm.prank(owner);
        helvetiCoin.mint(user1, mintAmount);
        
        vm.prank(user1);
        helvetiCoin.approve(user2, burnAmount);
        
        vm.prank(user2);
        vm.expectEmit(true, false, false, true);
        emit TokensBurned(user1, burnAmount);
        helvetiCoin.burnFrom(user1, burnAmount);
        
        assertEq(helvetiCoin.balanceOf(user1), mintAmount - burnAmount);
    }

    function testBlacklistAddress() public {
        vm.prank(owner);
        vm.expectEmit(true, false, false, false);
        emit AddressBlacklisted(user1);
        helvetiCoin.blacklistAddress(user1);
        
        assertTrue(helvetiCoin.blacklisted(user1));
    }

    function testUnblacklistAddress() public {
        vm.prank(owner);
        helvetiCoin.blacklistAddress(user1);
        
        vm.prank(owner);
        vm.expectEmit(true, false, false, false);
        emit AddressUnblacklisted(user1);
        helvetiCoin.unblacklistAddress(user1);
        
        assertFalse(helvetiCoin.blacklisted(user1));
    }

    function testFailTransferToBlacklisted() public {
        uint256 mintAmount = 1000 * 10**18;
        uint256 transferAmount = 100 * 10**18;
        
        vm.prank(owner);
        helvetiCoin.mint(user1, mintAmount);
        
        vm.prank(owner);
        helvetiCoin.blacklistAddress(user2);
        
        vm.prank(user1);
        helvetiCoin.transfer(user2, transferAmount);
    }

    function testFailTransferFromBlacklisted() public {
        uint256 mintAmount = 1000 * 10**18;
        uint256 transferAmount = 100 * 10**18;
        
        vm.prank(owner);
        helvetiCoin.mint(user1, mintAmount);
        
        vm.prank(owner);
        helvetiCoin.blacklistAddress(user1);
        
        vm.prank(user1);
        helvetiCoin.transfer(user2, transferAmount);
    }

    function testPause() public {
        uint256 mintAmount = 1000 * 10**18;
        uint256 transferAmount = 100 * 10**18;
        
        vm.prank(owner);
        helvetiCoin.mint(user1, mintAmount);
        
        vm.prank(owner);
        helvetiCoin.pause();
        
        vm.prank(user1);
        vm.expectRevert();
        helvetiCoin.transfer(user2, transferAmount);
    }

    function testUnpause() public {
        uint256 mintAmount = 1000 * 10**18;
        uint256 transferAmount = 100 * 10**18;
        
        vm.prank(owner);
        helvetiCoin.mint(user1, mintAmount);
        
        vm.prank(owner);
        helvetiCoin.pause();
        
        vm.prank(owner);
        helvetiCoin.unpause();
        
        vm.prank(user1);
        helvetiCoin.transfer(user2, transferAmount);
        
        assertEq(helvetiCoin.balanceOf(user2), transferAmount);
    }

    // Fuzz tests
    function testFuzzMint(uint256 amount) public {
        vm.assume(amount > 0 && amount <= MAX_SUPPLY);
        
        vm.prank(owner);
        helvetiCoin.mint(user1, amount);
        
        assertEq(helvetiCoin.balanceOf(user1), amount);
        assertEq(helvetiCoin.totalSupply(), amount);
    }

    function testFuzzTransfer(uint256 mintAmount, uint256 transferAmount) public {
        vm.assume(mintAmount > 0 && mintAmount <= MAX_SUPPLY);
        vm.assume(transferAmount > 0 && transferAmount <= mintAmount);
        
        vm.prank(owner);
        helvetiCoin.mint(user1, mintAmount);
        
        vm.prank(user1);
        helvetiCoin.transfer(user2, transferAmount);
        
        assertEq(helvetiCoin.balanceOf(user1), mintAmount - transferAmount);
        assertEq(helvetiCoin.balanceOf(user2), transferAmount);
    }

    function testFuzzBurn(uint256 mintAmount, uint256 burnAmount) public {
        vm.assume(mintAmount > 0 && mintAmount <= MAX_SUPPLY);
        vm.assume(burnAmount > 0 && burnAmount <= mintAmount);
        
        vm.prank(owner);
        helvetiCoin.mint(user1, mintAmount);
        
        vm.prank(user1);
        helvetiCoin.burn(burnAmount);
        
        assertEq(helvetiCoin.balanceOf(user1), mintAmount - burnAmount);
        assertEq(helvetiCoin.totalSupply(), mintAmount - burnAmount);
    }
}