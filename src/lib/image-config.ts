
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
    { src: "https://cdn.pixabay.com/photo/2014/06/20/19/36/wheat-crops-373360_1280.jpg?text=Wheat+Bales", aiHint: "wheat bales" },
    { src: "https://placehold.co/300x200.png?text=Close-up+Wheat", aiHint: "closeup wheat" },
  ],
  RICE: [
    { src: "https://cdn.pixabay.com/photo/2017/08/25/05/30/in-rice-field-2679153_1280.jpg?text=Rice+Paddy", aiHint: "rice paddy" },
    { src: "https://cdn.pixabay.com/photo/2021/10/10/11/14/ch-6696389_1280.jpg?text=Harvested+Rice", aiHint: "harvested rice" },
    { src: "https://placehold.co/300x200.png?text=Rice+Grains", aiHint: "rice grains" }, // Corrected Placehold.co URL
  ],
  MAIZE: [
    { src: "https://cdn.pixabay.com/photo/2019/09/25/14/12/maize-4503781_1280.jpg?text=Corn+Field", aiHint: "corn field" },
    { src: "https://cdn.pixabay.com/photo/2019/09/20/04/16/maize-4490754_1280.jpg?text=Corn+Cobs", aiHint: "corn cobs" },
    { src: "https://cdn.pixabay.com/photo/2020/08/04/14/57/maize-5463051_1280.jpg?text=Maize+Growth", aiHint: "maize growth" },
  ],
  COTTON: [
    { src: "https://cdn.pixabay.com/photo/2020/03/02/19/13/cotton-flower-4896622_1280.jpg?text=Cotton+Plant", aiHint: "cotton plant" },
    { src: "https://cdn.pixabay.com/photo/2020/01/26/12/37/cotton-grass-4794532_1280.jpg?text=Cotton+Boll", aiHint: "cotton boll" },
    { src: "https://cdn.pixabay.com/photo/2017/05/08/17/03/grass-2295888_1280.jpg?text=Cotton+Field", aiHint: "cotton field" },
  ],
  SUGARCANE: [
    { src: "https://cdn.pixabay.com/photo/2013/12/04/16/28/sugarcane-223457_1280.jpg?text=Sugarcane+Field", aiHint: "sugarcane field" },
    { src: "https://cdn.pixabay.com/photo/2020/07/09/20/00/sugarcane-5388614_1280.jpg?text=Sugarcane+Stalks", aiHint: "sugarcane stalks" },
    { src: "https://cdn.pixabay.com/photo/2017/10/16/17/58/sugarcane-2857972_1280.jpg?text=Harvested+Sugarcane", aiHint: "harvested sugarcane" },
  ],
  SOYBEAN: [
    { src: "https://cdn.pixabay.com/photo/2016/11/17/14/24/soy-1831704_1280.jpg?text=Soybean+Plant", aiHint: "soybean plant" },
    { src: "https://cdn.pixabay.com/photo/2021/08/27/05/10/soybean-6577766_1280.jpg?text=Soybean+Pods", aiHint: "soybean pods" },
    { src: "https://placehold.co/300x200.png?text=Soybean+Field", aiHint: "soybean field" },
  ],
  PULSES: [
    { src: "https://placehold.co/300x200.png?text=Lentils+Dal", aiHint: "lentils dal" },
    { src: "https://placehold.co/300x200.png?text=Mixed+Pulses", aiHint: "mixed pulses" },
    { src: "https://placehold.co/300x200.png?text=Chickpeas+Plant", aiHint: "chickpeas plant" },
  ],
  MUSTARD: [
    { src: "https://placehold.co/300x200.png?text=Mustard+Field", aiHint: "mustard field" },
    { src: "https://placehold.co/300x200.png?text=Mustard+Flowers", aiHint: "mustard flowers" },
    { src: "https://placehold.co/300x200.png?text=Mustard+Seeds", aiHint: "mustard seeds" },
  ],
  GROUNDNUT: [
    { src: "https://placehold.co/300x200.png?text=Groundnuts+Crop", aiHint: "groundnuts crop" },
    { src: "https://placehold.co/300x200.png?text=Peanut+Plant", aiHint: "peanut plant" },
    { src: "https://placehold.co/300x200.png?text=Harvested+Groundnuts", aiHint: "harvested groundnuts" },
  ],
  DEFAULT_CROP: { src: "https://cdn.pixabay.com/photo/2017/09/10/02/49/drone-2734228_1280.jpg", aiHint: "agriculture product" },

  // Mandi/Market (300x200 for cards)
  DEFAULT_MANDI: { src: "https://placehold.co/300x200.png?text=market+agriculture", aiHint: "market agriculture" },
  
  // Education Page - Guides (600x400 for main display, can be reused for smaller cards if needed)
  GUIDE_PRICE_FLUCTUATIONS: { src: "https://cdn.pixabay.com/photo/2016/11/23/14/37/blur-1853262_1280.jpg", aiHint: "market chart" },
  GUIDE_APP_USAGE: { src: "https://placehold.co/600x400.png", aiHint: "app interface" },

  // Education Page & Schemes Page - Schemes (600x400 for main display, 400x250 for cards)
  SCHEME_PM_KISAN: { src: "https://placehold.co/600x400.png", aiHint: "government building" }, // Used on education
  SCHEME_E_NAM: { src: "https://placehold.co/600x400.png", aiHint: "digital india" }, // Used on education
  
  SCHEME_PM_KISAN_CARD: { src: "https://www.jagranimages.com/images/newimg/26122023/26_12_2023-kisan_credit_card_23614380_204254319.webp", aiHint: "farmer finance" },
  SCHEME_E_NAM_CARD: { src: "https://www.indiafilings.com/learn/wp-content/uploads/2019/07/eNAM.jpg", aiHint: "market online" },
  SCHEME_CROP_INSURANCE_CARD: { src: "https://smeventure.com/wp-content/uploads/2021/01/Crop-Insurance-Online.jpg", aiHint: "insurance protection" },
  SCHEME_SOIL_HEALTH_CARD: { src: "https://kj1bcdn.b-cdn.net/media/102414/soil-health-card.jpg", aiHint: "soil health" },
  SCHEME_GENERIC_1: { src: "https://www.finshastra.com/_next/image/?url=https%3A%2F%2Fwww.paisabazaar.com%2Fwp-content%2Fuploads%2F2017%2F10%2FKisan-Credit-Card-KCC-Loan-Scheme.jpg&w=1920&q=75", aiHint: "government program" },
  SCHEME_GENERIC_2: { src: "https://img.etimg.com/thumb/msid-120123709,width-300,height-225,imgsize-372554,resizemode-75/file-photo-soybeans-are-irrigated-in-platte-county-nebraska.jpg", aiHint: "community benefit" },
  SCHEME_GENERIC_3: { src: "https://images.indianexpress.com/2017/04/farmer11.jpg?w=650", aiHint: "rural development" },
  SCHEME_GENERIC_4: { src: "https://cdn.pixabay.com/photo/2021/09/27/11/01/man-6660387_1280.jpg", aiHint: "farmer support" },


  // New Home Page Images
  HOME_HERO_BANNER: { src: "https://cdn.pixabay.com/photo/2019/05/23/08/46/dji-4223421_1280.jpg", aiHint: "indian agriculture panoramic" },
  HOME_SCHEME_PM_KISAN: { src: "https://img.khetivyapar.com/images/news/1713762716-these-government-schemes-for-farmers-in-madhya-pradesh-madhya-pradesh-scheme-2024.jpg", aiHint: "government scheme farmer" }, // For smaller cards on home page
  HOME_SCHEME_E_NAM: { src: "https://upload.wikimedia.org/wikipedia/en/1/13/National_Agriculture_Market_%28eNAM%29_logo.png", aiHint: "digital market agriculture" }, // For smaller cards on home page
  
  // Marketplace
  MARKETPLACE_ITEM_DEFAULT: { src: "https://placehold.co/300x200.png", aiHint: "product item" }
};

export type AppImageKey = keyof typeof APP_IMAGES; // This type might not be directly usable for indexing if keys are dynamic strings

// Helper function to get image data by crop name string or generic key
export function getCropImageDetails(keyOrCropName: string, indexHint: number = 0): ImageInfo {
  const upperKey = keyOrCropName.toUpperCase().replace(/\s+/g, '_'); 
  // Check if upperCropName is a valid key in APP_IMAGES to satisfy TypeScript
  const imageEntry = APP_IMAGES[upperKey as AppImageKey] || APP_IMAGES.DEFAULT_CROP;

  if (Array.isArray(imageEntry)) {
    return imageEntry[indexHint % imageEntry.length];
  }
  // If it's not an array, it should be a single ImageInfo object.
  // The type of APP_IMAGES allows ImageInfo | ImageInfo[], so this cast is safe here.
  return imageEntry as ImageInfo; 
}

