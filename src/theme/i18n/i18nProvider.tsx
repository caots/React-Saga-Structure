import '@formatjs/intl-relativetimeformat/polyfill'
import '@formatjs/intl-relativetimeformat/locale-data/en'
import '@formatjs/intl-relativetimeformat/locale-data/de'
import '@formatjs/intl-relativetimeformat/locale-data/es'
import '@formatjs/intl-relativetimeformat/locale-data/fr'
import '@formatjs/intl-relativetimeformat/locale-data/ja'
import '@formatjs/intl-relativetimeformat/locale-data/zh'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'; 
import enMessages from './messages/en.json'
import arMessages from './messages/ar.json'

export const resources = {
  en: {
    translation: enMessages,
  },
  ar: {
    translation: arMessages,
  }
} as const;
let language = 'ar';
try {
  const i18nConfig = JSON.parse(localStorage.getItem("persist:b8aksp-auth") || '{}');
  language = JSON.parse(i18nConfig.language) || 'ar';
} catch {

}

i18n.use(initReactI18next).init({
  lng: language,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources
});