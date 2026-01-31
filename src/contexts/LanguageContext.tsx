import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'kn';

interface Translations {
  [key: string]: {
    en: string;
    kn: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', kn: 'ಮುಖಪುಟ' },
  'nav.cropAdvisory': { en: 'Crop Advisory', kn: 'ಬೆಳೆ ಸಲಹೆ' },
  'nav.weather': { en: 'Weather', kn: 'ಹವಾಮಾನ' },
  'nav.marketPrices': { en: 'Market Prices', kn: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು' },
  'nav.schemes': { en: 'Govt Schemes', kn: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು' },
  'nav.dashboard': { en: 'Dashboard', kn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್' },
  
  // Hero
  'hero.tagline': { en: 'Smart Farming for a Better Tomorrow', kn: 'ಉತ್ತಮ ನಾಳೆಗಾಗಿ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ' },
  'hero.subtitle': { en: 'Empowering Indian farmers with technology-driven insights for better yields and sustainable agriculture', kn: 'ಉತ್ತಮ ಇಳುವರಿ ಮತ್ತು ಸುಸ್ಥಿರ ಕೃಷಿಗಾಗಿ ತಂತ್ರಜ್ಞಾನ ಆಧಾರಿತ ಒಳನೋಟಗಳೊಂದಿಗೆ ಭಾರತೀಯ ರೈತರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು' },
  'hero.cropAdvice': { en: 'Check Crop Advice', kn: 'ಬೆಳೆ ಸಲಹೆ ಪರಿಶೀಲಿಸಿ' },
  'hero.marketPrices': { en: 'View Market Prices', kn: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ' },
  
  // Common
  'common.learnMore': { en: 'Learn More', kn: 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ' },
  'common.viewAll': { en: 'View All', kn: 'ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ' },
  'common.submit': { en: 'Submit', kn: 'ಸಲ್ಲಿಸಿ' },
  'common.search': { en: 'Search', kn: 'ಹುಡುಕು' },
  'common.login': { en: 'Login', kn: 'ಲಾಗಿನ್' },
  'common.register': { en: 'Register', kn: 'ನೋಂದಣಿ' },
  
  // Features
  'features.title': { en: 'How We Help Farmers', kn: 'ನಾವು ರೈತರಿಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇವೆ' },
  'features.cropAdvisory.title': { en: 'Smart Crop Advisory', kn: 'ಸ್ಮಾರ್ಟ್ ಬೆಳೆ ಸಲಹೆ' },
  'features.cropAdvisory.desc': { en: 'Get personalized recommendations for fertilizers, irrigation, and best practices based on your crop and soil type.', kn: 'ನಿಮ್ಮ ಬೆಳೆ ಮತ್ತು ಮಣ್ಣಿನ ಪ್ರಕಾರದ ಆಧಾರದ ಮೇಲೆ ಗೊಬ್ಬರ, ನೀರಾವರಿ ಮತ್ತು ಉತ್ತಮ ಅಭ್ಯಾಸಗಳಿಗಾಗಿ ವೈಯಕ್ತಿಕ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ.' },
  'features.weather.title': { en: 'Weather Forecasts', kn: 'ಹವಾಮಾನ ಮುನ್ಸೂಚನೆಗಳು' },
  'features.weather.desc': { en: 'Plan your farming activities with accurate 5-day weather forecasts including rainfall and humidity predictions.', kn: 'ಮಳೆ ಮತ್ತು ಆರ್ದ್ರತೆ ಮುನ್ಸೂಚನೆಗಳನ್ನು ಒಳಗೊಂಡಂತೆ ನಿಖರವಾದ 5-ದಿನ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಕೃಷಿ ಚಟುವಟಿಕೆಗಳನ್ನು ಯೋಜಿಸಿ.' },
  'features.market.title': { en: 'Live Market Prices', kn: 'ಲೈವ್ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು' },
  'features.market.desc': { en: 'Access daily mandi prices for major crops and make informed selling decisions.', kn: 'ಪ್ರಮುಖ ಬೆಳೆಗಳಿಗೆ ದೈನಂದಿನ ಮಂಡಿ ಬೆಲೆಗಳನ್ನು ಪ್ರವೇಶಿಸಿ ಮತ್ತು ತಿಳುವಳಿಕೆಯುಳ್ಳ ಮಾರಾಟ ನಿರ್ಧಾರಗಳನ್ನು ಮಾಡಿ.' },
  'features.schemes.title': { en: 'Govt Schemes', kn: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು' },
  'features.schemes.desc': { en: 'Discover government schemes like PM-KISAN and crop insurance with eligibility details.', kn: 'PM-KISAN ಮತ್ತು ಬೆಳೆ ವಿಮೆಯಂತಹ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಅರ್ಹತೆ ವಿವರಗಳೊಂದಿಗೆ ಅನ್ವೇಷಿಸಿ.' },
  
  // Crop Advisory
  'crop.selectCrop': { en: 'Select Crop', kn: 'ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ' },
  'crop.selectSoil': { en: 'Select Soil Type', kn: 'ಮಣ್ಣಿನ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ' },
  'crop.selectSeason': { en: 'Select Season', kn: 'ಋತು ಆಯ್ಕೆಮಾಡಿ' },
  'crop.getAdvice': { en: 'Get Advice', kn: 'ಸಲಹೆ ಪಡೆಯಿರಿ' },
  
  // Footer
  'footer.tagline': { en: 'Empowering farmers with technology', kn: 'ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ರೈತರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು' },
  'footer.contact': { en: 'Contact Us', kn: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ' },
  'footer.quickLinks': { en: 'Quick Links', kn: 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || translation.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
