
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useMemo, useCallback } from 'react';

type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string, fallback?: string) => string;
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
  systemTheme: { en: 'System', hi: 'सिस्टम' },
  // Language Switcher
  languageLabel: { en: 'Language', hi: 'भाषा' },
  english: { en: 'English', hi: 'अंग्रेज़ी' },
  hindi: { en: 'Hindi', hi: 'हिन्दी' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const translate = useCallback((key: string, fallback?: string): string => {
    const yearPlaceholder = "{year}";
    let text = translations[key]?.[language] || fallback || key;
    if (text.includes(yearPlaceholder)) {
      text = text.replace(yearPlaceholder, new Date().getFullYear().toString());
    }
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
