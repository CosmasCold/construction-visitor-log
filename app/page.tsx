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
  ChevronRight,
  Play,
  Star,
  BadgeCheck,
  Lock,
  Flame,
} from "lucide-react";

export const metadata: Metadata = {
  title: "SiteSafe — Replace Paper Logs Across All 20 Sites in 3 Minutes",
  description:
    "Visitor management that doesn't require a sales call. One dashboard, up to 20 sites, flat $49/mo. 14-day free trial, no credit card.",
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

// ─── Outcome-Driven Feature Groups ───
const outcomeGroups = [
  {
    outcome: "Know who is on every site — instantly",
    icon: Users,
    items: [
      { icon: QrCode, title: "QR check-in", desc: "Visitors scan, sign, and get cleared in under 10 seconds. No app download needed." },
      { icon: Camera, title: "Photo capture", desc: "Auto-capture visitor photos at sign-in. Security knows exactly who is on site." },
      { icon: ShieldCheck, title: "Mandatory safety briefings", desc: "Visitors must acknowledge hazards before entry. Compliance proof is automatic." },
    ],
  },
  {
    outcome: "Stop unwanted access before it happens",
    icon: ShieldAlert,
    items: [
      { icon: ListChecks, title: "Pre-screening questions", desc: "Block visitors who answer 'yes' to risk questions before they reach your door." },
      { icon: ShieldAlert, title: "Watchlist & blocklist", desc: "Flagged visitors are stopped at check-in. You get an instant alert." },
      { icon: Lock, title: "Lockdown mode", desc: "One click blocks all new check-ins. Active visitors are flagged for security." },
    ],
  },
  {
    outcome: "Pass audits without the panic",
    icon: FileText,
    items: [
      { icon: FileDown, title: "One-click exports", desc: "CSV, Excel, or PDF filtered by date, site, or host. Includes every pre-screening answer." },
      { icon: FileText, title: "Digital document signing", desc: "NDAs and waivers signed before entry. Stored forever for audit." },
      { icon: AlertTriangle, title: "Emergency evacuation list", desc: "Instant PDF of everyone on site. For drills and real emergencies." },
    ],
  },
  {
    outcome: "Manage 20 sites without 20 logins",
    icon: Building,
    items: [
      { icon: Building, title: "One account, 20 sites", desc: "Each site gets its own QR code, settings, and visitor log. Switch in one click." },
      { icon: Mail, title: "Host notifications", desc: "Visitor selects their host. Brevo sends an alert before they reach the desk." },
      { icon: UserPlus, title: "Pre-registration", desc: "Add expected visitors for one-tap sign-in. No delays at the front desk." },
      { icon: Printer, title: "Badge printing", desc: "Print photo badges from the active list. Professional and secure." },
    ],
  },
];

const integrations = [
  { icon: Code, title: "REST API", desc: "Connect to Slack, HR tools, or your own dashboard." },
  { icon: Zap, title: "Webhooks", desc: "Real-time event streaming to your own tools." },
  { icon: GitBranch, title: "Zapier, Google Sheets, Slack", desc: "No-code integrations that work in minutes." },
];

const industries = [
  { name: "Construction", icon: Wrench },
  { name: "Warehousing", icon: Package },
  { name: "Offices", icon: Building2 },
  { name: "Manufacturing", icon: Factory },
  { name: "Logistics", icon: Truck },
];

const testimonials = [
  {
    quote: "We replaced paper logs across 8 sites in one afternoon. The safety inspector actually complimented our records.",
    author: "Marcus Chen",
    role: "Facilities Director, Coastal Build Group",
    metric: "8 sites",
    metricLabel: "migrated in 1 day",
  },
  {
    quote: "The lockdown feature alone is worth it. We tested it during a drill and had a full evacuation list in 12 seconds.",
    author: "Sarah Okafor",
    role: "Head of Security, Meridian Health",
    metric: "12 sec",
    metricLabel: "evacuation list",
  },
  {
    quote: "I used to chase down 6 different logbooks at month-end. Now I export one CSV and I'm done.",
    author: "David Park",
    role: "Operations Manager, Apex Logistics",
    metric: "6 hrs",
    metricLabel: "saved per month",
  },
];

const objections = [
  {
    q: "What if we have more than 20 sites?",
    a: "Contact us for enterprise pricing. Most teams under 20 sites never need to talk to sales.",
  },
  {
    q: "Do visitors need to download an app?",
    a: "No. They scan a QR code with their phone camera and check in through their browser.",
  },
  {
    q: "Can we try it without a credit card?",
    a: "Yes. The 14-day trial starts instantly. No card, no sales call, no catch.",
  },
  {
    q: "How long does setup take?",
    a: "Most teams are live in under 3 minutes. Create a site, load the check-in page on any tablet at reception, or print a QR code for visitors to scan with their own phones.",
  },
  {
    q: "Is our data secure?",
    a: "All data is encrypted at rest and in transit. We run on SOC 2 Type II infrastructure.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white overflow-x-hidden">
      
      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0f1c]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">SiteSafe</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/login" className="hidden sm:block text-sm text-slate-400 hover:text-white transition-colors">
              Sign in
            </Link>
            <TrackedCtaLink
              href="/signup"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-slate-900 bg-white hover:bg-slate-100 transition-all active:scale-95"
            >
              Start free trial
            </TrackedCtaLink>
          </div>
        </div>
      </nav>

            {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left: Copy */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-medium mb-6">
                <Flame className="w-3.5 h-3.5" />
                No sales calls. No per-site fees. Setup in 3 minutes.
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                Stop losing visitor logs{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
                  across 20 sites
                </span>
              </h1>
              
              <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Paper logs get lost. Spreadsheets get messy. Compliance audits turn into nightmares. 
                SiteSafe replaces all of it with one real-time dashboard — flat $49/mo, up to 20 sites.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <TrackedCtaLink
                  href="/demo"
                  className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] active:scale-[0.98]"
                >
                  Try Live Demo
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
                >
                  Start Free Trial
                </TrackedCtaLink>
              </div>
              
              <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  No credit card
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Cancel in 2 clicks
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  3-min setup
                </span>
              </div>
            </div>
            
            {/* Right: Product Visual */}
<div className="relative">
  <div className="relative rounded-2xl border border-white/10 bg-[#0f172a] shadow-2xl overflow-hidden aspect-[16/10]">
    <Image
      src="/dash.png"
      alt="SiteSafe real-time visitor dashboard showing active visitors across multiple sites"
      fill
      className="object-cover"
      priority
      sizes="(max-width: 1024px) 100vw, 50vw"
    />
    {/* Floating stat card */}
    <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-48 p-3 rounded-xl bg-[#1e293b] border border-white/10 z-10">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-medium text-emerald-400">Live</span>
      </div>
      <p className="text-lg font-bold text-white">24 visitors</p>
      <p className="text-xs text-slate-400">across 8 sites right now</p>
    </div>
  </div>
  <div className="absolute -top-4 -right-4 w-24 h-24 bg-sky-500/20 rounded-full blur-2xl pointer-events-none" />
  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
</div>
            
          </div>
        </div>
      </section>

      {/* ─── Social Proof Bar ─── */}
      <section className="border-y border-white/5 bg-white/[0.02] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                Trusted by multi-site teams
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
              <span className="text-sm font-semibold text-slate-400">Coastal Build</span>
              <span className="text-sm font-semibold text-slate-400">Meridian Health</span>
              <span className="text-sm font-semibold text-slate-400">Apex Logistics</span>
              <span className="text-sm font-semibold text-slate-400">Summit Mfg</span>
              <span className="text-sm font-semibold text-slate-400">Metro Warehousing</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-500">4.9/5 on G2</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Problem (Before/After) ─── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Paper logs are a liability.{" "}
              <span className="text-slate-500">Your spreadsheet is not a compliance strategy.</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h3 className="font-semibold text-red-300">The old way</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Hunting down 6 different logbooks at month-end",
                  "Missing visitor photos when security needs them",
                  "Reconstructing sign-in sheets for the auditor",
                  "No way to know if a blocked visitor tried to enter",
                  "Paying per-site fees that multiply every month",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* After */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8">
              <div className="flex items-center gap-2 mb-6">
                <BadgeCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-semibold text-emerald-300">The SiteSafe way</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "One dashboard. Every site. One export button.",
                  "Visitor photos attached to every record, automatically",
                  "Audit-ready PDFs with timestamps and signatures",
                  "Instant alerts when a blocked visitor attempts check-in",
                  "Flat $49/mo. Add sites 2 through 20 at no extra cost.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features (Outcome-Driven) ─── */}
      <section id="features" className="py-20 sm:py-28 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Everything you need to run visitor management at scale
            </h2>
            <p className="text-lg text-slate-400">
              Not feature bloat. Just the tools that keep your sites secure, compliant, and efficient.
            </p>
          </div>
          
          <div className="space-y-20">
            {outcomeGroups.map((group, groupIdx) => (
              <div key={groupIdx}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center">
                    <group.icon className="w-5 h-5 text-sky-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{group.outcome}</h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {group.items.map((item, idx) => (
                    <FadeInSection key={idx} delay={idx * 100}>
                      <div className="group h-full rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 p-6 transition-all duration-300">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:bg-sky-500/10 transition-colors">
                          <item.icon className="w-5 h-5 text-slate-300 group-hover:text-sky-400 transition-colors" />
                        </div>
                        <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Integrations mini-section */}
          <div className="mt-20 pt-16 border-t border-white/5">
            <h3 className="text-center text-lg font-semibold text-slate-300 mb-8">
              Works with your existing stack
            </h3>
            <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
              {integrations.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.03]">
                  <item.icon className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-white">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Demo Video ─── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              See it in action
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Watch how SiteSafe replaces paper logs across multiple sites in under 3 minutes.
            </p>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f172a]">
            <iframe
              src="https://www.youtube-nocookie.com/embed/ntRt1qVkLgo?si=BmRSpzC4Jeea1uij"
              title="SiteSafe Demo Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <p className="text-center text-xs text-slate-500 mt-4">
            3-minute demo • No sales calls • Try it free
          </p>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-20 sm:py-28 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Teams that switched never looked back
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeInSection key={i} delay={i * 150}>
                <div className="h-full rounded-2xl border border-white/5 bg-white/[0.03] p-8 flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed flex-grow italic">
                    {t.quote}
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{t.author}</p>
                        <p className="text-xs text-slate-500">{t.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-sky-400">{t.metric}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{t.metricLabel}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              One price. No surprises.
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Most visitor management tools charge per site. We think that&apos;s unfair to multi-location teams.
            </p>
          </div>
          
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-12 text-center relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
            
            <div className="relative">
              <p className="text-sm text-sky-300 font-medium mb-2 uppercase tracking-wider">
                Flat monthly rate
              </p>
              <div className="flex items-baseline justify-center gap-1 mb-4">
                <span className="text-5xl sm:text-6xl font-extrabold text-white">$49</span>
                <span className="text-xl text-slate-400">/mo</span>
              </div>
              <p className="text-slate-300 mb-8 max-w-md mx-auto">
                Up to 20 sites. Unlimited visitors. All compliance and security features included.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-8 text-left">
                {[
                  "Unlimited visitors across all sites",
                  "QR codes for every location",
                  "Photo capture & badge printing",
                  "Audit exports (CSV, Excel, PDF)",
                  "Watchlist & lockdown mode",
                  "Digital document signing",
                  "REST API & webhooks",
                  "Live chat support (< 60 sec response)",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              
              <TrackedCtaLink
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
              >
                Start my free 14-day trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </TrackedCtaLink>
              <p className="mt-3 text-xs text-slate-500">
                No credit card required. Cancel anytime.
              </p>
            </div>
          </div>
          
          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 opacity-60">
            <a href="https://saasdb.net" rel="noopener noreferrer" target="_blank">
              <Image src="https://saasdb.net/badge/featured-dark.svg" alt="Featured on SaasDB" width={150} height={56} unoptimized className="h-10 w-auto" />
            </a>
            <a href="https://fazier.com/launches/sitesafe.thesift.space" target="_blank" rel="noopener noreferrer">
              <Image src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=light" alt="Launched on Fazier" width={120} height={40} unoptimized className="h-8 w-auto" />
            </a>
            <a href="https://www.saashub.com/sitesafe-by-thesift" target="_blank" rel="noopener noreferrer">
              <Image src="https://cdn-b.saashub.com/img/badges/approved-dark.png?v=1" alt="SiteSafe by TheSift badge" width={150} height={50} unoptimized className="h-8 w-auto" />
            </a>
            <ReviewBadges />
          </div>
        </div>
      </section>

      {/* ─── Industries ─── */}
      <section className="py-16 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
            Built for multi-site teams
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry) => (
              <div key={industry.name} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.03] text-sm text-slate-300">
                <industry.icon className="w-4 h-4 text-sky-400" />
                {industry.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Free Audit Tool CTA ─── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Is your visitor log audit-ready?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-6">
              Most teams fail compliance checks because of gaps they don&apos;t know exist. 
              Run our 60-second self-audit and see exactly where you stand.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-300 hover:bg-sky-500/20 transition-all"
            >
              Run the free audit
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ / Objections ─── */}
      <section id="faq" className="py-20 sm:py-28 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            Questions? No sales call needed.
          </h2>
          <div className="space-y-4">
            {objections.map((item, i) => (
              <div key={i} className="rounded-xl border border-white/5 bg-white/[0.03] p-6">
                <h3 className="font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Start your 14-day free trial today
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            Join teams that replaced paper logs across 20 sites in one afternoon. 
            No credit card. No sales call. No catch.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedCtaLink
              href="/demo"
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-[0_0_60px_-15px_rgba(255,255,255,0.3)] active:scale-[0.98]"
            >
              Try Live Demo
              <ChevronRight className="ml-2 w-5 h-5" />
            </TrackedCtaLink>
            <TrackedCtaLink
              href="/signup"
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-medium rounded-xl text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
            >
              Start Free Trial
            </TrackedCtaLink>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Setup takes 3 minutes. Cancel in 2 clicks.
          </p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-12 bg-[#070b14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-sky-500 flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-semibold text-sm">SiteSafe</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
              <Link href="/admin/login" className="hover:text-slate-300 transition-colors">Sign in</Link>
            </div>
            <p className="text-xs text-slate-600">
              © 2026 SiteSafe by TheSift. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <StickyCTA />
    </div>
  );
}