import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/locales/en.json";

export const SUPPORTED_LANGUAGES = {
  en: { name: "English", nativeName: "English" },
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

const getDeviceLanguage = (): SupportedLanguage => {
  const locale = Localization.getLocales()[0];
  const languageCode = locale?.languageCode || "en";

  if (languageCode in SUPPORTED_LANGUAGES) {
    return languageCode as SupportedLanguage;
  }

  return "en";
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
  },
  lng: getDeviceLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  defaultNS: "translation",
  react: {
    useSuspense: false,
  },
  debug: __DEV__,
});

export default i18n;
