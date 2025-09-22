# CoinMarketCap Listing Guide

This directory contains all necessary files and information for submitting HelvetiCoin (HCHF-MEME) to CoinMarketCap.

## Required Files

- `token-info.json` - Complete token metadata
- `logo.png` - Token logo (copy from `../../assets/logos/png/helveticoin-logo-256.png`)

## Submission Process

### Step 1: Prepare Contract Information
1. Deploy your token contract to mainnet
2. Update the contract address in `token-info.json` (replace `0x0000000000000000000000000000000000000000`)
3. Verify the contract on Etherscan

### Step 2: Prepare Logo
1. Copy the 256x256 PNG logo from `../../assets/logos/png/helveticoin-logo-256.png`
2. Rename it to `logo.png` in this directory
3. Ensure it meets CMC requirements:
   - 256x256 pixels
   - PNG format
   - Transparent background
   - File size under 500KB

### Step 3: Submit to CoinMarketCap
1. Go to [CoinMarketCap's Request Form](https://coinmarketcap.com/request/)
2. Fill out the form with information from `token-info.json`
3. Upload the logo file
4. Provide additional links and documentation

### Step 4: Requirements Checklist

Before submitting, ensure you have:

- [ ] **Live Contract**: Deployed and verified on mainnet
- [ ] **Logo**: 256x256 PNG with transparent background
- [ ] **Website**: Official project website
- [ ] **Social Media**: At least one active social media account
- [ ] **Community**: Active community on Telegram/Discord
- [ ] **Trading Volume**: Some trading activity on DEXs
- [ ] **Liquidity**: Adequate liquidity for trading

### Step 5: Post-Submission

- CMC review typically takes 1-7 business days
- Respond promptly to any requests for additional information
- Monitor your submission status through the CMC request system

## Important Notes

- **Contract Address**: Must be updated from placeholder before submission
- **Logo Quality**: Ensure high quality, professional appearance
- **Accuracy**: All information must be accurate and up-to-date
- **Activity**: Token should have some trading activity before listing
- **Compliance**: Ensure your project complies with CMC's listing criteria

## Troubleshooting

**Common Issues:**
- Logo rejected: Ensure 256x256, PNG, transparent background
- Contract verification: Must be verified on Etherscan
- Low volume: Need some DEX trading activity first
- Missing information: Complete all required fields

**Support:**
- Check CMC's official documentation
- Join their Telegram support channel
- Review successful listing examples

## Additional Resources

- [CoinMarketCap Listing Criteria](https://coinmarketcap.com/methodology/)
- [CoinMarketCap API Documentation](https://coinmarketcap.com/api/documentation/v1/)
- [Logo Guidelines](https://coinmarketcap.com/logo-guidelines/)

---

*Update all placeholder addresses and URLs before submission!*