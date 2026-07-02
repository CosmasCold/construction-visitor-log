"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";

const t = {
  en: {
    price: "$49/month",
    sites: "20 sites",
    cta: "Start free trial",
    dismiss: "Dismiss",
  },
  pt: {
    price: "R$249/mes",
    sites: "20 locais",
    cta: "Comecar teste gratis",
    dismiss: "Fechar",
  },
};

export default function StickyCTA() {
  const pathname = usePathname();
  const isBR = pathname?.startsWith("/br");
  const locale: "en" | "pt" = isBR ? "pt" : "en";
  const copy = t[locale];
  const prefix = isBR ? "/br" : "";
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="bg-white/[0.03] backdrop-blur-xl border-t border-white/10 py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link
            href={`${prefix}/signup`}
            className="flex-1 text-center inline-flex items-center justify-center gap-2 text-sm font-semibold text-sky-300 hover:text-white transition-colors"
          >
            <span className="hidden sm:inline">{copy.price} — {copy.sites}. </span>
            <span>{copy.cta}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
            aria-label={copy.dismiss}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}