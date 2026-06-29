// components/LanguageSwitcher.tsx
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Don't show on check-in pages (visitor-facing, determined by site settings)
  if (pathname.startsWith("/checkin")) return null;

  const isPortuguese = pathname.startsWith("/br");
  const queryString = searchParams.toString();
  const querySuffix = queryString ? `?${queryString}` : "";

  return (
    <Link
      href={isPortuguese ? `/${querySuffix}` : `/br${querySuffix}`}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-400 hover:text-white hover:bg-white/10 transition-all"
    >
      <Globe className="w-3 h-3" />
      {isPortuguese ? "English" : "Português"}
    </Link>
  );
}

// Usage: Add to your navbar/header:
// <LanguageSwitcher />