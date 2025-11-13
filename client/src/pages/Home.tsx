import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RotateCcw, Sun, Moon } from 'lucide-react';
import WaveCanvas from '@/components/WaveCanvas';
import WavePropertiesCard from '@/components/WavePropertiesCard';
import WaveClassificationCard from '@/components/WaveClassificationCard';
import ApplicationsCard from '@/components/ApplicationsCard';
import MathGraph from '@/components/MathGraph';

const SPEED_OF_LIGHT = 3e8;
const PLANCK_CONSTANT = 6.626e-34;
const MIN_FREQUENCY = 1e3;
const MAX_FREQUENCY = 1e20;

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [frequency, setFrequency] = useState(5e14);
  const [wavelength, setWavelength] = useState(6e-7);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleFrequencyChange = (value: number[]) => {
    const newFrequency = value[0];
    setFrequency(newFrequency);
    setWavelength(SPEED_OF_LIGHT / newFrequency);
  };

  const handleWavelengthChange = (value: number[]) => {
    const newWavelength = value[0];
    setWavelength(newWavelength);
    setFrequency(SPEED_OF_LIGHT / newWavelength);
  };

  const handleReset = () => {
    setFrequency(5e14);
    setWavelength(6e-7);
  };

  const energy = PLANCK_CONSTANT * frequency;

  const frequencyLog = Math.log10(frequency);
  const frequencySliderValue = ((frequencyLog - Math.log10(MIN_FREQUENCY)) / (Math.log10(MAX_FREQUENCY) - Math.log10(MIN_FREQUENCY))) * 100;

  const wavelengthLog = Math.log10(wavelength);
  const minWavelengthLog = Math.log10(SPEED_OF_LIGHT / MAX_FREQUENCY);
  const maxWavelengthLog = Math.log10(SPEED_OF_LIGHT / MIN_FREQUENCY);
  const wavelengthSliderValue = ((wavelengthLog - minWavelengthLog) / (maxWavelengthLog - minWavelengthLog)) * 100;

  const handleFrequencySliderChange = (value: number[]) => {
    const sliderPercent = value[0];
    const logFreq = Math.log10(MIN_FREQUENCY) + (sliderPercent / 100) * (Math.log10(MAX_FREQUENCY) - Math.log10(MIN_FREQUENCY));
    const newFrequency = Math.pow(10, logFreq);
    handleFrequencyChange([newFrequency]);
  };

  const handleWavelengthSliderChange = (value: number[]) => {
    const sliderPercent = value[0];
    const logWavelength = minWavelengthLog + (sliderPercent / 100) * (maxWavelengthLog - minWavelengthLog);
    const newWavelength = Math.pow(10, logWavelength);
    handleWavelengthChange([newWavelength]);
  };

  const getBackgroundGradient = () => {
    const wavelengthInNm = wavelength * 1e9;
    
    if (wavelengthInNm >= 380 && wavelengthInNm <= 750) {
      if (wavelengthInNm >= 620) return 'from-red-500/10 to-red-500/5';
      if (wavelengthInNm >= 590) return 'from-orange-500/10 to-orange-500/5';
      if (wavelengthInNm >= 570) return 'from-yellow-500/10 to-yellow-500/5';
      if (wavelengthInNm >= 495) return 'from-green-500/10 to-green-500/5';
      if (wavelengthInNm >= 450) return 'from-blue-500/10 to-blue-500/5';
      return 'from-violet-500/10 to-violet-500/5';
    }
    
    if (wavelengthInNm < 380) return 'from-purple-600/10 to-purple-600/5';
    return 'from-primary/10 to-primary/5';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-colors duration-500`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-light tracking-tight" data-testid="text-title">
              Electromagnetic Wave Visualizer
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Interactive exploration of frequency, wavelength, and energy relationships
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="gap-2"
              data-testid="button-reset"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </header>

        <div className="bg-card rounded-lg shadow-md mb-6 overflow-hidden">
          <div className="h-64 sm:h-80 bg-background/50">
            <WaveCanvas frequency={frequency} wavelength={wavelength} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-card rounded-lg p-6 shadow-md">
            <div className="mb-4">
              <div className="flex items-baseline justify-between mb-2">
                <label className="text-lg font-medium">Frequency</label>
                <div className="font-mono text-sm text-muted-foreground">
                  {frequency.toExponential(2)} Hz
                </div>
              </div>
              <Slider
                value={[frequencySliderValue]}
                onValueChange={handleFrequencySliderChange}
                min={0}
                max={100}
                step={0.1}
                className="mb-2"
                data-testid="slider-frequency"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>10³ Hz</span>
                <span>10²⁰ Hz</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-md">
            <div className="mb-4">
              <div className="flex items-baseline justify-between mb-2">
                <label className="text-lg font-medium">Wavelength</label>
                <div className="font-mono text-sm text-muted-foreground">
                  {wavelength.toExponential(2)} m
                </div>
              </div>
              <Slider
                value={[wavelengthSliderValue]}
                onValueChange={handleWavelengthSliderChange}
                min={0}
                max={100}
                step={0.1}
                className="mb-2"
                data-testid="slider-wavelength"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>10⁻¹² m</span>
                <span>10⁵ m</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <WavePropertiesCard
            frequency={frequency}
            wavelength={wavelength}
            energy={energy}
          />
          <WaveClassificationCard wavelength={wavelength} />
          <ApplicationsCard wavelength={wavelength} />
        </div>

        <MathGraph energy={energy} frequency={frequency} />
      </div>
    </div>
  );
}
