"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { AudioPlayer } from "@/components/AudioPlayer";
import {
  format,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  parseISO,
} from "date-fns";
import { useLocale } from "@/hooks/useLocale";

const MOCK_MEMENTO = {
  title: "Our Story",
  date: "2024-03-15",
  whoIsThisFor: "My love",
  coverImageUrl:
    "https://images.unsplash.com/photo-1658019449322-d552d4986af5?q=80&w=1170&auto=format&fit=crop",
};

const MOCK_GIVER = "You";
const MOCK_RECEIVER = "Your love";

const MOCK_MEANINGFUL_TEXT = `From the moment our paths crossed, everything changed. It was as if a part of me I never knew was missing finally found its place. Life by your side isn't perfect every day, but it's real, intense, and full of meaning.

We fight sometimes, disagree, face challenges. But that's exactly what makes me even more certain of what we've built. Because even on the days when the world seems to crumble, you're still here. By my side. Holding my hand. Showing me that true love isn't the one that avoids storms, but the one that holds on tight until the sun shines again.

I admire you so much. For your strength, for the way you take care of me, for how you find beauty in the little things, for how you turn any place into home just by being there. You inspire me to be someone better, lighter, kinder — with myself and with the world.

With you, I learned to breathe deeply, to be patient, to trust. I learned that happiness isn't in grand moments, but in shared routines, spontaneous laughter, simple nights of conversation before sleep.

If I had to choose everything all over again, even knowing the challenges, I'd choose you. A thousand times you. Because with you my heart rests, with you my dreams make sense.

You're not just my love — you're my story, my home, my present, and my future. Loving you is my favorite way of living.`;

const MOCK_MEMORIES = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1426543881949-cbd9a76740a4?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1170&auto=format&fit=crop",
    title: "Our first sunset",
    description:
      "We sat on the cliff watching the sun dip into the ocean. The sky turned shades of pink and gold, and for a moment, everything else disappeared.",
    meaning:
      "It was the first time I felt completely at peace with someone. That sunset marked the beginning of everything.",
    date: "2024-06-10",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1170&auto=format&fit=crop",
    title: "The rainy afternoon",
    description:
      "Caught in the rain without an umbrella. We ran through the streets laughing, soaking wet, not caring about anything.",
    meaning:
      "It reminded me that happiness isn't about perfect plans. It's about who you're with when things go wrong.",
    date: "2024-08-22",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2000&auto=format&fit=crop",
    title: "Under the stars",
    description:
      "We drove far from the city lights, laid a blanket on the grass, and just stared up at the sky for hours.",
    meaning:
      "In a world that never stops moving, that night was our pause button. Just us, the stars, and silence that spoke volumes.",
    date: "2024-11-05",
  },
];

function formatTimeTogether(startDate: string) {
  const start = parseISO(startDate);
  const now = new Date();
  const years = differenceInYears(now, start);
  const totalMonths = differenceInMonths(now, start);
  const months = totalMonths % 12;
  const days = differenceInDays(now, start);

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? "month" : "months"}`);

  return { label: parts.join(", "), days };
}

interface MockupContentProps {
  scrollY?: number;
  isCompact?: boolean;
}

export function MockupContent({ scrollY: externalScrollY, isCompact = false }: MockupContentProps) {
  const locale = useLocale();
  const [internalScrollY, setInternalScrollY] = useState(0);
  const [activeMemory, setActiveMemory] = useState(0);

  const scrollY = externalScrollY ?? internalScrollY;

  useEffect(() => {
    if (externalScrollY !== undefined) return;
    const handleScroll = () => setInternalScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [externalScrollY]);

  const timeTogether = formatTimeTogether(MOCK_MEMENTO.date);

  const c = (normal: string, compact: string) => isCompact ? compact : normal;

  const prevMemory = () =>
    setActiveMemory((prev) =>
      prev === 0 ? MOCK_MEMORIES.length - 1 : prev - 1,
    );
  const nextMemory = () =>
    setActiveMemory((prev) =>
      prev === MOCK_MEMORIES.length - 1 ? 0 : prev + 1,
    );

  return (
    <div className="bg-[#121212] text-white">
      {/* Hero Section */}
      <div className="relative min-h-[100dvh] w-full overflow-hidden">
        <Image
          src={MOCK_MEMENTO.coverImageUrl}
          alt={MOCK_MEMENTO.title}
          fill
          className="object-cover"
          style={{
            transform: `scale(${1 + scrollY * 0.0005})`,
          }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-[#121212]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#121212]" />

        <div className={c("absolute bottom-0 left-0 right-0 p-6 md:p-12 pb-16 md:pb-24", "absolute bottom-0 left-0 right-0 p-4 pb-10")}>
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <div className={c(
              "inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10",
              "inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10"
            )}>
              <Heart className="w-3 h-3 text-[#E8A9A9] fill-current" />
              <span className="text-[10px] text-white/70 uppercase tracking-[0.2em] font-medium">
                A love story
              </span>
            </div>

            <h1 className={c("text-5xl md:text-7xl font-serif font-light text-white", "text-2xl font-serif font-light text-white")}>
              {MOCK_GIVER} & {MOCK_RECEIVER}
            </h1>

            <p className="text-white/70 text-xs font-light">
              Together since{" "}
              {format(parseISO(MOCK_MEMENTO.date), "MMMM d, yyyy", {
                locale,
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Audio Player + Time Together */}
      <div className={c("bg-white/[0.02] py-12 md:py-16", "bg-white/[0.02] py-8")}>
        <div className={c("max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-stretch gap-8", "max-w-4xl mx-auto px-4 flex flex-col items-stretch gap-6")}>
          <div className="flex-1">
            <AudioPlayer
              coverImage={MOCK_MEMORIES?.[0].imageUrl}
              key={"aoede-mockup-audio"}
              autoPlay={false}
              src="/audios-samples/aoede-mockup-audio.wav"
            />
          </div>
          <div className="flex-1 flex">
            <div className={c(
              "w-full h-full bg-white/5 rounded-[2rem] border border-white/[0.08] p-8 md:p-10 flex flex-col items-center justify-center space-y-4 text-center",
              "w-full h-full bg-white/5 rounded-2xl border border-white/[0.08] p-5 flex flex-col items-center justify-center space-y-3 text-center"
            )}>
              <div className="w-10 h-10 mx-auto rounded-full bg-[#E8A9A9]/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#E8A9A9]" />
              </div>
              <p className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-medium">
                Time together
              </p>
              <p className={c("text-4xl md:text-5xl font-serif font-light text-white", "text-2xl font-serif font-light text-white")}>
                {timeTogether.label}
              </p>
              <p className="text-white/50 text-xs">
                {timeTogether.days.toLocaleString()} days of shared moments
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Memories Timeline */}
      <div className={c("max-w-2xl mx-auto px-6 py-10", "max-w-2xl mx-auto px-4 py-8")}>
        <div className={c("text-center mb-12 space-y-3", "text-center mb-8 space-y-2")}>
          <div className="inline-block px-4 py-1 bg-white/5 rounded-full border border-white/[0.06]">
            <p className="text-[10px] font-bold text-[#E8A9A9] uppercase tracking-[0.2em]">
              Our memories
            </p>
          </div>
          <h2 className={c("text-3xl md:text-4xl font-serif font-light text-white", "text-xl font-serif font-light text-white")}>
            Moments that tell our story
          </h2>
        </div>

        {(() => {
          const memory = MOCK_MEMORIES[activeMemory];
          return (
            <div className="group">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] mb-4 group/image">
                <Image
                  src={memory.imageUrl}
                  alt={memory.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover/image:scale-105"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                <button
                  onClick={prevMemory}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover/image:opacity-100 transition-opacity hover:bg-white/20 active:scale-95"
                  aria-label="Previous memory"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextMemory}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover/image:opacity-100 transition-opacity hover:bg-white/20 active:scale-95"
                  aria-label="Next memory"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-[#E8A9A9] uppercase tracking-[0.2em]">
                    {format(parseISO(memory.date), "MMMM d, yyyy", {
                      locale,
                    })}
                  </span>
                </div>
                {memory.title && (
                  <h3 className={c("text-xl font-serif font-light text-white/90", "text-base font-serif font-light text-white/90")}>
                    {memory.title}
                  </h3>
                )}
                <p className={c("text-white/80 text-sm leading-relaxed font-light", "text-white/80 text-xs leading-relaxed font-light")}>
                  {memory.description}
                </p>
                <div className="pt-3">
                  <div className="flex items-start gap-3 italic border-l border-[#E8A9A9]/20 pl-4 py-1">
                    <Heart className="w-3 h-3 text-[#E8A9A9]/40 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-medium text-[#E8A9A9]/60 block text-[10px] uppercase tracking-tighter mb-1">
                        Why it&apos;s meaningful
                      </span>
                      <p className={c("text-white/70 text-sm", "text-white/70 text-xs")}>{memory.meaning}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Carousel Navigation */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {MOCK_MEMORIES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveMemory(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === activeMemory
                  ? "w-8 bg-[#E8A9A9]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Meaningful Text Section */}
      <div className={c("py-20 md:py-28 bg-white/[0.02]", "py-12 bg-white/[0.02]")}>
        <div className={c("max-w-2xl mx-auto px-6", "max-w-2xl mx-auto px-4")}>
          <div className={c("text-center mb-12 space-y-3", "text-center mb-8 space-y-2")}>
            <div className="inline-block px-4 py-1 bg-white/5 rounded-full border border-white/[0.06]">
              <p className="text-[10px] font-bold text-[#E8A9A9] uppercase tracking-[0.2em]">
                A letter
              </p>
            </div>
            <h2 className={c("text-3xl md:text-4xl font-serif font-light text-white", "text-xl font-serif font-light text-white")}>
              From the heart
            </h2>
          </div>

          <div className={c(
            "bg-white/[0.03] rounded-[2rem] border border-white/[0.06] p-8 md:p-12",
            "bg-white/[0.03] rounded-2xl border border-white/[0.06] p-5"
          )}>
            {MOCK_MEANINGFUL_TEXT.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className={c(
                  "text-white/80 text-sm md:text-base leading-relaxed font-light mb-6 last:mb-0",
                  "text-white/80 text-xs leading-relaxed font-light mb-4 last:mb-0"
                )}
              >
                {paragraph}
              </p>
            ))}
            <div className="flex justify-center pt-4">
              <Heart className="w-5 h-5 text-[#E8A9A9]/60" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={c("py-20 md:py-28", "py-12")}>
        <div className={c("max-w-md mx-auto px-6 text-center space-y-8", "max-w-md mx-auto px-4 text-center space-y-6")}>
          <div className="space-y-3">
            <h3 className={c("text-2xl md:text-3xl font-serif font-light text-white", "text-lg font-serif font-light text-white")}>
              Create your own story
            </h3>
            <p className={c("text-white/70 text-sm font-light", "text-white/70 text-xs font-light")}>
              A beautiful, private space for the moments that matter most.
            </p>
          </div>
          <Link
            href="/create"
            className={c(
              "inline-flex items-center gap-2 bg-[#E8A9A9] hover:bg-[#D98C8C] text-white font-medium px-10 py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#E8A9A9]/20 transform hover:-translate-y-0.5",
              "inline-flex items-center gap-1.5 bg-[#E8A9A9] hover:bg-[#D98C8C] text-white font-medium px-6 py-2.5 rounded-full text-sm transition-all duration-300 shadow-lg shadow-[#E8A9A9]/20"
            )}
          >
            <Heart className="w-4 h-4 fill-current" />
            Start your memento
          </Link>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] pt-4">
            Everlasting Mementos
          </p>
        </div>
      </div>
    </div>
  );
}
