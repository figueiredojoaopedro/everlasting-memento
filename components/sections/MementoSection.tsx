"use client";

import Link from "next/link";
import { PhoneMockup } from "@/components/PhoneMockup";
import { useLanguage } from "@/contexts/LanguageContext";

const FEATURES = [
  "memento.feature.photos",
  "memento.feature.stories",
  "memento.feature.voiceNotes",
  "memento.feature.dates",
  "memento.feature.messages",
] as const;

export function MementoSection() {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-secondary/30 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 md:gap-20">
        <div className="relative shrink-0">
          <div
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              transform: "translateX(-35%) rotate(-8deg)",
              opacity: 0.2,
              transformOrigin: "center center",
            }}
          >
            <PhoneMockup showContent={false} />
          </div>
          <div
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              transform: "translateX(35%) rotate(30deg)",
              opacity: 0.2,
              transformOrigin: "center center",
            }}
          >
            <PhoneMockup showContent={false} />
          </div>
          <PhoneMockup showContent />
        </div>

        <div className="flex-1 flex flex-col justify-center md:justify-start md:items-start max-w-lg space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground leading-tight">
            {t("memento.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted font-light leading-relaxed">
            {t("memento.description")}
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {FEATURES.map((key) => (
              <div
                key={key}
                className="flex items-center gap-3 text-foreground"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                <span className="text-sm font-medium">{t(key)}</span>
              </div>
            ))}
          </div>
          <p className="text-muted font-light leading-relaxed">
            {t("memento.shareText")}
          </p>
          <Link
            href="/mockup"
            className="text-center inline-block bg-primary hover:bg-accent text-white font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {t("memento.cta")}
          </Link>
        </div>
      </div>
    </div>
  );
}
