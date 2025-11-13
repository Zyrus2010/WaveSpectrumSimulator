import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ApplicationsCardProps {
  wavelength: number;
}

export default function ApplicationsCard({ wavelength }: ApplicationsCardProps) {
  const getApplications = (wl: number): { uses: string[]; warning: string | null; safetyLevel: 'safe' | 'caution' | 'danger' } => {
    if (wl >= 1e-1) return {
      uses: ['Broadcasting', 'Communication', 'Navigation'],
      warning: null,
      safetyLevel: 'safe'
    };
    if (wl >= 1e-3) return {
      uses: ['Radio/TV', 'Wireless Networks', 'Radar'],
      warning: null,
      safetyLevel: 'safe'
    };
    if (wl >= 1e-6) return {
      uses: ['WiFi', 'Microwave Ovens', 'Satellite Communication'],
      warning: 'High intensity can cause heating',
      safetyLevel: 'caution'
    };
    if (wl >= 7e-7) return {
      uses: ['Remote Controls', 'Thermal Imaging', 'Night Vision'],
      warning: null,
      safetyLevel: 'safe'
    };
    if (wl >= 4e-7) return {
      uses: ['Vision', 'Photography', 'Fiber Optics'],
      warning: null,
      safetyLevel: 'safe'
    };
    if (wl >= 1e-8) return {
      uses: ['Sterilization', 'Tanning', 'Forensics'],
      warning: 'Can cause skin damage and cancer',
      safetyLevel: 'danger'
    };
    if (wl >= 1e-11) return {
      uses: ['Medical Imaging', 'Security Scanning', 'Crystallography'],
      warning: 'Ionizing radiation - causes DNA damage',
      safetyLevel: 'danger'
    };
    return {
      uses: ['Cancer Treatment', 'Astronomy', 'Sterilization'],
      warning: 'Extremely dangerous - ionizing radiation',
      safetyLevel: 'danger'
    };
  };

  const info = getApplications(wavelength);

  return (
    <Card data-testid="card-applications">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Applications & Safety</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Practical Uses</div>
          <div className="flex flex-wrap gap-2">
            {info.uses.map((use, idx) => (
              <Badge key={idx} variant="secondary" data-testid={`badge-use-${idx}`}>
                {use}
              </Badge>
            ))}
          </div>
        </div>
        
        {info.warning && (
          <div className="pt-2 border-t">
            <div className="flex items-start gap-2">
              <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                info.safetyLevel === 'danger' ? 'text-destructive' : 'text-yellow-500'
              }`} />
              <div>
                <div className="text-sm font-medium mb-1">
                  {info.safetyLevel === 'danger' ? 'Warning' : 'Caution'}
                </div>
                <div className="text-sm text-muted-foreground" data-testid="text-warning">
                  {info.warning}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {!info.warning && (
          <div className="pt-2 border-t">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <div className="text-sm font-medium">Generally Safe for Exposure</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
