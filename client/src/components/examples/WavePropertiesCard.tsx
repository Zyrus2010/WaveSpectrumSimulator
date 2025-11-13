import WavePropertiesCard from '../WavePropertiesCard';

export default function WavePropertiesCardExample() {
  return (
    <WavePropertiesCard 
      frequency={5e14} 
      wavelength={6e-7} 
      energy={3.31e-19}
    />
  );
}
