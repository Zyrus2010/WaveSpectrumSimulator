import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useRef } from 'react';

interface MathGraphProps {
  energy: number;
  frequency: number;
}

export default function MathGraph({ energy, frequency }: MathGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    const padding = 40;

    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.classList.contains('dark');
    const axisColor = isDark ? '#666' : '#999';
    const lineColor = 'hsl(var(--primary))';
    const pointColor = 'hsl(var(--primary))';
    const textColor = isDark ? '#aaa' : '#666';

    ctx.strokeStyle = axisColor;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(padding, padding);
    ctx.stroke();

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = padding; x < width - padding; x++) {
      const normalizedX = (x - padding) / (width - 2 * padding);
      const y = height - padding - normalizedX * (height - 2 * padding);
      if (x === padding) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    const normalizedFreq = 0.5;
    const pointX = padding + normalizedFreq * (width - 2 * padding);
    const pointY = height - padding - normalizedFreq * (height - 2 * padding);

    ctx.fillStyle = pointColor;
    ctx.beginPath();
    ctx.arc(pointX, pointY, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '11px Roboto';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.fillText('Frequency', width / 2, height - 10);
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Energy', 0, 0);
    ctx.restore();

    ctx.font = '12px "Roboto Mono"';
    ctx.textAlign = 'left';
    ctx.fillText('E = hf', padding + 5, padding + 15);

  }, [energy, frequency]);

  return (
    <Card data-testid="card-graph">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Energy-Frequency Relationship</CardTitle>
      </CardHeader>
      <CardContent>
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ height: '180px' }}
          data-testid="canvas-graph"
        />
      </CardContent>
    </Card>
  );
}
