"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Play, Pause, Music } from "lucide-react";

const SIMULATED_DURATION = 47;
const WAVE_BARS = 40;

const WAVE_HEIGHTS = Array.from({ length: WAVE_BARS }, (_, i) =>
  Math.round(
    Math.max(
      4,
      20 +
        Math.sin(i * 0.8) * 12 +
        Math.sin(i * 1.7) * 8 +
        Math.sin(i * 0.3) * 10,
    ),
  ),
);

interface AudioPlayerProps {
  title?: string;
  subtitle?: string;
  coverImage?: string;
  src?: string;
  autoPlay?: boolean;
}

export function AudioPlayer({
  title = "A voice note",
  subtitle = "A special message for you",
  coverImage,
  src,
  autoPlay = false,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay && !src);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(src ? 0 : SIMULATED_DURATION);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    if (autoPlay && !src) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 0.25;
          if (next >= SIMULATED_DURATION) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 250);
    }
  }, [autoPlay, src]);

  useEffect(() => {
    if (!src) return;
    const audio = new Audio(src);
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      setProgress(audio.currentTime);
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setProgress(0);
    });

    if (autoPlay) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [src]);

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlaying(false);
    } else {
      if (src && audioRef.current) {
        audioRef.current.play();
      } else {
        intervalRef.current = setInterval(() => {
          setProgress((prev) => {
            const next = prev + 0.25;
            if (next >= currentDuration) {
              if (intervalRef.current) clearInterval(intervalRef.current);
              setIsPlaying(false);
              return 0;
            }
            return next;
          });
        }, 250);
      }
      setIsPlaying(true);
    }
  };

  const currentDuration = duration || SIMULATED_DURATION;
  const progressPercent = duration
    ? (progress / duration) * 100
    : (progress / SIMULATED_DURATION) * 100;
  const currentDisplay = `${Math.floor(progress / 60)}:${String(Math.floor(progress % 60)).padStart(2, "0")}`;
  const durationDisplay = `${Math.floor(currentDuration / 60)}:${String(Math.floor(currentDuration % 60)).padStart(2, "0")}`;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/5 rounded-[2rem] border border-white/[0.08] p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-4">
          {coverImage ? (
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-white/5">
              <Image
                src={coverImage}
                alt={title}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#E8A9A9]/10 flex items-center justify-center shrink-0">
              <Music className="w-5 h-5 text-[#E8A9A9]" />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-white/80 text-sm font-medium truncate">
              {title}
            </p>
            <p className="text-white/40 text-xs">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-end gap-[2px] h-12">
          {WAVE_HEIGHTS.map((height, i) => (
            <div
              key={i}
              className="flex-1 rounded-full transition-all duration-150"
              style={{
                height: `${height}px`,
                backgroundColor: isPlaying
                  ? i / WAVE_BARS < progressPercent / 100
                    ? "#E8A9A9"
                    : "rgba(255, 255, 255, 0.15)"
                  : "rgba(255, 255, 255, 0.1)",
              }}
            />
          ))}
        </div>

        <div className="space-y-2">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E8A9A9] rounded-full transition-all duration-200 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-white/40 uppercase tracking-wider">
            <span>{currentDisplay}</span>
            <span>{durationDisplay}</span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-[#E8A9A9] hover:bg-[#D98C8C] flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-[#E8A9A9]/20"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white fill-current ml-0" />
            ) : (
              <Play className="w-5 h-5 text-white fill-current ml-0.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
