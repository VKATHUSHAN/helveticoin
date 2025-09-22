# HelvetiCoin Python Scripts

This directory contains Python utilities and automation scripts for the HelvetiCoin (HCHF) ecosystem.

## Overview

The scripts in this directory provide essential functionality for:

- **Proof of Reserves (PoR)**: Automated verification and reporting of token reserves
- **Monitoring & Alerting**: Real-time monitoring of contract health and performance
- **Administrative Tools**: Contract management and operational utilities
- **Compliance Reporting**: Regulatory compliance and audit trail generation

## Requirements

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Or for development:

```bash
pip install -r requirements.txt
python -m pip install --upgrade pip
```

## Scripts

### 1. Proof of Reserves (`por_attestation.py`)

**Purpose**: Automated verification of HelvetiCoin reserves across multiple blockchain networks.

**Features**:
- Multi-chain balance verification (Ethereum, Polygon, Tron)
- Cryptographic report signing for integrity
- Automated alert generation for low reserves
- CSV and JSON report exports
- Real-time monitoring integration

**Usage**:
```bash
python por_attestation.py
```

**Configuration**:
Set the following environment variables in your `.env` file:
```bash
# RPC Endpoints
MAINNET_RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
POLYGON_RPC_URL=https://polygon-mainnet.infura.io/v3/YOUR_PROJECT_ID
TRON_RPC_URL=https://api.trongrid.io

# Contract Addresses
HELVETICOIN_MAINNET_ADDRESS=0x...
HELVETICOIN_POLYGON_ADDRESS=0x...
HELVETICOIN_TRON_ADDRESS=TR...

# Reserve Addresses (configure securely)
RESERVE_ADDRESS_1=0x...
RESERVE_ADDRESS_2=0x...
RESERVE_ADDRESS_TRON=TR...

# Signing Key (optional, for report authentication)
POR_SIGNING_KEY_PATH=por_signing_key.pem
POR_SIGNING_KEY_PASSWORD=your_secure_password
```

**Output**:
- `reports/por_report_YYYYMMDD_HHMMSS.json`: Detailed JSON report
- `reports/por_summary_YYYYMMDD_HHMMSS.csv`: CSV summary for analysis
- Console output with real-time status

### 2. Contract Monitor (`contract_monitor.py`)

**Purpose**: Continuous monitoring of HelvetiCoin contract health and events.

**Features**:
- Real-time event monitoring
- Gas price tracking
- Transaction failure detection
- Performance metrics collection
- Webhook notifications

**Usage**:
```bash
python contract_monitor.py --network mainnet --interval 60
```

### 3. Admin Tools (`admin_tools.py`)

**Purpose**: Administrative utilities for contract management.

**Features**:
- Batch operations for minting/burning
- Multi-signature wallet interactions
- Emergency pause/unpause controls
- Blacklist management
- Ownership transfers

**Usage**:
```bash
python admin_tools.py --action mint --amount 100000 --recipient 0x...
```

## Security Considerations

### Environment Variables
- Never commit actual private keys or API keys to version control
- Use environment files (`.env`) for sensitive configuration
- Consider using AWS Secrets Manager or similar for production

### Private Key Management
- For production systems, use Hardware Security Modules (HSMs)
- Implement multi-signature controls for critical operations
- Regular key rotation and access audits

### Network Security
- Use VPN or private networks for sensitive operations
- Implement rate limiting and DDoS protection
- Monitor for unusual network activity

## Development Setup

1. **Create Virtual Environment**:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install Dependencies**:
```bash
pip install -r requirements.txt
```

3. **Configure Environment**:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Run Tests**:
```bash
pytest tests/
```

## Production Deployment

### Docker Deployment
```bash
# Build container
docker build -t helveticoin-scripts .

# Run PoR script
docker run --env-file .env helveticoin-scripts python por_attestation.py
```

### Cron Jobs
For automated reporting, add to your crontab:
```bash
# Run PoR report every 6 hours
0 */6 * * * cd /path/to/helveticoin && python scripts/por_attestation.py

# Daily contract health check
0 9 * * * cd /path/to/helveticoin && python scripts/contract_monitor.py --report-only
```

### Monitoring Integration
The scripts support integration with:
- **Prometheus**: Metrics export for monitoring
- **Grafana**: Dashboard visualization
- **PagerDuty**: Alert management
- **Slack/Discord**: Notification webhooks
- **Email**: SMTP notifications

## Report Formats

### JSON Report Structure
```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "total_reserves": 1750000.0,
  "total_token_supply": 1500000.0,
  "reserve_ratio": 116.67,
  "balances": [
    {
      "address": "0x123...",
      "network": "mainnet",
      "balance": 15.5,
      "token_balance": 1000000.0,
      "timestamp": "2024-01-15T10:30:00Z",
      "block_number": 18950000
    }
  ],
  "signature": "abc123...",
  "report_hash": "def456..."
}
```

### CSV Export Fields
- `address`: Reserve wallet address
- `network`: Blockchain network (mainnet, polygon, tron)
- `native_balance`: Native token balance (ETH, MATIC, TRX)
- `token_balance`: HCHF token balance
- `timestamp`: Report generation time
- `block_number`: Block height at time of check

## Troubleshooting

### Common Issues

1. **Network Connection Errors**:
   - Verify RPC endpoint URLs
   - Check firewall and proxy settings
   - Ensure API rate limits aren't exceeded

2. **Contract Address Issues**:
   - Verify contract addresses are correct
   - Ensure contracts are deployed on target networks
   - Check contract ABI compatibility

3. **Permission Errors**:
   - Verify file system permissions for report directory
   - Check environment variable access
   - Ensure proper Python virtual environment

### Debug Mode
Enable debug logging:
```bash
export LOG_LEVEL=DEBUG
python por_attestation.py
```

## Contributing

1. Follow PEP 8 style guidelines
2. Add type hints to all functions
3. Include comprehensive docstrings
4. Write unit tests for new functionality
5. Update this README for new scripts

## Support

For technical support or questions:
- Email: dev@helveticoin.swiss
- GitHub Issues: [helveticoin/issues](https://github.com/VKATHUSHAN/helveticoin/issues)
- Documentation: [docs.helveticoin.swiss](https://docs.helveticoin.swiss)

## License

This code is licensed under the MIT License. See the root LICENSE file for details.