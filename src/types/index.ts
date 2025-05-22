
export interface CropPriceInfo {
  id: string;
  cropName: string;
  variety: string;
  market: string;
  state: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string; // e.g., Quintal, Kg
  date: string; // YYYY-MM-DD
  imageUrl?: string;
  aiHint?: string;
}

export interface MandiLocation {
  id: string;
  name: string;
  state: string;
  district: string;
  latitude?: number; // Optional as we might not have it for all
  longitude?: number; // Optional
  currentPrices?: { crop: string; price: number; unit: string }[];
  imageUrl?: string;
  aiHint?: string;
}

export interface PriceDataPoint {
  date: string; // YYYY-MM-DD or Mmm YY
  price: number;
}

export interface StatePriceHistory {
  state: string;
  data: PriceDataPoint[];
}

export interface CropPriceTrend {
  cropName: string;
  trends: StatePriceHistory[];
}

export type SocialCategory = "General" | "SC" | "ST" | "OBC" | "EWS" | "Any";
export const SOCIAL_CATEGORIES: SocialCategory[] = ["Any", "General", "SC", "ST", "OBC", "EWS"];

export type GenderTarget = "Male" | "Female" | "Transgender" | "Any";
export const GENDER_TARGETS: GenderTarget[] = ["Any", "Male", "Female", "Transgender"];


export interface GovernmentScheme {
  id: string;
  titleKey: string;
  shortDescriptionKey: string;
  detailedDescriptionKey: string;
  eligibilityCriteriaKeys: string[];
  benefitsKeys: string[];
  howToApplyKey: string;
  linkUrl: string;
  imageUrl: string;
  aiHint: string;
  tags: string[];
  targetStates?: string[];
  relevantCrops?: string[];
  socialCategories?: SocialCategory[];
  genderTargets?: GenderTarget[];
  applicableToMinority?: boolean; 
  isForDisabled?: boolean; 
  minAge?: number; 
  maxAge?: number; 
}

export interface MarketplacePost {
  id: string; // Server will generate this
  cropName: string;
  quantity: number; // in Quintals
  price: number; // per Quintal
  description: string;
  sellerName: string; 
  postDate: string; // Server will generate this (YYYY-MM-DD)
  imageUrl?: string; 
  location: string; 
}

// Removed MockUser interface

export const CROPS = ["Wheat", "Rice", "Maize", "Cotton", "Sugarcane", "Soybean", "Pulses", "Mustard", "Groundnut"];
export const STATES = ["Punjab", "Haryana", "Uttar Pradesh", "Madhya Pradesh", "Maharashtra", "Rajasthan", "Gujarat", "Andhra Pradesh", "Telangana", "Karnataka", "West Bengal", "Bihar", "Odisha", "Tamil Nadu", "Kerala"];

export const VEHICLE_TYPES = [
  { id: 'tractor', nameKey: 'vehicleTractor', efficiency: 5, capacityQuintals: 30 }, 
  { id: 'small_truck', nameKey: 'vehicleSmallTruck', efficiency: 8, capacityQuintals: 50 },
  { id: 'large_truck', nameKey: 'vehicleLargeTruck', efficiency: 4, capacityQuintals: 150 },
] as const;

export type VehicleTypeId = typeof VEHICLE_TYPES[number]['id'];
export type UserDemographics = {
  gender?: Exclude<GenderTarget, "Any">;
  age?: number;
};
