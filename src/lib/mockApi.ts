import type { CropPriceInfo, MandiLocation, PriceDataPoint, StatePriceHistory, CropPriceTrend } from '@/types';
import { CROPS, STATES } from '@/types';
import { getCropImageDetails, APP_IMAGES } from './image-config';

const randomPrice = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const getRealTimePrices = async (selectedCrop?: string): Promise<CropPriceInfo[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  const prices: CropPriceInfo[] = [];
  const cropsToDisplay = selectedCrop ? [selectedCrop] : CROPS.slice(0, 5); // Display specific crop or first 5

  cropsToDisplay.forEach(cropName => {
    for (let i = 0; i < 2; i++) { // 2 example markets per crop
      const state = STATES[Math.floor(Math.random() * STATES.length)];
      const modalPrice = randomPrice(1500, 5000);
      const imageDetails = getCropImageDetails(cropName);
      prices.push({
        id: `${cropName.toLowerCase().replace(' ', '-')}-${i}-${Date.now()}`,
        cropName,
        variety: "FAQ",
        market: `${state.split(' ')[0]} Mandi ${i + 1}`,
        state,
        district: `${state.split(' ')[0]} District`,
        minPrice: modalPrice - randomPrice(50, 200),
        maxPrice: modalPrice + randomPrice(50, 200),
        modalPrice,
        unit: "Quintal",
        date: formatDate(new Date()),
        imageUrl: imageDetails.src,
        aiHint: imageDetails.aiHint,
      });
    }
  });
  return prices;
};

export const getMandiLocations = async (): Promise<MandiLocation[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const mandis: MandiLocation[] = [];
  STATES.slice(0, 8).forEach((state, stateIndex) => {
    for (let i = 0; i < 2; i++) {
      const crop1 = CROPS[Math.floor(Math.random() * CROPS.length)];
      const crop2 = CROPS[Math.floor(Math.random() * CROPS.length)];
      mandis.push({
        id: `mandi-${stateIndex}-${i}`,
        name: `${state.split(" ")[0]} Main Mandi ${i + 1}`,
        state,
        district: `${state.split(" ")[0]} District`,
        latitude: 20 + Math.random() * 10, 
        longitude: 70 + Math.random() * 10,
        currentPrices: [
          { crop: crop1, price: randomPrice(1800, 4500), unit: "Quintal" },
          { crop: crop2, price: randomPrice(2000, 5000), unit: "Quintal" },
        ],
        imageUrl: APP_IMAGES.DEFAULT_MANDI.src,
        aiHint: APP_IMAGES.DEFAULT_MANDI.aiHint,
      });
    }
  });
  return mandis;
};

export const getPriceTrends = async (cropName: string): Promise<CropPriceTrend> => {
  await new Promise(resolve => setTimeout(resolve, 700));

  const trends: StatePriceHistory[] = [];
  const selectedStates = STATES.sort(() => 0.5 - Math.random()).slice(0, 3); // Pick 3 random states

  selectedStates.forEach(state => {
    const data: PriceDataPoint[] = [];
    let lastPrice = randomPrice(2000, 4000);
    for (let i = 11; i >= 0; i--) { // Last 12 months
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      lastPrice += randomPrice(-200, 200); // Fluctuate price
      if (lastPrice < 1000) lastPrice = 1000; // Floor price
      data.push({
        date: date.toLocaleString('default', { month: 'short', year: '2-digit' }), // e.g., Jan 23
        price: lastPrice,
      });
    }
    trends.push({ state, data });
  });

  return { cropName, trends };
};
