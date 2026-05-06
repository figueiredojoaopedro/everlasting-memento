"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  Sparkles,
  Shield,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

export default function Home() {
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
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="p-6 md:p-10 flex justify-between items-center z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 text-white fill-current" />
          </div>
          <span className="font-serif font-medium text-xl tracking-tight">
            Everlasting
          </span>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center z-10">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-6 pt-12 md:pt-24 text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-serif font-medium tracking-tight text-foreground leading-[1.1]">
              Your memories, <br />
              <span className="text-primary italic">preserved forever.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted font-light max-w-xl mx-auto leading-relaxed">
              Create a private, beautiful space for your most meaningful moments
              and share them with the people who matter.
            </p>
          </div>

          <div className="pt-10">
            <Link
              href="/create"
              className="inline-block bg-primary hover:bg-accent text-white font-medium px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-primary/20 active:scale-95 text-lg"
            >
              Create your memento
            </Link>
            <p className="mt-4 text-xs text-muted uppercase tracking-[0.2em] font-medium">
              It only takes a minute
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="max-w-5xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-serif font-medium">Emotional Focus</h3>
            <p className="text-muted text-sm leading-relaxed font-light">
              Not just photos. Turn your moments into a story that lives on.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-serif font-medium">
              Private by Default
            </h3>
            <p className="text-muted text-sm leading-relaxed font-light">
              Your memento is private. You decide when and who to share it with.
              No social media noise.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Share2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-serif font-medium">
              Beautiful Sharing
            </h3>
            <p className="text-muted text-sm leading-relaxed font-light">
              Share a clean, read-only timeline that looks like a digital art
              gallery of your moments.
            </p>
          </div>
        </div>

        {/* Visual Showcase - Carousel Implementation */}
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

            {/* Carousel Controls */}
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

          {/* Decorative blobs */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/40 rounded-full blur-3xl -z-10" />
        </div>
      </main>

      <footer className="py-12 border-t border-border/50 text-center space-y-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Heart className="w-4 h-4 text-primary fill-current" />
          <span className="font-serif font-medium text-lg tracking-tight">
            Everlasting
          </span>
        </div>
        <p className="text-muted/60 text-xs uppercase tracking-widest">
          Built for the moments that matter.
        </p>
        <p className="text-muted/40 text-[10px] pt-4">
          © {new Date().getFullYear()} Everlasting Mementos.
        </p>
      </footer>
    </div>
  );
}
