import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { industries } from "@/data/industries";
import { cities } from "@/data/cities";

export async function generateStaticParams() {
  const paths = [];
  for (const industry of industries) {
    for (const city of cities) {
      paths.push({
        industry: industry.slug,
        city: city.slug,
      });
    }
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: { industry: string; city: string };
}): Promise<Metadata> {
  const industryData = industries.find((i) => i.slug === params.industry);
  const cityData = cities.find((c) => c.slug === params.city);

  if (!industryData || !cityData) {
    return {
      title: "Visitor Management Solution | SiteSafe",
      description: "Smart visitor management for any workplace.",
    };
  }

  const title = `${industryData.name} Visitor Log in ${cityData.name}, ${cityData.state} – SiteSafe`;
  const description = `Looking for a ${industryData.name.toLowerCase()} visitor log in ${cityData.name}? SiteSafe offers QR check‑in, mandatory safety acknowledgment, and flat $49/mo pricing.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://sitesafe.thesift.space/${params.industry}-visitor-log-${params.city}`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default function IndustryCityPage({
  params,
}: {
  params: { industry: string; city: string };
}) {
  const industryData = industries.find((i) => i.slug === params.industry);
  const cityData = cities.find((c) => c.slug === params.city);

  if (!industryData || !cityData) {
    notFound();
  }

  // Non-null assertions are safe because we just checked above
  const cityName = cityData!.name;
  const stateCode = cityData!.state;
  const industryName = industryData!.name;
  const industryDesc = industryData!.description;

  return (
    <div className="min-h-screen text-white">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          <span className="text-sky-400">{industryName} Visitor Log</span>
          <span className="block mt-2 text-white">
            in {cityName}, {stateCode}
          </span>
        </h1>
        <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto">
          Smart digital check‑in for {industryDesc} in {cityName}. QR codes,
          mandatory safety acknowledgment, and audit‑ready exports — for a flat
          $49/month.
        </p>
        <div className="mt-8">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg"
          >
            Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <p className="mt-2 text-xs text-slate-500">
            14‑day trial · No credit card · No sales call
          </p>
        </div>
      </div>
    </div>
  );
}