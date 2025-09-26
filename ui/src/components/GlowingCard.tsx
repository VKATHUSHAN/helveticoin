'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowingCard({ children, className = '', glowColor = '#DC143C' }: GlowingCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative group ${className}`}
    >
      {/* Glow effect */}
      <div 
        className="absolute -inset-0.5 bg-gradient-to-r opacity-75 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse rounded-xl"
        style={{
          background: `linear-gradient(45deg, ${glowColor}, transparent, ${glowColor})`
        }}
      />
      
      {/* Card content */}
      <div className="relative bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        {children}
      </div>
    </motion.div>
  );
}