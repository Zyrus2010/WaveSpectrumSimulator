import { useEffect, useRef } from 'react';

interface WaveCanvasProps {
  frequency: number;
  wavelength: number;
  className?: string;
}

export default function WaveCanvas({ frequency, wavelength, className = '' }: WaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

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
    const amplitude = height * 0.3;
    const centerY = height / 2;

    let phase = 0;

    const getWaveColor = (wavelengthInMeters: number): string => {
      const wavelengthInNm = wavelengthInMeters * 1e9;
      
      if (wavelengthInNm >= 380 && wavelengthInNm <= 750) {
        if (wavelengthInNm >= 620 && wavelengthInNm <= 750) return '#FF0000';
        if (wavelengthInNm >= 590 && wavelengthInNm < 620) return '#FF7F00';
        if (wavelengthInNm >= 570 && wavelengthInNm < 590) return '#FFFF00';
        if (wavelengthInNm >= 495 && wavelengthInNm < 570) return '#00FF00';
        if (wavelengthInNm >= 450 && wavelengthInNm < 495) return '#0000FF';
        if (wavelengthInNm >= 380 && wavelengthInNm < 450) return '#9400D3';
      }
      
      if (wavelengthInNm < 380) return '#8B00FF';
      if (wavelengthInNm > 750 && wavelengthInNm < 1000) return '#DC143C';
      if (wavelengthInMeters >= 1e-3) return '#FF4500';
      if (wavelengthInMeters >= 1) return '#FF6347';
      
      return 'hsl(var(--primary))';
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const pixelsPerWavelength = Math.min(width / 3, Math.max(20, width / (frequency / 1e12)));
      const color = getWaveColor(wavelength);

      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const angle = (x / pixelsPerWavelength) * 2 * Math.PI + phase;
        const y = centerY + Math.sin(angle) * amplitude;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      phase += 0.05;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [frequency, wavelength]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
      data-testid="canvas-wave"
    />
  );
}
