import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en';
import fr from './fr';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

export const ResourcesType = typeof resources;

/**
 * How to use translations strings:
 * import { useTranslation } from 'react-i18next';
 * const { t, i18n } = useTranslation();
 * <Text>{t('login.title')}</Text>
 *
 * How to change language dynamically:
 * i18n.changeLanguage('fr');
 */
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr'],
    debug: __DEV__,

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
