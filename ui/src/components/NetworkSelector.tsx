'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const networks = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    color: '#627EEA',
    icon: '⟠',
    chainId: 1
  },
  {
    id: 'bnb',
    name: 'BNB Chain',
    symbol: 'BNB',
    color: '#F3BA2F',
    icon: '🔶',
    chainId: 56
  },
  {
    id: 'sui',
    name: 'Sui Network',
    symbol: 'SUI',
    color: '#4DA2FF',
    icon: '🌊',
    chainId: 101
  }
];

export function NetworkSelector() {
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-xl px-4 py-3 text-white hover:border-gray-500 transition-all duration-200"
      >
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: selectedNetwork.color }}
        />
        <span className="text-lg">{selectedNetwork.icon}</span>
        <span className="font-medium">{selectedNetwork.name}</span>
        <ChevronDownIcon 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 w-full bg-gray-800/95 backdrop-blur-sm border border-gray-600/50 rounded-xl overflow-hidden z-20"
            >
              {networks.map((network) => (
                <motion.button
                  key={network.id}
                  whileHover={{ backgroundColor: 'rgba(75, 85, 99, 0.5)' }}
                  onClick={() => {
                    setSelectedNetwork(network);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    selectedNetwork.id === network.id 
                      ? 'bg-gray-700/50 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: network.color }}
                  />
                  <span className="text-lg">{network.icon}</span>
                  <div>
                    <div className="font-medium">{network.name}</div>
                    <div className="text-xs text-gray-400">{network.symbol}</div>
                  </div>
                  {selectedNetwork.id === network.id && (
                    <div className="ml-auto">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}