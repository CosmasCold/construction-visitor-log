"use client";

import { useState } from "react";

interface LanguageSwitcherProps {
  showLabel?: boolean;
}

export default function LanguageSwitcher({ showLabel = false }: LanguageSwitcherProps) {
  const [locale, setLocale] = useState(() => {
    if (typeof window === "undefined") return "en";
    const match = document.cookie.match(/(?:^|; )sitesafe-locale=([^;]*)/);
    return match ? (decodeURIComponent(match[1]) as "en" | "pt") : "en";
  });

  function switchLocale(newLocale: "en" | "pt") {
    setLocale(newLocale);
    document.cookie = `sitesafe-locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    window.location.reload();
  }

  return (
    <div className="flex items-center gap-2">
      {showLabel && (
        <span className="text-xs text-slate-500 mr-1">
          {locale === "pt" ? "Idioma:" : "Language:"}
        </span>
      )}
      <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5">
        <button
          onClick={() => switchLocale("en")}
          className={`text-xs px-3 py-1.5 min-h-[32px] rounded-md transition-colors ${
            locale === "en"
              ? "bg-white/10 text-white font-medium"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => switchLocale("pt")}
          className={`text-xs px-3 py-1.5 min-h-[32px] rounded-md transition-colors ${
            locale === "pt"
              ? "bg-white/10 text-white font-medium"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          PT
        </button>
      </div>
    </div>
  );
}