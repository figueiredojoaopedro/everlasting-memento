"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { translations, type Language } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("language") as Language | null;
    if (stored && (stored === "en" || stored === "pt-BR")) {
      setLanguage(stored);
      return;
    }
    const lang = navigator.language;
    if (lang.startsWith("pt")) {
      setLanguage("pt-BR");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("language", language);
    document.documentElement.lang = language === "pt-BR" ? "pt-BR" : "en";
  }, [language, mounted]);

  const t = useCallback(
    (key: string): string => {
      return translations[language]?.[key] ?? translations["en"]?.[key] ?? key;
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
