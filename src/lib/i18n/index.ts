import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { getItem } from '@/utils/local-storage.util';

import enLang from './locales/en.json';
import esLang from './locales/es.json';

const resources = {
  en: {
    translation: enLang,
  },
  es: {
    translation: esLang,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    lng: getItem<string>('i18nextLng') || 'es',

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
