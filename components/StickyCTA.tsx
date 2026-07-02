"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const t = {
  en: {
    price: "$49/month",
    sites: "20 sites",
    cta: "Start free trial",
  },
  pt: {
    price: "R$249/mês",
    sites: "20 locais",
    cta: "Começar teste grátis",
  },
};

function getLocale(): "en" | "pt" {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/sitesafe-locale=(en|pt)/);
  return match ? (match[1] as "en" | "pt") : "en";
}

export default function StickyCTA() {
  const locale = getLocale();
  const copy = t[locale];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-white/10 z-40 py-3 px-4 text-center">
      <Link
        href="/signup"
        className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-sky-300 hover:text-white transition-colors"
      >
        {copy.price} – {copy.sites}. {copy.cta} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}