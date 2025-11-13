import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WavePropertiesCardProps {
  frequency: number;
  wavelength: number;
  energy: number;
}

export default function WavePropertiesCard({ frequency, wavelength, energy }: WavePropertiesCardProps) {
  const formatScientific = (value: number, unit: string): string => {
    const exponent = Math.floor(Math.log10(Math.abs(value)));
    const mantissa = value / Math.pow(10, exponent);
    return `${mantissa.toFixed(2)} × 10${exponent >= 0 ? '' : ''}${exponent < -9 || exponent > 9 ? '⁻' : ''}${Math.abs(exponent).toString().split('').map(d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[parseInt(d)]).join('')} ${unit}`;
  };

  return (
    <Card data-testid="card-properties">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Wave Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Energy</div>
          <div className="font-mono text-base font-medium" data-testid="text-energy">
            {formatScientific(energy, 'J')}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Frequency</div>
          <div className="font-mono text-base font-medium" data-testid="text-frequency">
            {formatScientific(frequency, 'Hz')}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Wavelength</div>
          <div className="font-mono text-base font-medium" data-testid="text-wavelength">
            {formatScientific(wavelength, 'm')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
