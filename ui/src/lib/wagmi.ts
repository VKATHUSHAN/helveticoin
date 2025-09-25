import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, polygon } from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'HelvetiCoin',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id',
  chains: [mainnet, sepolia, polygon],
  ssr: true,
});

export { config };