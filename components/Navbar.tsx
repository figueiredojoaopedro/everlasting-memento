"use client";

import Link from "next/link";
import { Heart, Globe, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LANGUAGES } from "@/lib/translations";
import { useState, useRef, useEffect } from "react";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  return (
    <nav className="p-6 md:p-10 flex justify-between items-center relative z-30">
      <Link href="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Heart className="w-4 h-4 text-white fill-current" />
        </div>
        <span className="font-serif font-medium text-xl tracking-tight">
          Everlasting
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1.5 text-xs font-medium text-muted hover:text-foreground transition-colors border border-border/50 px-3 py-2 rounded-full hover:border-primary/50"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === "pt-BR" ? "PT" : "EN"}</span>
          </button>
          {open && (
            <div className="absolute right-0 top-full mt-2 z-[999] bg-background border border-border rounded-xl shadow-lg min-w-[144px]">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.value}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setLanguage(lang.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-secondary/50 flex items-center justify-between gap-3 ${
                    language === lang.value
                      ? "text-primary font-medium"
                      : "text-muted"
                  }`}
                >
                  <span>{lang.label}</span>
                  {language === lang.value && (
                    <Check className="w-3.5 h-3.5 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/login"
          className="text-sm font-medium text-muted hover:text-foreground transition-colors border border-border/50 px-5 py-2.5 rounded-full hover:border-primary/50"
        >
          {t("navbar.signIn")}
        </Link>
      </div>
    </nav>
  );
}
