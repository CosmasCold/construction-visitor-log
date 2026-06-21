"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-white/10 z-40 py-3 px-4 text-center">
      <Link
        href="/signup"
        className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-sky-300 hover:text-white transition-colors"
      >
        $49/month – 20 sites. Start free trial <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}