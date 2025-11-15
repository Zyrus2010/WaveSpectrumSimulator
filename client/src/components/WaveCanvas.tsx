import { useEffect, useRef } from 'react';
import { lerp } from '@/lib/amplitudeUtils';

interface WaveCanvasProps {
  frequency: number;
  wavelength: number;
  amplitude: number; // Now accepts amplitude as a prop
  className?: string;
}

export default function WaveCanvas({ frequency, wavelength, amplitude, className = '' }: WaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const currentAmplitudeRef = useRef<number>(amplitude);
  const phaseRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const centerY = height / 2;

    const draw = () => {
      // Smoothly interpolate to target amplitude
      currentAmplitudeRef.current = lerp(currentAmplitudeRef.current, amplitude, 0.1);
      
      ctx.clearRect(0, 0, width, height);

      // Calculate wavelength representation in pixels
      // Use logarithmic scaling for better visualization across vast range
      const logWavelength = Math.log10(wavelength);
      let pixelsPerWavelength;
      
      if (wavelength >= 1) {
        // Radio waves: show 1-3 complete waves
        pixelsPerWavelength = width / (1 + logWavelength / 10);
      } else if (wavelength >= 1e-3) {
        // Microwaves: show 2-4 waves
        pixelsPerWavelength = width / 3;
      } else if (wavelength >= 1e-6) {
        // Infrared: show 3-5 waves
        pixelsPerWavelength = width / 4;
      } else {
        // Visible, UV, X-ray, Gamma: show more oscillations
        pixelsPerWavelength = Math.max(20, width / 5);
      }

      // Single color - use theme primary color
      ctx.strokeStyle = 'hsl(var(--primary))';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const angle = (x / pixelsPerWavelength) * 2 * Math.PI + phaseRef.current;
        const y = centerY + Math.sin(angle) * currentAmplitudeRef.current;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      phaseRef.current += 0.05;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [frequency, wavelength, amplitude]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
      data-testid="canvas-wave"
    />
  );
}
