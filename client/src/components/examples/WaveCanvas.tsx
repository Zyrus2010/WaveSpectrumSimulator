import WaveCanvas from '../WaveCanvas';

export default function WaveCanvasExample() {
  return (
    <div className="w-full h-64 bg-card rounded-lg">
      <WaveCanvas frequency={5e14} wavelength={6e-7} />
    </div>
  );
}
