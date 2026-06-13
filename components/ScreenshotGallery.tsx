// components/ScreenshotGallery.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Screenshot = {
  src: string;
  alt: string;
  caption: string;
};

export default function ScreenshotGallery({
  screenshots,
}: {
  screenshots: Screenshot[];
}) {
  const [selected, setSelected] = useState<Screenshot | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    },
    []
  );

  useEffect(() => {
    if (selected) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected, handleKeyDown]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <h2 className="text-3xl font-bold tracking-tight text-white text-center mb-8">
        See the product
      </h2>

      <div className="bg-slate-950/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-card-raised p-6 sm:p-8">
        <div
          className="relative group"
          role="region"
          aria-label="Screenshot gallery – scroll to explore"
          tabIndex={0}
        >
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 text-white transition-opacity duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
            onClick={() => {
              const el = document.getElementById("screenshot-gallery");
              if (el) el.scrollBy({ left: -300, behavior: "smooth" });
            }}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 text-white transition-opacity duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
            onClick={() => {
              const el = document.getElementById("screenshot-gallery");
              if (el) el.scrollBy({ left: 300, behavior: "smooth" });
            }}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            id="screenshot-gallery"
            className="overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 sm:mx-0"
          >
            <div className="flex gap-6 w-max px-4 sm:px-0">
              {screenshots.map((shot, idx) => (
                <div
                  key={idx}
                  className="snap-center flex-shrink-0 w-[85vw] max-w-md bg-white/[0.08] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised overflow-hidden cursor-pointer group/card hover:border-white/20 transition-all duration-200"
                  onClick={() => setSelected(shot)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected(shot);
                    }
                  }}
                  aria-label={`View full size: ${shot.caption}`}
                >
                  <div className="p-2 aspect-[4/3]">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={400}
                      height={300}
                      sizes="(max-width: 640px) 85vw, 400px"
                      className="rounded-xl w-full h-full object-cover group-hover/card:scale-[1.02] transition-transform duration-200"
                    />
                  </div>
                  <div className="px-4 pb-4 text-center">
                    <p className="text-xs text-slate-400">{shot.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500 text-center mt-4">
          Actual product screenshots. Use arrows or scroll to explore. Click to enlarge.
        </p>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Full‑size screenshot"
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 text-white transition-colors duration-200"
            aria-label="Close full‑size view"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-5xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected.src}
              alt={selected.alt}
              width={1200}
              height={900}
              sizes="100vw"
              className="rounded-xl w-full h-auto object-contain max-h-[90vh]"
              priority
            />
            <p className="text-center text-sm text-slate-300 mt-3">
              {selected.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}