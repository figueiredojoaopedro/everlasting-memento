"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const FLOATING_EMOJIS = [
  { emoji: "📖", x: "15%", y: "10%", delay: "0s", size: "text-3xl" },
  { emoji: "❤️", x: "85%", y: "15%", delay: "1s", size: "text-2xl" },
  { emoji: "🎵", x: "10%", y: "55%", delay: "0.5s", size: "text-2xl" },
  { emoji: "💕", x: "88%", y: "50%", delay: "1.5s", size: "text-xl" },
  { emoji: "✨", x: "50%", y: "5%", delay: "2s", size: "text-xl" },
  { emoji: "🎶", x: "5%", y: "80%", delay: "2.5s", size: "text-xl" },
  { emoji: "📝", x: "92%", y: "78%", delay: "0.8s", size: "text-2xl" },
];

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-24 text-center space-y-8">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      <div className="space-y-6 relative">
        {FLOATING_EMOJIS.map((item, i) => (
          <span
            key={i}
            className={`absolute hidden md:inline ${item.size} pointer-events-none select-none`}
            style={{
              left: item.x,
              top: item.y,
              animation: `float ${3 + i * 0.3}s ease-in-out ${item.delay} infinite`,
            }}
          >
            {item.emoji}
          </span>
        ))}

        <h1 className="my-16 md:my-8 text-6xl md:text-8xl font-serif font-medium tracking-tight text-foreground leading-[1.1]">
          {t("hero.headline1")} <br />
          <span className="text-primary italic">{t("hero.headline2")}</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted font-light max-w-xl mx-auto leading-relaxed">
          {t("hero.subtext")}
        </p>
      </div>

      <div className="pt-10">
        <Link
          href="/register"
          className="inline-block bg-primary hover:bg-accent text-white font-medium px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-primary/20 active:scale-95 text-lg"
        >
          {t("hero.cta")}
        </Link>
        <p className="mt-4 text-xs text-muted uppercase tracking-[0.2em] font-medium">
          {t("hero.tagline")}
        </p>
        <div
          className="mt-10 flex justify-center w-auto"
          style={{ animation: "float 2s ease-in-out infinite" }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 20 20"
            fill="none"
            className="text-muted/40"
          >
            <path
              d="M10 3v12M5 10l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
