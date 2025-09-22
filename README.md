# HelvetiCoin (HCHF) 🇨🇭

**Swiss-Minted Stability on Ethereum & Tron**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contracts CI](https://github.com/VKATHUSHAN/helveticoin/workflows/Smart%20Contracts%20CI%2FCD/badge.svg)](https://github.com/VKATHUSHAN/helveticoin/actions)
[![Frontend CI](https://github.com/VKATHUSHAN/helveticoin/workflows/Frontend%20CI%2FCD/badge.svg)](https://github.com/VKATHUSHAN/helveticoin/actions)
[![Python Scripts CI](https://github.com/VKATHUSHAN/helveticoin/workflows/Python%20Scripts%20CI%2FCD/badge.svg)](https://github.com/VKATHUSHAN/helveticoin/actions)

HelvetiCoin (HCHF) is a Swiss Franc-pegged stablecoin that brings the precision and reliability of Swiss financial engineering to the blockchain ecosystem. Built with professional-grade security and compliance features, HCHF serves as a bridge between traditional Swiss banking and decentralized finance.

## 🌟 Features

- **🏦 Swiss Franc Pegged**: Maintains 1:1 parity with CHF through audited reserves
- **🔒 Bank-Grade Security**: Built with OpenZeppelin contracts and comprehensive testing
- **⚖️ Regulatory Compliant**: Designed for Swiss and international regulatory standards
- **🌐 Multi-Chain**: Available on Ethereum and Tron networks
- **🔍 Transparent**: Regular Proof of Reserves attestations and open-source code
- **🌍 Multi-Language**: Supports 6 languages (EN, NL, FR, IT, TA, ES)

## 🏗️ Repository Structure

```
helveticoin/
├── contracts/              # Smart contracts (Solidity)
│   ├── src/                # Contract source files
│   ├── test/               # Test suites (Hardhat & Foundry)
│   ├── scripts/            # Deployment scripts
│   └── README.md           # Contract documentation
├── ui/                     # Next.js frontend application
│   ├── src/                # Application source code
│   ├── public/             # Static assets and branding
│   └── public/locales/     # i18n translation files
├── scripts/                # Python utilities and PoR attestation
│   ├── por_attestation.py  # Proof of Reserves automation
│   ├── requirements.txt    # Python dependencies
│   └── README.md           # Scripts documentation
├── docs/                   # Project documentation
│   └── brand.md            # Brand guidelines
├── .github/                # CI/CD workflows
│   └── workflows/          # GitHub Actions
├── foundry.toml            # Foundry configuration
├── package.json            # Root package configuration
└── .env.sample             # Environment template
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.9+
- **Foundry** (for Solidity development)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/VKATHUSHAN/helveticoin.git
cd helveticoin
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install contract dependencies
cd contracts && npm install && cd ..

# Install UI dependencies
cd ui && npm install && cd ..

# Install Python dependencies
cd scripts && pip install -r requirements.txt && cd ..
```

### 3. Configure Environment

```bash
# Copy environment template
cp .env.sample .env

# Edit .env with your configuration
nano .env  # or your preferred editor
```

### 4. Compile Smart Contracts

```bash
# Using Hardhat
cd contracts && npm run compile

# Using Foundry
forge build
```

### 5. Run Tests

```bash
# Contract tests
cd contracts
npm run test                # Hardhat tests
npm run foundry:test        # Foundry tests

# Frontend development
cd ui
npm run dev                 # Start development server

# Python scripts
cd scripts
python por_attestation.py  # Run PoR attestation
```

## 📖 Technology Stack

### Smart Contracts
- **Solidity** 0.8.24
- **OpenZeppelin** contracts for security
- **Hardhat** for development and testing
- **Foundry** for advanced testing and fuzzing
- **Ethereum** and **Tron** networks

### Frontend
- **Next.js** 15 with TypeScript
- **React** 18+ with modern hooks
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **RainbowKit** + **wagmi** for Web3 integration
- **next-i18next** for internationalization

### Backend & Utilities
- **Python** 3.9+ for automation scripts
- **Web3.py** for blockchain interactions
- **Pandas** for data analysis
- **Cryptography** for report signing
- **FastAPI** for potential API services

### DevOps & CI/CD
- **GitHub Actions** for CI/CD
- **Docker** for containerization
- **Vercel** for frontend deployment
- **ESLint** + **Prettier** for code quality

## 🔧 Development

### Smart Contract Development

```bash
cd contracts

# Compile contracts
npm run compile

# Run tests
npm run test
npm run foundry:test

# Deploy locally
npm run deploy

# Deploy to testnet
npm run deploy:sepolia
```

### Frontend Development

```bash
cd ui

# Start development server
npm run dev

# Build for production
npm run build

# Lint and format
npm run lint
npm run format
```

### Python Scripts

```bash
cd scripts

# Run PoR attestation
python por_attestation.py

# Install in development mode
pip install -e .

# Run tests
pytest tests/
```

## 🌐 Deployment

### Smart Contracts

1. **Testnet Deployment**:
```bash
cd contracts
npm run deploy:sepolia
```

2. **Mainnet Deployment**:
```bash
cd contracts
npm run deploy:mainnet
```

3. **Verification**:
```bash
npm run verify -- --network mainnet <contract-address>
```

### Frontend

1. **Vercel Deployment** (Recommended):
```bash
cd ui
vercel --prod
```

2. **Docker Deployment**:
```bash
docker build -t helveticoin-ui ./ui
docker run -p 3000:3000 helveticoin-ui
```

### Python Scripts

1. **Production Server**:
```bash
cd scripts
pip install -r requirements.txt
python por_attestation.py
```

2. **Cron Jobs** (Automated PoR):
```bash
# Add to crontab for 6-hourly reports
0 */6 * * * cd /path/to/helveticoin/scripts && python por_attestation.py
```

## 🔍 Proof of Reserves

HelvetiCoin implements automated Proof of Reserves attestation:

- **Real-time verification** of reserve balances
- **Multi-chain aggregation** across Ethereum and Tron
- **Cryptographic signatures** for report integrity
- **Automated alerts** for low reserve ratios
- **Public transparency** through regular reporting

Run PoR attestation:
```bash
cd scripts
python por_attestation.py
```

## 🧪 Testing

### Comprehensive Test Coverage

```bash
# Smart contract tests
cd contracts
npm run test              # Unit tests
npm run foundry:test      # Fuzz tests
npm run coverage          # Coverage report

# Frontend tests
cd ui
npm run test              # Component tests
npm run e2e               # End-to-end tests

# Python tests
cd scripts
pytest tests/             # Script tests
```

### Security Testing

```bash
# Static analysis
cd contracts
slither src/

# Gas optimization
forge test --gas-report

# Mutation testing
cd ui
npm run test:mutation
```

## 📊 Monitoring & Analytics

### Metrics Dashboard
- Contract performance metrics
- Transaction volume tracking
- Reserve ratio monitoring
- Network health indicators

### Alerting System
- Low reserve ratio alerts
- Contract anomaly detection
- Network congestion warnings
- Security event notifications

## 🤝 Contributing

We welcome contributions to HelvetiCoin! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- **TypeScript** for frontend code
- **Solidity** best practices for contracts
- **Python** PEP 8 for scripts
- **Comprehensive testing** required
- **Documentation** for new features

## 📋 Roadmap

### Q4 2025 - Foundation & Launch
- [x] Smart contract development and auditing
- [x] Frontend application with multi-language support
- [x] Proof of Reserves automation
- [ ] Security audits and testing
- [ ] Testnet deployment and validation

### Q1 2026 - Mainnet & Ecosystem
- [ ] Mainnet launch on Ethereum
- [ ] DEX listings and liquidity provision
- [ ] DeFi protocol integrations
- [ ] Mobile wallet application
- [ ] Institutional partnerships

### Q2 2026 - Multi-Chain Expansion
- [ ] Tron network deployment
- [ ] Cross-chain bridge implementation
- [ ] Payment gateway integrations
- [ ] Swiss banking partnerships
- [ ] Regulatory compliance certification

### Beyond 2026
- [ ] Additional blockchain networks
- [ ] Advanced DeFi features
- [ ] Enterprise solutions
- [ ] Global expansion

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [helveticoin.swiss](https://helveticoin.swiss)
- **Documentation**: [docs.helveticoin.swiss](https://docs.helveticoin.swiss)
- **Twitter**: [@HelvetiCoin](https://twitter.com/HelvetiCoin)
- **Telegram**: [t.me/helveticoin](https://t.me/helveticoin)
- **Discord**: [discord.gg/helveticoin](https://discord.gg/helveticoin)

## 📞 Contact

- **General**: info@helveticoin.swiss
- **Security**: security@helveticoin.swiss
- **Development**: dev@helveticoin.swiss
- **Partnerships**: partnerships@helveticoin.swiss

## ⚠️ Disclaimer

HelvetiCoin (HCHF) is a digital asset and blockchain project. Cryptocurrency investments carry inherent risks. This software is provided "as is" without warranty. Please conduct your own research and consult with financial advisors before making investment decisions.

---

**Built with Swiss precision for the decentralized world** 🇨🇭⚡
