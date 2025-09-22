# Trust Wallet Asset Submission Guide

This directory contains files for submitting HelvetiCoin (HCHF-MEME) to Trust Wallet's asset repository.

## About Trust Wallet Assets

Trust Wallet maintains a comprehensive asset repository that provides:
- Token logos and information for the Trust Wallet app
- Metadata for DeFi integrations
- Trusted source for token information across the ecosystem

## Repository Structure

Trust Wallet uses a specific folder structure:
```
assets/
└── blockchains/
    └── ethereum/
        └── assets/
            └── 0xYOUR_CONTRACT_ADDRESS/
                ├── info.json
                └── logo.png
```

## Submission Process

### Step 1: Prepare Files

You'll need to prepare:
1. **Logo file**: 256x256 PNG with transparent background
2. **Info JSON**: Token metadata (use `token-info.json` as template)

### Step 2: Update Contract Address

Replace all instances of `0x0000000000000000000000000000000000000000` with your actual contract address:
- In `token-info.json`
- In the folder structure path
- In all links and references

### Step 3: Prepare Logo

**Logo Requirements:**
- **Size**: Exactly 256x256 pixels
- **Format**: PNG
- **Background**: Transparent
- **Quality**: High resolution, clean design
- **File Size**: Under 100KB
- **Design**: Swiss cow mascot prominently featured

### Step 4: Fork Trust Wallet Repository

1. Go to [Trust Wallet Assets Repository](https://github.com/trustwallet/assets)
2. Fork the repository to your GitHub account
3. Clone your fork locally

### Step 5: Add Your Token

1. Navigate to `assets/blockchains/ethereum/assets/`
2. Create folder with your contract address (lowercase, with 0x prefix)
3. Add `logo.png` (copy from `../../assets/logos/png/helveticoin-logo-256.png`)
4. Add `info.json` (use updated `token-info.json`)

Example structure:
```
assets/blockchains/ethereum/assets/0xYOUR_CONTRACT_ADDRESS/
├── info.json
└── logo.png
```

### Step 6: Submit Pull Request

1. **Commit Changes**: Add your files and commit
2. **Push to Fork**: Push changes to your GitHub fork
3. **Create PR**: Submit pull request to Trust Wallet repository
4. **Follow Template**: Use their PR template
5. **Wait for Review**: Automated checks will run first

## Pull Request Template

Use this template for your PR:

```markdown
## Summary
Add HelvetiCoin (HCHF-MEME) - Swiss-themed meme token with cow mascot

**Contract Address:** 0xYOUR_CONTRACT_ADDRESS
**Chain:** Ethereum
**Symbol:** HCHF-MEME

## Checklist
- [x] Contract is deployed and verified on Etherscan
- [x] Token has trading activity and liquidity
- [x] Logo is 256x256 PNG with transparent background
- [x] All information in info.json is accurate
- [x] All links are working and official
- [x] Follows Trust Wallet guidelines

## Additional Information
Swiss-themed meme cryptocurrency featuring a friendly Swiss cow mascot. Active community and growing trading volume.

Website: https://helveticoin.swiss
Etherscan: https://etherscan.io/token/0xYOUR_CONTRACT_ADDRESS
```

## Requirements

### Technical Requirements
- [ ] **Contract Address**: Valid Ethereum contract address
- [ ] **ERC20 Standard**: Must be standard ERC20 token
- [ ] **Verified Contract**: Source code verified on Etherscan
- [ ] **Active Trading**: Some trading activity on DEXs

### Quality Requirements
- [ ] **Professional Logo**: High-quality, recognizable design
- [ ] **Accurate Information**: All metadata must be correct
- [ ] **Working Links**: All URLs must be functional
- [ ] **Official Social Media**: Links must be to official accounts

### Community Requirements
- [ ] **Real Project**: Legitimate project with real community
- [ ] **No Scams**: Not associated with scam or fraudulent activity
- [ ] **Active Development**: Evidence of ongoing development/maintenance

## Review Process

### Automated Checks
Trust Wallet runs automated checks for:
- File format validation
- Image size verification
- JSON structure validation
- Contract address verification
- Duplicate detection

### Manual Review
Reviewers check for:
- Project legitimacy
- Logo quality and appropriateness
- Information accuracy
- Community activity
- Trading volume

### Timeline
- **Automated Checks**: Usually complete within minutes
- **Manual Review**: 1-7 business days
- **Feedback**: May request changes or additional information
- **Approval**: Merge to main repository

## Common Issues & Solutions

**Automated Check Failures:**
- **Logo Size**: Ensure exactly 256x256 pixels
- **File Format**: Must be PNG, not JPG or other formats
- **JSON Errors**: Validate JSON syntax
- **Missing Files**: Both logo.png and info.json required

**Manual Review Issues:**
- **Low Quality Logo**: Improve design and resolution
- **Broken Links**: Fix all non-working URLs
- **Scam Detection**: Provide proof of legitimacy
- **Duplicate Submission**: Check if already submitted

**PR Rejection Reasons:**
- Insufficient trading volume or liquidity
- Poor quality or inappropriate logo
- Fraudulent or scam project
- Incomplete or inaccurate information
- Technical issues with contract

## Best Practices

### Logo Design
- Use consistent branding across all platforms
- Ensure Swiss cow mascot is clearly visible
- Test visibility at different sizes
- Use high contrast colors
- Avoid cluttered designs

### Information Accuracy
- Double-check all contract addresses
- Verify all social media links
- Test website accessibility
- Ensure explorer links work
- Keep contact information current

### Community Building
- Build active community on social platforms
- Encourage organic trading activity
- Maintain professional online presence
- Respond to community questions
- Regular project updates

## After Approval

Once approved:
- Your token will appear in Trust Wallet
- Logo and info will be displayed automatically
- Users can easily add your token
- Integration with other Trust Wallet features
- Increased visibility and credibility

## Resources

- [Trust Wallet Assets Repository](https://github.com/trustwallet/assets)
- [Trust Wallet Developer Documentation](https://developer.trustwallet.com/)
- [Asset Requirements](https://github.com/trustwallet/assets/blob/master/contributing.md)
- [Logo Guidelines](https://github.com/trustwallet/assets/blob/master/contributing.md#logo-requirements)

## Support

If you encounter issues:
- Check [Trust Wallet Assets Issues](https://github.com/trustwallet/assets/issues)
- Review [Contributing Guidelines](https://github.com/trustwallet/assets/blob/master/contributing.md)
- Join [Trust Wallet Community](https://community.trustwallet.com/)

---

*Ensure your contract is deployed and all information is accurate before submission!*