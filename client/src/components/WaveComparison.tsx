import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWaveInfo } from '@/lib/waveData';
import { getComparisonImage } from '@/lib/comparisonAssets';
import { lerp } from '@/lib/amplitudeUtils';

interface WaveComparisonProps {
  wavelength: number;
  amplitude: number; // Amplitude in pixels
}

export default function WaveComparison({ wavelength, amplitude }: WaveComparisonProps) {
  const [prevComparison, setPrevComparison] = useState('');
  const currentHeightRef = useRef<number>(amplitude * 2);
  const waveInfo = getWaveInfo(wavelength);
  
  useEffect(() => {
    if (waveInfo?.subcategory.comparison !== prevComparison) {
      setPrevComparison(waveInfo?.subcategory.comparison || '');
    }
  }, [waveInfo?.subcategory.comparison, prevComparison]);

  // Smoothly interpolate image height
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      currentHeightRef.current = lerp(currentHeightRef.current, amplitude * 2, 0.1);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [amplitude]);

  if (!waveInfo) return null;

  const { subcategory } = waveInfo;
  const comparisonImage = getComparisonImage(subcategory.comparison);
  const imageHeight = Math.min(currentHeightRef.current, 300); // Cap at 300px max

  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={subcategory.comparison}
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 0.6, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: -50 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.5
          }}
          className="flex flex-col items-center gap-3"
        >
          <motion.div
            className="relative flex items-center justify-center"
            style={{
              maxHeight: `${imageHeight}px`,
              filter: 'drop-shadow(0 0 16px rgba(139, 92, 246, 0.5))'
            }}
          >
            <img
              src={comparisonImage}
              alt={subcategory.comparison}
              className="object-contain"
              style={{
                maxHeight: `${imageHeight}px`,
                width: 'auto',
                opacity: 0.6,
                mixBlendMode: 'screen',
                filter: 'brightness(1.2) contrast(1.1)'
              }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center px-4 py-2 bg-background/90 backdrop-blur-sm rounded-md border border-border/50 shadow-lg"
          >
            <div className="text-xs font-medium whitespace-nowrap text-foreground">
              {subcategory.comparison}
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">
              ~{(amplitude * 2).toFixed(0)}px
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
