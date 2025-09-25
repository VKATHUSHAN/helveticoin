// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title HelvetiCoin
 * @dev Implementation of the HelvetiCoin (HCHF) token
 * 
 * HelvetiCoin is a Swiss Franc-pegged stablecoin designed for the Ethereum ecosystem.
 * It features:
 * - ERC20 standard compliance
 * - Mintable by authorized addresses
 * - Burnable for deflation control
 * - Pausable for emergency situations
 * - Ownable for administrative control
 * - Reentrancy protection
 * 
 * Symbol: HCHF
 * Name: HelvetiCoin
 * Decimals: 18
 * 
 * @custom:security-contact security@helveticoin.swiss
 */
contract HelvetiCoin is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ReentrancyGuard {
    /// @dev Maximum supply cap (1 billion HCHF)
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18;

    /// @dev Mapping of authorized minters
    mapping(address => bool) public minters;

    /// @dev Mapping of blacklisted addresses
    mapping(address => bool) public blacklisted;

    // Events
    event MinterAdded(address indexed minter);
    event MinterRemoved(address indexed minter);
    event AddressBlacklisted(address indexed account);
    event AddressUnblacklisted(address indexed account);
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);

    // Modifiers
    modifier onlyMinter() {
        require(minters[msg.sender], "HelvetiCoin: caller is not a minter");
        _;
    }

    modifier notBlacklisted(address account) {
        require(!blacklisted[account], "HelvetiCoin: account is blacklisted");
        _;
    }

    modifier validAddress(address account) {
        require(account != address(0), "HelvetiCoin: invalid address");
        _;
    }

    /**
     * @dev Constructor that gives msg.sender all of initial tokens.
     * @param initialOwner The address that will own the contract
     */
    constructor(address initialOwner) ERC20("HelvetiCoin", "HCHF") Ownable(initialOwner) {
        require(initialOwner != address(0), "HelvetiCoin: invalid initial owner");
        
        // Add the initial owner as a minter
        minters[initialOwner] = true;
        emit MinterAdded(initialOwner);
    }

    /**
     * @dev Adds a new minter
     * @param minter The address to add as minter
     */
    function addMinter(address minter) external onlyOwner validAddress(minter) {
        require(!minters[minter], "HelvetiCoin: address is already a minter");
        minters[minter] = true;
        emit MinterAdded(minter);
    }

    /**
     * @dev Removes a minter
     * @param minter The address to remove as minter
     */
    function removeMinter(address minter) external onlyOwner validAddress(minter) {
        require(minters[minter], "HelvetiCoin: address is not a minter");
        minters[minter] = false;
        emit MinterRemoved(minter);
    }

    /**
     * @dev Mints new tokens
     * @param to The address to mint tokens to
     * @param amount The amount of tokens to mint
     */
    function mint(address to, uint256 amount) 
        external 
        onlyMinter 
        validAddress(to) 
        notBlacklisted(to) 
        nonReentrant 
    {
        require(totalSupply() + amount <= MAX_SUPPLY, "HelvetiCoin: exceeds maximum supply");
        require(amount > 0, "HelvetiCoin: amount must be greater than 0");
        
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    /**
     * @dev Burns tokens from the caller's account
     * @param amount The amount of tokens to burn
     */
    function burn(uint256 amount) public override nonReentrant {
        require(amount > 0, "HelvetiCoin: amount must be greater than 0");
        super.burn(amount);
        emit TokensBurned(msg.sender, amount);
    }

    /**
     * @dev Burns tokens from a specified account (requires allowance)
     * @param account The account to burn tokens from
     * @param amount The amount of tokens to burn
     */
    function burnFrom(address account, uint256 amount) public override nonReentrant {
        require(amount > 0, "HelvetiCoin: amount must be greater than 0");
        super.burnFrom(account, amount);
        emit TokensBurned(account, amount);
    }

    /**
     * @dev Blacklists an address
     * @param account The address to blacklist
     */
    function blacklistAddress(address account) external onlyOwner validAddress(account) {
        require(!blacklisted[account], "HelvetiCoin: address is already blacklisted");
        blacklisted[account] = true;
        emit AddressBlacklisted(account);
    }

    /**
     * @dev Removes an address from blacklist
     * @param account The address to remove from blacklist
     */
    function unblacklistAddress(address account) external onlyOwner validAddress(account) {
        require(blacklisted[account], "HelvetiCoin: address is not blacklisted");
        blacklisted[account] = false;
        emit AddressUnblacklisted(account);
    }

    /**
     * @dev Pauses all token transfers
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpauses all token transfers
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Override transfer to include blacklist check
     */
    function transfer(address to, uint256 amount) 
        public 
        override 
        notBlacklisted(msg.sender) 
        notBlacklisted(to) 
        returns (bool) 
    {
        return super.transfer(to, amount);
    }

    /**
     * @dev Override transferFrom to include blacklist check
     */
    function transferFrom(address from, address to, uint256 amount) 
        public 
        override 
        notBlacklisted(from) 
        notBlacklisted(to) 
        returns (bool) 
    {
        return super.transferFrom(from, to, amount);
    }

    /**
     * @dev Required override for ERC20Pausable
     */
    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }

    /**
     * @dev Returns the number of decimals used to get its user representation
     */
    function decimals() public pure override returns (uint8) {
        return 18;
    }

    /**
     * @dev Emergency withdrawal function for accidentally sent tokens
     * @param token The token contract address
     * @param to The address to send tokens to
     * @param amount The amount of tokens to withdraw
     */
    function emergencyWithdraw(IERC20 token, address to, uint256 amount) 
        external 
        onlyOwner 
        validAddress(to) 
        nonReentrant 
    {
        require(address(token) != address(this), "HelvetiCoin: cannot withdraw own tokens");
        token.transfer(to, amount);
    }
}