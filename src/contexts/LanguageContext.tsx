
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useMemo, useCallback } from 'react';

type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

// Helper for dynamic replacements
const interpolate = (text: string, params?: Record<string, string | number>): string => {
  if (!params) return text;
  let result = text;
  for (const key in params) {
    result = result.replace(new RegExp(`{${key}}`, 'g'), String(params[key]));
  }
  return result;
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string, params?: Record<string, string | number>, fallback?: string) => string;
}

const translations: Translations = {
  // App General
  appName: { en: 'Kisan Mitra', hi: 'किसान मित्र' },
  copyright: { en: '© {year} Kisan Mitra', hi: '© {year} किसान मित्र' },
  // Sidebar Navigation
  navPrices: { en: 'Prices', hi: 'कीमतें' },
  navAiAdvisor: { en: 'AI Advisor', hi: 'एआई सलाहकार' },
  navDashboard: { en: 'Dashboard', hi: 'डैशबोर्ड' },
  navMandis: { en: 'Mandis', hi: 'मंडियां' },
  // Header
  appHeaderMobileTitle: { en: 'Kisan Mitra', hi: 'किसान मित्र' },
  // Theme Switcher
  theme: { en: 'Theme', hi: 'थीम' },
  lightTheme: { en: 'Light', hi: 'हल्का' },
  darkTheme: { en: 'Dark', hi: 'गहरा' },
  oceanicTheme: { en: 'Oceanic', hi: 'समुद्री' },
  desertTheme: { en: 'Desert Mirage', hi: 'रेगिस्तानी मृगतृष्णा' },
  systemTheme: { en: 'System', hi: 'सिस्टम' },
  // Language Switcher
  languageLabel: { en: 'Language', hi: 'भाषा' },
  english: { en: 'English', hi: 'अंग्रेज़ी' },
  hindi: { en: 'Hindi', hi: 'हिन्दी' },

  // General UI
  refresh: { en: "Refresh", hi: "ताज़ा करें" },
  loading: { en: "Loading...", hi: "लोड हो रहा है..." },
  error: { en: "Error", hi: "त्रुटि" },
  noDataAvailable: { en: "No Data Available", hi: "कोई डेटा उपलब्ध नहीं है" },
  tryRefreshing: { en: "Please try refreshing.", hi: "कृपया ताज़ा करने का प्रयास करें।" },
  selectPlaceholder: { en: "Select...", hi: "चुनें..." },
  
  // HomePage
  homeTitle: { en: "Real-Time Crop Prices", hi: "वास्तविक समय में फसल की कीमतें" },
  selectCropPlaceholder: { en: "Select crop", hi: "फसल चुनें" },
  allCrops: { en: "All Crops", hi: "सभी फसलें" },
  refreshPricesSr: { en: "Refresh prices", hi: "कीमतें ताज़ा करें" }, // Sr for Screen Reader
  noPricesAvailableTitle: { en: "No Prices Available", hi: "कोई कीमत उपलब्ध नहीं है" },
  noPricesAvailableDesc: { en: "Could not fetch price data. Please try refreshing or select a different crop.", hi: "मूल्य डेटा प्राप्त नहीं हो सका। कृपया ताज़ा करने का प्रयास करें या कोई भिन्न फसल चुनें।" },
  varietyLabel: { en: "Variety:", hi: "किस्म:" },
  dateLabel: { en: "Date:", hi: "तारीख:" },
  rangeLabel: { en: "Range:", hi: "रेंज:" },

  // DashboardPage
  dashboardTitle: { en: "Price Fluctuation Dashboard", hi: "मूल्य उतार-चढ़ाव डैशबोर्ड" },
  selectCropPlaceholderDashboard: { en: "Select a crop", hi: "एक फसल चुनें" },
  refreshTrendsSr: { en: "Refresh trends", hi: "रुझान ताज़ा करें" }, // Sr for Screen Reader
  loadingPriceTrends: { en: "Loading Price Trends...", hi: "मूल्य रुझान लोड हो रहे हैं..." },
  fetchingHistoricalData: { en: "Fetching historical price data.", hi: "ऐतिहासिक मूल्य डेटा प्राप्त किया जा रहा है।" },

  // CropPriceChart
  chartLoadingPriceTrends: { en: "Loading Price Trends...", hi: "मूल्य रुझान लोड हो रहे हैं..." },
  chartFetchingHistoricalData: { en: "Fetching historical price data.", hi: "ऐतिहासिक मूल्य डेटा प्राप्त किया जा रहा है।" },
  chartNoPriceDataAvailable: { en: "No Price Data Available", hi: "कोई मूल्य डेटा उपलब्ध नहीं है" },
  chartCouldNotLoadTrends: { en: "Could not load price trends for {cropName}.", hi: "{cropName} के लिए मूल्य रुझान लोड नहीं हो सके।" },
  chartTryAnotherCrop: { en: "Please try selecting another crop or check back later.", hi: "कृपया दूसरी फसल चुनने का प्रयास करें या बाद में जांचें।" },
  chartPriceTrendsTitle: { en: "Price Trends: {cropName}", hi: "मूल्य रुझान: {cropName}" },
  chartPriceFluctuationsDesc: { en: "Fluctuations across different states over the last 12 months.", hi: "पिछले 12 महीनों में विभिन्न राज्यों में उतार-चढ़ाव।" },

  // LocatorPage
  locatorTitle: { en: "Mandi Locator", hi: "मंडी लोकेटर" },
  refreshMandis: { en: "Refresh Mandis", hi: "मंडियां ताज़ा करें" },
  noMandisFoundTitle: { en: "No Mandis Found", hi: "कोई मंडी नहीं मिली" },
  noMandisFoundDesc: { en: "Could not fetch mandi locations. Please try refreshing.", hi: "मंडी स्थानों को प्राप्त नहीं किया जा सका। कृपया ताज़ा करने का प्रयास करें।" },

  // GoogleMapComponent
  mapsApiErrorTitle: { en: "Google Maps API Error", hi: "गूगल मैप्स एपीआई त्रुटि" },
  mapsApiKeyMissing: { en: "Google Maps API key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env file.", hi: "गूगल मैप्स एपीआई कुंजी गायब है। कृपया अपनी .env फ़ाइल में NEXT_PUBLIC_GOOGLE_MAPS_API_KEY सेट करें।" },
  mapsApiKeyRestartNote: { en: "You may need to restart your development server after adding the key.", hi: "कुंजी जोड़ने के बाद आपको अपने डेवलपमेंट सर्वर को पुनरारंभ करने की आवश्यकता हो सकती है।" },

  // MandiInfoCard
  currentPricesLabel: { en: "Current Prices:", hi: "वर्तमान कीमतें:" },
  noCurrentPriceData: { en: "No current price data available.", hi: "कोई वर्तमान मूल्य डेटा उपलब्ध नहीं है।" },
  viewDetailsButton: { en: "View Details", hi: "विवरण देखें" },

  // RecommendationsPage
  recommendationsTitle: { en: "AI Powered Recommendations", hi: "एआई संचालित सिफारिशें" },

  // RecommendationClientForm
  aiAdvisorTitle: { en: "AI Selling Advisor", hi: "एआई बिक्री सलाहकार" },
  aiAdvisorDescription: { en: "Get AI-powered recommendations on when and where to sell your crops for maximum profit.", hi: "अपनी फसलों को अधिकतम लाभ के लिए कब और कहाँ बेचना है, इस पर एआई-संचालित सिफारिशें प्राप्त करें।" },
  cropLabel: { en: "Crop", hi: "फसल" },
  selectCropPlaceholderForm: { en: "Select a crop", hi: "एक फसल चुनें" },
  quantityLabel: { en: "Quantity (in Quintals)", hi: "मात्रा (क्विंटल में)" },
  quantityPlaceholder: { en: "e.g., 100", hi: "उदा., 100" },
  locationLabel: { en: "Your Location (State)", hi: "आपका स्थान (राज्य)" },
  selectStatePlaceholder: { en: "Select your state", hi: "अपना राज्य चुनें" },
  locationDescription: { en: "This helps in generating relevant suggestions.", hi: "यह प्रासंगिक सुझाव उत्पन्न करने में मदद करता है।" },
  
  historicalDataLabel: { en: "Historical Production Data", hi: "ऐतिहासिक उत्पादन डेटा" },
  historicalDataPlaceholder: { en: "Describe your farm's past yields, market prices, significant events...", hi: "अपने खेत की पिछली पैदावार, बाजार मूल्य, महत्वपूर्ण घटनाओं का वर्णन करें..." },
  histProdDataAutoText: { en: "For {crop} in {location}, describe past yields (e.g., X quintals/acre), prices fetched (e.g., Y INR/quintal), and any significant events (e.g., drought in 2021, pest attack).", hi: "{location} में {crop} के लिए, पिछली पैदावार (उदा., X क्विंटल/एकड़), प्राप्त कीमतें (उदा., Y रुपये/क्विंटल), और कोई महत्वपूर्ण घटनाएं (उदा., 2021 में सूखा, कीट हमला) का वर्णन करें।" },
  historicalDataDescStatic: { en: "Enter details about your farm's past production, typical yields, prices received, and any major events like droughts or pest attacks.", hi: "अपने खेत के पिछले उत्पादन, सामान्य पैदावार, प्राप्त कीमतों और सूखे या कीट हमलों जैसी किसी भी बड़ी घटनाओं के बारे में विवरण दर्ज करें।" },

  weatherDataLabel: { en: "Current Weather & Forecast Context", hi: "वर्तमान मौसम और पूर्वानुमान संदर्भ" },
  weatherDataPlaceholder: { en: "Describe current weather conditions, forecasts, and their impact on your crop...", hi: "वर्तमान मौसम की स्थिति, पूर्वानुमान और आपकी फसल पर उनके प्रभाव का वर्णन करें..." },
  weatherDataAutoText: { en: "For {crop} in {location}, what are the current weather conditions (e.g., temperature, rainfall in last week) and upcoming forecasts (e.g., monsoon expected by X date, heatwave predicted)?", hi: "{location} में {crop} के लिए, वर्तमान मौसम की स्थिति (उदा., तापमान, पिछले सप्ताह में वर्षा) और आगामी पूर्वानुमान (उदा., X तारीख तक मानसून की उम्मीद, लू की भविष्यवाणी) क्या हैं?" },
  weatherDataDescStatic: { en: "Describe current local weather, recent rainfall, temperature trends, and any official forecasts relevant to your crops.", hi: "वर्तमान स्थानीय मौसम, हाल की वर्षा, तापमान के रुझान और अपनी फसलों से संबंधित किसी भी आधिकारिक पूर्वानुमान का वर्णन करें।" },
  
  getRecommendationButton: { en: "Get Recommendation", hi: "सिफारिश प्राप्त करें" },
  generatingButton: { en: "Generating...", hi: "उत्पन्न हो रहा है..." },
  toastRecGeneratedTitle: { en: "Recommendation Generated!", hi: "सिफारिश उत्पन्न हुई!" },
  toastRecGeneratedDesc: { en: "AI advisor has provided selling insights.", hi: "एआई सलाहकार ने बिक्री संबंधी अंतर्दृष्टि प्रदान की है।" },
  toastErrorTitle: { en: "Error", hi: "त्रुटि" },
  toastErrorDesc: { en: "Could not generate recommendation: {errorMessage}", hi: "सिफारिश उत्पन्न नहीं की जा सकी: {errorMessage}" },
  formErrorOccurred: { en: "Failed to generate recommendation: {errorMessage}", hi: "सिफारिश उत्पन्न करने में विफल: {errorMessage}" },
  aiRecommendationTitle: { en: "AI Recommendation", hi: "एआई सिफारिश" },
  suggestionLabel: { en: "Suggestion:", hi: "सुझाव:" },
  reasoningLabel: { en: "Reasoning:", hi: "तर्क:" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const translate = useCallback((key: string, params?: Record<string, string | number>, fallback?: string): string => {
    const yearPlaceholder = "{year}";
    let text = translations[key]?.[language] || fallback || key;
    
    if (text.includes(yearPlaceholder)) {
      text = text.replace(new RegExp(yearPlaceholder, 'g'), new Date().getFullYear().toString());
    }
    text = interpolate(text, params);
    return text;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, translate }), [language, translate]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
