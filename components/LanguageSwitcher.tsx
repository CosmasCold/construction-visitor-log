// components/LanguageSwitcher.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";

export default function LanguageSwitcher({ showLabel = false }: { showLabel?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Detect current locale from URL or cookie
  const isBR = pathname?.startsWith("/br");
  const currentLocale = isBR ? "pt" : "en";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  function switchLocale(locale: "en" | "pt") {
    setOpen(false);
    
    // Set cookie
    document.cookie = `sitesafe-locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Handle URL routing
    if (locale === "pt") {
      // If not already on /br, redirect to /br version
      if (!isBR) {
        const newPath = `/br${pathname}`;
        router.push(newPath);
      }
    } else {
      // If on /br, redirect to EN version
      if (isBR) {
        const newPath = pathname.replace(/^\/br/, "") || "/";
        router.push(newPath);
      }
    }
    
    // Refresh if staying on same page (cookie change needs re-render)
    if ((locale === "pt" && isBR) || (locale === "en" && !isBR)) {
      router.refresh();
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
      >
        <Globe className="w-3.5 h-3.5" />
        {showLabel ? (currentLocale === "pt" ? "Português" : "English") : (currentLocale === "pt" ? "PT" : "EN")}
      </button>
      
      {open && (
        <div className="absolute right-0 mt-1 w-32 rounded-lg border border-white/10 bg-[#1a1f2e] shadow-xl py-1 z-50">
          <button
            onClick={() => switchLocale("en")}
            className={`w-full text-left px-3 py-2 text-xs transition-colors ${
              currentLocale === "en" ? "text-sky-400 bg-sky-500/10" : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            English
          </button>
          <button
            onClick={() => switchLocale("pt")}
            className={`w-full text-left px-3 py-2 text-xs transition-colors ${
              currentLocale === "pt" ? "text-sky-400 bg-sky-500/10" : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Português
          </button>
        </div>
      )}
    </div>
  );
}