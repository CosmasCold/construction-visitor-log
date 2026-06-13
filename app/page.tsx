// app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ChecklistForm from "@/components/ChecklistForm";
import ReviewBadges from "@/components/ReviewBadges";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import TrackedCtaLink from "@/components/TrackedCtaLink";
import HeroVideo from "@/components/HeroVideo";
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
    ],
  },
  {
    category: "Management",
    items: [
      { icon: Users, title: "Real‑time dashboard", desc: "See who's on site right now – auto‑refreshes every few seconds." },
      { icon: Mail, title: "Host notifications", desc: "Visitor selects a host; automatic email alert (via Brevo)." },
      { icon: UserPlus, title: "Pre‑registration", desc: "Add expected visitors for one‑tap sign‑in." },
      { icon: Printer, title: "Badge printing", desc: "Print visitor badges from the active list, with photo if available." },
    ],
  },
  {
    category: "Compliance & Export",
    items: [
      { icon: FileDown, title: "Audit exports", desc: "CSV, Excel, PDF – filtered by date, host, or company. Includes pre‑screening answers." },
      { icon: Building, title: "Multi‑site", desc: "One account, unlimited sites. Each with its own settings." },
      { icon: TrendingUp, title: "Analytics", desc: "30‑day trend chart, total visitors, export CSV, filter by date and site." },
    ],
  },
  {
    category: "Integrations",
    items: [
      { icon: Code, title: "REST API", desc: "Connect to Slack, HR tools, or custom dashboards." },
      { icon: Zap, title: "Integrations", desc: "Slack, Google Sheets, Zapier, and a full REST API for custom tools." },
    ],
  },
];

const pricingFeature = { icon: DollarSign, title: "Flat $49/mo", desc: "No per‑site or per‑user fees. Cancel anytime." };

const screenshots = [
  {
    src: "/checkin.png",
    alt: "Visitor sign‑in form with host selection and photo capture",
    caption: "Visitor sign‑in with host dropdown and photo capture",
  },
  {
    src: "/dashboard.png",
    alt: "SiteSafe real‑time visitor dashboard",
    caption: "Live dashboard – auto‑refreshes every few seconds",
  },
  {
    src: "/analytics.png",
    alt: "SiteSafe analytics chart with date and site filters",
    caption: "Analytics with custom date ranges and site filters",
  },
  {
    src: "/sites.png",
    alt: "Multi‑site management card with edit and delete options",
    caption: "Multi‑site management – unlimited sites, one account",
  },
  {
    src: "/integrations.png",
    alt: "SiteSafe integrations hub – Slack, Google Sheets, Zapier",
    caption: "Built‑in integrations with Slack, Sheets, Zapier, and API",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 py-24 sm:py-32 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/[0.05] backdrop-blur-xl rounded-3xl border border-white/10 shadow-card-raised p-10 sm:p-14">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-sky-400">SiteSafe</span>
            <span className="block mt-2 text-white">Smart visitor management</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            the digital check‑in for any workplace.
          </p>
          <p className="mt-4 text-base text-slate-400 max-w-2xl mx-auto">
            QR check‑in. Real‑time dashboard (auto‑refreshes). Audit‑ready exports. No sales calls ever.
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 bg-sky-500/10 border border-sky-400/30 rounded-full px-4 py-1.5 text-sm text-sky-300 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            14‑day free trial – no credit card required
          </p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <TrackedCtaLink
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg"
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

      {/* Trust badges – social proof */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex flex-wrap justify-center gap-6 items-center">
          <a
            href="https://saasdb.net"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center gap-1 text-center"
          >
            <Image
              src="https://saasdb.net/badge/featured-dark.svg"
              alt="Featured on SaasDB"
              width={150}
              height={56}
              unoptimized
              className="h-12 w-auto sm:h-14"
            />
            <span className="text-xs text-slate-400">Featured on SaasDB</span>
          </a>
          <a
            href="https://fazier.com/launches/sitesafe.thesift.space"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center gap-1 text-center"
          >
            <Image
              src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=light"
              alt="Launched on Fazier"
              width={120}
              height={40}
              unoptimized
              className="h-10 w-auto"
            />
            <span className="text-xs text-slate-400">Launched on Fazier</span>
          </a>
          <a
            href="https://www.saashub.com/sitesafe-by-thesift?utm_source=badge&utm_campaign=badge&utm_content=sitesafe-by-thesift&badge_variant=dark&badge_kind=approved"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center gap-1 text-center"
          >
            <Image
              src="https://cdn-b.saashub.com/img/badges/approved-dark.png?v=1"
              alt="SiteSafe by TheSift badge – approved on SaaS Hub"
              width={150}
              height={50}
              unoptimized
              className="h-10 w-auto"
            />
            <span className="text-xs text-slate-400">Featured on SaaS Hub</span>
          </a>
          <ReviewBadges />
        </div>
      </div>

      {/* Problem section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Last month, a site manager lost their visitor log the day before a safety audit.
          They spent four hours recreating it from memory.
        </h2>
        <p className="mt-4 text-lg text-sky-400 font-semibold">
          That doesn&apos;t happen with SiteSafe.
        </p>
      </div>

      {/* Features grid – with empty‑state fallback */}
      <div id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-3xl font-bold tracking-tight text-white text-center mb-8">Everything you get</h2>

        {featureGroups.length === 0 ? (
          <p className="text-center text-slate-400">No features to display at this time.</p>
        ) : (
          featureGroups.map((group) => (
            <div key={group.category} className="mb-8">
              <h3 className="text-lg font-semibold text-sky-300 mb-4 text-center sm:text-left">
                {group.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {group.items.map((f, idx) => (
                  <div
                    key={idx}
                    className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 flex gap-4 items-start hover:bg-white/[0.08] transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
                      <f.icon className="w-5 h-5 text-sky-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{f.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        {/* Pricing feature callout */}
        <div className="mt-8 flex justify-center">
          <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 flex gap-4 items-start max-w-md w-full hover:bg-white/[0.08] transition-all duration-300">
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
          <TrackedCtaLink
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg"
          >
            Ready to try? Start free trial <ArrowRight className="ml-2 w-4 h-4" />
          </TrackedCtaLink>
        </div>
      </div>

      {/* Screenshot gallery */}
      <ScreenshotGallery screenshots={screenshots} />

      {/* Trusted by – with empty fallback */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <h2 className="text-xl font-semibold tracking-tight text-white text-center mb-6">Trusted across industries</h2>
        {["Construction", "Warehousing", "Offices", "Manufacturing", "Logistics"].length === 0 ? (
          <p className="text-center text-slate-400 text-sm">No industries listed.</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {["Construction", "Warehousing", "Offices", "Manufacturing", "Logistics"].map((industry) => (
              <div key={industry} className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised px-6 py-3 text-sm text-slate-200 font-medium">
                {industry}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Testimonial */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-center">
          <blockquote className="text-lg text-slate-200 italic leading-relaxed">
            &ldquo;I used to lose paper visitor logs all the time. With SiteSafe, I finally have a system I can trust – and I can pull up an audit report in seconds.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-slate-400">
            – Matteus, Facility Manager – NY
          </p>
        </div>
      </div>

      {/* ROI benefit */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 text-center">
        <p className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          SiteSafe pays for itself if it saves you just two hours of audit prep per month.
        </p>
        <p className="mt-2 text-slate-400">Most users save five hours or more.</p>
      </div>

      {/* Comparison card */}
      <div className="max-w-2xl mx-auto mb-12 px-4">
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-5 text-center">
          <p className="text-sm text-slate-300">
            See how SiteSafe compares to Envoy, SwipedOn, and paper logs{" "}
            <Link href="/compare" className="text-sky-400 hover:underline transition-colors font-medium">
              side‑by‑side
            </Link>.
          </p>
        </div>
      </div>

      {/* Security card – updated tracker wording */}
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
              <CheckCircle2 className="w-6 h-6 text-sky-400" />
              No behavioural ad trackers
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
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 bg-white/[0.04] backdrop-blur-md rounded-xl border border-white/5 px-4 py-3 text-sm text-slate-400 hover:text-white transition-colors duration-150"
          >
            <Code className="w-4 h-4 text-sky-400" />
            Developers: REST API available – integrate SiteSafe with your own tools
          </Link>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-white/[0.03] backdrop-blur-sm py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Start your 14‑day free trial
          </h2>
          <p className="mt-3 text-lg text-slate-400">
            No credit card. No sales call. Trial starts instantly.
          </p>
          <TrackedCtaLink
            href="/signup"
            className="inline-flex items-center justify-center mt-8 px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg"
          >
            Try SiteSafe free <ArrowRight className="ml-2 w-4 h-4" />
          </TrackedCtaLink>
        </div>
      </div>
    </div>
  );
}