# CoinGecko Listing Guide

This directory contains all necessary files and information for submitting HelvetiCoin (HCHF-MEME) to CoinGecko.

## Required Files

- `token-metadata.json` - Complete token information in CoinGecko format
- `logo.png` - Token logo (256x256 PNG, transparent background)

## Submission Process

### Step 1: Pre-Submission Requirements

Before submitting to CoinGecko, ensure you meet these requirements:

- [ ] **Live Contract**: Token deployed and verified on Ethereum mainnet
- [ ] **Trading Activity**: Active trading on at least one DEX (Uniswap, SushiSwap, etc.)
- [ ] **Liquidity**: Minimum $5,000 USD in liquidity
- [ ] **Website**: Professional website with project information
- [ ] **Community**: Active community (Telegram/Discord with 100+ members)

### Step 2: Update Contract Information

1. Deploy your token contract to Ethereum mainnet
2. Update the contract address in `token-metadata.json`:
   - Replace all instances of `0x0000000000000000000000000000000000000000`
   - Update the `platforms.ethereum` field
   - Update the `detail_platforms.ethereum.contract_address` field

### Step 3: Prepare Logo

1. Copy `../../assets/logos/png/helveticoin-logo-256.png` to this directory as `logo.png`
2. Verify logo requirements:
   - 256x256 pixels
   - PNG format with transparent background
   - File size under 1MB
   - High quality, professional appearance

### Step 4: Update Metadata

Review and update `token-metadata.json`:

- [ ] **Contract addresses**: Replace placeholder addresses
- [ ] **Website URL**: Update homepage links
- [ ] **Social media**: Update Twitter, Telegram, Discord handles
- [ ] **Description**: Customize if needed
- [ ] **Links**: Verify all URLs are correct and active

### Step 5: Submit to CoinGecko

1. Go to [CoinGecko's Request Form](https://www.coingecko.com/en/coins/new)
2. Fill out the submission form:
   - **Token Name**: HelvetiCoin
   - **Symbol**: HCHF-MEME
   - **Contract Address**: Your deployed contract address
   - **Website**: https://helveticoin.swiss
   - **Logo**: Upload the prepared logo file
3. Provide additional information from `token-metadata.json`
4. Request listing and wait for review

### Step 6: Post-Submission

- Review typically takes 3-7 business days
- CoinGecko may request additional information
- Respond promptly to any queries
- Monitor your email for updates

## Listing Requirements

### Minimum Requirements
- **Trading Volume**: $1,000+ daily trading volume
- **Liquidity**: $5,000+ in liquidity pools
- **Age**: Token should be live for at least 3 days
- **Verification**: Contract must be verified on Etherscan

### Recommended Requirements
- **Volume**: $10,000+ daily trading volume
- **Liquidity**: $50,000+ in liquidity pools
- **Community**: 500+ active community members
- **Social Presence**: Active Twitter with 1,000+ followers

## Quality Guidelines

### Logo Requirements
- Clean, professional design
- Recognizable at small sizes
- Transparent background
- No text smaller than 12px
- Swiss cow mascot clearly visible

### Metadata Quality
- Accurate contract information
- Professional project description
- Active and working links
- Consistent branding across platforms

## Common Issues & Solutions

**Logo Rejected:**
- Ensure 256x256 resolution exactly
- Use transparent PNG background
- Make Swiss cow mascot more prominent
- Avoid text that's too small to read

**Insufficient Trading Activity:**
- Add liquidity to major DEXs
- Encourage community trading
- List on multiple DEX platforms
- Wait for organic volume growth

**Website Issues:**
- Ensure website is professional and complete
- Include tokenomics information
- Add team/project information
- Implement SSL certificate

**Community Requirements:**
- Build active Telegram/Discord communities
- Engage regularly with community
- Share updates and project progress
- Organize community events

## Additional Resources

- [CoinGecko Listing Criteria](https://www.coingecko.com/en/methodology)
- [CoinGecko API Documentation](https://www.coingecko.com/en/api/documentation)
- [How to Get Listed on CoinGecko](https://blog.coingecko.com/how-to-get-your-cryptocurrency-listed-on-coingecko/)

---

*Remember to update all placeholder information before submission!*