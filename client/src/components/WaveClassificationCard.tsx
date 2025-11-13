import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, User, Microscope, Atom } from 'lucide-react';

interface WaveClassificationCardProps {
  wavelength: number;
}

export default function WaveClassificationCard({ wavelength }: WaveClassificationCardProps) {
  const getWaveType = (wl: number): { type: string; subgroup: string; icon: any; reference: string } => {
    if (wl >= 1e-1) return { type: 'Radio Wave', subgroup: 'Long Wave', icon: Building2, reference: 'Buildings' };
    if (wl >= 1e-3) return { type: 'Radio Wave', subgroup: 'AM/FM Radio', icon: Building2, reference: 'Buildings' };
    if (wl >= 1e-6) return { type: 'Microwave', subgroup: 'WiFi/Cellular', icon: User, reference: 'Humans' };
    if (wl >= 7e-7) return { type: 'Infrared', subgroup: 'Thermal Radiation', icon: User, reference: 'Humans' };
    if (wl >= 4e-7) return { type: 'Visible Light', subgroup: 'Optical', icon: Microscope, reference: 'Cells' };
    if (wl >= 1e-8) return { type: 'Ultraviolet', subgroup: 'UV-A/B/C', icon: Microscope, reference: 'Bacteria' };
    if (wl >= 1e-11) return { type: 'X-Ray', subgroup: 'Medical Imaging', icon: Atom, reference: 'Atoms' };
    return { type: 'Gamma Ray', subgroup: 'High Energy', icon: Atom, reference: 'Atomic Nuclei' };
  };

  const info = getWaveType(wavelength);
  const Icon = info.icon;

  return (
    <Card data-testid="card-classification">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Wave Classification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Type</div>
          <div className="text-xl font-medium" data-testid="text-wave-type">{info.type}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Subgroup</div>
          <div className="text-base" data-testid="text-subgroup">{info.subgroup}</div>
        </div>
        <div className="pt-2 border-t">
          <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Size Comparison</div>
          <div className="flex items-center gap-3">
            <Icon className="w-8 h-8 text-primary" />
            <div className="text-sm" data-testid="text-reference">{info.reference}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
