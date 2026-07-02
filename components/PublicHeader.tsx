"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface PublicHeaderProps {
  locale: "en" | "pt";
  narrow?: boolean;
}

const t = {
  en: {
    home: "Home",
    features: "Features",
    startTrial: "Start free trial",
    signIn: "Sign in",
  },
  pt: {
    home: "Início",
    features: "Funcionalidades",
    startTrial: "Começar teste grátis",
    signIn: "Entrar",
  },
};

export default function PublicHeader({ locale, narrow = false }: PublicHeaderProps) {
  const copy = t[locale];
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const containerClass = narrow ? "max-w-4xl" : "max-w-6xl";
  
  // Auto-detect /br prefix
  const prefix = pathname?.startsWith("/br") ? "/br" : "";

  return (
    <header className="border-b border-white/5 bg-[#0a0f1c]/90 backdrop-blur-xl sticky top-0 z-50">
      <div className={`${containerClass} mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between`}>
        {/* Logo */}
        <Link href={`${prefix}/`} className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-sky-500 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm text-white">SiteSafe</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-3">
          <Link href={`${prefix}/`} className="text-xs text-slate-500 hover:text-white transition-colors">
            {copy.home}
          </Link>
          <Link href={`${prefix}/features`} className="text-xs text-slate-500 hover:text-white transition-colors">
            {copy.features}
          </Link>
          <LanguageSwitcher />
          <Link
            href="/admin/login"
            className="text-xs text-slate-500 hover:text-white transition-colors"
          >
            {copy.signIn}
          </Link>
          <Link
            href={`${prefix}/signup`}
            className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-lg text-slate-900 bg-white hover:bg-slate-100 transition-all active:scale-95"
          >
            {copy.startTrial}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0a0f1c]/95 backdrop-blur-xl">
          <div className={`${containerClass} mx-auto px-4 py-4 space-y-3`}>
            <Link
              href={`${prefix}/`}
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-slate-300 hover:text-white transition-colors py-2"
            >
              {copy.home}
            </Link>
            <Link
              href={`${prefix}/features`}
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-slate-300 hover:text-white transition-colors py-2"
            >
              {copy.features}
            </Link>
            <div className="py-2">
              <LanguageSwitcher showLabel />
            </div>
            <Link
              href="/admin/login"
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-slate-300 hover:text-white transition-colors py-2"
            >
              {copy.signIn}
            </Link>
            <Link
              href={`${prefix}/signup`}
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-4 py-2.5 text-sm font-medium rounded-lg text-slate-900 bg-white hover:bg-slate-100 transition-all"
            >
              {copy.startTrial}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}