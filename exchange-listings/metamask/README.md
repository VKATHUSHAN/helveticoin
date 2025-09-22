# MetaMask Token List Integration Guide

This directory contains files for adding HelvetiCoin (HCHF-MEME) to MetaMask token lists.

## About MetaMask Token Lists

MetaMask uses token lists to provide users with trusted token information. When your token is on a reputable token list, users can:
- See your token logo and name automatically
- Add your token without manual contract entry
- Trust that the token information is accurate

## Integration Options

### Option 1: Major Token Lists

Submit to established token lists:

#### Uniswap Default Token List
- **Repository**: [Uniswap Token Lists](https://github.com/Uniswap/default-token-list)
- **Requirements**: High volume, established project
- **Process**: Submit PR to the repository

#### CoinGecko Token List
- **Source**: Automatically populated from CoinGecko
- **Requirement**: Get listed on CoinGecko first
- **Benefit**: Automatic inclusion once CoinGecko listed

### Option 2: Community Token Lists

#### 1inch Token List
- **Repository**: [1inch Token List](https://github.com/1inch/token-list)
- **Focus**: DeFi tokens with good liquidity
- **Process**: Submit PR with token information

#### Sushiswap Token List
- **Repository**: [SushiSwap Token List](https://github.com/sushiswap/default-token-list)
- **Focus**: Tokens with SushiSwap liquidity
- **Process**: Submit PR to add token

### Option 3: Custom Token List

Create your own token list for community use:

1. **Create Token List**: Use the provided `token-metadata.json` as base
2. **Host Publicly**: Host on GitHub Pages or IPFS
3. **Share with Community**: Users can add your custom list URL
4. **MetaMask Integration**: Users add via MetaMask settings

## Submission Process

### Step 1: Prepare Requirements

Before submitting to any token list:

- [ ] **Live Contract**: Deployed on Ethereum mainnet
- [ ] **Trading Activity**: Active trading on DEXs
- [ ] **Liquidity**: Sufficient liquidity ($10,000+ recommended)
- [ ] **Verification**: Contract verified on Etherscan
- [ ] **Logo**: High-quality 256x256 PNG logo

### Step 2: Update Token Information

Update `token-metadata.json` with your actual contract information:

```json
{
  "address": "YOUR_ACTUAL_CONTRACT_ADDRESS",
  "logoURI": "https://raw.githubusercontent.com/VKATHUSHAN/helveticoin/main/assets/logos/png/helveticoin-logo-256.png",
  "timestamp": "CURRENT_ISO_TIMESTAMP"
}
```

### Step 3: Logo Requirements

Prepare your logo according to standards:

- **Size**: Exactly 256x256 pixels
- **Format**: PNG with transparent background
- **Quality**: High resolution, clean design
- **Hosting**: Publicly accessible URL (GitHub raw, IPFS, etc.)
- **File Size**: Under 100KB recommended
- **Design**: Swiss cow mascot clearly visible

### Step 4: Submit to Token Lists

#### For Uniswap Default List:
1. Fork the [default-token-list repository](https://github.com/Uniswap/default-token-list)
2. Add your token to `src/tokens/mainnet.json`
3. Update the version number
4. Submit a pull request
5. Wait for review (high standards, may be rejected)

#### For Community Lists:
1. Fork the respective repository
2. Add token information in the required format
3. Ensure all links and information are correct
4. Submit pull request with clear description
5. Respond to any feedback promptly

### Step 5: Custom Token List Creation

If creating your own list:

1. **Use Schema**: Follow the token list schema standard
2. **Host File**: Upload to GitHub Pages, Netlify, or IPFS
3. **Test**: Verify the list loads correctly in MetaMask
4. **Share**: Provide the URL to your community

```json
{
  "name": "HelvetiCoin Token List",
  "logoURI": "https://helveticoin.swiss/logo.png",
  "keywords": ["helveticoin", "swiss", "meme"],
  "version": {
    "major": 1,
    "minor": 0,
    "patch": 0
  },
  "tokens": [
    // Your token metadata here
  ]
}
```

## User Instructions

### Adding Token Manually
Users can add HCHF-MEME manually:
1. Open MetaMask
2. Go to "Import tokens"
3. Enter contract address: `YOUR_CONTRACT_ADDRESS`
4. Symbol and decimals should auto-populate
5. Click "Add Custom Token"

### Adding Custom Token List
Users can add your custom token list:
1. Open MetaMask
2. Go to Settings > Networks
3. Select Ethereum Mainnet
4. Scroll to "Token Lists"
5. Add your token list URL
6. Enable the list

## Best Practices

### Token List Standards
- Follow the [Token Lists specification](https://tokenlists.org/)
- Use semantic versioning for updates
- Include all required fields
- Validate JSON format
- Test thoroughly before submission

### Logo Guidelines
- Use consistent branding across all platforms
- Ensure Swiss cow mascot is prominent
- Keep design simple and recognizable
- Test visibility at small sizes
- Use high contrast colors

### Information Accuracy
- Double-check all contract addresses
- Verify all URLs are working
- Ensure social media links are official
- Test logo URL accessibility
- Keep information up-to-date

## Troubleshooting

**Token Not Appearing:**
- Check if contract address is correct
- Verify logo URL is accessible
- Ensure token list is properly formatted
- Wait for MetaMask to update (can take hours)

**Logo Not Loading:**
- Verify image is exactly 256x256 pixels
- Check that URL is publicly accessible
- Ensure HTTPS hosting (not HTTP)
- Test URL in browser directly

**PR Rejected:**
- Review token list requirements carefully
- Ensure sufficient trading volume and liquidity
- Check for any formatting errors
- Respond to maintainer feedback
- Consider alternative token lists

## Resources

- [Token Lists Standard](https://tokenlists.org/)
- [Uniswap Token Lists](https://github.com/Uniswap/default-token-list)
- [MetaMask Token Detection](https://metamask.zendesk.com/hc/en-us/articles/360015489031)
- [EIP-3770: Chain-specific addresses](https://eips.ethereum.org/EIPS/eip-3770)

---

*Update all placeholder addresses and ensure logo hosting before submission!*