import { ptBR, enUS, es, fr } from "date-fns/locale";
import type { Locale } from "date-fns";

const LOCALE_MAP: Record<string, Locale> = {
  "pt-BR": ptBR,
  "pt-PT": ptBR,
  pt: ptBR,
  "en-US": enUS,
  "en-GB": enUS,
  en: enUS,
  es: es,
  fr: fr,
};

export function getUserLocale(): Locale {
  if (typeof window === "undefined") return ptBR;
  const lang = navigator.language;
  return LOCALE_MAP[lang] ?? LOCALE_MAP[lang.split("-")[0]] ?? ptBR;
}
