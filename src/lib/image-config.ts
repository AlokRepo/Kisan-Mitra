// src/lib/image-config.ts
export const APP_IMAGES = {
  // Crops (300x200)
  WHEAT: { src: "https://placehold.co/300x200.png", aiHint: "wheat field" },
  RICE: { src: "https://placehold.co/300x200.png", aiHint: "rice paddy" },
  MAIZE: { src: "https://placehold.co/300x200.png", aiHint: "corn field" },
  COTTON: { src: "https://placehold.co/300x200.png", aiHint: "cotton plant" },
  SUGARCANE: { src: "https://placehold.co/300x200.png", aiHint: "sugarcane field" },
  SOYBEAN: { src: "https://placehold.co/300x200.png", aiHint: "soybean plant" },
  PULSES: { src: "https://placehold.co/300x200.png", aiHint: "lentils dal" },
  DEFAULT_CROP: { src: "https://placehold.co/300x200.png", aiHint: "agriculture product" },

  // Mandi/Market (300x200 for cards)
  DEFAULT_MANDI: { src: "https://placehold.co/300x200.png", aiHint: "market agriculture" },
  
  // Education Page - Guides (600x400)
  GUIDE_PRICE_FLUCTUATIONS: { src: "https://placehold.co/600x400.png", aiHint: "market chart" },
  GUIDE_APP_USAGE: { src: "https://placehold.co/600x400.png", aiHint: "app interface" },

  // Education Page - Schemes (600x400)
  SCHEME_PM_KISAN: { src: "https://placehold.co/600x400.png", aiHint: "government building" },
  SCHEME_E_NAM: { src: "https://placehold.co/600x400.png", aiHint: "digital india" },
};

export type AppImageKey = keyof typeof APP_IMAGES;

// Helper function to get image data by crop name string
export function getCropImageDetails(cropName: string): { src: string; aiHint: string } {
  const upperCropName = cropName.toUpperCase().replace(/\s+/g, '_') as AppImageKey; // Handle spaces in crop names if any for key lookup
  if (APP_IMAGES[upperCropName]) {
    return APP_IMAGES[upperCropName];
  }
  return APP_IMAGES.DEFAULT_CROP;
}
