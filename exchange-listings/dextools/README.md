# DEXTools Integration Guide

This directory contains files and information for integrating HelvetiCoin (HCHF-MEME) with DEXTools.

## About DEXTools

DEXTools is a trading platform and analytics tool for decentralized exchanges. It provides real-time trading data, charts, and pair information for tokens traded on DEXs like Uniswap.

## Integration Process

### Step 1: Deploy and Add Liquidity

1. **Deploy Contract**: Deploy your HCHF-MEME token to Ethereum mainnet
2. **Update Addresses**: Replace `0x0000000000000000000000000000000000000000` in `token-info.json`
3. **Add Liquidity**: Create a liquidity pool on Uniswap V2/V3
4. **Get Pair Address**: Note the pair contract address from the DEX

### Step 2: Automatic Discovery

DEXTools automatically discovers new tokens when they:
- Have liquidity on supported DEXs (Uniswap, SushiSwap, etc.)
- Meet minimum liquidity requirements (~$1,000 USD)
- Have trading activity

### Step 3: Update Token Information

Once discovered, you can update token information:

1. **Logo Submission**: Submit logo through DEXTools interface
2. **Social Links**: Add social media links
3. **Description**: Update token description
4. **Website**: Add official website link

### Step 4: Enhanced Features

For enhanced features, consider:

- **Trending**: Higher volume and unique holders increase trending chances
- **Hot Pairs**: Active trading makes pairs "hot"
- **Alerts**: Users can set price alerts for your token
- **Favorites**: Users can favorite your token for tracking

## Requirements

### Minimum Requirements
- [ ] **Live Contract**: Deployed on Ethereum mainnet
- [ ] **Liquidity**: At least $1,000 USD in liquidity
- [ ] **DEX Listing**: Trading pair on Uniswap/SushiSwap
- [ ] **Trading Activity**: Some buy/sell transactions

### Recommended Requirements
- [ ] **Higher Liquidity**: $10,000+ USD for better visibility
- [ ] **Multiple Pairs**: ETH/HCHF-MEME and USDC/HCHF-MEME pairs
- [ ] **Active Trading**: Regular trading activity
- [ ] **Community**: Active holders and traders

## Token Information Update

### Via DEXTools Interface
1. Visit your token page on DEXTools
2. Click "Update Token Info" (if available)
3. Fill out the form with correct information
4. Upload logo (256x256 PNG)
5. Submit for review

### Information to Update
- [ ] **Token Name**: HelvetiCoin
- [ ] **Symbol**: HCHF-MEME
- [ ] **Description**: Swiss cow meme token description
- [ ] **Website**: https://helveticoin.swiss
- [ ] **Logo**: Swiss cow mascot logo
- [ ] **Social Links**: Twitter, Telegram, Discord

## Logo Requirements

- **Size**: 256x256 pixels
- **Format**: PNG with transparent background
- **Quality**: High resolution, professional appearance
- **Theme**: Swiss cow mascot clearly visible
- **File Size**: Under 500KB

## Tracking and Analytics

DEXTools provides:
- **Price Charts**: Real-time price data
- **Volume Analytics**: Trading volume statistics  
- **Holder Analytics**: Number of holders and distribution
- **Pair Information**: All trading pairs and liquidity
- **Transaction History**: Recent buy/sell transactions

## Advanced Features

### Pool Explorer
- View detailed liquidity pool information
- Track liquidity changes over time
- Monitor pool composition

### Trending Algorithm
Factors that help trending:
- Trading volume (24h)
- Unique buyers/sellers
- Price volatility
- Social media mentions
- Overall market activity

### Favorites and Alerts
Users can:
- Add HCHF-MEME to favorites
- Set price alerts
- Get notifications for significant events
- Track portfolio performance

## Troubleshooting

**Token Not Appearing:**
- Ensure sufficient liquidity ($1,000+ USD)
- Verify trading activity exists
- Check if pair is on supported DEX
- Wait 24-48 hours for indexing

**Incorrect Information:**
- Update through DEXTools interface
- Contact DEXTools support if needed
- Ensure all links are working
- Verify logo meets requirements

**Low Visibility:**
- Increase trading volume
- Add more liquidity
- Encourage community trading
- Create multiple trading pairs

## Important Notes

- DEXTools updates automatically based on blockchain data
- Token information updates may take 24-48 hours
- Logo submissions require manual approval
- Social links must be active and official
- Ensure all URLs in `token-info.json` are correct before deployment

## Resources

- [DEXTools Official Website](https://www.dextools.io/)
- [DEXTools Help Center](https://help.dextools.io/)
- [DEXTools Telegram](https://t.me/DEXToolsApp)

---

*Update all placeholder addresses before going live!*