import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWaveInfo } from '@/lib/waveData';

interface WaveComparisonProps {
  wavelength: number;
  amplitude: number;
}

export default function WaveComparison({ wavelength, amplitude }: WaveComparisonProps) {
  const [prevComparison, setPrevComparison] = useState('');
  const waveInfo = getWaveInfo(wavelength);
  
  useEffect(() => {
    if (waveInfo?.subcategory.comparison !== prevComparison) {
      setPrevComparison(waveInfo?.subcategory.comparison || '');
    }
  }, [waveInfo?.subcategory.comparison, prevComparison]);

  if (!waveInfo) return null;

  const { subcategory } = waveInfo;
  const comparisonSize = amplitude * 2;

  const getComparisonIcon = (comparison: string): string => {
    const lower = comparison.toLowerCase();
    
    if (lower.includes('mount everest')) return '🏔️';
    if (lower.includes('skyscraper') || lower.includes('building')) return '🏢';
    if (lower.includes('human')) return '🧍';
    if (lower.includes('book')) return '📖';
    if (lower.includes('laptop')) return '💻';
    if (lower.includes('finger')) return '👆';
    if (lower.includes('rice')) return '🍚';
    if (lower.includes('ruler')) return '📏';
    if (lower.includes('mug') || lower.includes('coffee')) return '☕';
    if (lower.includes('golf')) return '⛳';
    if (lower.includes('matchbox')) return '🔥';
    if (lower.includes('coin')) return '🪙';
    if (lower.includes('paperclip')) return '📎';
    if (lower.includes('pea')) return '🫛';
    if (lower.includes('blood cell')) return '🔴';
    if (lower.includes('bacterium') || lower.includes('bacteria')) return '🦠';
    if (lower.includes('dust')) return '✨';
    if (lower.includes('virus')) return '🦠';
    if (lower.includes('protein') || lower.includes('molecule')) return '🧬';
    if (lower.includes('dna')) return '🧬';
    if (lower.includes('chlorophyll')) return '🌿';
    if (lower.includes('atom')) return '⚛️';
    if (lower.includes('nucleus')) return '☢️';
    
    return '📏';
  };

  const icon = getComparisonIcon(subcategory.comparison);

  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={subcategory.comparison}
          initial={{ opacity: 0, scale: 0.5, x: 50 }}
          animate={{ opacity: 0.4, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.5, x: -50 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.5
          }}
          className="flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
            style={{
              fontSize: `${Math.min(comparisonSize, 120)}px`,
              filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))'
            }}
          >
            {icon}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center px-3 py-1 bg-background/80 backdrop-blur-sm rounded-md border border-border/50"
          >
            <div className="text-xs font-medium whitespace-nowrap">
              {subcategory.comparison}
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
