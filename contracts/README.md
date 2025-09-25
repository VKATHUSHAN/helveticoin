# HelvetiCoin Smart Contracts

This directory contains the smart contracts for HelvetiCoin (HCHF), a Swiss Franc-pegged stablecoin built on Ethereum.

## Overview

HelvetiCoin is an ERC20 token with the following features:

- **Symbol**: HCHF
- **Name**: HelvetiCoin
- **Decimals**: 18
- **Max Supply**: 1,000,000,000 HCHF
- **Mintable**: Yes (by authorized minters)
- **Burnable**: Yes
- **Pausable**: Yes (emergency situations)
- **Blacklistable**: Yes (compliance features)

## Contract Features

### Core ERC20 Functionality
- Standard ERC20 implementation using OpenZeppelin contracts
- Transfer, approve, and allowance functions
- 18 decimal precision for maximum compatibility

### Minting System
- Role-based minting controlled by authorized addresses
- Maximum supply cap of 1 billion tokens
- Event logging for all minting operations

### Security Features
- **Pausable**: Emergency pause functionality for all transfers
- **Blacklisting**: Ability to restrict specific addresses
- **Reentrancy Protection**: Guards against reentrancy attacks
- **Ownable**: Administrative control with ownership transfer capability

### Compliance & Safety
- Address validation for all critical operations
- Event logging for audit trails
- Emergency withdrawal for accidentally sent tokens
- Safe math operations using OpenZeppelin's SafeMath

## Development Setup

### Dependencies

```bash
npm install
```

### Compilation

```bash
# Using Hardhat
npm run compile

# Using Foundry
npm run foundry:build
```

### Testing

```bash
# Run all tests with Hardhat
npm run test

# Run tests with Foundry
npm run foundry:test

# Run with coverage
npm run coverage
```

### Deployment

```bash
# Deploy to local network
npm run deploy

# Deploy to Sepolia testnet
npm run deploy:sepolia

# Deploy to mainnet
npm run deploy:mainnet
```

### Verification

```bash
# Verify contract on Etherscan
npm run verify --network <network> <contract-address>
```

## Testing Framework

The project uses both Hardhat and Foundry for comprehensive testing:

- **Hardhat Tests** (`test/hardhat/`): TypeScript-based integration tests
- **Foundry Tests** (`test/foundry/`): Solidity-based unit and fuzz tests

## Security Considerations

### Access Control
- Owner can add/remove minters
- Owner can pause/unpause transfers
- Owner can blacklist/unblacklist addresses
- Minters can mint tokens (within supply cap)

### Emergency Features
- Pause functionality for emergency situations
- Blacklist functionality for compliance
- Emergency token withdrawal for accidentally sent assets

### Best Practices
- All external calls are protected against reentrancy
- Input validation on all public functions
- Comprehensive event logging
- Safe arithmetic operations

## Gas Optimization

The contract is optimized for gas efficiency:
- Uses OpenZeppelin's battle-tested implementations
- Minimal storage operations
- Efficient modifier usage
- Optimized compiler settings

## Audit Recommendations

Before mainnet deployment, consider:
1. Professional security audit
2. Comprehensive test coverage (>95%)
3. Testnet deployment and testing
4. Multi-signature wallet for ownership
5. Timelock for critical operations

## Contract Addresses

### Mainnet
- Contract Address: `TBD`
- Owner: `TBD`
- Initial Minter: `TBD`

### Testnet (Sepolia)
- Contract Address: `TBD`
- Owner: `TBD`
- Initial Minter: `TBD`

## Support

For technical questions or security reports:
- Email: security@helveticoin.swiss
- Documentation: [docs.helveticoin.swiss](https://docs.helveticoin.swiss)
- GitHub Issues: [github.com/VKATHUSHAN/helveticoin/issues](https://github.com/VKATHUSHAN/helveticoin/issues)