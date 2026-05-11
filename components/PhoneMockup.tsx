"use client";

import { useRef, useState, useCallback } from "react";
import { MockupContent } from "@/components/MockupContent";

export function PhoneMockup() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setScrollY(scrollRef.current.scrollTop);
    }
  }, []);

  return (
    <div className="shrink-0 mx-auto w-64 sm:w-80">
      <div className="relative w-full" style={{ aspectRatio: "393/852" }}>
        {/* Titanium frame */}
        <div className="absolute inset-0 rounded-[50px] bg-zinc-800 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_25px_70px_-15px_rgba(0,0,0,0.5)]" />

        {/* Screen */}
        <div className="absolute inset-[8px] rounded-[42px] bg-[#121212] overflow-hidden">
          {/* Status bar + Dynamic Island */}
          <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none flex items-center justify-between px-5 pt-[8px]">
            <span className="text-white font-semibold text-[11px] leading-none">
              9:41
            </span>
            <div className="flex items-center gap-1">
              <div className="flex items-end gap-[1px] h-[9px]">
                <div className="w-[2.5px] bg-white rounded-[0.5px]" style={{ height: "3px" }} />
                <div className="w-[2.5px] bg-white rounded-[0.5px]" style={{ height: "5px" }} />
                <div className="w-[2.5px] bg-white rounded-[0.5px]" style={{ height: "7px" }} />
                <div className="w-[2.5px] bg-white rounded-[0.5px]" style={{ height: "9px" }} />
              </div>
              <div className="border border-white/80 rounded-[2px] w-[17px] h-[9px] p-[1px] relative">
                <div className="w-[65%] h-full bg-white rounded-[0.5px]" />
                <div className="absolute -right-[1.5px] top-[1.5px] w-[1.5px] h-[4px] bg-white/80 rounded-r-[0.5px]" />
              </div>
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="absolute top-[8px] left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div className="w-[76px] h-[25px] bg-black rounded-full" />
          </div>

          {/* Scrollable content */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="absolute inset-0 overflow-y-auto [&::-webkit-scrollbar]:hidden"
            style={{
              scrollbarWidth: "none",
              overscrollBehavior: "contain",
              touchAction: "pan-y",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <MockupContent scrollY={scrollY} isCompact />
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/30 rounded-full z-30 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
