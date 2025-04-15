// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files
import en from './locales/en/translation.json';
import hi from './locales/hi/translation.json';
import te from './locales/te/translation.json';

// Initialize i18n
i18n
  .use(initReactI18next) // Connects i18n with React
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      te: { translation: te },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Use English if translation not available
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
    react: {
      useSuspense: false, // Optional: disable suspense for simplicity
    },
  });

export default i18n;