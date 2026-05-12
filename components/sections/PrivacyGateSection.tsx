"use client";

import {
  Mail,
  Key,
  Shield,
  EyeOff,
  ArrowRight,
  Lock,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function PrivacyGateSection() {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-secondary/30 py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20 space-y-4">
          <div className="inline-block px-4 py-1 bg-primary/10 rounded-full border border-primary/20">
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
              {t("privacy.badge")}
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground leading-tight">
            {t("privacy.title1")} <br className="hidden sm:block" />
            <span className="text-primary italic">{t("privacy.title2")}</span>
          </h2>
          <p className="text-lg md:text-xl text-muted font-light max-w-2xl mx-auto leading-relaxed">
            {t("privacy.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="bg-background rounded-[2rem] border border-border p-8 md:p-10 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Key className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-serif font-medium text-foreground">
                {t("privacy.password.title")}
              </h3>
              <p className="text-muted font-light leading-relaxed">
                {t("privacy.password.description")}
              </p>
            </div>
            <div className="bg-secondary/40 rounded-xl p-4 border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted font-medium uppercase tracking-wider">
                  {t("privacy.preview")}
                </span>
              </div>
              <div className="space-y-3">
                <div className="w-full h-10 bg-background rounded-lg border border-border flex items-center px-4">
                  <span className="text-sm text-muted/60">
                    {t("privacy.password.placeholder")}
                  </span>
                </div>
                <div className="w-full h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-medium text-primary/70">
                    {t("privacy.password.unlock")}
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Lock className="w-3 h-3 text-muted/40" />
                  <span className="text-[10px] text-muted/40 uppercase tracking-wider">
                    {t("privacy.password.hidden")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-[2rem] border border-border p-8 md:p-10 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-serif font-medium text-foreground">
                {t("privacy.email.title")}
              </h3>
              <p className="text-muted font-light leading-relaxed">
                {t("privacy.email.description")}
              </p>
            </div>
            <div className="bg-secondary/40 rounded-xl p-4 border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted font-medium uppercase tracking-wider">
                  {t("privacy.preview")}
                </span>
              </div>
              <div className="space-y-3">
                <div className="w-full h-10 bg-background rounded-lg border border-border flex items-center px-4">
                  <span className="text-sm text-muted/60">
                    {t("privacy.email.placeholder")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted/40 text-[10px] uppercase tracking-wider">
                  <ArrowRight className="w-3 h-3" />
                  <span>{t("privacy.email.check")}</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Shield className="w-3 h-3 text-muted/40" />
                  <span className="text-[10px] text-muted/40 uppercase tracking-wider">
                    {t("privacy.email.approved")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 text-center max-w-lg mx-auto">
          <div className="flex items-start gap-3 bg-primary/5 rounded-2xl p-5 border border-primary/10">
            <EyeOff className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-muted text-sm font-light leading-relaxed">
              <span className="font-medium text-foreground">
                {t("privacy.callout.title")}
              </span>{" "}
              {t("privacy.callout.text")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
