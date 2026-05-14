"use client";

import { Pen, Image, Share2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const STEPS = [
  {
    number: "01",
    icon: Pen,
    titleKey: "how.step1.title",
    descriptionKey: "how.step1.description",
  },
  {
    number: "02",
    icon: Image,
    titleKey: "how.step2.title",
    descriptionKey: "how.step2.description",
  },
  {
    number: "03",
    icon: Share2,
    titleKey: "how.step3.title",
    descriptionKey: "how.step3.description",
  },
];

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <div className="w-full py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground leading-tight">
            {t("how.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted font-light max-w-xl mx-auto leading-relaxed">
            {t("how.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="text-center space-y-5">
                <div className="relative">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-medium text-foreground">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed font-light">
                    {t(step.descriptionKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
