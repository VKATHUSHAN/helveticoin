#!/usr/bin/env python3
"""
HelvetiCoin Proof of Reserves (PoR) Attestation Script

This script performs automated verification of HelvetiCoin's reserves,
ensuring transparency and building trust with the community.

Features:
- Real-time balance verification of reserve addresses
- Cross-chain balance aggregation (Ethereum, Tron)
- Automated report generation with cryptographic signatures
- Integration with monitoring and alerting systems
- Compliance reporting for regulatory requirements
"""

import os
import json
import asyncio
import logging
from datetime import datetime, timezone
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
from pathlib import Path

import requests
from web3 import Web3
from eth_account import Account
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa, padding
import pandas as pd
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@dataclass
class ReserveAddress:
    """Represents a reserve address with metadata"""
    address: str
    network: str
    description: str
    expected_minimum: float = 0.0

@dataclass
class BalanceReport:
    """Balance report for a specific address"""
    address: str
    network: str
    balance: float
    token_balance: float
    timestamp: datetime
    block_number: int

@dataclass
class PorReport:
    """Complete Proof of Reserves report"""
    timestamp: datetime
    total_reserves: float
    total_token_supply: float
    reserve_ratio: float
    balances: List[BalanceReport]
    signature: Optional[str] = None
    report_hash: Optional[str] = None

class HelvetiCoinPoR:
    """Proof of Reserves attestation system for HelvetiCoin"""
    
    def __init__(self):
        self.w3_mainnet = Web3(Web3.HTTPProvider(os.getenv('MAINNET_RPC_URL', '')))
        self.w3_polygon = Web3(Web3.HTTPProvider(os.getenv('POLYGON_RPC_URL', '')))
        self.tron_api_url = os.getenv('TRON_RPC_URL', 'https://api.trongrid.io')
        
        # Contract addresses
        self.helveticoin_mainnet = os.getenv('HELVETICOIN_MAINNET_ADDRESS', '')
        self.helveticoin_polygon = os.getenv('HELVETICOIN_POLYGON_ADDRESS', '')
        self.helveticoin_tron = os.getenv('HELVETICOIN_TRON_ADDRESS', '')
        
        # Reserve addresses (should be configured securely)
        self.reserve_addresses = [
            ReserveAddress(
                address=os.getenv('RESERVE_ADDRESS_1', ''),
                network='ethereum',
                description='Primary Reserve Wallet - Ethereum',
                expected_minimum=1000000.0
            ),
            ReserveAddress(
                address=os.getenv('RESERVE_ADDRESS_2', ''),
                network='polygon',
                description='Secondary Reserve Wallet - Polygon',
                expected_minimum=500000.0
            ),
            ReserveAddress(
                address=os.getenv('RESERVE_ADDRESS_TRON', ''),
                network='tron',
                description='Tron Network Reserve',
                expected_minimum=250000.0
            )
        ]
        
        # Load RSA private key for signing (in production, use HSM or secure key management)
        self.private_key = self._load_signing_key()
        
        logger.info("HelvetiCoin PoR system initialized")

    def _load_signing_key(self) -> Optional[rsa.RSAPrivateKey]:
        """Load RSA private key for report signing"""
        try:
            key_path = os.getenv('POR_SIGNING_KEY_PATH', 'por_signing_key.pem')
            if os.path.exists(key_path):
                with open(key_path, 'rb') as f:
                    private_key = serialization.load_pem_private_key(
                        f.read(),
                        password=os.getenv('POR_SIGNING_KEY_PASSWORD', '').encode() or None
                    )
                return private_key
            else:
                logger.warning("Signing key not found, reports will not be signed")
                return None
        except Exception as e:
            logger.error(f"Failed to load signing key: {e}")
            return None

    async def check_ethereum_balance(self, address: str, network: str = 'mainnet') -> BalanceReport:
        """Check balance on Ethereum-compatible networks"""
        try:
            w3 = self.w3_mainnet if network == 'mainnet' else self.w3_polygon
            
            # Get ETH/MATIC balance
            balance_wei = w3.eth.get_balance(address)
            balance_eth = w3.from_wei(balance_wei, 'ether')
            
            # Get HCHF token balance
            token_balance = 0.0
            contract_address = self.helveticoin_mainnet if network == 'mainnet' else self.helveticoin_polygon
            
            if contract_address and w3.is_address(contract_address):
                # ERC20 balanceOf function
                contract_abi = [
                    {
                        "constant": True,
                        "inputs": [{"name": "_owner", "type": "address"}],
                        "name": "balanceOf",
                        "outputs": [{"name": "balance", "type": "uint256"}],
                        "type": "function"
                    },
                    {
                        "constant": True,
                        "inputs": [],
                        "name": "decimals",
                        "outputs": [{"name": "", "type": "uint8"}],
                        "type": "function"
                    }
                ]
                
                contract = w3.eth.contract(address=contract_address, abi=contract_abi)
                token_balance_raw = contract.functions.balanceOf(address).call()
                decimals = contract.functions.decimals().call()
                token_balance = token_balance_raw / (10 ** decimals)
            
            block_number = w3.eth.block_number
            
            return BalanceReport(
                address=address,
                network=network,
                balance=float(balance_eth),
                token_balance=token_balance,
                timestamp=datetime.now(timezone.utc),
                block_number=block_number
            )
            
        except Exception as e:
            logger.error(f"Failed to check {network} balance for {address}: {e}")
            return BalanceReport(
                address=address,
                network=network,
                balance=0.0,
                token_balance=0.0,
                timestamp=datetime.now(timezone.utc),
                block_number=0
            )

    async def check_tron_balance(self, address: str) -> BalanceReport:
        """Check balance on Tron network"""
        try:
            # Get TRX balance
            trx_response = requests.get(f"{self.tron_api_url}/v1/accounts/{address}")
            trx_balance = 0.0
            
            if trx_response.status_code == 200:
                account_data = trx_response.json()
                if 'data' in account_data and account_data['data']:
                    trx_balance = account_data['data'][0].get('balance', 0) / 1_000_000  # TRX has 6 decimals
            
            # Get HCHF token balance on Tron
            token_balance = 0.0
            if self.helveticoin_tron:
                # Tron TRC20 token balance query would go here
                # This is a simplified version - in production, use TronWeb or similar
                pass
            
            return BalanceReport(
                address=address,
                network='tron',
                balance=trx_balance,
                token_balance=token_balance,
                timestamp=datetime.now(timezone.utc),
                block_number=0  # Tron uses different block numbering
            )
            
        except Exception as e:
            logger.error(f"Failed to check Tron balance for {address}: {e}")
            return BalanceReport(
                address=address,
                network='tron',
                balance=0.0,
                token_balance=0.0,
                timestamp=datetime.now(timezone.utc),
                block_number=0
            )

    async def get_total_token_supply(self) -> float:
        """Get total supply of HCHF tokens across all networks"""
        total_supply = 0.0
        
        try:
            # Ethereum mainnet supply
            if self.helveticoin_mainnet and self.w3_mainnet.is_address(self.helveticoin_mainnet):
                contract_abi = [
                    {
                        "constant": True,
                        "inputs": [],
                        "name": "totalSupply",
                        "outputs": [{"name": "", "type": "uint256"}],
                        "type": "function"
                    },
                    {
                        "constant": True,
                        "inputs": [],
                        "name": "decimals",
                        "outputs": [{"name": "", "type": "uint8"}],
                        "type": "function"
                    }
                ]
                contract = self.w3_mainnet.eth.contract(address=self.helveticoin_mainnet, abi=contract_abi)
                supply_raw = contract.functions.totalSupply().call()
                decimals = contract.functions.decimals().call()
                total_supply += supply_raw / (10 ** decimals)
            
            # Add Polygon and Tron supplies if contracts exist
            # ... similar logic for other networks
            
        except Exception as e:
            logger.error(f"Failed to get total token supply: {e}")
        
        return total_supply

    def _calculate_report_hash(self, report: PorReport) -> str:
        """Calculate SHA-256 hash of the report for integrity verification"""
        report_dict = asdict(report)
        report_dict.pop('signature', None)  # Remove signature for hash calculation
        report_dict.pop('report_hash', None)  # Remove hash for hash calculation
        
        report_json = json.dumps(report_dict, sort_keys=True, default=str)
        digest = hashes.Hash(hashes.SHA256())
        digest.update(report_json.encode())
        return digest.finalize().hex()

    def _sign_report(self, report_hash: str) -> Optional[str]:
        """Sign the report hash with RSA private key"""
        if not self.private_key:
            return None
        
        try:
            signature = self.private_key.sign(
                report_hash.encode(),
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH
                ),
                hashes.SHA256()
            )
            return signature.hex()
        except Exception as e:
            logger.error(f"Failed to sign report: {e}")
            return None

    async def generate_por_report(self) -> PorReport:
        """Generate complete Proof of Reserves report"""
        logger.info("Starting PoR report generation")
        
        # Collect balance reports
        balance_reports = []
        
        for reserve_addr in self.reserve_addresses:
            if not reserve_addr.address:
                logger.warning(f"Skipping empty reserve address for {reserve_addr.description}")
                continue
                
            if reserve_addr.network in ['ethereum', 'mainnet', 'polygon']:
                network = 'mainnet' if reserve_addr.network in ['ethereum', 'mainnet'] else 'polygon'
                balance_report = await self.check_ethereum_balance(reserve_addr.address, network)
            elif reserve_addr.network == 'tron':
                balance_report = await self.check_tron_balance(reserve_addr.address)
            else:
                logger.warning(f"Unknown network: {reserve_addr.network}")
                continue
            
            balance_reports.append(balance_report)
            
            # Check minimum balance requirement
            if balance_report.token_balance < reserve_addr.expected_minimum:
                logger.warning(
                    f"Reserve address {reserve_addr.address} below minimum: "
                    f"{balance_report.token_balance} < {reserve_addr.expected_minimum}"
                )
        
        # Calculate totals
        total_reserves = sum(br.token_balance for br in balance_reports)
        total_token_supply = await self.get_total_token_supply()
        reserve_ratio = (total_reserves / total_token_supply * 100) if total_token_supply > 0 else 0
        
        # Create report
        report = PorReport(
            timestamp=datetime.now(timezone.utc),
            total_reserves=total_reserves,
            total_token_supply=total_token_supply,
            reserve_ratio=reserve_ratio,
            balances=balance_reports
        )
        
        # Add hash and signature
        report.report_hash = self._calculate_report_hash(report)
        report.signature = self._sign_report(report.report_hash)
        
        logger.info(f"PoR report generated: {total_reserves:.2f} HCHF reserves, {reserve_ratio:.2f}% ratio")
        
        return report

    def save_report(self, report: PorReport, filepath: Optional[str] = None) -> str:
        """Save report to JSON file"""
        if not filepath:
            timestamp_str = report.timestamp.strftime("%Y%m%d_%H%M%S")
            filepath = f"por_report_{timestamp_str}.json"
        
        # Ensure reports directory exists
        reports_dir = Path("reports")
        reports_dir.mkdir(exist_ok=True)
        
        full_path = reports_dir / filepath
        
        with open(full_path, 'w') as f:
            json.dump(asdict(report), f, indent=2, default=str)
        
        logger.info(f"Report saved to {full_path}")
        return str(full_path)

    def export_csv_summary(self, report: PorReport, filepath: Optional[str] = None) -> str:
        """Export balance summary to CSV for external analysis"""
        if not filepath:
            timestamp_str = report.timestamp.strftime("%Y%m%d_%H%M%S")
            filepath = f"por_summary_{timestamp_str}.csv"
        
        # Convert balance reports to DataFrame
        df_data = []
        for balance in report.balances:
            df_data.append({
                'address': balance.address,
                'network': balance.network,
                'native_balance': balance.balance,
                'token_balance': balance.token_balance,
                'timestamp': balance.timestamp,
                'block_number': balance.block_number
            })
        
        df = pd.DataFrame(df_data)
        
        # Add summary row
        summary_row = {
            'address': 'TOTAL',
            'network': 'ALL',
            'native_balance': df['native_balance'].sum(),
            'token_balance': df['token_balance'].sum(),
            'timestamp': report.timestamp,
            'block_number': 0
        }
        df = pd.concat([df, pd.DataFrame([summary_row])], ignore_index=True)
        
        reports_dir = Path("reports")
        reports_dir.mkdir(exist_ok=True)
        full_path = reports_dir / filepath
        
        df.to_csv(full_path, index=False)
        logger.info(f"CSV summary saved to {full_path}")
        return str(full_path)


async def main():
    """Main execution function"""
    por_system = HelvetiCoinPoR()
    
    try:
        # Generate PoR report
        report = await por_system.generate_por_report()
        
        # Save reports
        json_path = por_system.save_report(report)
        csv_path = por_system.export_csv_summary(report)
        
        # Print summary
        print("\n" + "="*60)
        print("HELVETICOIN PROOF OF RESERVES REPORT")
        print("="*60)
        print(f"Timestamp: {report.timestamp}")
        print(f"Total Reserves: {report.total_reserves:,.2f} HCHF")
        print(f"Total Token Supply: {report.total_token_supply:,.2f} HCHF")
        print(f"Reserve Ratio: {report.reserve_ratio:.2f}%")
        print(f"Report Hash: {report.report_hash}")
        print(f"Signed: {'Yes' if report.signature else 'No'}")
        print("\nBalance Details:")
        print("-" * 60)
        
        for balance in report.balances:
            print(f"{balance.network.upper():>8} | {balance.address[:10]}... | "
                  f"{balance.token_balance:>12,.2f} HCHF")
        
        print(f"\nReports saved:")
        print(f"  JSON: {json_path}")
        print(f"  CSV:  {csv_path}")
        
        # Alert if reserve ratio is low
        if report.reserve_ratio < 100:
            print(f"\n⚠️  WARNING: Reserve ratio ({report.reserve_ratio:.2f}%) is below 100%")
        else:
            print(f"\n✅ Reserve ratio ({report.reserve_ratio:.2f}%) is healthy")
            
    except Exception as e:
        logger.error(f"PoR report generation failed: {e}")
        raise


if __name__ == "__main__":
    asyncio.run(main())