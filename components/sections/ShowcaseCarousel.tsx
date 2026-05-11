"use client";

import { useState, useEffect } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

const SHOWCASE_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1658019449322-d552d4986af5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "The best things in life aren't things, they're moments.",
  },
  {
    url: "https://images.unsplash.com/photo-1763367415555-704a5941e781?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "Every love story is beautiful, but ours is my favorite.",
  },
  {
    url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2000&auto=format&fit=crop",
    quote: "Memories are the architecture of our souls.",
  },
];

export function ShowcaseCarousel() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % SHOWCASE_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () =>
    setActiveImage((prev) => (prev + 1) % SHOWCASE_IMAGES.length);
  const prevImage = () =>
    setActiveImage(
      (prev) => (prev - 1 + SHOWCASE_IMAGES.length) % SHOWCASE_IMAGES.length,
    );

  return (
    <div className="relative w-full max-w-6xl px-6 pb-24 group">
      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-[2.5rem] shadow-2xl">
        {SHOWCASE_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === activeImage ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"}`}
          >
            <img
              src={img.url}
              alt={`Showcase ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div
                className={`bg-white/10 backdrop-blur-md p-6 md:p-10 rounded-[2rem] border border-white/20 text-white text-center max-w-lg transition-all duration-700 delay-300 ${idx === activeImage ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              >
                <Heart className="w-8 h-8 text-primary fill-current mx-auto mb-6" />
                <p className="font-serif italic text-xl md:text-2xl leading-relaxed">
                  &ldquo;{img.quote}&rdquo;
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute inset-x-0 bottom-8 flex items-center justify-center space-x-3 z-20">
          {SHOWCASE_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeImage ? "w-8 bg-primary" : "w-2 bg-white/50 hover:bg-white"}`}
            />
          ))}
        </div>

        <button
          onClick={prevImage}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/40 rounded-full blur-3xl -z-10" />
    </div>
  );
}
