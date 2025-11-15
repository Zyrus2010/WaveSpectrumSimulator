/**
 * Compute normalized amplitude based on wavelength
 * Uses logarithmic scaling to handle the vast range of wavelengths
 * from atomic nuclei (~1e-15m) to radio waves (~1e5m)
 */
export function computeNormalizedAmplitude(wavelength: number): number {
  // Define the range of wavelengths we're dealing with
  const MIN_WAVELENGTH = 1e-15; // Gamma rays (atomic nucleus)
  const MAX_WAVELENGTH = 1e5;    // Long radio waves (100 km)
  
  // Clamp wavelength to valid range
  const clampedWavelength = Math.max(MIN_WAVELENGTH, Math.min(MAX_WAVELENGTH, wavelength));
  
  // Use log10 to compress the range
  const logWavelength = Math.log10(clampedWavelength);
  const logMin = Math.log10(MIN_WAVELENGTH);
  const logMax = Math.log10(MAX_WAVELENGTH);
  
  // Normalize to 0-1 range
  const normalized = (logWavelength - logMin) / (logMax - logMin);
  
  return normalized;
}

/**
 * Convert normalized amplitude (0-1) to canvas pixels
 * @param normalized - Value between 0 and 1
 * @param canvasHeight - Height of the canvas in pixels
 * @param minAmplitude - Minimum amplitude as fraction of canvas height (default 0.1)
 * @param maxAmplitude - Maximum amplitude as fraction of canvas height (default 0.4)
 */
export function amplitudeToPixels(
  normalized: number,
  canvasHeight: number,
  minAmplitude: number = 0.1,
  maxAmplitude: number = 0.4
): number {
  const amplitudeFraction = minAmplitude + (normalized * (maxAmplitude - minAmplitude));
  return canvasHeight * amplitudeFraction;
}

/**
 * Linear interpolation for smooth transitions
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
