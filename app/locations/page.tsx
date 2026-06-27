// app/locations/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  Building,
  MapPin,
  CheckCircle2,
  Search,
  Globe,
  Factory,
  Truck,
  Wrench,
  Package,
  Building2,
} from "lucide-react";
import { industries } from "@/data/industries";
import { cities } from "@/data/cities";

export const metadata: Metadata = {
  title: "SiteSafe Locations — Visitor Management in 500+ U.S. Cities",
  description:
    "Find local visitor check-in solutions for construction sites, warehouses, offices, manufacturing plants, and logistics hubs in 500+ cities across the United States.",
  openGraph: {
    title: "SiteSafe Locations — Visitor Management in 500+ U.S. Cities",
    description: "Local visitor management for workplaces across the United States. Flat $49/mo for up to 20 sites.",
    images: ["/og-image.png"],
  },
};

const industryIcons: Record<string, React.ElementType> = {
  construction: Wrench,
  warehousing: Package,
  offices: Building2,
  manufacturing: Factory,
  logistics: Truck,
};

const featuredCities = [
  { name: "Houston", state: "TX" },
  { name: "New York", state: "NY" },
  { name: "Los Angeles", state: "CA" },
  { name: "Chicago", state: "IL" },
  { name: "Phoenix", state: "AZ" },
  { name: "Philadelphia", state: "PA" },
  { name: "San Antonio", state: "TX" },
  { name: "San Diego", state: "CA" },
  { name: "Dallas", state: "TX" },
  { name: "San Jose", state: "CA" },
  { name: "Austin", state: "TX" },
  { name: "Jacksonville", state: "FL" },
];

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      {/* ─── Header ─── */}
      <header className="border-b border-white/5 bg-[#0a0f1c]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-sky-500 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-white">SiteSafe</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-slate-500 hover:text-white transition-colors">
              Home
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-lg text-slate-900 bg-white hover:bg-slate-100 transition-all active:scale-95"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* ─── Hero ─── */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-medium mb-6">
            <Globe className="w-3.5 h-3.5" />
            500+ cities served
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Visitor management in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              every major U.S. city
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            SiteSafe works wherever your sites are. One flat price covers all 20 locations — 
            whether they&apos;re across the street or across the country.
          </p>
        </div>

        {/* ─── Featured Cities ─── */}
        <section>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 text-center">
            Popular locations
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {featuredCities.map((city) => (
              <Link
                key={`${city.name}-${city.state}`}
                href={`/local/construction-visitor-${city.name.toLowerCase().replace(/\s/g, "-")}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.03] text-xs text-slate-300 hover:text-white hover:bg-white/[0.06] hover:border-white/10 transition-all"
              >
                <MapPin className="w-3 h-3 text-slate-500" />
                {city.name}, {city.state}
              </Link>
            ))}
          </div>
        </section>

        {/* ─── Industry Sections ─── */}
        <div className="space-y-12">
          {industries.map((industry) => {
            const Icon = industryIcons[industry.slug] || Building;
            return (
              <section key={industry.slug} className="scroll-mt-24" id={industry.slug}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-sky-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    {industry.name} Visitor Check-In
                  </h2>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2">
                    {cities.map((city) => (
                      <Link
                        key={`${industry.slug}-${city.slug}`}
                        href={`/local/${industry.slug}-visitor-${city.slug}`}
                        className="group flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors py-1"
                      >
                        <MapPin className="w-3 h-3 text-slate-600 group-hover:text-sky-400 transition-colors flex-shrink-0" />
                        <span className="truncate">{city.name}, {city.state}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* ─── CTA ─── */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
          
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Your city not listed?
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              SiteSafe works in every U.S. city — and internationally. Set up your first site in 3 minutes, 
              regardless of location.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
              >
                Try Live Demo
              </Link>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> No credit card
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 14 days free
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-12 bg-[#070b14]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600">
            © 2026 SiteSafe by TheSift. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}