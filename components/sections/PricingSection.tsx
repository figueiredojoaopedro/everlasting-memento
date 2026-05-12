"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  Check,
  Image,
  Lock,
  Music,
  MessageSquare,
  Calendar,
  QrCode,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const FEATURE_KEYS = [
  "pricing.feature.photos",
  "pricing.feature.password",
  "pricing.feature.voiceNotes",
  "pricing.feature.messages",
  "pricing.feature.dates",
  "pricing.feature.qrcode",
];

const FEATURE_ICONS = [Image, Lock, Music, MessageSquare, Calendar, QrCode];

function useCurrency() {
  const [currency, setCurrency] = useState<{
    symbol: string;
    weekly: string;
    yearly: string;
    code: string;
  }>({
    symbol: "R$",
    weekly: "15,99",
    yearly: "29,99",
    code: "BRL",
  });

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const isBrazil =
        tz.startsWith("America/") &&
        [
          "Sao_Paulo", "Belem", "Fortaleza", "Manaus", "Cuiaba",
          "Porto_Velho", "Campo_Grande", "Maceio", "Salvador",
          "Recife", "Natal", "Aracaju", "Sao_Luis", "Teresina",
          "Curitiba", "Florianopolis", "Porto_Alegre", "Brasilia",
          "Vitoria", "Goiania", "Santarem",
        ].includes(tz.split("/").pop() || "");

      if (isBrazil) {
        setCurrency({
          symbol: "R$",
          weekly: "15,99",
          yearly: "29,99",
          code: "BRL",
        });
      } else {
        setCurrency({
          symbol: "$",
          weekly: "4.99",
          yearly: "12.99",
          code: "USD",
        });
      }
    } catch {
      setCurrency({
        symbol: "$",
        weekly: "4.99",
        yearly: "12.99",
        code: "USD",
      });
    }
  }, []);

  return currency;
}

export function PricingSection() {
  const currency = useCurrency();
  const { t } = useLanguage();

  return (
    <div className="w-full bg-secondary/30 py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground leading-tight">
            {t("pricing.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted font-light max-w-lg mx-auto leading-relaxed">
            {t("pricing.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="bg-background rounded-[2rem] border border-border p-8 md:p-10 space-y-6 flex flex-col">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-primary/10 rounded-full text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                {t("pricing.weekly.badge")}
              </span>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-3xl md:text-4xl font-serif font-medium text-foreground">
                  {currency.symbol} {currency.weekly}
                </span>
              </div>
              <p className="text-muted text-sm font-light">
                {t("pricing.oneTime")}
              </p>
            </div>

            <ul className="space-y-3 flex-1">
              {FEATURE_KEYS.map((key, i) => {
                const Icon = FEATURE_ICONS[i];
                return (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm text-foreground/80 font-light">
                      {t(key)}
                    </span>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/create"
              className="block text-center bg-primary hover:bg-accent text-white font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full"
            >
              {t("pricing.cta")}
            </Link>
          </div>

          <div className="bg-background rounded-[2rem] border-2 border-primary/40 shadow-lg shadow-primary/5 p-8 md:p-10 space-y-6 flex flex-col relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-block px-4 py-1.5 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-md">
                {t("pricing.bestValue")}
              </span>
            </div>

            <div className="space-y-2 pt-2">
              <span className="inline-block px-3 py-1 bg-primary/10 rounded-full text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                {t("pricing.yearly.badge")}
              </span>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-3xl md:text-4xl font-serif font-medium text-foreground">
                  {currency.symbol} {currency.yearly}
                </span>
              </div>
              <p className="text-muted text-sm font-light">
                {t("pricing.oneTime")}
              </p>
            </div>

            <ul className="space-y-3 flex-1">
              {FEATURE_KEYS.map((key, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm text-foreground/80 font-light">
                    {t(key)}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/create"
              className="block text-center bg-primary hover:bg-accent text-white font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full"
            >
              {t("pricing.cta")}
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-muted/70 text-sm font-light">
            <Heart className="w-4 h-4 text-primary/60" />
            <span>{t("pricing.footer")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
