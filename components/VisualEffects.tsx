"use client";

import { usePathname } from "next/navigation";

export function HeroAurora() {
  const pathname = usePathname();
  const isBR = pathname?.startsWith("/br");

  return (
    <>
      {/* Primary aurora blob */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-r from-sky-500/10 via-cyan-400/10 to-blue-500/10 rounded-full blur-[120px] animate-aurora pointer-events-none"
        aria-hidden="true"
      />
      {/* Secondary accent blob */}
      <div 
        className="absolute top-1/3 right-0 w-[500px] h-[400px] bg-gradient-to-l from-emerald-500/5 to-transparent rounded-full blur-[100px] animate-aurora pointer-events-none"
        style={{ animationDelay: "4s" }}
        aria-hidden="true"
      />
      {/* Subtle bottom glow */}
      <div 
        className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-gradient-to-t from-sky-500/5 to-transparent rounded-full blur-[80px] animate-aurora pointer-events-none"
        style={{ animationDelay: "2s" }}
        aria-hidden="true"
      />
    </>
  );
}

export function LiveIndicator({ locale }: { locale: "en" | "pt" }) {
  const copy = {
    en: "2,847 check-ins processed today",
    pt: "2.847 check-ins processados hoje",
  };

  return (
    <div className="flex items-center gap-2 text-xs text-emerald-400/80">
      <span className="relative flex h-2 w-2">
        <span className="animate-live absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span className="text-emerald-400/70">{copy[locale]}</span>
    </div>
  );
}

export function TrustBadge({ locale }: { locale: "en" | "pt" }) {
  const copy = {
    en: { users: "200+ sites", security: "SOC 2 Ready", compliance: "GDPR / LGPD" },
    pt: { users: "200+ locais", security: "SOC 2 Ready", compliance: "GDPR / LGPD" },
  };

  const c = copy[locale];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-slate-500 uppercase tracking-wider">
      <span className="flex items-center gap-1.5">
        <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
        {c.users}
      </span>
      <span className="w-px h-3 bg-white/10" />
      <span className="flex items-center gap-1.5">
        <svg className="w-3 h-3 text-sky-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
        {c.security}
      </span>
      <span className="w-px h-3 bg-white/10" />
      <span className="flex items-center gap-1.5">
        <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
        {c.compliance}
      </span>
    </div>
  );
}