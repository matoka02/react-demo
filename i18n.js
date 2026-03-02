import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import localization from './pages/i18n/localization.json';

i18n.use(initReactI18next).init({
  resources: {
    localization,
  },
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
  debug: false,
  initImmediate: false,
  react: {
    useSuspense: false,
  },
  logger: {
    log: () => {},
    warn: () => {},
    error: () => {},
  },
});

export default i18n;
