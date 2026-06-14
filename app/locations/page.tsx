import type { Metadata } from "next";
import Link from "next/link";
import { industries } from "@/data/industries";
import { cities } from "@/data/cities";

export const metadata: Metadata = {
  title: "SiteSafe Locations – Serving Businesses Across the U.S.",
  description:
    "Find a local visitor check‑in solution for your workplace. SiteSafe helps construction sites, warehouses, offices, manufacturing plants, and logistics hubs in cities across the United States.",
};

export default function LocationsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          SiteSafe Locations
        </h1>
        <p className="text-sm text-slate-400 mb-8">
          Local visitor management for workplaces across the United States.
        </p>

        {industries.map((industry) => (
          <section key={industry.slug} className="mb-8">
            <h2 className="text-xl font-semibold text-sky-300 mb-3">
              {industry.name} Visitor Check‑in
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {cities.map((city) => (
                <Link
                  key={`${industry.slug}-${city.slug}`}
                  href={`/local/${industry.slug}-visitor-${city.slug}`}
                  className="text-sm text-slate-300 hover:text-white hover:underline transition-colors"
                >
                  {city.name}, {city.state}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}