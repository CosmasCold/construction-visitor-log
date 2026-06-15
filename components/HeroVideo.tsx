"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { logEvent } from "@/lib/analytics";

export default function HeroVideo() {
  const [playing, setPlaying] = useState(false);

  if (!playing) {
    return (
      <div className="mt-8 max-w-xl mx-auto">
        <button
          onClick={() => {
            setPlaying(true);
            logEvent("video_play");
          }}
          className="relative w-full rounded-xl border border-white/10 overflow-hidden group"
          style={{ paddingBottom: "56.25%" }}
        >
          {/* Thumbnail */}
          <img
            src="https://img.youtube.com/vi/JmVMm-4s6B4/maxresdefault.jpg"
            alt="SiteSafe demo video"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          {/* Play button overlay */}
          <span className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
            <span className="bg-white/90 rounded-full p-3 shadow-lg">
              <Play className="w-6 h-6 text-slate-900 ml-0.5" />
            </span>
          </span>
        </button>
        <p className="text-xs text-slate-500 mt-2 flex items-center justify-center gap-1">
          <Play className="w-3 h-3" /> 30‑second overview
        </p>
      </div>
    );
  }

  // Once clicked, load the real iframe
  return (
    <div className="mt-8 max-w-xl mx-auto">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src="https://www.youtube.com/embed/JmVMm-4s6B4?autoplay=1"
          title="SiteSafe demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full rounded-xl border border-white/10"
        />
      </div>
      <p className="text-xs text-slate-500 mt-2 flex items-center justify-center gap-1">
        <Play className="w-3 h-3" /> 30‑second overview
      </p>
    </div>
  );
}