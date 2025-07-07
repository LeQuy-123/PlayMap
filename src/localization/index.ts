import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
// import * as RNLocalize from 'react-native-localize';
import {LanguageDetectorAsyncModule} from 'i18next';

// Import your translation files
import en from './locales/en.json';
import vi from './locales/vi.json';

const resources = {
    en: {translation: en},
    vi: {translation: vi},
};

const languageDetector: LanguageDetectorAsyncModule = {
    type: 'languageDetector',
    async: true,
    detect: (callback: (lang: string) => void) => {
        // const bestLang = RNLocalize.findBestLanguageTag(Object.keys(resources));
        callback('vi');
    },
    init: () => {},
    cacheUserLanguage: () => {},
};

i18n.use(languageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'vi',
        resources,
        interpolation: {
            escapeValue: false, // not needed for React
        },
    });

export default i18n;
