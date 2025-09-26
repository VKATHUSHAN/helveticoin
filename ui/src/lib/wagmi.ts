import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, polygon, bsc, bscTestnet } from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'HelvetiCoin',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id',
  chains: [mainnet, bsc, polygon, sepolia, bscTestnet],
  ssr: true,
});

export { config };