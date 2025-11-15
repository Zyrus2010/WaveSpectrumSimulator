// Import comparison images
import buildingImg from '@assets/stock_images/transparent_building_c37cb0af.jpg';
import mountainImg from '@assets/stock_images/transparent_mountain_520cd7bd.jpg';
import humanImg from '@assets/stock_images/transparent_human_pe_c7b1d49f.jpg';
import laptopImg from '@assets/stock_images/transparent_book_lap_75089a69.jpg';
import dnaImg from '@assets/stock_images/transparent_dna_mole_be23b261.jpg';
import virusImg from '@assets/stock_images/transparent_virus_ba_2644fd8f.jpg';

export const comparisonAssets: Record<string, string> = {
  // Radio Waves
  'Mount Everest (8.8 km)': mountainImg,
  'Skyscraper cluster': buildingImg,
  '10-story building': buildingImg,
  'Human height': humanImg,
  'Book or laptop': laptopImg,
  'Finger': humanImg, // fallback
  'Grain of rice': laptopImg, // fallback
  
  // Microwaves
  'Ruler': laptopImg,
  'Coffee mug': laptopImg,
  'Golf ball': laptopImg,
  'Matchbox': laptopImg,
  'Coin': laptopImg,
  'Paperclip': laptopImg,
  'Pea': laptopImg,
  
  // Infrared
  'Red blood cell': virusImg,
  'Bacterium': virusImg,
  'Grain of dust': virusImg,
  
  // Visible Light
  'Virus particle': virusImg,
  'Protein molecule': dnaImg,
  'DNA helix width': dnaImg,
  'Chlorophyll molecule': dnaImg,
  'Small molecule cluster': dnaImg,
  'Large atom diameter': dnaImg,
  'Hydrogen atom diameter': dnaImg,
  
  // Ultraviolet
  'Virus capsid': virusImg,
  'Protein complex': dnaImg,
  'Small molecule': dnaImg,
  
  // X-rays
  'DNA strand width': dnaImg,
  'Water molecule': dnaImg,
  
  // Gamma rays
  'Atomic nucleus': dnaImg
};

export function getComparisonImage(comparison: string): string {
  return comparisonAssets[comparison] || laptopImg; // fallback to laptop image
}
