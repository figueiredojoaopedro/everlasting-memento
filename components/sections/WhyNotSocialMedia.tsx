"use client";

import {
  Heart,
  Lock,
  Timer,
  ShieldCheck,
  Eye,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const COMPARISONS = [
  { ourKey: "social.private.default", theirKey: "social.public.default", icon: Lock },
  { ourKey: "social.made.memories", theirKey: "social.made.attention", icon: Heart },
  { ourKey: "social.calm.timeless", theirKey: "social.fast.disposable", icon: Timer },
  { ourKey: "social.no.ads", theirKey: "social.algorithm", icon: ShieldCheck },
  { ourKey: "social.emotional", theirKey: "social.scrolling", icon: Sparkles },
];

export function WhyNotSocialMedia() {
  const { t } = useLanguage();

  return (
    <div className="w-full py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground leading-tight">
            {t("social.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted font-light max-w-2xl mx-auto leading-relaxed">
            {t("social.description")}
          </p>
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-[1fr_auto_1fr] gap-0 items-center">
            <div className="text-center pb-8">
              <span className="text-2xl font-serif font-medium text-foreground">
                {t("social.header.everlasting")}
              </span>
            </div>
            <div className="pb-8" />
            <div className="text-center pb-8">
              <span className="text-2xl font-serif font-medium text-muted/60">
                {t("social.header.socialMedia")}
              </span>
            </div>

            {COMPARISONS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="contents">
                  <div className="bg-secondary/30 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">
                      {t(item.ourKey)}
                    </span>
                  </div>
                  <div className="flex items-center justify-center px-6">
                    <div className="w-px h-8 bg-border" />
                  </div>
                  <div className="bg-border/30 rounded-2xl p-5 flex items-center gap-4">
                    <span className="text-muted/50 font-medium">
                      {t(item.theirKey)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:hidden space-y-6">
          {COMPARISONS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-secondary/30 rounded-2xl p-5 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium text-sm">
                    {t(item.ourKey)}
                  </span>
                </div>
                <div className="flex items-center gap-3 pl-11">
                  <div className="w-px h-4 bg-border shrink-0" />
                  <span className="text-muted/50 text-sm">
                    {t(item.theirKey)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 md:mt-20 text-center max-w-xl mx-auto space-y-4">
          <p className="text-muted font-light leading-relaxed">
            {t("social.bottomText")}
          </p>
          <div className="flex items-center justify-center gap-2 text-primary">
            <Eye className="w-4 h-4" />
            <span className="text-sm font-medium">{t("social.tagline")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
