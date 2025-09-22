import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { HelvetiCoin } from "../../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("HelvetiCoin", function () {
  // Fixtures
  async function deployHelvetiCoinFixture() {
    const [owner, minter, user1, user2, blacklisted] = await ethers.getSigners();
    
    const HelvetiCoinFactory = await ethers.getContractFactory("HelvetiCoin");
    const helvetiCoin = await HelvetiCoinFactory.deploy(owner.address) as HelvetiCoin;
    
    return { helvetiCoin, owner, minter, user1, user2, blacklisted };
  }

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      const { helvetiCoin } = await loadFixture(deployHelvetiCoinFixture);
      
      expect(await helvetiCoin.name()).to.equal("HelvetiCoin");
      expect(await helvetiCoin.symbol()).to.equal("HCHF");
    });

    it("Should set the correct decimals", async function () {
      const { helvetiCoin } = await loadFixture(deployHelvetiCoinFixture);
      
      expect(await helvetiCoin.decimals()).to.equal(18);
    });

    it("Should set the correct max supply", async function () {
      const { helvetiCoin } = await loadFixture(deployHelvetiCoinFixture);
      
      const expectedMaxSupply = ethers.parseEther("1000000000"); // 1 billion
      expect(await helvetiCoin.MAX_SUPPLY()).to.equal(expectedMaxSupply);
    });

    it("Should set the owner correctly", async function () {
      const { helvetiCoin, owner } = await loadFixture(deployHelvetiCoinFixture);
      
      expect(await helvetiCoin.owner()).to.equal(owner.address);
    });

    it("Should add owner as initial minter", async function () {
      const { helvetiCoin, owner } = await loadFixture(deployHelvetiCoinFixture);
      
      expect(await helvetiCoin.minters(owner.address)).to.be.true;
    });

    it("Should start with zero total supply", async function () {
      const { helvetiCoin } = await loadFixture(deployHelvetiCoinFixture);
      
      expect(await helvetiCoin.totalSupply()).to.equal(0);
    });
  });

  describe("Minter Management", function () {
    it("Should allow owner to add minter", async function () {
      const { helvetiCoin, owner, minter } = await loadFixture(deployHelvetiCoinFixture);
      
      await expect(helvetiCoin.connect(owner).addMinter(minter.address))
        .to.emit(helvetiCoin, "MinterAdded")
        .withArgs(minter.address);
      
      expect(await helvetiCoin.minters(minter.address)).to.be.true;
    });

    it("Should allow owner to remove minter", async function () {
      const { helvetiCoin, owner, minter } = await loadFixture(deployHelvetiCoinFixture);
      
      await helvetiCoin.connect(owner).addMinter(minter.address);
      
      await expect(helvetiCoin.connect(owner).removeMinter(minter.address))
        .to.emit(helvetiCoin, "MinterRemoved")
        .withArgs(minter.address);
      
      expect(await helvetiCoin.minters(minter.address)).to.be.false;
    });

    it("Should not allow non-owner to add minter", async function () {
      const { helvetiCoin, user1, minter } = await loadFixture(deployHelvetiCoinFixture);
      
      await expect(helvetiCoin.connect(user1).addMinter(minter.address))
        .to.be.revertedWithCustomError(helvetiCoin, "OwnableUnauthorizedAccount");
    });

    it("Should not allow adding zero address as minter", async function () {
      const { helvetiCoin, owner } = await loadFixture(deployHelvetiCoinFixture);
      
      await expect(helvetiCoin.connect(owner).addMinter(ethers.ZeroAddress))
        .to.be.revertedWith("HelvetiCoin: invalid address");
    });
  });

  describe("Minting", function () {
    it("Should allow minter to mint tokens", async function () {
      const { helvetiCoin, owner, user1 } = await loadFixture(deployHelvetiCoinFixture);
      
      const mintAmount = ethers.parseEther("1000");
      
      await expect(helvetiCoin.connect(owner).mint(user1.address, mintAmount))
        .to.emit(helvetiCoin, "TokensMinted")
        .withArgs(user1.address, mintAmount);
      
      expect(await helvetiCoin.balanceOf(user1.address)).to.equal(mintAmount);
      expect(await helvetiCoin.totalSupply()).to.equal(mintAmount);
    });

    it("Should not allow non-minter to mint tokens", async function () {
      const { helvetiCoin, user1, user2 } = await loadFixture(deployHelvetiCoinFixture);
      
      const mintAmount = ethers.parseEther("1000");
      
      await expect(helvetiCoin.connect(user1).mint(user2.address, mintAmount))
        .to.be.revertedWith("HelvetiCoin: caller is not a minter");
    });

    it("Should not allow minting beyond max supply", async function () {
      const { helvetiCoin, owner, user1 } = await loadFixture(deployHelvetiCoinFixture);
      
      const maxSupply = await helvetiCoin.MAX_SUPPLY();
      const exceedingAmount = maxSupply + 1n;
      
      await expect(helvetiCoin.connect(owner).mint(user1.address, exceedingAmount))
        .to.be.revertedWith("HelvetiCoin: exceeds maximum supply");
    });

    it("Should not allow minting to blacklisted address", async function () {
      const { helvetiCoin, owner, blacklisted } = await loadFixture(deployHelvetiCoinFixture);
      
      await helvetiCoin.connect(owner).blacklistAddress(blacklisted.address);
      
      const mintAmount = ethers.parseEther("1000");
      
      await expect(helvetiCoin.connect(owner).mint(blacklisted.address, mintAmount))
        .to.be.revertedWith("HelvetiCoin: account is blacklisted");
    });
  });

  describe("Burning", function () {
    async function deployWithTokensFixture() {
      const fixture = await deployHelvetiCoinFixture();
      const { helvetiCoin, owner, user1 } = fixture;
      
      const mintAmount = ethers.parseEther("1000");
      await helvetiCoin.connect(owner).mint(user1.address, mintAmount);
      
      return { ...fixture, mintAmount };
    }

    it("Should allow token holder to burn tokens", async function () {
      const { helvetiCoin, user1, mintAmount } = await loadFixture(deployWithTokensFixture);
      
      const burnAmount = ethers.parseEther("100");
      
      await expect(helvetiCoin.connect(user1).burn(burnAmount))
        .to.emit(helvetiCoin, "TokensBurned")
        .withArgs(user1.address, burnAmount);
      
      expect(await helvetiCoin.balanceOf(user1.address)).to.equal(mintAmount - burnAmount);
      expect(await helvetiCoin.totalSupply()).to.equal(mintAmount - burnAmount);
    });

    it("Should allow burning with allowance", async function () {
      const { helvetiCoin, user1, user2, mintAmount } = await loadFixture(deployWithTokensFixture);
      
      const burnAmount = ethers.parseEther("100");
      
      await helvetiCoin.connect(user1).approve(user2.address, burnAmount);
      
      await expect(helvetiCoin.connect(user2).burnFrom(user1.address, burnAmount))
        .to.emit(helvetiCoin, "TokensBurned")
        .withArgs(user1.address, burnAmount);
      
      expect(await helvetiCoin.balanceOf(user1.address)).to.equal(mintAmount - burnAmount);
    });
  });

  describe("Blacklisting", function () {
    it("Should allow owner to blacklist address", async function () {
      const { helvetiCoin, owner, user1 } = await loadFixture(deployHelvetiCoinFixture);
      
      await expect(helvetiCoin.connect(owner).blacklistAddress(user1.address))
        .to.emit(helvetiCoin, "AddressBlacklisted")
        .withArgs(user1.address);
      
      expect(await helvetiCoin.blacklisted(user1.address)).to.be.true;
    });

    it("Should prevent blacklisted addresses from receiving transfers", async function () {
      const { helvetiCoin, owner, user1, user2 } = await loadFixture(deployHelvetiCoinFixture);
      
      // Mint tokens and blacklist user2
      await helvetiCoin.connect(owner).mint(user1.address, ethers.parseEther("1000"));
      await helvetiCoin.connect(owner).blacklistAddress(user2.address);
      
      await expect(helvetiCoin.connect(user1).transfer(user2.address, ethers.parseEther("100")))
        .to.be.revertedWith("HelvetiCoin: account is blacklisted");
    });

    it("Should allow owner to unblacklist address", async function () {
      const { helvetiCoin, owner, user1 } = await loadFixture(deployHelvetiCoinFixture);
      
      await helvetiCoin.connect(owner).blacklistAddress(user1.address);
      
      await expect(helvetiCoin.connect(owner).unblacklistAddress(user1.address))
        .to.emit(helvetiCoin, "AddressUnblacklisted")
        .withArgs(user1.address);
      
      expect(await helvetiCoin.blacklisted(user1.address)).to.be.false;
    });
  });

  describe("Pausable", function () {
    it("Should allow owner to pause transfers", async function () {
      const { helvetiCoin, owner, user1, user2 } = await loadFixture(deployHelvetiCoinFixture);
      
      await helvetiCoin.connect(owner).mint(user1.address, ethers.parseEther("1000"));
      await helvetiCoin.connect(owner).pause();
      
      await expect(helvetiCoin.connect(user1).transfer(user2.address, ethers.parseEther("100")))
        .to.be.revertedWithCustomError(helvetiCoin, "EnforcedPause");
    });

    it("Should allow owner to unpause transfers", async function () {
      const { helvetiCoin, owner, user1, user2 } = await loadFixture(deployHelvetiCoinFixture);
      
      await helvetiCoin.connect(owner).mint(user1.address, ethers.parseEther("1000"));
      await helvetiCoin.connect(owner).pause();
      await helvetiCoin.connect(owner).unpause();
      
      await expect(helvetiCoin.connect(user1).transfer(user2.address, ethers.parseEther("100")))
        .to.not.be.reverted;
    });
  });

  describe("Emergency Withdrawal", function () {
    it("Should allow owner to withdraw accidentally sent tokens", async function () {
      const { helvetiCoin, owner, user1 } = await loadFixture(deployHelvetiCoinFixture);
      
      // Deploy a mock ERC20 token
      const MockTokenFactory = await ethers.getContractFactory("HelvetiCoin");
      const mockToken = await MockTokenFactory.deploy(owner.address);
      
      // Mint some mock tokens to the HelvetiCoin contract
      await mockToken.connect(owner).mint(await helvetiCoin.getAddress(), ethers.parseEther("100"));
      
      const contractAddress = await helvetiCoin.getAddress();
      const initialBalance = await mockToken.balanceOf(contractAddress);
      
      await helvetiCoin.connect(owner).emergencyWithdraw(
        await mockToken.getAddress(),
        user1.address,
        initialBalance
      );
      
      expect(await mockToken.balanceOf(user1.address)).to.equal(initialBalance);
      expect(await mockToken.balanceOf(contractAddress)).to.equal(0);
    });

    it("Should not allow withdrawing own tokens", async function () {
      const { helvetiCoin, owner, user1 } = await loadFixture(deployHelvetiCoinFixture);
      
      await expect(helvetiCoin.connect(owner).emergencyWithdraw(
        await helvetiCoin.getAddress(),
        user1.address,
        ethers.parseEther("100")
      )).to.be.revertedWith("HelvetiCoin: cannot withdraw own tokens");
    });
  });
});