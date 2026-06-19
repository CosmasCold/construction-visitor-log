// app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ChecklistForm from "@/components/ChecklistForm";
import ReviewBadges from "@/components/ReviewBadges";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import TrackedCtaLink from "@/components/TrackedCtaLink";
import HeroVideo from "@/components/HeroVideo";
import FadeInSection from "@/components/FadeInSection";
import {
  QrCode,
  ShieldCheck,
  Users,
  Mail,
  UserPlus,
  Printer,
  FileDown,
  Building,
  TrendingUp,
  Code,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Camera,
  ListChecks,
  Zap,
  Wrench,
  Package,
  Truck,
  Factory,
  Building2,
  AlertTriangle,
  ShieldAlert,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://sitesafe.thesift.space",
  },
};

const featureGroups = [
  {
    category: "Check‑in",
    items: [
      { icon: QrCode, title: "QR check‑in", desc: "Each site gets a unique QR code. Scan, sign, done." },
      { icon: ShieldCheck, title: "Mandatory safety briefing", desc: "Visitor cannot skip acknowledgment. Compliance proof." },
      { icon: Camera, title: "Photo capture", desc: "Take a visitor photo at check‑in, stored with their log. Improves security." },
      { icon: ListChecks, title: "Pre‑screening questions", desc: "Custom yes/no questions before sign‑in. Answers stored with the record." },
      { icon: ShieldCheck, title: "Watchlist / Blocklist", desc: "Flag unwanted visitors. Blocked visitors are stopped at check‑in and you’re alerted instantly." },
    ],
  },
  {
    category: "Management",
    items: [
      { icon: Users, title: "Real‑time dashboard", desc: "See who's on site right now – auto‑refreshes every few seconds." },
      { icon: Mail, title: "Host notifications", desc: "Visitor selects a host; automatic email alert (via Brevo)." },
      { icon: UserPlus, title: "Pre‑registration", desc: "Add expected visitors for one‑tap sign‑in." },
      { icon: Printer, title: "Badge printing", desc: "Print visitor badges from the active list, with photo if available." },
      { icon: ShieldAlert, title: "Lockdown mode", desc: "Instantly block all new check‑ins and flag active visitors with one click. Essential for schools, healthcare, and corporate security." },
      { icon: AlertTriangle, title: "Emergency evacuation list", desc: "One‑click PDF of everyone on site – vital for drills and real emergencies." },
    ],
  },
  {
    category: "Compliance & Export",
    items: [
      { icon: FileDown, title: "Audit exports", desc: "CSV, Excel, PDF – filtered by date, host, or company. Includes pre‑screening answers." },
      { icon: Building, title: "Multi‑site", desc: "One account, up to 20 sites. Each with its own settings." },
      { icon: TrendingUp, title: "Analytics", desc: "30‑day trend chart, total visitors, export CSV, filter by date and site." },
      { icon: FileText, title: "Digital document signing", desc: "Require visitors to sign NDAs or waivers before entry. Signatures are stored for audit." },
    ],
  },
  {
    category: "Integrations",
    items: [
      { icon: Code, title: "REST API", desc: "Connect to Slack, HR tools, or custom dashboards." },
      { icon: Zap, title: "Webhooks", desc: "Real‑time event streaming to your own tools." },
      { icon: Zap, title: "Integrations", desc: "Slack, Google Sheets, Zapier, and a full REST API for custom tools." },
    ],
  },
];

const pricingFeature = {
  icon: DollarSign,
  title: "Flat $49/mo — up to 20 sites",
  desc: "Unlimited visitors. All compliance and security features included. No per‑site fees. Cancel anytime.",
};

const screenshots = [
  { src: "/dashboard.png", alt: "SiteSafe real‑time visitor dashboard with active visitors and quick actions", caption: "Real‑time dashboard – see who's on site, auto‑refreshes" },
  { src: "/analytics.png", alt: "SiteSafe analytics page with trend chart, date filters, and CSV export", caption: "Analytics – 30‑day trends, custom date ranges, export CSV" },
  { src: "/activevisitors.png", alt: "Active visitors list with photos, host names, sign‑in times, and sign‑out buttons", caption: "Active visitors – detailed list with photos and quick sign‑out" },
  { src: "/checkin.png", alt: "Visitor check‑in form with host selection, photo capture, and safety acknowledgment", caption: "Visitor check‑in – QR code, host dropdown, photo capture" },
  { src: "/lockdown.png", alt: "Lockdown mode toggle on a site card, blocking new check‑ins", caption: "Lockdown mode – one‑click block of all new check‑ins" },
  { src: "/newsite.png", alt: "New site creation form with name, address, and URL slug fields", caption: "New site setup – create a site in seconds" },
];

const industries = [
  { name: "Construction", icon: Wrench },
  { name: "Warehousing", icon: Package },
  { name: "Offices", icon: Building2 },
  { name: "Manufacturing", icon: Factory },
  { name: "Logistics", icon: Truck },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 py-24 sm:py-32 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/[0.05] backdrop-blur-xl rounded-3xl border border-white/10 shadow-card-raised p-10 sm:p-14 gradient-border aurora-bg">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="inline-block animate-fade-in-up delay-100">
              <span className="text-sky-400">SiteSafe</span>
            </span>
            <span className="block mt-2 text-white animate-fade-in-up delay-300">
              Compliance‑ready visitor management
            </span>
            <span className="block mt-2 text-lg sm:text-xl text-slate-300 font-medium animate-fade-in-up delay-500">
              for mid‑sized workplaces with multiple locations
            </span>
          </h1>
          <div className="animate-fade-in-up delay-700">
            <p className="mt-4 text-base text-slate-400 max-w-2xl mx-auto">
              QR check‑in. Mandatory safety briefings. Watchlist screening.
              Emergency evacuation lists. Lockdown mode. All included in a flat
              $49/month plan with up to 20 sites. No per‑site fees. No sales calls.
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 bg-sky-500/10 border border-sky-400/30 rounded-full px-4 py-1.5 text-sm text-sky-300 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              14‑day free trial – no credit card required
            </p>
          </div>
          <div className="mt-8 flex flex-col items-center gap-4 animate-fade-in-up delay-900">
            <TrackedCtaLink
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 hover:scale-[1.02] transition-all duration-200 active:scale-[0.98] shadow-lg cta-pulse"
            >
              Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
            </TrackedCtaLink>
            <div className="flex items-center gap-4 text-sm">
              <a href="#features" className="text-slate-400 hover:text-white transition-colors duration-150">
                See what&apos;s included ↓
              </a>
              <span className="text-slate-600">·</span>
              <Link href="/admin/login" className="text-slate-400 hover:text-white transition-colors duration-150">
                Sign in
              </Link>
            </div>
          </div>
          <HeroVideo />
        </div>
      </div>

      {/* Trust badges */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex flex-wrap justify-center gap-6 items-center">
          <a href="https://saasdb.net" rel="noopener noreferrer" className="inline-flex flex-col items-center gap-1 text-center">
            <Image src="https://saasdb.net/badge/featured-dark.svg" alt="Featured on SaasDB" width={150} height={56} unoptimized className="h-12 w-auto sm:h-14" />
            <span className="text-xs text-slate-400">Featured on SaasDB</span>
          </a>
          <a href="https://fazier.com/launches/sitesafe.thesift.space" target="_blank" rel="noopener noreferrer" className="inline-flex flex-col items-center gap-1 text-center">
            <Image src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=light" alt="Launched on Fazier" width={120} height={40} unoptimized className="h-10 w-auto" />
            <span className="text-xs text-slate-400">Launched on Fazier</span>
          </a>
          <a href="https://www.saashub.com/sitesafe-by-thesift?utm_source=badge&utm_campaign=badge&utm_content=sitesafe-by-thesift&badge_variant=dark&badge_kind=approved" target="_blank" rel="noopener noreferrer" className="inline-flex flex-col items-center gap-1 text-center">
            <Image src="https://cdn-b.saashub.com/img/badges/approved-dark.png?v=1" alt="SiteSafe by TheSift badge – approved on SaaS Hub" width={150} height={50} unoptimized className="h-10 w-auto" />
            <span className="text-xs text-slate-400">Featured on SaaS Hub</span>
          </a>
          <ReviewBadges />
        </div>
      </div>

      {/* Problem section – multi‑site pain point */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 sm:p-8 text-center accent-glow aurora-bg">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            A facility manager with 12 locations had no single view of who was on site
            at any given time. Contractors signed in at one location and signed out at
            another. Records were scattered across paper logs and spreadsheets.
          </h2>
          <p className="mt-4 text-lg text-sky-400 font-semibold">
            That’s a compliance nightmare — and it doesn’t happen with SiteSafe.
          </p>
        </div>
      </div>

      {/* Features grid – with scroll‑triggered FadeInSection */}
      <div id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-3xl font-bold tracking-tight text-white text-center mb-8">Everything you get, for up to 20 sites</h2>

        {featureGroups.map((group) => (
          <div key={group.category} className="mb-8">
            <h3 className="text-lg font-semibold text-sky-300 mb-4 text-center sm:text-left">{group.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {group.items.map((f, idx) => (
                <FadeInSection key={idx} delay={idx * 100}>
                  <div className="aurora-bg backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 flex gap-4 items-start hover:bg-white/[0.08] transition-all duration-300 feature-card-hover">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
                      <f.icon className="w-5 h-5 text-sky-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{f.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        ))}

        {/* Pricing callout */}
        <div className="mt-8 flex justify-center">
          <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 flex gap-4 items-start max-w-md w-full hover:bg-white/[0.08] transition-all duration-300 accent-glow aurora-bg">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <pricingFeature.icon className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">{pricingFeature.title}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{pricingFeature.desc}</p>
            </div>
          </div>
        </div>

        {/* Mid‑page CTA */}
        <div className="mt-12 text-center">
          <TrackedCtaLink href="/signup" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 hover:scale-[1.02] transition-all duration-200 active:scale-[0.98] shadow-lg cta-pulse">
            Ready to try? Start free trial <ArrowRight className="ml-2 w-4 h-4" />
          </TrackedCtaLink>
        </div>
      </div>

      {/* Screenshot gallery */}
      <ScreenshotGallery screenshots={screenshots} />

      {/* Trusted by */}
      <FadeInSection>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <h2 className="text-xl font-semibold tracking-tight text-white text-center mb-6">Trusted across industries</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised px-6 py-3 text-sm text-slate-200 font-medium flex items-center gap-2 hover:bg-white/[0.08] hover:-translate-y-0.5 transition-all duration-300"
              >
                <industry.icon className="w-4 h-4 text-sky-400 flex-shrink-0" />
                {industry.name}
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Testimonial */}
      <FadeInSection>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-center relative accent-glow aurora-bg">
            <span className="absolute -top-4 left-4 text-6xl text-sky-400/20 font-serif leading-none select-none" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className="text-lg sm:text-xl text-slate-200 italic leading-relaxed mt-2">
              &ldquo;We have 8 locations and used to rely on paper logs at each site.
              SiteSafe gives me a single dashboard across all of them. I can see
              who&apos;s on site at any location in seconds.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-slate-400">
              – Marcus, Director of Facilities – TX
            </p>
          </div>
          <p className="text-center text-sm text-slate-400 mt-4">
            Site managers choose SiteSafe for its simple pricing and real‑time visibility.
          </p>
        </div>
      </FadeInSection>

      {/* Free Tools */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Free tools to get started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          <Link href="/audit" className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 hover:bg-white/[0.08] transition-all duration-300 flex gap-4 items-start group">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">Visitor Log Self‑Audit</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">10 questions to see if your log would survive an inspection. Takes 60 seconds.</p>
              <span className="text-sky-400 text-xs mt-2 inline-flex items-center gap-1 group-hover:underline">Take the audit <ArrowRight className="w-3 h-3" /></span>
            </div>
          </Link>
          <Link href="/roi-calculator" className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 hover:bg-white/[0.08] transition-all duration-300 flex gap-4 items-start group">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">ROI Calculator</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">See exactly how much paper logs are costing you in labour and audit prep.</p>
              <span className="text-sky-400 text-xs mt-2 inline-flex items-center gap-1 group-hover:underline">Calculate savings <ArrowRight className="w-3 h-3" /></span>
            </div>
          </Link>
        </div>
      </div>

      {/* ROI benefit */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-center">
        <p className="text-xl sm:text-2xl font-bold tracking-tight text-white">SiteSafe pays for itself if it saves you just two hours of audit prep per month.</p>
        <p className="mt-2 text-slate-400">Most users save five hours or more.</p>
      </div>

      {/* Comparison card */}
      <div className="max-w-2xl mx-auto mb-12 px-4">
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-5 text-center">
          <p className="text-sm text-slate-300">
            See how SiteSafe compares to Envoy, SwipedOn, and paper logs{" "}
            <Link href="/compare" className="text-sky-400 hover:underline transition-colors font-medium">side‑by‑side</Link>.
          </p>
        </div>
      </div>

      {/* Security card */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6">
          <h3 className="text-lg font-semibold text-white text-center mb-4">Security you can trust</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm text-slate-300">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-6 h-6 text-sky-400" />
              SSL encryption
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-6 h-6 text-sky-400" />
              GDPR / LGPD ready
            </div>
            <div className="flex flex-col items-center gap-1">
              <CheckCircle2 className="w-6 h-6 text-sky-400" />
              Payments via Stripe
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-6 h-6 text-sky-400" />
              Watchlist screening
            </div>
          </div>
          <p className="text-center text-xs text-slate-500 mt-4">
            <Link href="/security" className="text-sky-400 hover:underline">Read our security policy</Link>
          </p>
        </div>
      </div>

      {/* Checklist lead capture */}
      <div className="max-w-2xl mx-auto px-4 pb-16">
        <ChecklistForm />
      </div>

      {/* Developer / API quick mention */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex justify-center">
          <Link href="/docs" className="inline-flex items-center gap-2 bg-white/[0.04] backdrop-blur-md rounded-xl border border-white/5 px-4 py-3 text-sm text-slate-400 hover:text-white transition-colors duration-150">
            <Code className="w-4 h-4 text-sky-400" />
            Developers: REST API available – integrate SiteSafe with your own tools
          </Link>
        </div>
      </div>

      {/* Section divider */}
      <div className="section-divider max-w-6xl mx-auto mb-16" />

      {/* Footer CTA */}
      <div className="bg-white/[0.03] backdrop-blur-sm py-16 border-t border-white/5 accent-glow aurora-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">Start your 14‑day free trial</h2>
          <p className="mt-3 text-lg text-slate-400">No credit card. No sales call. Trial starts instantly.</p>
          <TrackedCtaLink href="/signup" className="inline-flex items-center justify-center mt-8 px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 hover:scale-[1.02] transition-all duration-200 active:scale-[0.98] shadow-lg cta-pulse">
            Try SiteSafe free <ArrowRight className="ml-2 w-4 h-4" />
          </TrackedCtaLink>
        </div>
      </div>
    </div>
  );
}