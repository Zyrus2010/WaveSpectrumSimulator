import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Sun, Moon, Zap, Activity } from 'lucide-react';
import WaveCanvas from '@/components/WaveCanvas';
import ParticleField from '@/components/ParticleField';

const SPEED_OF_LIGHT = 3e8;
const PLANCK_CONSTANT = 6.626e-34;
const MIN_FREQUENCY = 1e3;
const MAX_FREQUENCY = 1e20;

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [frequency, setFrequency] = useState(5e14);
  const [wavelength, setWavelength] = useState(6e-7);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    setIsDark(true);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

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

  const getWaveInfo = (wl: number) => {
    if (wl >= 1e-1) return { type: 'Radio Wave', color: 'from-red-500 to-pink-500', icon: '📡' };
    if (wl >= 1e-3) return { type: 'Radio Wave', color: 'from-orange-500 to-red-500', icon: '📻' };
    if (wl >= 1e-6) return { type: 'Microwave', color: 'from-yellow-500 to-orange-500', icon: '📶' };
    if (wl >= 7e-7) return { type: 'Infrared', color: 'from-red-400 to-orange-400', icon: '🌡️' };
    if (wl >= 4e-7) return { type: 'Visible Light', color: 'from-violet-500 via-blue-500 via-green-500 via-yellow-500 to-red-500', icon: '🌈' };
    if (wl >= 1e-8) return { type: 'Ultraviolet', color: 'from-purple-500 to-violet-500', icon: '☀️' };
    if (wl >= 1e-11) return { type: 'X-Ray', color: 'from-blue-600 to-purple-600', icon: '⚡' };
    return { type: 'Gamma Ray', color: 'from-purple-700 to-pink-700', icon: '☢️' };
  };

  const waveInfo = getWaveInfo(wavelength);

  const formatScientific = (value: number): string => {
    return value.toExponential(2);
  };

  const isDangerous = wavelength < 1e-6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <ParticleField />
      </div>

      <div className="relative z-10">
        <nav className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-light text-white tracking-wide" data-testid="text-title">
                EM Spectrum Lab
              </h1>
              <p className="text-xs text-purple-300">Interactive Wave Visualizer</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-white hover-elevate"
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="gap-2 border-purple-500/30 text-purple-200 hover:bg-purple-500/10"
              data-testid="button-reset"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 pt-8 pb-16">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-3xl"></div>
            <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="absolute top-4 right-4 z-20">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-2 text-sm">
                  {waveInfo.icon} {waveInfo.type}
                </Badge>
              </div>
              <div className="h-[60vh] min-h-[400px] relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>
                <WaveCanvas frequency={frequency} wavelength={wavelength} />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 mb-8 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-white text-lg font-medium flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-400" />
                    Frequency
                  </label>
                  <div className="px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30">
                    <span className="font-mono text-sm text-purple-200">
                      {formatScientific(frequency)} Hz
                    </span>
                  </div>
                </div>
                <Slider
                  value={[frequencySliderValue]}
                  onValueChange={handleFrequencySliderChange}
                  min={0}
                  max={100}
                  step={0.1}
                  className="mb-3"
                  data-testid="slider-frequency"
                />
                <div className="flex justify-between text-xs text-purple-300">
                  <span>Low Energy</span>
                  <span>High Energy</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-white text-lg font-medium flex items-center gap-2">
                    <Activity className="w-5 h-5 text-pink-400" />
                    Wavelength
                  </label>
                  <div className="px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/30">
                    <span className="font-mono text-sm text-pink-200">
                      {formatScientific(wavelength)} m
                    </span>
                  </div>
                </div>
                <Slider
                  value={[wavelengthSliderValue]}
                  onValueChange={handleWavelengthSliderChange}
                  min={0}
                  max={100}
                  step={0.1}
                  className="mb-3"
                  data-testid="slider-wavelength"
                />
                <div className="flex justify-between text-xs text-pink-300">
                  <span>Short Waves</span>
                  <span>Long Waves</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20 p-6">
              <h3 className="text-purple-200 text-sm uppercase tracking-wider mb-4">Wave Properties</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-purple-300 mb-1">Energy</div>
                  <div className="text-2xl font-mono text-white" data-testid="text-energy">
                    {formatScientific(energy)} J
                  </div>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <div className="text-xs text-purple-300 mb-1">Frequency</div>
                  <div className="text-lg font-mono text-white" data-testid="text-frequency">
                    {formatScientific(frequency)} Hz
                  </div>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <div className="text-xs text-purple-300 mb-1">Wavelength</div>
                  <div className="text-lg font-mono text-white" data-testid="text-wavelength">
                    {formatScientific(wavelength)} m
                  </div>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20 p-6">
              <h3 className="text-blue-200 text-sm uppercase tracking-wider mb-4">Classification</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-blue-300 mb-2">Wave Type</div>
                  <div className={`text-xl font-semibold bg-gradient-to-r ${waveInfo.color} bg-clip-text text-transparent`} data-testid="text-wave-type">
                    {waveInfo.type}
                  </div>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <div className="text-xs text-blue-300 mb-2">Energy Level</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-300"
                        style={{ width: `${(frequencySliderValue)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-white font-mono">{Math.round(frequencySliderValue)}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`backdrop-blur-xl rounded-2xl border p-6 ${
              isDangerous 
                ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-500/30' 
                : 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20'
            }`}>
              <h3 className={`text-sm uppercase tracking-wider mb-4 ${isDangerous ? 'text-red-200' : 'text-green-200'}`}>
                Safety Status
              </h3>
              <div className="space-y-4">
                {isDangerous ? (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">⚠️</span>
                      </div>
                      <div>
                        <div className="text-white font-medium mb-1">Caution Required</div>
                        <div className="text-sm text-red-200" data-testid="text-warning">
                          High-energy radiation can be harmful
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">✓</span>
                      </div>
                      <div>
                        <div className="text-white font-medium mb-1">Generally Safe</div>
                        <div className="text-sm text-green-200">
                          Low-energy radiation exposure
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
            <h3 className="text-white text-sm uppercase tracking-wider mb-4">Energy-Frequency Relationship</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="text-3xl font-mono text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                  E = hf
                </div>
                <div className="text-sm text-purple-300 mt-2">
                  Where h = {PLANCK_CONSTANT.toExponential(3)} J·s (Planck's constant)
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-purple-300 mb-1">Current Energy</div>
                <div className="text-xl font-mono text-white">
                  {formatScientific(energy)} J
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
