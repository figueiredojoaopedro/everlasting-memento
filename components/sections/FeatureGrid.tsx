"use client";

import { Sparkles, Shield, Share2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function FeatureGrid() {
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
      <div className="space-y-4">
        <div className="w-12 h-12 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-serif font-medium">
          {t("feature.emotional.title")}
        </h3>
        <p className="text-muted text-sm leading-relaxed font-light">
          {t("feature.emotional.description")}
        </p>
      </div>
      <div className="space-y-4">
        <div className="w-12 h-12 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-serif font-medium">
          {t("feature.private.title")}
        </h3>
        <p className="text-muted text-sm leading-relaxed font-light">
          {t("feature.private.description")}
        </p>
      </div>
      <div className="space-y-4">
        <div className="w-12 h-12 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Share2 className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-serif font-medium">
          {t("feature.sharing.title")}
        </h3>
        <p className="text-muted text-sm leading-relaxed font-light">
          {t("feature.sharing.description")}
        </p>
      </div>
    </div>
  );
}
