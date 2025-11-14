import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, AlertTriangle, Info } from 'lucide-react';

const SPEED_OF_LIGHT = 3e8;
const PLANCK_CONSTANT = 6.626e-34;
const MIN_FREQUENCY = 1e3;
const MAX_FREQUENCY = 1e20;

interface WaveSubtype {
  name: string;
  wavelengthRange: string;
  description: string;
  uses: string[];
}

interface WaveTypeData {
  type: string;
  icon: string;
  subtypes: WaveSubtype[];
  backgroundColor: string;
  textColor: string;
  safetyLevel: 'safe' | 'caution' | 'danger';
  safetyWarning: string;
  referenceObjects: string[];
  healthEffects: string;
  protection: string;
  practicalUses: string[];
}

const WAVE_DATA: { [key: string]: WaveTypeData } = {
  'Radio Waves': {
    type: 'Radio Waves',
    icon: '📡',
    backgroundColor: 'rgb(255, 255, 255)',
    textColor: 'rgb(0, 0, 0)',
    safetyLevel: 'safe',
    safetyWarning: 'Generally safe at normal exposure levels',
    referenceObjects: ['Buildings (100m)', 'Football Field (100m)', 'Mountain (1km)'],
    healthEffects: 'No known harmful effects at typical environmental exposure levels. High-power transmitters may interfere with medical devices.',
    protection: 'Maintain safe distance from broadcast towers and high-power antennas',
    practicalUses: [
      'AM/FM Radio Broadcasting - Music and talk radio transmission',
      'Television Broadcasting - Over-the-air TV signals',
      'Mobile Phone Communication - Cellular networks',
      'Wi-Fi Networks - Wireless internet connectivity',
      'Satellite Communication - GPS, weather satellites',
      'Radio Astronomy - Studying celestial objects',
      'RFID Tags - Inventory tracking and contactless payments',
      'Emergency Services Radio - Police, fire, ambulance communication'
    ],
    subtypes: [
      {
        name: 'AM (Amplitude Modulation)',
        wavelengthRange: '100m - 1km',
        description: 'Long wavelength, lower frequency',
        uses: ['Talk radio', 'News broadcasting', 'Long-distance communication']
      },
      {
        name: 'FM (Frequency Modulation)',
        wavelengthRange: '2.8m - 3.4m',
        description: 'Higher frequency, clearer audio quality',
        uses: ['Music radio', 'High-fidelity broadcasting', 'Two-way radio']
      },
      {
        name: 'Shortwave',
        wavelengthRange: '10m - 100m',
        description: 'International broadcasting range',
        uses: ['International radio', 'Maritime communication', 'Aviation']
      },
      {
        name: 'VHF (Very High Frequency)',
        wavelengthRange: '1m - 10m',
        description: '30-300 MHz',
        uses: ['FM radio', 'TV broadcasting', 'Air traffic control']
      },
      {
        name: 'UHF (Ultra High Frequency)',
        wavelengthRange: '10cm - 1m',
        description: '300 MHz - 3 GHz',
        uses: ['TV broadcasting', 'Mobile phones', 'GPS', 'Bluetooth']
      }
    ]
  },
  'Microwaves': {
    type: 'Microwaves',
    icon: '📶',
    backgroundColor: 'rgb(220, 220, 220)',
    textColor: 'rgb(20, 20, 20)',
    safetyLevel: 'caution',
    safetyWarning: 'Can cause tissue heating at high intensities',
    referenceObjects: ['Bee (1cm)', 'Grain of Rice (5mm)', 'Pencil Point (1mm)'],
    healthEffects: 'Dielectric heating of water molecules in tissue. High-intensity exposure can cause internal burns without surface sensation.',
    protection: 'Never operate microwave ovens with damaged doors. Maintain distance from radar installations. Limit prolonged cell phone use near head.',
    practicalUses: [
      'Microwave Ovens - Food heating via water molecule excitation',
      'Radar Systems - Weather radar, air traffic control, speed guns',
      'Satellite Communications - TV, internet, phone via satellite',
      'Mobile Networks - 4G, 5G cellular communication',
      'Wi-Fi Routers - Wireless internet (2.4/5 GHz)',
      'Bluetooth Devices - Short-range wireless communication',
      'Microwave Links - Point-to-point communication',
      'Radio Astronomy - Cosmic microwave background studies'
    ],
    subtypes: [
      {
        name: 'L-band',
        wavelengthRange: '15cm - 30cm',
        description: '1-2 GHz frequency range',
        uses: ['GPS navigation', 'Mobile satellite phones', 'Aircraft surveillance']
      },
      {
        name: 'S-band',
        wavelengthRange: '7.5cm - 15cm',
        description: '2-4 GHz frequency range',
        uses: ['Weather radar', 'Surface ship radar', 'Wi-Fi (2.4 GHz)']
      },
      {
        name: 'C-band',
        wavelengthRange: '3.75cm - 7.5cm',
        description: '4-8 GHz frequency range',
        uses: ['Satellite TV', 'Long-distance radio telecommunications']
      },
      {
        name: 'X-band',
        wavelengthRange: '2.5cm - 3.75cm',
        description: '8-12 GHz frequency range',
        uses: ['Military radar', 'Weather monitoring', 'Vehicle speed detection']
      },
      {
        name: 'Ku-band',
        wavelengthRange: '1.7cm - 2.5cm',
        description: '12-18 GHz frequency range',
        uses: ['Satellite TV broadcasting', 'VSAT communications']
      },
      {
        name: 'K-band',
        wavelengthRange: '1.1cm - 1.7cm',
        description: '18-27 GHz frequency range',
        uses: ['Satellite communications', 'Astronomical observations']
      },
      {
        name: 'Ka-band',
        wavelengthRange: '0.75cm - 1.1cm',
        description: '27-40 GHz frequency range',
        uses: ['Satellite internet', '5G networks', 'High-resolution radar']
      }
    ]
  },
  'Infrared': {
    type: 'Infrared',
    icon: '🔥',
    backgroundColor: 'rgb(139, 0, 0)',
    textColor: 'rgb(255, 220, 220)',
    safetyLevel: 'safe',
    safetyWarning: 'Safe for most applications, eye protection needed for lasers',
    referenceObjects: ['Bacteria (1-10 μm)', 'Human Hair Width (75 μm)', 'Red Blood Cell (8 μm)'],
    healthEffects: 'Absorbed by skin surface and felt as heat. Prolonged high-intensity exposure can cause skin burns. IR lasers can damage eyes.',
    protection: 'Avoid prolonged exposure to intense IR sources. Wear protective eyewear around IR lasers. Use heat-resistant barriers when necessary.',
    practicalUses: [
      'Night Vision Devices - Military and security applications',
      'Thermal Imaging - Building inspection, medical diagnosis',
      'Remote Controls - TV, AC, and appliance control',
      'Fiber Optic Communication - High-speed internet transmission',
      'Heat Lamps - Physical therapy and industrial heating',
      'Infrared Spectroscopy - Chemical analysis and material identification',
      'Automotive Sensors - Parking assistance, night vision',
      'Astronomy - Observing cool stars and dust clouds'
    ],
    subtypes: [
      {
        name: 'Near-Infrared (NIR)',
        wavelengthRange: '0.75 - 1.4 μm',
        description: 'Closest to visible light',
        uses: ['Night vision', 'Fiber optics', 'Remote controls', 'Medical imaging']
      },
      {
        name: 'Mid-Infrared (MIR)',
        wavelengthRange: '1.4 - 3 μm',
        description: 'Medium wavelength range',
        uses: ['Heat-seeking missiles', 'Thermal imaging', 'Spectroscopy']
      },
      {
        name: 'Far-Infrared (FIR)',
        wavelengthRange: '3 - 1000 μm',
        description: 'Longest IR wavelengths',
        uses: ['Astronomical observations', 'Heat sensors', 'Thermal therapy']
      }
    ]
  },
  'Visible Light': {
    type: 'Visible Light',
    icon: '🌈',
    backgroundColor: 'linear-gradient(to right, rgb(255,0,0), rgb(255,127,0), rgb(255,255,0), rgb(0,255,0), rgb(0,0,255), rgb(75,0,130), rgb(148,0,211))',
    textColor: 'rgb(255, 255, 255)',
    safetyLevel: 'safe',
    safetyWarning: 'Safe for everyday exposure, avoid direct laser exposure',
    referenceObjects: ['Virus (100 nm)', 'DNA Width (2 nm)', 'Small Bacteria (500 nm)'],
    healthEffects: 'Essential for vision and health (vitamin D synthesis). High-intensity sources (lasers, welding arcs) can permanently damage retina. Prolonged bright light causes eye strain.',
    protection: 'Never look directly at lasers or the sun. Wear welding masks during welding. Use sunglasses in very bright conditions. Ensure proper lighting to avoid eye strain.',
    practicalUses: [
      'Human Vision - Allows us to see the world around us',
      'Photography - Capturing images and videos',
      'Displays - TVs, monitors, smartphone screens',
      'Lighting - LED bulbs, fluorescent lights, incandescent',
      'Optical Fiber Communication - High-speed data transmission',
      'Lasers - Surgery, manufacturing, entertainment (light shows)',
      'Photosynthesis - Plant growth and oxygen production',
      'Optical Microscopy - Viewing cells and small organisms',
      'Traffic Signals - Red, yellow, green lights',
      'Color Printing - CMYK and RGB color reproduction'
    ],
    subtypes: [
      {
        name: 'Red Light',
        wavelengthRange: '620-750 nm',
        description: 'Longest visible wavelength, lowest energy',
        uses: ['Traffic signals', 'LED therapy', 'Photography darkrooms', 'Astronomy (preserves night vision)']
      },
      {
        name: 'Orange Light',
        wavelengthRange: '590-620 nm',
        description: 'Between red and yellow',
        uses: ['Street lighting (sodium lamps)', 'Warning signals', 'Decorative lighting']
      },
      {
        name: 'Yellow Light',
        wavelengthRange: '570-590 nm',
        description: 'High visibility color',
        uses: ['Caution signals', 'Fog lights', 'High-visibility safety gear']
      },
      {
        name: 'Green Light',
        wavelengthRange: '495-570 nm',
        description: 'Peak sensitivity of human eye',
        uses: ['Traffic signals (go)', 'Laser pointers', 'Night vision displays', 'Surgical lasers']
      },
      {
        name: 'Blue Light',
        wavelengthRange: '450-495 nm',
        description: 'Short wavelength, higher energy',
        uses: ['Blu-ray discs', 'Blue LED lighting', 'Phototherapy for jaundice', 'Dental curing']
      },
      {
        name: 'Indigo Light',
        wavelengthRange: '420-450 nm',
        description: 'Deep blue-violet',
        uses: ['Decorative lighting', 'Artistic displays', 'Optical data storage']
      },
      {
        name: 'Violet Light',
        wavelengthRange: '380-420 nm',
        description: 'Shortest visible wavelength, borders UV',
        uses: ['Fluorescence excitation', 'Authentication (security features)', 'Artistic lighting']
      }
    ]
  },
  'Ultraviolet': {
    type: 'Ultraviolet',
    icon: '☀️',
    backgroundColor: 'rgb(75, 0, 130)',
    textColor: 'rgb(220, 200, 255)',
    safetyLevel: 'danger',
    safetyWarning: 'Can cause DNA damage, skin cancer, and eye damage',
    referenceObjects: ['Large Molecule (10 nm)', 'Protein (5-50 nm)', 'Virus (20-300 nm)'],
    healthEffects: 'DNA damage leading to skin cancer (melanoma, basal/squamous cell carcinoma). Premature aging. Cataracts and eye damage. Immune system suppression. Sunburn.',
    protection: 'Apply broad-spectrum SPF 30+ sunscreen every 2 hours. Wear UV-blocking sunglasses and wide-brimmed hats. Limit sun exposure 10am-4pm. Wear long sleeves. Avoid tanning beds completely.',
    practicalUses: [
      'Sterilization - Killing bacteria, viruses in hospitals, water treatment',
      'Black Lights - Security features, art displays, party lighting',
      'Forensics - Crime scene investigation (detecting bodily fluids)',
      'Counterfeit Detection - Verifying currency and documents',
      'Phototherapy - Treating psoriasis, eczema, jaundice',
      'Tanning Beds - Artificial tanning (health risks)',
      'Curing - Dental fillings, nail polish, adhesives',
      'Vitamin D Synthesis - Essential for bone health (UV-B from sun)'
    ],
    subtypes: [
      {
        name: 'UV-A',
        wavelengthRange: '315-400 nm',
        description: 'Longest UV, 95% of UV reaching Earth',
        uses: ['Tanning beds', 'Black lights', 'Phototherapy', 'Insect traps', 'Curing adhesives']
      },
      {
        name: 'UV-B',
        wavelengthRange: '280-315 nm',
        description: 'Causes sunburn, partially blocked by ozone',
        uses: ['Vitamin D synthesis', 'Psoriasis treatment', 'Reptile lighting']
      },
      {
        name: 'UV-C',
        wavelengthRange: '100-280 nm',
        description: 'Germicidal, blocked by ozone layer',
        uses: ['Water purification', 'Air sterilization', 'Surface disinfection', 'Hospital sanitization']
      }
    ]
  },
  'X-Rays': {
    type: 'X-Rays',
    icon: '💉',
    backgroundColor: 'rgb(0, 0, 50)',
    textColor: 'rgb(180, 200, 255)',
    safetyLevel: 'danger',
    safetyWarning: 'Ionizing radiation - can cause cancer and genetic damage',
    referenceObjects: ['Atom (0.1 nm)', 'Small Molecule (0.5 nm)', 'Atomic Nucleus vicinity'],
    healthEffects: 'Ionizing radiation that damages DNA directly. Increased cancer risk (cumulative). DNA mutations. Radiation sickness at high doses. Cell death. Potential genetic damage passed to offspring.',
    protection: 'Minimize frequency of medical X-rays. Use lead aprons and thyroid shields during imaging. Follow ALARA principle (As Low As Reasonably Achievable). Pregnant women must inform X-ray technicians. Radiologists stand behind lead barriers.',
    practicalUses: [
      'Medical Imaging - X-rays of bones, chest, dental radiography',
      'CT Scans - Detailed 3D internal body imaging',
      'Cancer Treatment - Radiation therapy to kill tumors',
      'Airport Security - Baggage scanning systems',
      'Crystallography - Determining molecular structures',
      'Industrial Inspection - Detecting flaws in materials/welds',
      'Art Analysis - Examining paintings for authenticity',
      'Astronomy - Studying black holes, neutron stars, supernovae'
    ],
    subtypes: [
      {
        name: 'Soft X-Rays',
        wavelengthRange: '0.01-10 nm',
        description: 'Lower energy, less penetrating',
        uses: ['Medical imaging (bones, chest)', 'Dental X-rays', 'Security scanners', 'Mammography']
      },
      {
        name: 'Hard X-Rays',
        wavelengthRange: '0.001-0.01 nm',
        description: 'Higher energy, deeply penetrating',
        uses: ['Cancer radiation therapy', 'Crystallography', 'Industrial inspection', 'Astronomy']
      }
    ]
  },
  'Gamma Rays': {
    type: 'Gamma Rays',
    icon: '☢️',
    backgroundColor: 'rgb(0, 0, 0)',
    textColor: 'rgb(200, 200, 200)',
    safetyLevel: 'danger',
    safetyWarning: 'Extreme danger - highly penetrating ionizing radiation',
    referenceObjects: ['Atomic Nucleus (1 fm)', 'Proton (0.8 fm)', 'Subatomic scale'],
    healthEffects: 'Severe DNA damage throughout body. Acute radiation syndrome (nausea, bleeding, organ failure). Multiple organ damage. Cancer. Death at sufficient doses. Genetic mutations affecting future generations.',
    protection: 'Requires thick lead (several cm) or concrete shielding (several meters). Avoid all radioactive materials. Evacuate nuclear incident areas immediately. Only trained radiation professionals with dosimeters and proper equipment should handle sources. Time, distance, and shielding are key.',
    practicalUses: [
      'Cancer Treatment - Gamma knife surgery, tumor irradiation',
      'Sterilization - Medical equipment, food preservation',
      'Radiography - Industrial flaw detection (similar to X-rays)',
      'Nuclear Medicine - PET scans for disease diagnosis',
      'Astronomy - Studying supernova, pulsars, gamma-ray bursts',
      'Food Irradiation - Killing bacteria, extending shelf life',
      'Research - Studying nuclear reactions and particle physics',
      'Gauging - Measuring material thickness/density in manufacturing'
    ],
    subtypes: [
      {
        name: 'Low-Energy Gamma',
        wavelengthRange: '< 0.01 nm',
        description: 'From nuclear transitions',
        uses: ['Medical imaging (PET scans)', 'Food sterilization', 'Cancer treatment']
      },
      {
        name: 'High-Energy Gamma',
        wavelengthRange: '< 0.001 nm',
        description: 'From radioactive decay',
        uses: ['Industrial radiography', 'Research applications', 'Nuclear power']
      },
      {
        name: 'Ultra-High Energy Gamma',
        wavelengthRange: '< 0.0001 nm',
        description: 'From cosmic sources',
        uses: ['Astrophysics research', 'Particle physics', 'Studying extreme cosmic events']
      }
    ]
  }
};

function getWaveTypeFromWavelength(wl: number): string {
  if (wl >= 1e-3) return 'Radio Waves';
  if (wl >= 1e-6) return 'Microwaves';
  if (wl >= 7e-7) return 'Infrared';
  if (wl >= 4e-7) return 'Visible Light';
  if (wl >= 1e-8) return 'Ultraviolet';
  if (wl >= 1e-11) return 'X-Rays';
  return 'Gamma Rays';
}

function getBackgroundStyle(waveType: string): { background: string; color: string } {
  const data = WAVE_DATA[waveType];
  return {
    background: data.backgroundColor,
    color: data.textColor
  };
}

export default function Home() {
  const [frequency, setFrequency] = useState(5e14);
  const [wavelength, setWavelength] = useState(6e-7);

  const handleFrequencySliderChange = (value: number[]) => {
    const sliderPercent = value[0];
    const logFreq = Math.log10(MIN_FREQUENCY) + (sliderPercent / 100) * (Math.log10(MAX_FREQUENCY) - Math.log10(MIN_FREQUENCY));
    const newFrequency = Math.pow(10, logFreq);
    setFrequency(newFrequency);
    setWavelength(SPEED_OF_LIGHT / newFrequency);
  };

  const handleWavelengthSliderChange = (value: number[]) => {
    const minWavelengthLog = Math.log10(SPEED_OF_LIGHT / MAX_FREQUENCY);
    const maxWavelengthLog = Math.log10(SPEED_OF_LIGHT / MIN_FREQUENCY);
    const sliderPercent = value[0];
    const logWavelength = minWavelengthLog + (sliderPercent / 100) * (maxWavelengthLog - minWavelengthLog);
    const newWavelength = Math.pow(10, logWavelength);
    setWavelength(newWavelength);
    setFrequency(SPEED_OF_LIGHT / newWavelength);
  };

  const handleReset = () => {
    setFrequency(5e14);
    setWavelength(6e-7);
  };

  const energy = PLANCK_CONSTANT * frequency;
  const waveType = getWaveTypeFromWavelength(wavelength);
  const waveData = WAVE_DATA[waveType];
  const bgStyle = getBackgroundStyle(waveType);

  const formatScientific = (value: number): string => {
    return value.toExponential(2);
  };

  const frequencyLog = Math.log10(frequency);
  const frequencySliderValue = ((frequencyLog - Math.log10(MIN_FREQUENCY)) / (Math.log10(MAX_FREQUENCY) - Math.log10(MIN_FREQUENCY))) * 100;

  const minWavelengthLog = Math.log10(SPEED_OF_LIGHT / MAX_FREQUENCY);
  const maxWavelengthLog = Math.log10(SPEED_OF_LIGHT / MIN_FREQUENCY);
  const wavelengthLog = Math.log10(wavelength);
  const wavelengthSliderValue = ((wavelengthLog - minWavelengthLog) / (maxWavelengthLog - minWavelengthLog)) * 100;

  return (
    <div 
      className="min-h-screen w-full transition-all duration-700 p-6"
      style={{ 
        background: bgStyle.background,
        color: bgStyle.color
      }}
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Top Section - Wave Type, Warning, Subgroup */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Wave Type */}
          <Card className="border-2" style={{ borderColor: bgStyle.color, backgroundColor: 'transparent' }}>
            <CardContent className="p-6">
              <div className="text-sm font-semibold mb-2 opacity-70">WAVE TYPE</div>
              <div className="text-4xl font-bold mb-2 flex items-center gap-3">
                <span className="text-5xl">{waveData.icon}</span>
                <span data-testid="text-wave-type">{waveData.type}</span>
              </div>
            </CardContent>
          </Card>

          {/* Safety Warning */}
          <Card className="border-2" style={{ borderColor: bgStyle.color, backgroundColor: 'transparent' }}>
            <CardContent className="p-6">
              <div className="text-sm font-semibold mb-2 opacity-70 flex items-center gap-2">
                {waveData.safetyLevel === 'danger' && <AlertTriangle className="w-4 h-4" />}
                {waveData.safetyLevel === 'caution' && <Info className="w-4 h-4" />}
                SAFETY WARNING
              </div>
              <Badge 
                className="text-base px-4 py-2"
                style={{
                  backgroundColor: waveData.safetyLevel === 'danger' ? 'rgba(220, 38, 38, 0.2)' :
                                   waveData.safetyLevel === 'caution' ? 'rgba(234, 179, 8, 0.2)' :
                                   'rgba(34, 197, 94, 0.2)',
                  color: bgStyle.color,
                  borderColor: bgStyle.color
                }}
                data-testid="text-safety-warning"
              >
                {waveData.safetyWarning}
              </Badge>
            </CardContent>
          </Card>

          {/* Current Subtype Info */}
          <Card className="border-2" style={{ borderColor: bgStyle.color, backgroundColor: 'transparent' }}>
            <CardContent className="p-6">
              <div className="text-sm font-semibold mb-2 opacity-70">SUBTYPES ({waveData.subtypes.length})</div>
              <div className="text-xl font-semibold" data-testid="text-subtype">
                {waveData.subtypes[0].name}
              </div>
              <div className="text-sm opacity-70 mt-1">
                + {waveData.subtypes.length - 1} more variants
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Section - Reference Object, Wave Visualization, Wavelength */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Reference Objects */}
          <Card className="border-2" style={{ borderColor: bgStyle.color, backgroundColor: 'transparent' }}>
            <CardContent className="p-6">
              <div className="text-sm font-semibold mb-3 opacity-70">SIZE COMPARISON</div>
              <div className="space-y-2">
                {waveData.referenceObjects.map((obj, idx) => (
                  <div key={idx} className="text-lg font-medium" data-testid={`text-reference-${idx}`}>
                    • {obj}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Wave Visualization */}
          <Card className="border-2" style={{ borderColor: bgStyle.color, backgroundColor: 'transparent' }}>
            <CardContent className="p-6">
              <div className="text-sm font-semibold mb-3 opacity-70">WAVE VISUALIZATION</div>
              <div className="h-24 flex items-center justify-center">
                <svg width="100%" height="80" viewBox="0 0 400 80">
                  <path
                    d={`M 0,40 ${Array.from({ length: 20 }, (_, i) => {
                      const x = i * 20;
                      const amp = 20;
                      const freq = Math.max(0.5, Math.min(5, frequencySliderValue / 20));
                      const y = 40 + amp * Math.sin((x / 400) * Math.PI * 2 * freq);
                      return `L ${x},${y}`;
                    }).join(' ')}`}
                    stroke={bgStyle.color}
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>

          {/* Wavelength Value */}
          <Card className="border-2" style={{ borderColor: bgStyle.color, backgroundColor: 'transparent' }}>
            <CardContent className="p-6">
              <div className="text-sm font-semibold mb-2 opacity-70">WAVELENGTH</div>
              <div className="text-4xl font-bold font-mono" data-testid="text-wavelength">
                {formatScientific(wavelength)} m
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sliders Section */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card className="border-2" style={{ borderColor: bgStyle.color, backgroundColor: 'transparent' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold opacity-70">FREQUENCY</div>
                <div className="text-2xl font-bold font-mono" data-testid="text-frequency">
                  {formatScientific(frequency)} Hz
                </div>
              </div>
              <Slider
                value={[frequencySliderValue]}
                onValueChange={handleFrequencySliderChange}
                min={0}
                max={100}
                step={0.1}
                className="w-full"
                data-testid="slider-frequency"
              />
            </CardContent>
          </Card>

          <Card className="border-2" style={{ borderColor: bgStyle.color, backgroundColor: 'transparent' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold opacity-70">ENERGY</div>
                <div className="text-2xl font-bold font-mono" data-testid="text-energy">
                  {formatScientific(energy)} J
                </div>
              </div>
              <div className="text-sm opacity-70 mt-2">
                E = hf (h = {PLANCK_CONSTANT.toExponential(2)} J·s)
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section - Practical Uses */}
        <Card className="border-2 mb-6" style={{ borderColor: bgStyle.color, backgroundColor: 'transparent' }}>
          <CardContent className="p-6">
            <div className="text-sm font-semibold mb-4 opacity-70">REAL-LIFE APPLICATIONS & USES</div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {waveData.practicalUses.map((use, idx) => (
                <div key={idx} className="text-base" data-testid={`text-use-${idx}`}>
                  • {use}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Subtypes */}
        <Card className="border-2 mb-6" style={{ borderColor: bgStyle.color, backgroundColor: 'transparent' }}>
          <CardContent className="p-6">
            <div className="text-sm font-semibold mb-4 opacity-70">DETAILED SUBTYPES</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {waveData.subtypes.map((subtype, idx) => (
                <div key={idx} className="p-4 border rounded-lg" style={{ borderColor: bgStyle.color }}>
                  <div className="font-bold text-lg mb-1">{subtype.name}</div>
                  <div className="text-sm opacity-70 mb-2">{subtype.wavelengthRange}</div>
                  <div className="text-sm mb-2">{subtype.description}</div>
                  <div className="text-xs space-y-1">
                    {subtype.uses.map((use, useIdx) => (
                      <div key={useIdx}>• {use}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health & Safety Information */}
        <Card className="border-2 mb-6" style={{ borderColor: bgStyle.color, backgroundColor: 'transparent' }}>
          <CardContent className="p-6">
            <div className="text-sm font-semibold mb-4 opacity-70">HEALTH & SAFETY INFORMATION</div>
            <div className="space-y-4">
              <div>
                <div className="font-semibold mb-2">Health Effects:</div>
                <div className="opacity-90" data-testid="text-health-effects">{waveData.healthEffects}</div>
              </div>
              <div>
                <div className="font-semibold mb-2">Protection Methods:</div>
                <div className="opacity-90" data-testid="text-protection">{waveData.protection}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reset Button */}
        <div className="flex justify-center">
          <Button 
            onClick={handleReset}
            variant="outline"
            className="gap-2"
            style={{ 
              borderColor: bgStyle.color,
              color: bgStyle.color,
              backgroundColor: 'transparent'
            }}
            data-testid="button-reset"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Visible Light
          </Button>
        </div>
      </div>
    </div>
  );
}
