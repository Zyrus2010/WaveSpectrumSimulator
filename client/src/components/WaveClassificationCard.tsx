import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';
import { getWaveInfo } from '@/lib/waveData';

interface WaveClassificationCardProps {
  wavelength: number;
}

export default function WaveClassificationCard({ wavelength }: WaveClassificationCardProps) {
  const waveInfo = getWaveInfo(wavelength);

  if (!waveInfo) {
    return (
      <Card data-testid="card-classification">
        <CardContent className="p-6">
          <div className="text-sm text-muted-foreground">Invalid wavelength</div>
        </CardContent>
      </Card>
    );
  }

  const { category, subcategory } = waveInfo;

  const getSafetyLevel = (healthInfo?: string): 'safe' | 'caution' | 'danger' | 'extreme' => {
    if (!healthInfo) return 'safe';
    const lower = healthInfo.toLowerCase();
    if (lower.includes('extremely dangerous') || lower.includes('hazardous')) return 'extreme';
    if (lower.includes('dangerous') || lower.includes('harmful')) return 'danger';
    if (lower.includes('caution')) return 'caution';
    return 'safe';
  };

  const safetyLevel = getSafetyLevel(subcategory.healthInfo);
  
  const safetyColors = {
    safe: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
    caution: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
    danger: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20',
    extreme: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20'
  };

  return (
    <Card data-testid="card-classification">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <span className="text-2xl">{category.icon}</span>
          Wave Classification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Type</div>
          <div className="text-xl font-medium" data-testid="text-wave-type">{category.type}</div>
        </div>
        
        <div>
          <div className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Subgroup</div>
          <div className="text-base font-medium" data-testid="text-subgroup">{subcategory.name}</div>
        </div>

        <div className="pt-2 border-t">
          <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
            Wavelength Range
          </div>
          <div className="text-sm" data-testid="text-wavelength-range">
            {subcategory.wavelengthMin >= 1 
              ? `${subcategory.wavelengthMin.toExponential(1)} - ${subcategory.wavelengthMax.toExponential(1)} m`
              : `${(subcategory.wavelengthMin * 1e9).toFixed(0)} - ${(subcategory.wavelengthMax * 1e9).toFixed(0)} nm`
            }
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
            Size Comparison
          </div>
          <Badge variant="outline" className="text-sm" data-testid="text-comparison">
            {subcategory.comparison}
          </Badge>
        </div>

        {subcategory.healthInfo && (
          <div className="pt-2 border-t">
            <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Health & Safety
            </div>
            <div 
              className={`text-sm p-3 rounded-md border ${safetyColors[safetyLevel]}`}
              data-testid="text-health-info"
            >
              {subcategory.healthInfo}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
