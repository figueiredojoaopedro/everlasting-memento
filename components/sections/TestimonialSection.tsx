"use client";

import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TESTIMONIALS = [
  {
    name: { en: "Ana C.", "pt-BR": "Ana C." },
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    stars: 5,
    text: {
      en: "Beautiful idea. Simple, emotional, and really easy to use.",
      "pt-BR":
        "Beautiful idea. Simple, emotional, and really easy to use.",
    },
  },
  {
    name: { en: "Gustavo R.", "pt-BR": "Gustavo R." },
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    stars: 5,
    text: {
      en: "I made one at 2am for our dating anniversary and honestly didn't expect my boyfriend to get that emotional.",
      "pt-BR":
        "I made one at 2am for our dating anniversary and honestly didn't expect my boyfriend to get that emotional.",
    },
  },
  {
    name: { en: "Bianca M.", "pt-BR": "Bianca M." },
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    stars: 5,
    text: {
      en: "The private page made it feel much more special than posting on Instagram.",
      "pt-BR":
        "The private page made it feel much more special than posting on Instagram.",
    },
  },
  {
    name: { en: "Felipe T.", "pt-BR": "Felipe T." },
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    stars: 5,
    text: {
      en: "We still revisit our memento months later. It became part of our relationship somehow.",
      "pt-BR":
        "We still revisit our memento months later. It became part of our relationship somehow.",
    },
  },
  {
    name: { en: "Larissa P.", "pt-BR": "Larissa P." },
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    stars: 5,
    text: {
      en: "Very cute experience.",
      "pt-BR": "Very cute experience.",
    },
  },
  {
    name: { en: "Daniel A.", "pt-BR": "Daniel A." },
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
    stars: 5,
    text: {
      en: "I liked that it focused on storytelling instead of just throwing photos into a gallery. The final result felt personal.",
      "pt-BR":
        "I liked that it focused on storytelling instead of just throwing photos into a gallery. The final result felt personal.",
    },
  },
  {
    name: { en: "Camila S.", "pt-BR": "Camila S." },
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    stars: 5,
    text: {
      en: "Way more emotional than I expected.",
      "pt-BR": "Way more emotional than I expected.",
    },
  },
  {
    name: { en: "Ricardo N.", "pt-BR": "Ricardo N." },
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    stars: 5,
    text: {
      en: "I used it for my wife's birthday with photos from when we first met until today. She spent almost an hour scrolling through everything and reading the messages.",
      "pt-BR":
        "I used it for my wife's birthday with photos from when we first met until today. She spent almost an hour scrolling through everything and reading the messages.",
    },
  },
  {
    name: { en: "João V.", "pt-BR": "João V." },
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    stars: 5,
    text: {
      en: "Clean design and surprisingly smooth on mobile.",
      "pt-BR": "Clean design and surprisingly smooth on mobile.",
    },
  },
];

function Card({
  item,
  language,
}: {
  item: (typeof TESTIMONIALS)[number];
  language: "en" | "pt-BR";
}) {
  return (
    <div className="w-[300px] shrink-0 bg-background rounded-[1.5rem] border border-border p-6 md:p-7 space-y-4 flex flex-col mr-6">
      <div className="flex items-center gap-1">
        {Array.from({ length: item.stars }).map((_, s) => (
          <Star key={s} className="w-4 h-4 fill-primary/80 text-primary/80" />
        ))}
      </div>

      <p className="text-sm text-muted font-light leading-relaxed flex-1">
        &ldquo;{item.text[language]}&rdquo;
      </p>

      <div className="flex items-center gap-3 pt-2 border-t border-border/50">
        <img
          src={item.avatar}
          alt={item.name[language]}
          className="w-8 h-8 rounded-full object-cover shrink-0"
        />
        <p className="text-sm font-medium text-foreground">
          {item.name[language]}
        </p>
      </div>
    </div>
  );
}

export function TestimonialSection() {
  const { language } = useLanguage();

  const row1 = TESTIMONIALS.slice(0, 5);
  const row2 = [...TESTIMONIALS.slice(5), TESTIMONIALS[0]];

  return (
    <div className="w-full bg-secondary/30 py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-16 md:mb-20">
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1 bg-primary/10 rounded-full border border-primary/20">
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
              {language === "pt-BR" ? "DEPOIMENTOS" : "TESTIMONIALS"}
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground leading-tight">
            {language === "pt-BR"
              ? "Quem usa, ama"
              : "Loved by the people who matter"}
          </h2>
          <p className="text-lg md:text-xl text-muted font-light max-w-2xl mx-auto leading-relaxed">
            {language === "pt-BR"
              ? "Veja o que as pessoas estão criando com o Everlasting."
              : "See what people are creating with Everlasting."}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div
        className="mb-6"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        <div
          className="flex"
          style={{
            animation: "scroll-left 45s linear infinite",
          }}
        >
          {[...row1, ...row1].map((item, i) => (
            <Card key={i} item={item} language={language} />
          ))}
        </div>
      </div>

      <div
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        <div
          className="flex"
          style={{
            animation: "scroll-right 55s linear infinite",
          }}
        >
          {[...row2, ...row2].map((item, i) => (
            <Card key={i} item={item} language={language} />
          ))}
        </div>
      </div>
    </div>
  );
}
