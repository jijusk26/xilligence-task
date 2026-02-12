import type { SupportedLanguage } from "@/config/i18n.config";
import { useTranslation as useI18nextTranslation } from "react-i18next";

export const useTranslation = () => {
  const { t, i18n } = useI18nextTranslation();

  const changeLanguage = async (language: SupportedLanguage) => {
    try {
      await i18n.changeLanguage(language);
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  const currentLanguage = i18n.language as SupportedLanguage;

  return {
    t,
    changeLanguage,
    currentLanguage,
    isRTL: i18n.dir() === "rtl",
  };
};

export default useTranslation;
