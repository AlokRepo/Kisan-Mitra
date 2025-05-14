
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';

type Language = 'en' | 'hi'; // For now, only 'en' and 'hi' are fully supported
const VALID_LANGUAGES: Language[] = ['en', 'hi'];


interface Translations {
  [key: string]: {
    [lang in Language]?: string; // Make specific language entries optional
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
  navEducation: { en: "Education & Resources", hi: "शिक्षा और संसाधन" },
  navTransportEstimator: { en: "Transport Estimator", hi: "परिवहन अनुमानक" },
  Settings: { en: 'Settings', hi: 'सेटिंग्स'}, // For sidebar
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
  tamil: { en: 'Tamil', hi: 'तमिल' },
  punjabi: { en: 'Punjabi', hi: 'पंजाबी' },


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
  refreshPricesSr: { en: "Refresh prices", hi: "कीमतें ताज़ा करें" },
  noPricesAvailableTitle: { en: "No Prices Available", hi: "कोई कीमत उपलब्ध नहीं है" },
  noPricesAvailableDesc: { en: "Could not fetch price data. Please try refreshing or select a different crop.", hi: "मूल्य डेटा प्राप्त नहीं हो सका। कृपया ताज़ा करने का प्रयास करें या कोई भिन्न फसल चुनें।" },
  varietyLabel: { en: "Variety:", hi: "किस्म:" },
  dateLabel: { en: "Date:", hi: "तारीख:" },
  rangeLabel: { en: "Range:", hi: "रेंज:" },

  // DashboardPage
  dashboardTitle: { en: "Price Fluctuation Dashboard", hi: "मूल्य उतार-चढ़ाव डैशबोर्ड" },
  selectCropPlaceholderDashboard: { en: "Select a crop", hi: "एक फसल चुनें" },
  refreshTrendsSr: { en: "Refresh trends", hi: "रुझान ताज़ा करें" }, 
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
  histProdDataAutoText: { en: "For {crop} in {location}, detail past yields (e.g., X quintals/acre over last 3 seasons), average prices fetched (e.g., Y INR/quintal range), and any significant events (e.g., drought in 2021 reduced yield by Z%, pest attack on specific variety). Mention local storage practices if any.", hi: "{location} में {crop} के लिए, पिछली पैदावार का विवरण दें (उदा., पिछले 3 मौसमों में X क्विंटल/एकड़), प्राप्त औसत कीमतें (उदा., Y रुपये/क्विंटल रेंज), और कोई महत्वपूर्ण घटनाएं (उदा., 2021 में सूखे से उपज में Z% की कमी, विशिष्ट किस्म पर कीट हमला)। यदि कोई हो तो स्थानीय भंडारण प्रथाओं का उल्लेख करें।" },
  historicalDataDescStatic: { en: "Provide context like past yields, prices, and major farm events.", hi: "पिछली पैदावार, कीमतें और खेत की प्रमुख घटनाओं जैसा संदर्भ प्रदान करें।" },

  weatherDataLabel: { en: "Current Weather & Forecast Context", hi: "वर्तमान मौसम और पूर्वानुमान संदर्भ" },
  weatherDataPlaceholder: { en: "Describe current weather conditions, forecasts, and their impact on your crop...", hi: "वर्तमान मौसम की स्थिति, पूर्वानुमान और आपकी फसल पर उनके प्रभाव का वर्णन करें..." },
  weatherDataAutoText: { en: "For {crop} in {location}, describe current weather (e.g., temperature range, recent rainfall in mm/inches) and upcoming forecasts (e.g., monsoon expected by X date, heatwave warning for Y days). How might this impact your {crop} quality or harvest time?", hi: "{location} में {crop} के लिए, वर्तमान मौसम का वर्णन करें (उदा., तापमान सीमा, हाल की वर्षा मिमी/इंच में) और आगामी पूर्वानुमान (उदा., X तारीख तक मानसून की उम्मीद, Y दिनों के लिए लू की चेतावनी)। यह आपकी {crop} की गुणवत्ता या कटाई के समय को कैसे प्रभावित कर सकता है?" },
  weatherDataDescStatic: { en: "Include local weather, rainfall, temperature trends, and forecasts.", hi: "स्थानीय मौसम, वर्षा, तापमान के रुझान और पूर्वानुमान शामिल करें।" },
  
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

  // Settings Page
  settingsTitle: { en: "Farmer Profile & Settings", hi: "किसान प्रोफ़ाइल और सेटिंग्स" },
  profileSetupTitle: { en: "Profile Setup", hi: "प्रोफ़ाइल सेटअप" },
  profileSetupDesc: { en: "Personalize your app experience.", hi: "अपने ऐप अनुभव को वैयक्तिकृत करें।" },
  locationLabelSettings: { en: "Your Primary Location", hi: "आपका प्राथमिक स्थान" },
  locationPlaceholderSettings: { en: "e.g., Patiala, Punjab", hi: "उदा., पटियाला, पंजाब" },
  locationHintSettings: { en: "Used for localized information and recommendations.", hi: "स्थानीय जानकारी और सिफारिशों के लिए उपयोग किया जाता है।" },
  primaryCropsLabel: { en: "Primary Crops You Grow", hi: "आपके द्वारा उगाई जाने वाली प्राथमिक फसलें" },
  primaryCropsPlaceholder: { en: "Select your main crops", hi: "अपनी मुख्य फसलें चुनें" },
  primaryCropsHint: { en: "Helps tailor content related to these crops.", hi: "इन फसलों से संबंधित सामग्री को अनुकूलित करने में मदद करता है।" },
  preferredMandisLabel: { en: "Preferred Mandis (Markets)", hi: "पसंदीदा मंडियां (बाजार)" },
  preferredMandisPlaceholder: { en: "Select your preferred mandis", hi: "अपनी पसंदीदा मंडियां चुनें" },
  preferredMandisHint: { en: "For quick access to their price data.", hi: "उनके मूल्य डेटा तक त्वरित पहुंच के लिए।" },
  saveProfileButton: { en: "Save Profile", hi: "प्रोफ़ाइल सहेजें" },
  toastSettingsSavedTitle: { en: "Settings Saved", hi: "सेटिंग्स सहेजी गईं" },
  toastProfileSettingsSavedDesc: { en: "Your profile information has been updated.", hi: "आपकी प्रोफ़ाइल जानकारी अपडेट कर दी गई है।" },

  priceAlertsTitle: { en: "Price Alerts", hi: "मूल्य अलर्ट" },
  priceAlertsDesc: { en: "Get notified when crop prices reach your target.", hi: "फसल की कीमतें आपके लक्ष्य तक पहुंचने पर सूचित करें।" },
  enablePriceAlertsLabel: { en: "Enable Price Alerts", hi: "मूल्य अलर्ट सक्षम करें" },
  alertThresholdLabel: { en: "Alert Condition", hi: "अलर्ट शर्त" },
  alertThresholdPlaceholder: { en: "e.g., Wheat > 2300 in Punjab", hi: "उदा., पंजाब में गेहूं > 2300" },
  addAlertButton: { en: "Add Alert", hi: "अलर्ट जोड़ें" },
  currentAlertsLabel: { en: "Current Alerts", hi: "वर्तमान अलर्ट" },
  noActiveAlerts: { en: "No active alerts.", hi: "कोई सक्रिय अलर्ट नहीं।" },
  removeButton: { en: "Remove", hi: "हटाएं" },
  toastAlertAddedTitle: { en: "Alert Added", hi: "अलर्ट जोड़ा गया" },
  toastPriceAlertSetDesc: { en: "Your new price alert has been set.", hi: "आपका नया मूल्य अलर्ट सेट कर दिया गया है।" },
  toastAlertRemovedTitle: { en: "Alert Removed", hi: "अलर्ट हटाया गया" },
  toastPriceAlertRemovedDesc: { en: "The price alert has been removed.", hi: "मूल्य अलर्ट हटा दिया गया है।" },
  toastEnterAlertCondition: { en: "Please enter an alert condition.", hi: "कृपया एक अलर्ट शर्त दर्ज करें।" },

  languageSupportTitle: { en: "Language Support", hi: "भाषा समर्थन" },
  languageSupportDesc: { en: "Choose your preferred language for the app.", hi: "ऐप के लिए अपनी पसंदीदा भाषा चुनें।" },
  selectLanguageLabel: { en: "Select Language", hi: "भाषा चुनें" },
  selectLanguagePlaceholder: { en: "Choose language", hi: "भाषा चुनें" },
  toastLanguageChangedTitle: { en: "Language Changed", hi: "भाषा बदली गई" },
  toastLanguageChangedDesc: { en: "App language set to {lang}.", hi: "ऐप की भाषा {lang} पर सेट की गई।" },

  dataPreferencesTitle: { en: "Data Preferences", hi: "डेटा प्राथमिकताएँ" },
  dataPreferencesDesc: { en: "Manage data sources and refresh settings.", hi: "डेटा स्रोतों और रीफ्रेश सेटिंग्स का प्रबंधन करें।" },
  enableWeatherDataLabel: { en: "Include Weather Data in Analysis", hi: "विश्लेषण में मौसम डेटा शामिल करें" },
  apiRefreshFrequencyLabel: { en: "Data Refresh Frequency (minutes)", hi: "डेटा रीफ्रेश आवृत्ति (मिनट)" },
  apiRefreshFrequencyHint: {en: "How often to check for new data (e.g., prices).", hi: "कितनी बार नया डेटा (जैसे कीमतें) जांचना है।"},
  savePreferencesButton: { en: "Save Preferences", hi: "प्राथमिकताएं सहेजें" },
  toastDataPreferencesSavedDesc: { en: "Your data preferences have been updated.", hi: "आपकी डेटा प्राथमिकताएं अपडेट कर दी गई हैं।" },

  feedbackFormTitle: { en: "Feedback & Suggestions", hi: "प्रतिक्रिया और सुझाव" },
  feedbackFormDesc: { en: "Help us improve Kisan Mitra.", hi: "किसान मित्र को बेहतर बनाने में हमारी मदद करें।" },
  yourFeedbackLabel: { en: "Your Feedback", hi: "आपकी प्रतिक्रिया" },
  feedbackPlaceholder: { en: "Tell us what you think or suggest new features...", hi: "हमें बताएं कि आप क्या सोचते हैं या नई सुविधाओं का सुझाव दें..." },
  submitFeedbackButton: { en: "Submit Feedback", hi: "प्रतिक्रिया जमा करें" },
  toastFeedbackSubmittedTitle: { en: "Feedback Submitted", hi: "प्रतिक्रिया जमा की गई" },
  toastFeedbackThanks: { en: "Thank you for your feedback!", hi: "आपकी प्रतिक्रिया के लिए धन्यवाद!" },
  toastEnterFeedback: { en: "Please enter your feedback before submitting.", hi: "कृपया जमा करने से पहले अपनी प्रतिक्रिया दर्ज करें।" },

  // Education & Resources Page
  educationTitle: { en: "Education & Resources", hi: "शिक्षा और संसाधन" },
  guidesTitle: { en: "Guides & Tutorials", hi: "गाइड और ट्यूटोरियल" },
  guidesDesc: { en: "Learn how to interpret price trends, use the app effectively, and understand market dynamics.", hi: "मूल्य के रुझानों की व्याख्या करना सीखें, ऐप का प्रभावी ढंग से उपयोग करें और बाजार की गतिशीलता को समझें।" },
  sampleGuideTitle1: { en: "Understanding Price Fluctuations", hi: "मूल्य में उतार-चढ़ाव को समझना" },
  sampleGuideDesc1: { en: "Learn what factors influence crop prices and how to read market trends.", hi: "फसल की कीमतों को प्रभावित करने वाले कारकों और बाजार के रुझानों को कैसे पढ़ें, इसके बारे में जानें।" },
  sampleGuideTitle2: { en: "Maximizing Your Kisan Mitra App", hi: "किसान मित्र ऐप का अधिकतम लाभ उठाना" },
  sampleGuideDesc2: { en: "Tips and tricks to get the most out of the app's features.", hi: "ऐप की सुविधाओं का अधिकतम लाभ उठाने के लिए टिप्स और ट्रिक्स।" },
  viewGuideButton: { en: "View Guide", hi: "गाइड देखें" },
  schemesTitle: { en: "Government Schemes", hi: "सरकारी योजनाएं" },
  schemesDesc: { en: "Discover relevant agricultural schemes and their benefits.", hi: "प्रासंगिक कृषि योजनाओं और उनके लाभों की खोज करें।" },
  sampleSchemeTitle1: { en: "PM-KISAN Samman Nidhi", hi: "पीएम-किसान सम्मान निधि" },
  sampleSchemeDesc1: { en: "Direct income support for small and marginal farmers across India.", hi: "पूरे भारत में छोटे और सीमांत किसानों के लिए प्रत्यक्ष आय सहायता।" },
  sampleSchemeTitle2: { en: "e-NAM (National Agriculture Market)", hi: "ई-नाम (राष्ट्रीय कृषि बाजार)" },
  sampleSchemeDesc2: { en: "Online trading platform for agricultural commodities aiming for better price discovery.", hi: "बेहतर मूल्य खोज के लक्ष्य के साथ कृषि वस्तुओं के लिए ऑनलाइन ट्रेडिंग प्लेटफॉर्म।" },
  learnMoreButton: { en: "Learn More", hi: "और अधिक जानें" },
  faqTitle: { en: "Frequently Asked Questions", hi: "अक्सर पूछे जाने वाले प्रश्न" },
  faqDesc: { en: "Find answers to common questions about the app and agricultural markets.", hi: "ऐप और कृषि बाजारों के बारे में सामान्य प्रश्नों के उत्तर पाएं।" },
  faqQ1: { en: "How are mandi prices determined?", hi: "मंडी की कीमतें कैसे निर्धारित होती हैं?" },
  faqA1: { en: "Mandi prices are influenced by various factors including supply and demand, weather conditions, government policies, transportation costs, and quality of the produce. Local market dynamics also play a significant role.", hi: "मंडी की कीमतें आपूर्ति और मांग, मौसम की स्थिति, सरकारी नीतियों, परिवहन लागत और उपज की गुणवत्ता सहित विभिन्न कारकों से प्रभावित होती हैं। स्थानीय बाजार की गतिशीलता भी एक महत्वपूर्ण भूमिका निभाती है।" },
  faqQ2: { en: "How accurate are the AI recommendations?", hi: "एआई सिफारिशें कितनी सटीक हैं?" },
  faqA2: { en: "Our AI recommendations are based on historical data, market trends, and provided inputs. While they aim to be insightful, they should be used as a guide and not as definitive financial advice. Always consider multiple factors before making selling decisions.", hi: "हमारी एआई सिफारिशें ऐतिहासिक डेटा, बाजार के रुझान और प्रदान किए गए इनपुट पर आधारित हैं। जबकि वे अंतर्दृष्टिपूर्ण होने का लक्ष्य रखती हैं, उन्हें एक गाइड के रूप में इस्तेमाल किया जाना चाहिए, न कि निश्चित वित्तीय सलाह के रूप में। बेचने का निर्णय लेने से पहले हमेशा कई कारकों पर विचार करें।" },
  faqQ3: { en: "How often is price data updated?", hi: "मूल्य डेटा कितनी बार अपडेट किया जाता है?" },
  faqA3: { en: "Real-time price data is updated frequently throughout the day from various sources. Price trend data is typically based on daily or weekly averages.", hi: "वास्तविक समय मूल्य डेटा विभिन्न स्रोतों से दिन भर में अक्सर अपडेट किया जाता है। मूल्य प्रवृत्ति डेटा आमतौर पर दैनिक या साप्ताहिक औसत पर आधारित होता है।" },
  forumTitle: { en: "Community Forum", hi: "सामुदायिक मंच" },
  forumDesc: { en: "Connect with other farmers, share tips, ask questions, and stay updated with the latest discussions.", hi: "अन्य किसानों से जुड़ें, सुझाव साझा करें, प्रश्न पूछें और नवीनतम चर्चाओं से अपडेट रहें।" },
  forumPlaceholderText: { en: "Engage with the community on our X (formerly Twitter) page or other social channels. (Integration coming soon)", hi: "हमारे एक्स (पूर्व में ट्विटर) पेज या अन्य सोशल चैनलों पर समुदाय के साथ जुड़ें। (एकीकरण जल्द ही आ रहा है)" },
  visitForumButton: { en: "Visit our X Page", hi: "हमारे एक्स पेज पर जाएं" },

  // Transport Estimator Page
  transportEstimatorTitle: { en: "Transport Cost Estimator", hi: "परिवहन लागत अनुमानक" },
  estimatorFormTitle: { en: "Estimate Your Transport Costs", hi: "अपनी परिवहन लागत का अनुमान लगाएं" },
  estimatorFormDescription: { en: "Calculate potential transport costs and net profit for selling your crop.", hi: "अपनी फसल बेचने के लिए संभावित परिवहन लागत और शुद्ध लाभ की गणना करें।" },
  targetMandiLabel: { en: "Target Mandi", hi: "लक्ष्य मंडी" },
  selectMandiPlaceholder: { en: "Select target mandi", hi: "लक्ष्य मंडी चुनें" },
  vehicleTypeLabel: { en: "Vehicle Type", hi: "वाहन का प्रकार" },
  selectVehiclePlaceholder: { en: "Select vehicle type", hi: "वाहन का प्रकार चुनें" },
  calculateCostButton: { en: "Calculate Costs", hi: "लागत की गणना करें" },
  calculatingButton: { en: "Calculating...", hi: "गणना हो रही है..." },
  estimationResultsTitle: { en: "Estimation Results", hi: "अनुमान परिणाम" },
  estimatedDistanceLabel: { en: "Estimated Round Trip Distance", hi: "अनुमानित गोल यात्रा दूरी" },
  selectedVehicleLabel: { en: "Vehicle Selected", hi: "चयनित वाहन" },
  estimatedFuelCostLabel: { en: "Estimated Fuel Cost", hi: "अनुमानित ईंधन लागत" },
  estimatedOtherCostsLabel: { en: "Estimated Other Costs (Driver, Tolls etc.)", hi: "अनुमानित अन्य लागतें (ड्राइवर, टोल आदि)" },
  totalTransportCostLabel: { en: "Total Estimated Transport Cost", hi: "कुल अनुमानित परिवहन लागत" },
  estimatedMarketPriceLabel: { en: "Estimated Market Price for {cropName} (per Quintal)", hi: "{cropName} के लिए अनुमानित बाजार मूल्य (प्रति क्विंटल)" },
  totalEstimatedSaleValueLabel: { en: "Total Estimated Sale Value for {quantity} Quintals", hi: "{quantity} क्विंटल के लिए कुल अनुमानित बिक्री मूल्य" },
  estimatedNetProfitLabel: { en: "Estimated Net Profit", hi: "अनुमानित शुद्ध लाभ" },
  disclaimerLabel: { en: "Disclaimer:", hi: "अस्वीकरण:" },
  disclaimerText: { en: "This is a simplified estimation. Actual costs and prices may vary. Always verify with multiple sources.", hi: "यह एक सरलीकृत अनुमान है। वास्तविक लागत और कीमतें भिन्न हो सकती हैं। हमेशा कई स्रोतों से सत्यापित करें।" },
  noMarketPriceFound: { en: "Could not fetch a market price for the selected crop. Net profit cannot be calculated.", hi: "चयनित फसल के लिए बाजार मूल्य प्राप्त नहीं किया जा सका। शुद्ध लाभ की गणना नहीं की जा सकती।" },
  vehicleTractor: { en: "Tractor", hi: "ट्रैक्टर" },
  vehicleSmallTruck: { en: "Small Truck", hi: "छोटा ट्रक" },
  vehicleLargeTruck: { en: "Large Truck", hi: "बड़ा ट्रक" },
  mandiNotSelectedError: { en: "Please select a target mandi.", hi: "कृपया एक लक्ष्य मंडी चुनें।" },
  cropNotSelectedError: { en: "Please select a crop.", hi: "कृपया एक फसल चुनें।" },
  quantityNotEnteredError: { en: "Please enter crop quantity.", hi: "कृपया फसल की मात्रा दर्ज करें।" },
  locationNotSelectedError: { en: "Please select your location.", hi: "कृपया अपना स्थान चुनें।" },
  vehicleNotSelectedError: { en: "Please select a vehicle type.", hi: "कृपया एक वाहन प्रकार चुनें।" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageInternal] = useState<Language>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('userLanguage') as Language | null;
    if (storedLang && VALID_LANGUAGES.includes(storedLang)) {
      setLanguageInternal(storedLang);
    }
  }, []);

  const setLanguage = useCallback((newLanguage: Language) => {
    if (VALID_LANGUAGES.includes(newLanguage)) {
      setLanguageInternal(newLanguage);
      localStorage.setItem('userLanguage', newLanguage);
    }
  }, []);

  const translate = useCallback((key: string, params?: Record<string, string | number>, fallback?: string): string => {
    const yearPlaceholder = "{year}";
    let text = translations[key]?.[language] || translations[key]?.['en'] || fallback || key;
    
    if (text.includes(yearPlaceholder)) {
      text = text.replace(new RegExp(yearPlaceholder, 'g'), new Date().getFullYear().toString());
    }
    text = interpolate(text, params);
    return text;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, translate }), [language, setLanguage, translate]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
