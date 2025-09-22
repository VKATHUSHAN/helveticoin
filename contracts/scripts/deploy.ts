import { ethers } from "hardhat";
import { HelvetiCoin } from "../typechain-types";

async function main() {
  console.log("🇨🇭 Starting HelvetiCoin deployment...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  
  // Get the account balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // Get network information
  const network = await ethers.provider.getNetwork();
  console.log("Network:", network.name, "Chain ID:", network.chainId);

  // Deploy HelvetiCoin
  console.log("\n📄 Deploying HelvetiCoin contract...");
  
  const HelvetiCoinFactory = await ethers.getContractFactory("HelvetiCoin");
  const helvetiCoin = await HelvetiCoinFactory.deploy(deployer.address) as HelvetiCoin;
  
  console.log("⏳ Waiting for deployment transaction...");
  await helvetiCoin.waitForDeployment();
  
  const contractAddress = await helvetiCoin.getAddress();
  console.log("✅ HelvetiCoin deployed to:", contractAddress);

  // Verify deployment
  console.log("\n🔍 Verifying deployment...");
  
  const name = await helvetiCoin.name();
  const symbol = await helvetiCoin.symbol();
  const decimals = await helvetiCoin.decimals();
  const totalSupply = await helvetiCoin.totalSupply();
  const maxSupply = await helvetiCoin.MAX_SUPPLY();
  const owner = await helvetiCoin.owner();
  const isMinter = await helvetiCoin.minters(deployer.address);

  console.log("Contract Details:");
  console.log("- Name:", name);
  console.log("- Symbol:", symbol);
  console.log("- Decimals:", decimals);
  console.log("- Total Supply:", ethers.formatEther(totalSupply), "HCHF");
  console.log("- Max Supply:", ethers.formatEther(maxSupply), "HCHF");
  console.log("- Owner:", owner);
  console.log("- Deployer is minter:", isMinter);

  // Save deployment information
  const deploymentInfo = {
    network: network.name,
    chainId: Number(network.chainId),
    contractAddress: contractAddress,
    deployer: deployer.address,
    owner: owner,
    deploymentBlock: await ethers.provider.getBlockNumber(),
    timestamp: new Date().toISOString(),
    transactionHash: helvetiCoin.deploymentTransaction()?.hash,
    contractDetails: {
      name,
      symbol,
      decimals,
      maxSupply: maxSupply.toString(),
      totalSupply: totalSupply.toString()
    }
  };

  console.log("\n📋 Deployment Summary:");
  console.log(JSON.stringify(deploymentInfo, null, 2));

  // Provide next steps
  console.log("\n🚀 Next Steps:");
  console.log("1. Verify the contract on Etherscan:");
  console.log(`   npx hardhat verify --network ${network.name} ${contractAddress} ${deployer.address}`);
  console.log("\n2. Add additional minters if needed:");
  console.log(`   helvetiCoin.addMinter(minterAddress)`);
  console.log("\n3. Transfer ownership if needed:");
  console.log(`   helvetiCoin.transferOwnership(newOwnerAddress)`);
  console.log("\n4. Update .env with contract address:");
  console.log(`   NEXT_PUBLIC_HELVETICOIN_CONTRACT_ADDRESS=${contractAddress}`);

  return {
    contractAddress,
    deploymentInfo
  };
}

// Run the deployment
main()
  .then((result) => {
    console.log("\n✅ Deployment completed successfully!");
    console.log("Contract address:", result.contractAddress);
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });