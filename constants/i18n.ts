export const LANGUAGES = {
  ENGLISH: "en",
} as const;

export type LanguageCode = (typeof LANGUAGES)[keyof typeof LANGUAGES];
