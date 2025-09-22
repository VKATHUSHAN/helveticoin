# Etherscan Token Information Guide

This directory contains files for updating HelvetiCoin (HCHF-MEME) token information on Etherscan.

## About Etherscan Integration

Etherscan is the leading Ethereum blockchain explorer. Having complete and accurate token information on Etherscan is crucial for:
- Building trust with users and investors
- Improving token discoverability
- Providing transparency about your project
- Meeting listing requirements for other platforms

## Files in This Directory

- `token-profile.json` - Complete token information for Etherscan submission
- `README.md` - This guide

## Update Process

### Step 1: Deploy and Verify Contract

1. **Deploy Contract**: Deploy HCHF-MEME token to Ethereum mainnet
2. **Verify Source Code**: Use Etherscan's contract verification feature
3. **Note Details**: Record contract address, deployment transaction, and block number

### Step 2: Update Token Profile

Update `token-profile.json` with actual deployment information:

```json
{
  "contractAddress": "YOUR_ACTUAL_CONTRACT_ADDRESS",
  "verification": {
    "sourceCodeVerified": true,
    "contractCreator": "YOUR_DEPLOYER_ADDRESS",
    "deploymentTxHash": "YOUR_DEPLOYMENT_TX_HASH",
    "deploymentBlock": YOUR_DEPLOYMENT_BLOCK_NUMBER
  }
}
```

### Step 3: Submit Token Information

#### Option A: Etherscan Update Form
1. Go to your token's Etherscan page
2. Look for "Update Token Information" link
3. Fill out the form with information from `token-profile.json`
4. Upload logo (256x256 PNG)
5. Submit for review

#### Option B: Email Submission
1. Email: `support@etherscan.io`
2. Subject: "Token Information Update - HelvetiCoin (HCHF-MEME)"
3. Include all information from `token-profile.json`
4. Attach logo file
5. Provide proof of ownership (signed message from contract deployer)

### Step 4: Logo Requirements

- **Dimensions**: 256x256 pixels (exactly)
- **Format**: PNG with transparent background
- **File Size**: Under 100KB
- **Quality**: High resolution, professional appearance
- **Content**: Swiss cow mascot clearly visible
- **Branding**: Consistent with other platform submissions

## Information to Update

### Basic Information
- [ ] **Contract Address**: Replace placeholder with actual address
- [ ] **Token Name**: HelvetiCoin
- [ ] **Symbol**: HCHF-MEME
- [ ] **Decimals**: 18
- [ ] **Description**: Swiss cow meme token description

### Links and Social Media
- [ ] **Website**: https://helveticoin.swiss
- [ ] **Twitter**: https://twitter.com/helveticoin_ch
- [ ] **Telegram**: https://t.me/helveticoin_official
- [ ] **Discord**: https://discord.gg/helveticoin
- [ ] **GitHub**: https://github.com/VKATHUSHAN/helveticoin
- [ ] **Email**: contact@helveticoin.swiss

### Verification Information
- [ ] **Source Code**: Must be verified on Etherscan
- [ ] **Contract Creator**: Deployer wallet address
- [ ] **Deployment TX**: Transaction hash of deployment
- [ ] **Deployment Block**: Block number of deployment

## Pre-Submission Checklist

### Contract Requirements
- [ ] Contract deployed to Ethereum mainnet
- [ ] Source code verified on Etherscan
- [ ] Contract is publicly accessible
- [ ] Token functions work correctly (transfer, approve, etc.)

### Information Accuracy
- [ ] All URLs are working and point to official resources
- [ ] Social media accounts are active and official
- [ ] Logo meets size and quality requirements
- [ ] Description accurately represents the project

### Documentation
- [ ] Contract has clear comments and documentation
- [ ] Token mechanics are well explained
- [ ] Project information is comprehensive
- [ ] Links to additional resources are provided

## Common Issues & Solutions

**Logo Not Updating:**
- Ensure exact 256x256 pixel dimensions
- Use PNG format with transparent background
- Keep file size under 100KB
- Wait 24-48 hours for updates to appear

**Information Not Showing:**
- Verify contract address is correct
- Ensure source code is verified
- Check that all required fields are filled
- Contact Etherscan support if needed

**Verification Failed:**
- Double-check contract address
- Ensure you're the contract deployer
- Provide signed message for proof of ownership
- Include deployment transaction hash

## Review Process

- **Timeline**: 1-5 business days
- **Requirements**: All information must be accurate
- **Verification**: Etherscan verifies ownership and authenticity
- **Updates**: Changes may take 24-48 hours to appear

## Benefits of Complete Profile

### For Users
- Easy access to official project information
- Verified social media links
- Clear token description and purpose
- Professional appearance builds trust

### For Project
- Improved discoverability
- Higher credibility and trust
- Better user experience
- Meeting requirements for other platform listings

## Advanced Features

### Contract Labels
- Request custom labels for your contract
- Helps users identify official contracts
- Reduces confusion with copy-cat tokens

### Analytics Integration
- Etherscan provides token analytics
- Holder distribution charts
- Transfer history and volume
- Price information (if available)

## Resources

- [Etherscan Token Update Form](https://etherscan.io/contactus)
- [Etherscan Developer APIs](https://docs.etherscan.io/)
- [Contract Verification Guide](https://etherscan.io/verifyContract)

---

*Ensure all information is accurate before submission. False information may result in rejection.*