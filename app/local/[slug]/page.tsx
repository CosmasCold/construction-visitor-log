// app/local/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReviewBadges from "@/components/ReviewBadges";
import {
  QrCode,
  ShieldCheck,
  Users,
  FileDown,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { industries } from "@/data/industries";
import { cities } from "@/data/cities";

export async function generateStaticParams() {
  const paths = [];
  for (const industry of industries) {
    for (const city of cities) {
      paths.push({ slug: `${industry.slug}-visitor-${city.slug}` });
    }
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const parts = params.slug.split("-visitor-");
  if (parts.length !== 2) {
    return { title: "Visitor Management Solution | SiteSafe" };
  }

  const industrySlug = parts[0];
  const citySlug = parts[1];
  const industryData = industries.find((i) => i.slug === industrySlug);
  const cityData = cities.find((c) => c.slug === citySlug);

  if (!industryData || !cityData) {
    return { title: "Visitor Management Solution | SiteSafe" };
  }

  return {
    title: `${industryData.name} Visitor Check‑in in ${cityData.name}, ${cityData.state} – SiteSafe`,
    description: `Looking for a ${industryData.name.toLowerCase()} visitor check‑in solution in ${cityData.name}? SiteSafe offers QR check‑in, mandatory safety acknowledgment, and flat $49/mo pricing.`,
    alternates: { canonical: `https://sitesafe.thesift.space/local/${params.slug}` },
    openGraph: {
      title: `${industryData.name} Visitor Check‑in in ${cityData.name}, ${cityData.state} – SiteSafe`,
      description: `Looking for a ${industryData.name.toLowerCase()} visitor check‑in solution in ${cityData.name}? SiteSafe offers QR check‑in, mandatory safety acknowledgment, and flat $49/mo pricing.`,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default function CityPage({ params }: { params: { slug: string } }) {
  const parts = params.slug.split("-visitor-");
  if (parts.length !== 2) notFound();

  const industrySlug = parts[0];
  const citySlug = parts[1];
  const industryData = industries.find((i) => i.slug === industrySlug);
  const cityData = cities.find((c) => c.slug === citySlug);

  if (!industryData || !cityData) notFound();

  const cityName = cityData.name;
  const stateCode = cityData.state;
  const industryName = industryData.name;
  const industryDesc = industryData.description;

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          <span className="text-sky-400">{industryName} Visitor Check‑in</span>
          <span className="block mt-2 text-white">in {cityName}, {stateCode}</span>
        </h1>
        <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto">
          Smart digital check‑in for {industryDesc} in {cityName}. QR codes,
          mandatory safety acknowledgment, and audit‑ready exports — for a flat $49/month.
        </p>
        <div className="mt-8">
          <Link href="/signup" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg">
            Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <p className="mt-2 text-xs text-slate-500">14‑day trial · No credit card · No sales call</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          Why {industryName} sites in {cityName} choose SiteSafe
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <FeatureCard icon={QrCode} title="QR check‑in" desc={`Each ${industryName.toLowerCase()} site gets a unique QR code. Visitors scan and sign in — no app, no clipboard.`} />
          <FeatureCard icon={ShieldCheck} title="Mandatory safety acknowledgment" desc={`Every visitor must confirm your safety rules before entering. That's your audit‑proof record for ${cityName} inspectors.`} />
          <FeatureCard icon={Users} title="Real‑time dashboard" desc={`See exactly who's on your ${industryName.toLowerCase()} site right now, auto‑refreshed every few seconds.`} />
          <FeatureCard icon={FileDown} title="Audit‑ready exports" desc="CSV, Excel, PDF — filtered by date, site, or host. Ready when you need them." />
          <FeatureCard icon={CheckCircle2} title="Flat $49/mo" desc="Unlimited sites, unlimited visitors. No per‑location fees, no hidden costs." />
          <FeatureCard icon={ArrowRight} title="14‑day free trial" desc="Try everything free for two weeks. No credit card, no sales calls." />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <p className="text-sm text-slate-400 text-center mb-4">Trusted by workplaces across the country</p>
        <div className="flex flex-wrap justify-center gap-4 items-center">
          <Image src="https://saasdb.net/badge/featured-dark.svg" alt="Featured on SaasDB" width={120} height={44} unoptimized className="h-10 w-auto" />
          <Image src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=light" alt="Launched on Fazier" width={100} height={34} unoptimized className="h-8 w-auto" />
          <Image src="https://cdn-b.saashub.com/img/badges/approved-dark.png?v=1" alt="SiteSafe approved on SaaS Hub" width={120} height={40} unoptimized className="h-8 w-auto" />
          <ReviewBadges />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-16 text-center">
        <p className="text-sm text-slate-400">
          See how SiteSafe compares to Envoy, SwipedOn, and paper logs{" "}
          <Link href="/compare" className="text-sky-400 hover:underline transition-colors">side‑by‑side</Link>.
        </p>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 flex gap-4 items-start hover:bg-white/[0.08] transition-all duration-300">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
        <Icon className="w-5 h-5 text-sky-300" />
      </div>
      <div>
        <h3 className="font-semibold text-white text-sm">{title}</h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}