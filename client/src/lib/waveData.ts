export interface WaveSubcategory {
  name: string;
  wavelengthMin: number;
  wavelengthMax: number;
  frequencyMin: number;
  frequencyMax: number;
  comparison: string;
  healthInfo?: string;
}

export interface WaveCategory {
  type: string;
  icon: string;
  subcategories: WaveSubcategory[];
}

export const waveCategories: WaveCategory[] = [
  {
    type: "Radio Waves",
    icon: "📡",
    subcategories: [
      {
        name: "Longwave (LW)",
        wavelengthMin: 1000,
        wavelengthMax: 100000,
        frequencyMin: 3000,
        frequencyMax: 300000,
        comparison: "Mount Everest (8.8 km)",
        healthInfo: "Generally safe; used in long-distance broadcasting"
      },
      {
        name: "Mediumwave (MW)",
        wavelengthMin: 100,
        wavelengthMax: 1000,
        frequencyMin: 300000,
        frequencyMax: 3000000,
        comparison: "Skyscraper cluster",
        healthInfo: "Safe at broadcast levels; AM radio frequencies"
      },
      {
        name: "Shortwave (SW)",
        wavelengthMin: 10,
        wavelengthMax: 100,
        frequencyMin: 3000000,
        frequencyMax: 30000000,
        comparison: "10-story building",
        healthInfo: "Safe; used for international broadcasting"
      },
      {
        name: "VHF",
        wavelengthMin: 1,
        wavelengthMax: 10,
        frequencyMin: 30000000,
        frequencyMax: 300000000,
        comparison: "Human height",
        healthInfo: "Safe; used in FM radio and TV broadcasts"
      },
      {
        name: "UHF",
        wavelengthMin: 0.1,
        wavelengthMax: 1,
        frequencyMin: 300000000,
        frequencyMax: 3000000000,
        comparison: "Book or laptop",
        healthInfo: "Generally safe; used in mobile phones and WiFi"
      },
      {
        name: "SHF",
        wavelengthMin: 0.01,
        wavelengthMax: 0.1,
        frequencyMin: 3000000000,
        frequencyMax: 30000000000,
        comparison: "Finger",
        healthInfo: "Safe at low power; used in satellite communications"
      },
      {
        name: "EHF",
        wavelengthMin: 0.001,
        wavelengthMax: 0.01,
        frequencyMin: 30000000000,
        frequencyMax: 300000000000,
        comparison: "Grain of rice",
        healthInfo: "Absorbed by atmosphere; used in 5G and radar"
      }
    ]
  },
  {
    type: "Microwaves",
    icon: "🍲",
    subcategories: [
      {
        name: "L-band",
        wavelengthMin: 0.15,
        wavelengthMax: 0.3,
        frequencyMin: 1000000000,
        frequencyMax: 2000000000,
        comparison: "Ruler",
        healthInfo: "Safe; used in GPS and mobile satellites"
      },
      {
        name: "S-band",
        wavelengthMin: 0.08,
        wavelengthMax: 0.15,
        frequencyMin: 2000000000,
        frequencyMax: 4000000000,
        comparison: "Coffee mug",
        healthInfo: "Safe; weather radar and some communications"
      },
      {
        name: "C-band",
        wavelengthMin: 0.04,
        wavelengthMax: 0.08,
        frequencyMin: 4000000000,
        frequencyMax: 8000000000,
        comparison: "Golf ball",
        healthInfo: "Safe; satellite TV and WiFi"
      },
      {
        name: "X-band",
        wavelengthMin: 0.025,
        wavelengthMax: 0.04,
        frequencyMin: 8000000000,
        frequencyMax: 12000000000,
        comparison: "Matchbox",
        healthInfo: "Safe at normal levels; radar and satellite imaging"
      },
      {
        name: "Ku-band",
        wavelengthMin: 0.017,
        wavelengthMax: 0.025,
        frequencyMin: 12000000000,
        frequencyMax: 18000000000,
        comparison: "Coin",
        healthInfo: "Safe; satellite broadcasting"
      },
      {
        name: "K-band",
        wavelengthMin: 0.01,
        wavelengthMax: 0.017,
        frequencyMin: 18000000000,
        frequencyMax: 27000000000,
        comparison: "Paperclip",
        healthInfo: "Minimal exposure; automotive radar"
      },
      {
        name: "Ka-band",
        wavelengthMin: 0.0075,
        wavelengthMax: 0.011,
        frequencyMin: 27000000000,
        frequencyMax: 40000000000,
        comparison: "Pea",
        healthInfo: "Limited exposure; high-frequency satellite links"
      }
    ]
  },
  {
    type: "Infrared",
    icon: "🔥",
    subcategories: [
      {
        name: "Near-infrared (NIR)",
        wavelengthMin: 7e-7,
        wavelengthMax: 1.4e-6,
        frequencyMin: 215000000000000,
        frequencyMax: 430000000000000,
        comparison: "Red blood cell",
        healthInfo: "Safe; used in remote controls and fiber optics"
      },
      {
        name: "Mid-infrared (MIR)",
        wavelengthMin: 1.4e-6,
        wavelengthMax: 3e-6,
        frequencyMin: 100000000000000,
        frequencyMax: 215000000000000,
        comparison: "Bacterium",
        healthInfo: "Thermal radiation; warming effect on skin"
      },
      {
        name: "Far-infrared (FIR)",
        wavelengthMin: 3e-6,
        wavelengthMax: 1e-3,
        frequencyMin: 300000000000,
        frequencyMax: 100000000000000,
        comparison: "Grain of dust",
        healthInfo: "Heat sensation; used in thermal imaging"
      }
    ]
  },
  {
    type: "Visible Light",
    icon: "🌈",
    subcategories: [
      {
        name: "Red",
        wavelengthMin: 6.2e-7,
        wavelengthMax: 7.5e-7,
        frequencyMin: 400000000000000,
        frequencyMax: 480000000000000,
        comparison: "Virus particle",
        healthInfo: "Safe; longest visible wavelength"
      },
      {
        name: "Orange",
        wavelengthMin: 5.9e-7,
        wavelengthMax: 6.2e-7,
        frequencyMin: 480000000000000,
        frequencyMax: 510000000000000,
        comparison: "Protein molecule",
        healthInfo: "Safe; warm color perception"
      },
      {
        name: "Yellow",
        wavelengthMin: 5.7e-7,
        wavelengthMax: 5.9e-7,
        frequencyMin: 510000000000000,
        frequencyMax: 530000000000000,
        comparison: "DNA helix width",
        healthInfo: "Safe; peak sensitivity of human eye"
      },
      {
        name: "Green",
        wavelengthMin: 4.95e-7,
        wavelengthMax: 5.7e-7,
        frequencyMin: 530000000000000,
        frequencyMax: 600000000000000,
        comparison: "Chlorophyll molecule",
        healthInfo: "Safe; most visible to human eye"
      },
      {
        name: "Blue",
        wavelengthMin: 4.5e-7,
        wavelengthMax: 4.95e-7,
        frequencyMin: 600000000000000,
        frequencyMax: 670000000000000,
        comparison: "Small molecule cluster",
        healthInfo: "Safe; may affect sleep patterns with prolonged exposure"
      },
      {
        name: "Indigo",
        wavelengthMin: 4.25e-7,
        wavelengthMax: 4.5e-7,
        frequencyMin: 670000000000000,
        frequencyMax: 700000000000000,
        comparison: "Large atom diameter",
        healthInfo: "Safe; deep blue perception"
      },
      {
        name: "Violet",
        wavelengthMin: 3.8e-7,
        wavelengthMax: 4.25e-7,
        frequencyMin: 700000000000000,
        frequencyMax: 790000000000000,
        comparison: "Hydrogen atom diameter",
        healthInfo: "Safe; shortest visible wavelength"
      }
    ]
  },
  {
    type: "Ultraviolet",
    icon: "✨",
    subcategories: [
      {
        name: "UV-A",
        wavelengthMin: 3.15e-7,
        wavelengthMax: 4e-7,
        frequencyMin: 790000000000000,
        frequencyMax: 950000000000000,
        comparison: "Virus capsid",
        healthInfo: "Caution: Causes skin aging and tanning; most UV from sun"
      },
      {
        name: "UV-B",
        wavelengthMin: 2.8e-7,
        wavelengthMax: 3.15e-7,
        frequencyMin: 950000000000000,
        frequencyMax: 1070000000000000,
        comparison: "Protein complex",
        healthInfo: "Danger: Causes sunburn and skin cancer; partly blocked by ozone"
      },
      {
        name: "UV-C",
        wavelengthMin: 1e-7,
        wavelengthMax: 2.8e-7,
        frequencyMin: 1070000000000000,
        frequencyMax: 3000000000000000,
        comparison: "Small molecule",
        healthInfo: "Harmful: Germicidal; blocked by atmosphere; damages DNA"
      }
    ]
  },
  {
    type: "X-rays",
    icon: "🩻",
    subcategories: [
      {
        name: "Soft X-rays",
        wavelengthMin: 1e-10,
        wavelengthMax: 1e-8,
        frequencyMin: 30000000000000000,
        frequencyMax: 3000000000000000000,
        comparison: "DNA strand width",
        healthInfo: "Hazardous: Ionizing radiation; medical imaging uses minimal doses"
      },
      {
        name: "Hard X-rays",
        wavelengthMin: 1e-11,
        wavelengthMax: 1e-10,
        frequencyMin: 3000000000000000000,
        frequencyMax: 30000000000000000000,
        comparison: "Water molecule",
        healthInfo: "Dangerous: High-energy ionizing; cancer treatment and imaging"
      }
    ]
  },
  {
    type: "Gamma Rays",
    icon: "⚛️",
    subcategories: [
      {
        name: "Gamma rays",
        wavelengthMin: 0,
        wavelengthMax: 1e-11,
        frequencyMin: 30000000000000000000,
        frequencyMax: Infinity,
        comparison: "Atomic nucleus",
        healthInfo: "Extremely dangerous: High-energy ionizing; used in cancer therapy and sterilization"
      }
    ]
  }
];

export function getWaveInfo(wavelength: number): {
  category: WaveCategory;
  subcategory: WaveSubcategory;
} | null {
  for (const category of waveCategories) {
    for (const subcategory of category.subcategories) {
      if (wavelength >= subcategory.wavelengthMin && wavelength <= subcategory.wavelengthMax) {
        return { category, subcategory };
      }
    }
  }
  
  // Fallback for gamma rays (very small wavelengths)
  if (wavelength < 1e-11) {
    return {
      category: waveCategories[waveCategories.length - 1],
      subcategory: waveCategories[waveCategories.length - 1].subcategories[0]
    };
  }
  
  // Fallback for very long wavelengths
  if (wavelength > 100000) {
    return {
      category: waveCategories[0],
      subcategory: waveCategories[0].subcategories[0]
    };
  }
  
  return null;
}
