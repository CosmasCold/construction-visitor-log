"use client";

import { Play } from "lucide-react";
import { track } from "@vercel/analytics";

export default function HeroVideo() {
  return (
    <div className="mt-8 max-w-xl mx-auto">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src="https://www.youtube.com/embed/JmVMm-4s6B4"
          title="SiteSafe demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full rounded-xl border border-white/10"
          onLoad={() => track("video_play")}
        />
      </div>
      <p className="text-xs text-slate-500 mt-2 flex items-center justify-center gap-1">
        <Play className="w-3 h-3" /> 30‑second overview
      </p>
    </div>
  );
}