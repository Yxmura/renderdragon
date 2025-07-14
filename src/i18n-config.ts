import i18n, { i18n as I18nType } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Cookies from 'js-cookie';

// Import your translation resources
import { resources } from './i18n-resources';

// Language detection configuration
const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: (callback: (lng: string) => void) => {
    const supportedLngs = ['en', 'es', 'fr', 'nl'];
    let detectedLng = 'en';

    // Check URL parameter first
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLng = params.get('lng');
      if (urlLng && supportedLngs.includes(urlLng)) {
        detectedLng = urlLng;
        return callback(detectedLng);
      }

      // Check localStorage
      const localStorageLng = localStorage.getItem('i18nextLng');
      if (localStorageLng && supportedLngs.some(lng => localStorageLng.startsWith(lng))) {
        detectedLng = localStorageLng.split('-')[0];
        return callback(detectedLng);
      }

      // Check cookie
      const cookieLng = Cookies.get('i18next');
      if (cookieLng && supportedLngs.some(lng => cookieLng.startsWith(lng))) {
        detectedLng = cookieLng.split('-')[0];
        return callback(detectedLng);
      }

      // Check browser language
      const browserLng = navigator.language || (navigator as any).userLanguage;
      if (browserLng) {
        const browserLngCode = browserLng.split('-')[0];
        if (supportedLngs.includes(browserLngCode)) {
          detectedLng = browserLngCode;
        }
      }
    }

    return callback(detectedLng);
  },
  init: () => {},
  cacheUserLanguage: (lng: string) => {
    if (typeof window !== 'undefined') {
      try {
        Cookies.set('i18next', lng, { expires: 365 });
        localStorage.setItem('i18nextLng', lng);
      } catch (e) {
        console.warn('Failed to save language preference', e);
      }
    }
  },
};

// Initialize i18next
const initI18n = async (): Promise<I18nType> => {
  await i18n
    .use(initReactI18next)
    .use(languageDetector as any) // Type assertion needed due to i18next type definitions
    .init({
      resources,
      fallbackLng: 'en',
      supportedLngs: ['en', 'es', 'fr', 'nl'],
      debug: process.env.NODE_ENV === 'development',
      interpolation: {
        escapeValue: false, // React already escapes values
      },
      react: {
        useSuspense: false,
      },
    });

  return i18n;
};

// Initialize i18n and handle potential errors
let isInitialized = false;

export const initializeI18n = async (): Promise<I18nType> => {
  if (!isInitialized) {
    try {
      await initI18n();
      isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize i18n:', error);
      // Fallback to default initialization
      await i18n
        .use(initReactI18next)
        .use(LanguageDetector)
        .init({
          resources,
          fallbackLng: 'en',
          supportedLngs: ['en', 'es', 'fr', 'nl'],
          debug: process.env.NODE_ENV === 'development',
          interpolation: {
            escapeValue: false,
          },
        });
      isInitialized = true;
    }
  }
  return i18n;
};

export default i18n;