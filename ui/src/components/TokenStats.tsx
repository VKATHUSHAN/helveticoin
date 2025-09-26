'use client';

import { motion } from 'framer-motion';
import { GlowingCard } from './GlowingCard';

const stats = [
  {
    label: 'Market Cap',
    value: '$12.5M',
    change: '+15.2%',
    positive: true,
    icon: '📈'
  },
  {
    label: 'Total Supply',
    value: '1B HCHF',
    change: 'Fixed',
    positive: true,
    icon: '🪙'
  },
  {
    label: 'Holders',
    value: '8,432',
    change: '+5.7%',
    positive: true,
    icon: '👥'
  },
  {
    label: 'Liquidity',
    value: '$2.1M',
    change: '+8.3%',
    positive: true,
    icon: '💧'
  }
];

export function TokenStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <GlowingCard glowColor={stat.positive ? '#10B981' : '#EF4444'}>
            <div className="text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mb-2">
                {stat.label}
              </div>
              <div className={`text-sm font-medium ${
                stat.positive ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </div>
            </div>
          </GlowingCard>
        </motion.div>
      ))}
    </div>
  );
}