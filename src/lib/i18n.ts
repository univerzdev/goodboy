import i18next from "i18next";
import type { TOptions } from "i18next";
import sk from "@/translations/sk";
import cz from "@/translations/cz";

export const resources = {
  sk: { translation: sk },
  cz: { translation: cz },
} as const;

type LeafTranslationKeys<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object ? `${K}.${LeafTranslationKeys<T[K]>}` : K;
    }[keyof T & string]
  : never;

export type TranslationKey = LeafTranslationKeys<typeof sk>;

if (!i18next.isInitialized) {
  void i18next.init({
    resources,
    lng: "sk",
    fallbackLng: "sk",
    interpolation: {
      escapeValue: false,
    },
  });
}

export const t = (key: TranslationKey, options?: TOptions) => `${i18next.t(key, options)}`;

export const setLanguage = async (language: "sk" | "cz") => {
  await i18next.changeLanguage(language);
};

export default i18next;
