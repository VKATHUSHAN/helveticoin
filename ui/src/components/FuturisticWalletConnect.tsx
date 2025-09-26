'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

export function FuturisticWalletConnect() {
  const { t } = useTranslation('common');

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(220, 20, 60, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openConnectModal}
                    type="button"
                    className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg"
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 animate-pulse opacity-75" />
                    
                    {/* Content */}
                    <div className="relative flex items-center gap-3">
                      <svg
                        className="w-6 h-6 animate-pulse"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span className="text-lg">{t('wallet.connect')}</span>
                    </div>
                  </motion.button>
                );
              }

              if (chain.unsupported) {
                return (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openChainModal}
                    type="button"
                    className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg"
                  >
                    {t('wallet.wrongNetwork')}
                  </motion.button>
                );
              }

              return (
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openChainModal}
                    className="flex items-center gap-3 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 hover:border-gray-500"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 24,
                          height: 24,
                          borderRadius: 999,
                          overflow: 'hidden',
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 24, height: 24 }}
                          />
                        )}
                      </div>
                    )}
                    <span>{chain.name}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(220, 20, 60, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openAccountModal}
                    type="button"
                    className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                      <span>{account.displayName}</span>
                      {account.displayBalance && (
                        <span className="text-green-300">
                          {account.displayBalance}
                        </span>
                      )}
                    </div>
                  </motion.button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}