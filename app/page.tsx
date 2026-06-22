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
import StickyCTA from "@/components/StickyCTA";
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
  Timer,
  Clock,
  GitBranch,
} from "lucide-react";

export const metadata: Metadata = {
  title: "SiteSafe — Visitor Management for 20 Sites, $49/mo",
  description:
    "Replace paper logs with a single dashboard across all your locations. 14-day free trial. No sales calls. $49/mo for up to 20 sites.",
  alternates: {
    canonical: "https://sitesafe.thesift.space",
  },
  openGraph: {
    title: "SiteSafe — Visitor Management for 20 Sites, $49/mo",
    description:
      "Replace paper logs with a single dashboard across all your locations. 14-day free trial. No sales calls.",
    url: "https://sitesafe.thesift.space",
    siteName: "SiteSafe",
    images: [
      {
        url: "https://sitesafe.thesift.space/og-image.png",
        width: 1200,
        height: 630,
        alt: "SiteSafe — Visitor Management Dashboard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SiteSafe — Visitor Management for 20 Sites, $49/mo",
    description:
      "Replace paper logs with a single dashboard across all your locations. 14-day free trial. No sales calls.",
    images: ["https://sitesafe.thesift.space/og-image.png"],
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
      { icon: ShieldAlert, title: "Watchlist / Blocklist", desc: "Flag unwanted visitors. Blocked visitors are stopped at check‑in and you're alerted instantly." },
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
      { icon: GitBranch, title: "Integrations", desc: "Slack, Google Sheets, Zapier, and a full REST API for custom tools." },
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
      {/* Hero – fixed mobile spacing */}
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-24 md:py-32 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/[0.10] backdrop-blur-xl rounded-3xl border border-white/10 shadow-card-raised p-10 sm:p-14 gradient-border aurora-bg">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-sky-400">One dashboard.</span>{" "}
            <span className="text-white">20 sites.</span>{" "}
            <span className="text-white">A flat $49.</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            No per‑location fees. No mandatory demos. No sales reps chasing you.
            Just a 3‑minute setup and a 14‑day free trial.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <TrackedCtaLink
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 hover:scale-[1.02] transition-all duration-200 active:scale-[0.98] shadow-lg cta-pulse"
            >
              Start My Free Trial <ArrowRight className="ml-2 w-4 h-4" />
            </TrackedCtaLink>
            <p className="text-sm text-slate-400 flex items-center gap-4">
              <span>⚡ No credit card required</span>
              <span className="text-slate-600">·</span>
              <span>Cancel in 2 clicks</span>
              <span className="text-slate-600">·</span>
              <span>Setup takes 3 minutes</span>
            </p>
            <Link href="/admin/login" className="text-slate-400 hover:text-white text-sm transition-colors">
              Sign in
            </Link>
          </div>
          <HeroVideo />
        </div>
      </div>

      {/* As Featured In */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-4">As featured in</p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 opacity-60">
            <span className="text-sm font-semibold text-slate-400">BLR</span>
            <span className="text-sm font-semibold text-slate-400">Product Hunt</span>
            <span className="text-sm font-semibold text-slate-400">G2</span>
            <span className="text-sm font-semibold text-slate-400">Capterra</span>
            <span className="text-sm font-semibold text-slate-400">SaaS Hub</span>
          </div>
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

      {/* "Why we don't force sales calls" section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-6 sm:p-8 text-center accent-glow aurora-bg">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3">
            Why we don&apos;t force sales calls on you
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Most visitor management software makes you sit through a 45‑minute
            Zoom demo just to see their pricing. We think that&apos;s disrespectful
            of your time.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto mt-4">
            SiteSafe was built to be self‑serve. Set up a site, print a QR code,
            and test it on your front desk in under 3 minutes. If you have a
            question, our live chat gets you a human in under 60 seconds — but
            we will never call you to check in or upsell you.
          </p>
          <p className="text-sm text-sky-300 font-semibold mt-4">
            You are in control. Always.
          </p>
        </div>
      </div>

      {/* Features grid */}
      <div id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-3xl font-bold tracking-tight text-white text-center mb-8">Everything you get, for up to 20 sites</h2>

        {featureGroups.map((group) => (
          <div key={group.category} className="mb-8">
            <h3 className="text-lg font-semibold text-sky-300 mb-4 text-center sm:text-left">{group.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.items.map((f, idx) => (
                <FadeInSection key={idx} delay={idx * 100}>
                  <div className="bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-6 flex gap-4 items-start hover:bg-white/[0.14] transition-all duration-300 feature-card-hover aurora-bg">
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
          <div className="bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-6 flex gap-4 items-start max-w-md w-full hover:bg-white/[0.14] transition-all duration-300 accent-glow aurora-bg">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <pricingFeature.icon className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">{pricingFeature.title}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{pricingFeature.desc}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <TrackedCtaLink href="/signup" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 hover:scale-[1.02] transition-all duration-200 active:scale-[0.98] shadow-lg cta-pulse">
            Start My Free Trial <ArrowRight className="ml-2 w-4 h-4" />
          </TrackedCtaLink>
        </div>
      </div>

      {/* Demo Video Section – NEW */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white/[0.06] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-6 sm:p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">🎬</span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              See SiteSafe in Action
            </h2>
          </div>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto mb-6">
            Watch a quick demo of how SiteSafe replaces paper logs with a single, real-time dashboard.
          </p>
          <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-xl overflow-hidden border border-white/10">
            <iframe
  src="https://www.youtube-nocookie.com/embed/ntRt1qVkLgo?si=BmRSpzC4Jeea1uij"
  title="SiteSafe Demo Video"
  className="w-full h-full"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
/>
          </div>
          <p className="text-xs text-slate-500 mt-3">3-minute demo • No sales calls • Try it free</p>
        </div>
      </div>

      {/* Industries we serve */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-bold tracking-tight text-white text-center mb-6">
          Built for multi-site teams across industries
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {industries.map((industry) => (
            <div key={industry.name} className="bg-white/[0.06] backdrop-blur-lg rounded-xl border border-white/10 px-5 py-3 flex items-center gap-2">
              <industry.icon className="w-4 h-4 text-sky-400" />
              <span className="text-sm text-slate-300">{industry.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white/[0.06] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-6 sm:p-8 text-center">
          <p className="text-slate-300 text-sm italic max-w-2xl mx-auto">
            SiteSafe replaced our messy paper logs across 8 sites with a single dashboard. Setup took 3 minutes.
          </p>
          <p className="text-slate-400 text-xs font-medium mt-3">— Marcus, Facilities Director</p>
        </div>
      </div>

      {/* Free Audit Tool CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white/[0.06] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
            Is your visitor log audit-ready?
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            Take our 60-second self-audit and see how your visitor log stacks up
            against what inspectors actually look for.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center justify-center mt-4 px-6 py-2.5 border border-sky-400/30 text-sm font-medium rounded-xl text-sky-300 hover:bg-sky-500/10 transition-all"
          >
            Run the audit →
          </Link>
        </div>
      </div>

      {/* Screenshot Gallery (if component exists) */}
      {/* <ScreenshotGallery /> */}

      {/* Footer CTA */}
      <div className="bg-white/[0.08] backdrop-blur-lg py-16 border-t border-white/5 accent-glow aurora-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">Start your 14‑day free trial</h2>
          <p className="mt-3 text-lg text-slate-400">No credit card. No sales call. Trial starts instantly.</p>
          <TrackedCtaLink href="/signup" className="inline-flex items-center justify-center mt-8 px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 hover:scale-[1.02] transition-all duration-200 active:scale-[0.98] shadow-lg cta-pulse">
            Start My Free Trial <ArrowRight className="ml-2 w-4 h-4" />
          </TrackedCtaLink>
        </div>
      </div>

      {/* Sticky CTA bar */}
      <StickyCTA />
    </div>
  );
}