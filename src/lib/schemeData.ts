
// src/lib/schemeData.ts
import type { GovernmentScheme } from '@/types';
import { APP_IMAGES } from '@/lib/image-config';

export const governmentSchemes: GovernmentScheme[] = [
  {
    id: 'pm-kisan',
    titleKey: 'schemePMKisanTitleFull',
    shortDescriptionKey: 'schemePMKisanShortDesc',
    detailedDescriptionKey: 'schemePMKisanDetailedDesc',
    eligibilityCriteriaKeys: [
      'pmKisanEligibility1',
      'pmKisanEligibility2',
      'pmKisanEligibility3',
    ],
    benefitsKeys: ['pmKisanBenefit1', 'pmKisanBenefit2'],
    howToApplyKey: 'pmKisanHowToApply',
    linkUrl: 'https://pmkisan.gov.in/',
    imageUrl: APP_IMAGES.SCHEME_PM_KISAN_CARD.src,
    aiHint: APP_IMAGES.SCHEME_PM_KISAN_CARD.aiHint,
    tags: ['income support', 'all states', 'small farmers', 'marginal farmers', 'direct benefit transfer', 'agriculture'],
    targetStates: ["All"], // Assuming it's for all states
    relevantCrops: ["All"], // Assuming relevant for all crops indirectly
  },
  {
    id: 'e-nam',
    titleKey: 'schemeENAMTitleFull',
    shortDescriptionKey: 'schemeENAMShortDesc',
    detailedDescriptionKey: 'schemeENAMDetailedDesc',
    eligibilityCriteriaKeys: [
      'eNAMEligibility1',
      'eNAMEligibility2',
    ],
    benefitsKeys: ['eNAMBenefit1', 'eNAMBenefit2', 'eNAMBenefit3'],
    howToApplyKey: 'eNAMHowToApply',
    linkUrl: 'https://www.enam.gov.in/web/',
    imageUrl: APP_IMAGES.SCHEME_E_NAM_CARD.src,
    aiHint: APP_IMAGES.SCHEME_E_NAM_CARD.aiHint,
    tags: ['market linkage', 'online trading', 'price discovery', 'all states', 'apmc', 'agriculture produce'],
    targetStates: ["All"],
    relevantCrops: ["All"],
  },
  {
    id: 'pmfby',
    titleKey: 'schemePMFBYTitleFull',
    shortDescriptionKey: 'schemePMFBYShortDesc',
    detailedDescriptionKey: 'schemePMFBYDetailedDesc',
    eligibilityCriteriaKeys: [
      'pmfbyEligibility1',
      'pmfbyEligibility2',
      'pmfbyEligibility3',
    ],
    benefitsKeys: ['pmfbyBenefit1', 'pmfbyBenefit2'],
    howToApplyKey: 'pmfbyHowToApply',
    linkUrl: 'https://pmfby.gov.in/',
    imageUrl: APP_IMAGES.SCHEME_CROP_INSURANCE_CARD.src,
    aiHint: APP_IMAGES.SCHEME_CROP_INSURANCE_CARD.aiHint,
    tags: ['crop insurance', 'risk management', 'natural calamities', 'pest attacks', 'yield loss', 'premium subsidy'],
    targetStates: ["All"],
    relevantCrops: ["Wheat", "Rice", "Maize", "Cotton", "Sugarcane", "Soybean", "Pulses", "Mustard", "Groundnut"],
  },
  {
    id: 'soil-health-card',
    titleKey: 'schemeSoilHealthCardTitleFull',
    shortDescriptionKey: 'schemeSoilHealthCardShortDesc',
    detailedDescriptionKey: 'schemeSoilHealthCardDetailedDesc',
    eligibilityCriteriaKeys: [
      'soilHealthCardEligibility1',
    ],
    benefitsKeys: ['soilHealthCardBenefit1', 'soilHealthCardBenefit2', 'soilHealthCardBenefit3'],
    howToApplyKey: 'soilHealthCardHowToApply',
    linkUrl: 'https://soilhealth.dac.gov.in/',
    imageUrl: APP_IMAGES.SCHEME_SOIL_HEALTH_CARD.src,
    aiHint: APP_IMAGES.SCHEME_SOIL_HEALTH_CARD.aiHint,
    tags: ['soil testing', 'nutrient management', 'fertilizer recommendation', 'soil health', 'sustainable agriculture'],
    targetStates: ["All"],
    relevantCrops: ["All"],
  }
];

export const getGovernmentSchemes = async (): Promise<GovernmentScheme[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return governmentSchemes;
};
