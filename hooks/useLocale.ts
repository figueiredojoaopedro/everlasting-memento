import { useState, useEffect } from "react";
import { ptBR } from "date-fns/locale";
import { getUserLocale } from "@/lib/locale";
import type { Locale } from "date-fns";

export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>(ptBR);

  useEffect(() => {
    setLocale(getUserLocale());
  }, []);

  return locale;
}
