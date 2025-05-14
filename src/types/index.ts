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

export const CROPS = ["Wheat", "Rice", "Maize", "Cotton", "Sugarcane", "Soybean", "Pulses"];
export const STATES = ["Punjab", "Haryana", "Uttar Pradesh", "Madhya Pradesh", "Maharashtra", "Rajasthan", "Gujarat", "Andhra Pradesh", "Telangana", "Karnataka"];
