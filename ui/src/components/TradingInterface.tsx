'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlowingCard } from './GlowingCard';
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';

export function TradingInterface() {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('HCHF');

  const handleSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <GlowingCard className="max-w-md mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Swap Tokens</h3>
          <p className="text-gray-400">Trade HCHF with instant settlement</p>
        </div>

        {/* From Token */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">From</label>
          <div className="bg-gray-800/50 border border-gray-600/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.0"
                className="bg-transparent text-white text-2xl font-bold outline-none flex-1"
              />
              <div className="flex items-center gap-2 bg-gray-700/50 rounded-lg px-3 py-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <span className="text-white font-medium">{fromToken}</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Balance: 2.5 {fromToken}
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSwap}
            className="bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 rounded-full p-3 transition-all duration-200"
          >
            <ArrowsUpDownIcon className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">To</label>
          <div className="bg-gray-800/50 border border-gray-600/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <input
                type="number"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                placeholder="0.0"
                className="bg-transparent text-white text-2xl font-bold outline-none flex-1"
              />
              <div className="flex items-center gap-2 bg-gray-700/50 rounded-lg px-3 py-2">
                <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                <span className="text-white font-medium">{toToken}</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Balance: 1,250 {toToken}
            </div>
          </div>
        </div>

        {/* Swap Details */}
        <div className="bg-gray-800/30 border border-gray-600/30 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Rate</span>
            <span className="text-white">1 ETH = 2,500 HCHF</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Fee</span>
            <span className="text-white">0.3%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Slippage</span>
            <span className="text-white">0.5%</span>
          </div>
        </div>

        {/* Swap Button */}
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(220, 20, 60, 0.5)' }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg"
        >
          Swap Tokens
        </motion.button>
      </div>
    </GlowingCard>
  );
}