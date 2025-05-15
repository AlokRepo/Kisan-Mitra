
// src/lib/image-config.ts

// Define ImageInfo type locally
interface ImageInfo {
  src: string;
  aiHint: string;
}

export const APP_IMAGES: Record<string, ImageInfo | ImageInfo[]> = {
  // Crops (300x200)
  WHEAT: [
    { src: "https://cdn.pixabay.com/photo/2020/07/10/20/25/wheat-field-5392067_1280.jpg", aiHint: "wheat field" },
    { src: "https://placehold.co/300x200.png?text=Wheat+Harvest", aiHint: "wheat harvest" },
    { src: "https://placehold.co/300x200.png?text=Golden+Wheat", aiHint: "golden wheat" },
  ],
  RICE: { src: "https://placehold.co/300x200.png", aiHint: "rice paddy" },
  MAIZE: { src: "https://placehold.co/300x200.png", aiHint: "corn field" },
  COTTON: { src: "https://placehold.co/300x200.png", aiHint: "cotton plant" },
  SUGARCANE: { src: "https://placehold.co/300x200.png", aiHint: "sugarcane field" },
  SOYBEAN: { src: "https://placehold.co/300x200.png", aiHint: "soybean plant" },
  PULSES: { src: "https://placehold.co/300x200.png", aiHint: "lentils dal" },
  MUSTARD: { src: "https://placehold.co/300x200.png", aiHint: "mustard field" },
  GROUNDNUT: { src: "https://placehold.co/300x200.png", aiHint: "groundnuts crop" },
  DEFAULT_CROP: { src: "https://placehold.co/300x200.png", aiHint: "agriculture product" },

  // Mandi/Market (300x200 for cards)
  DEFAULT_MANDI: { src: "https://placehold.co/300x200.png", aiHint: "market agriculture" },
  
  // Education Page - Guides (600x400 for main display, can be reused for smaller cards if needed)
  GUIDE_PRICE_FLUCTUATIONS: { src: "https://placehold.co/600x400.png", aiHint: "market chart" },
  GUIDE_APP_USAGE: { src: "https://placehold.co/600x400.png", aiHint: "app interface" },

  // Education Page & Schemes Page - Schemes (600x400 for main display, 400x250 for cards)
  SCHEME_PM_KISAN: { src: "https://placehold.co/600x400.png", aiHint: "government building" }, // Used on education
  SCHEME_E_NAM: { src: "https://placehold.co/600x400.png", aiHint: "digital india" }, // Used on education
  
  SCHEME_PM_KISAN_CARD: { src: "https://placehold.co/400x250.png", aiHint: "farmer finance" },
  SCHEME_E_NAM_CARD: { src: "https://placehold.co/400x250.png", aiHint: "market online" },
  SCHEME_CROP_INSURANCE_CARD: { src: "https://placehold.co/400x250.png", aiHint: "insurance protection" },
  SCHEME_SOIL_HEALTH_CARD: { src: "https://placehold.co/400x250.png", aiHint: "soil health" },
  SCHEME_GENERIC_1: { src: "https://placehold.co/400x250.png", aiHint: "government program" },
  SCHEME_GENERIC_2: { src: "https://placehold.co/400x250.png", aiHint: "community benefit" },
  SCHEME_GENERIC_3: { src: "https://placehold.co/400x250.png", aiHint: "rural development" },
  SCHEME_GENERIC_4: { src: "https://placehold.co/400x250.png", aiHint: "farmer support" },


  // New Home Page Images
  HOME_HERO_BANNER: { src: "https://placehold.co/1200x400.png", aiHint: "indian agriculture panoramic" },
  HOME_SCHEME_PM_KISAN: { src: "https://placehold.co/400x250.png", aiHint: "government scheme farmer" }, // For smaller cards on home page
  HOME_SCHEME_E_NAM: { src: "https://placehold.co/400x250.png", aiHint: "digital market agriculture" }, // For smaller cards on home page
};

export type AppImageKey = keyof typeof APP_IMAGES; // This type might not be directly usable for indexing if keys are dynamic strings

// Helper function to get image data by crop name string
export function getCropImageDetails(cropName: string, indexHint: number = 0): ImageInfo {
  const upperCropName = cropName.toUpperCase().replace(/\s+/g, '_'); 
  // Check if upperCropName is a valid key in APP_IMAGES to satisfy TypeScript
  const imageEntry = APP_IMAGES[upperCropName as AppImageKey] || APP_IMAGES.DEFAULT_CROP;

  if (Array.isArray(imageEntry)) {
    return imageEntry[indexHint % imageEntry.length];
  }
  // If it's not an array, it should be a single ImageInfo object.
  // The type of APP_IMAGES allows ImageInfo | ImageInfo[], so this cast is safe here.
  return imageEntry as ImageInfo; 
}
