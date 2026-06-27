// app/changelog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  Rocket,
  GitCommit,
  Calendar,
  Tag,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Changelog — What's New in SiteSafe",
  description:
    "Recent updates, features, and improvements to SiteSafe visitor management. See what we shipped this month.",
  openGraph: {
    title: "SiteSafe Changelog",
    description: "Recent updates and improvements to SiteSafe visitor management.",
    images: ["/og-image.png"],
  },
};

const updates = [
  {
    date: "2026-06-25",
    tag: "New",
    changes: [
      "Published '10 Best Visitor Management Systems (2026)' comparison guide.",
      "Added free visitor log template PDF download for compliance teams.",
      "Optimized homepage title and meta description for search visibility.",
      "Added SoftwareApplication schema markup for rich snippets in Google.",
    ],
  },
  {
    date: "2026-06-19",
    tag: "Pricing",
    changes: [
      "Updated pricing plan to include up to 20 sites for $49/month (previously unlimited).",
      "Repositioned landing page and messaging to 'compliance-ready visitor management for mid-sized workplaces with multiple locations.'",
      "Added change password feature to Settings page.",
      "Improved dashboard and check-in page with premium glassmorphism design, floating labels, stats row, skeleton loaders, toast notifications, and accordion edit form.",
      "Added dedicated security-features landing page with embedded demo video.",
      "Published blog post explaining the pricing and positioning changes.",
    ],
  },
  {
    date: "2026-06-15",
    tag: "Feature",
    changes: [
      "Launched Lockdown Mode — instantly block all new check-ins and flag active visitors from the dashboard.",
      "Added Webhooks support — real-time event streaming for check-ins, check-outs, and blocklist hits.",
      "Introduced digital document signing — require visitors to sign NDAs, waivers, or policies before entry.",
      "Added Watchlist / Blocklist to the landing page feature grid.",
      "Updated the comparison page with new safety and security rows.",
      "Fixed video thumbnail loading and internal linking for city pages.",
    ],
  },
  {
    date: "2026-06-14",
    tag: "Feature",
    changes: [
      "Added Emergency Evacuation List with visitor photos — one-click PDF of everyone on site.",
      "Added Lockdown Mode toggle per site.",
      "Added Webhooks settings in the company dashboard.",
      "Integrated digital document signing with signature pad on check-in page.",
      "Launched programmatic city+industry landing pages (500+ locations).",
      "Fixed Open Graph metadata and added IndexNow support.",
    ],
  },
  {
    date: "2026-06-13",
    tag: "Improvement",
    changes: [
      "Revamped the landing page: new neutral hero subtitle, grouped features by capability, and added a mid-page call-to-action.",
      "Screenshot gallery redesigned with darker display case, left/right scroll buttons, keyboard navigation, and click-to-enlarge.",
      "Launched dedicated Pricing and Compare pages for instant transparency.",
      "Performance overhaul: lazy-loaded Excel/PDF export libraries, inlined structured data, added preconnects for external domains.",
      "Switched hero background to local optimized WebP — faster loads, no third-party dependency.",
      "Enabled automatic next-gen image formats (WebP/AVIF) for all local screenshots.",
      "Added Vercel Analytics event tracking for CTA clicks, checklist submissions, demo video plays, and file exports.",
      "Improved table accessibility across dashboards with scope='col' attributes.",
      "Updated trust copy from 'No third-party trackers' to 'No behavioural ad trackers' for accuracy.",
      "Fixed visitor photo rendering in dashboard to use next/image for better performance.",
      "Added empty-state fallbacks throughout the landing page.",
    ],
  },
  {
    date: "2026-06-12",
    tag: "Feature",
    changes: [
      "Site managers can now sign visitors out remotely from the dashboard — one click and the visitor is marked as departed.",
      "Analytics page upgraded with custom date range picker, site filter dropdown, and automatic chart updates.",
      "Redesigned 'See the product' section with horizontal scrollable gallery featuring five product screenshots.",
      "Added SaaS Hub review badge alongside existing trust badges.",
      "Replaced construction icon on dashboard with neutral building icon to represent all industries.",
      "Updated FAQ page to cover every new feature: remote sign-out, pre-screening, photo capture, analytics, and integrations.",
      "Added SourceForge, Slashdot, and TopBusinessSoftware review badges.",
      "Multiple security improvements: tightened Content Security Policy, added HSTS preload, hardened default-src.",
      "Changed testimonial name and title on landing page.",
      "Replaced 2-minute overview video with 30-second version.",
    ],
  },
  {
    date: "2026-06-10",
    tag: "Feature",
    changes: [
      "Added pre-screening questions — site managers can define custom yes/no questions visitors must answer before signing in.",
      "Added real-time photo capture — take a visitor photo at check-in. Stored securely and included on printed badges.",
      "Dashboard now auto-refreshes every 5 seconds for true real-time view.",
      "Printed badges now compact (4×3-inch label format) and include visitor photos.",
      "Updated Privacy Policy to cover photo storage, pre-screening answers, and data retention.",
    ],
  },
  {
    date: "2026-06-09",
    tag: "Launch",
    changes: [
      "Launched dedicated Features, About, Pricing, and Security pages.",
      "Published the Ultimate Guide to Modern Visitor Management on the blog.",
      "Added Fazier launch badge alongside existing SaasDB badge.",
      "Introduced 'Trusted across industries' section on the landing page.",
    ],
  },
  {
    date: "2026-06-06",
    tag: "Feature",
    changes: [
      "Added Visitor Log Audit Checklist email capture on the landing page.",
      "Upgraded landing page to focus on smart visitor management for all workplaces.",
      "Introduced trial activation email sequence (Day 0, Day 2, Day 12) via Vercel Cron.",
    ],
  },
  {
    date: "2026-06-05",
    tag: "Infrastructure",
    changes: [
      "Launched REST API v1 with Bearer token authentication and full documentation.",
      "Added email verification for new signups to improve account security.",
      "Hashed API keys stored in database for better protection.",
    ],
  },
  {
    date: "2026-06-04",
    tag: "Feature",
    changes: [
      "Released QR code check-in with auto-generated site-specific codes.",
      "Added host email notifications (via Brevo) when a visitor selects a host.",
      "Introduced pre-registration of expected visitors with one-tap sign-in.",
      "Visitor badge printing now available for all active visitors on check-in page.",
    ],
  },
  {
    date: "2026-06-03",
    tag: "Content",
    changes: [
      "Published comparison page (SiteSafe vs Envoy vs SwipedOn vs paper logs).",
      "Added analytics dashboard with 30-day trend chart and CSV export.",
    ],
  },
  {
    date: "2026-06-01",
    tag: "Launch",
    changes: [
      "Initial launch of SiteSafe with free 14-day trial, multi-site management, and audit-ready exports.",
    ],
  },
];

const tagColors: Record<string, string> = {
  Launch: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Feature: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Improvement: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Pricing: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Infrastructure: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  Content: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  New: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      {/* ─── Header ─── */}
      <header className="border-b border-white/5 bg-[#0a0f1c]/90 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-sky-500 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-white">SiteSafe</span>
          </Link>
          <Link href="/" className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1">
            Back to site <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* ─── Hero ─── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-4">
            <GitCommit className="w-6 h-6 text-sky-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Changelog
          </h1>
          <p className="text-base text-slate-400 max-w-md mx-auto">
            What we&apos;re shipping, fixing, and improving. Updated weekly.
          </p>
        </div>

        {/* ─── Updates ─── */}
        <div className="space-y-10">
          {updates.map((entry, i) => (
            <div key={i} className="relative pl-8">
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-sky-500/20 border-2 border-sky-500/40" />
              {/* Timeline line */}
              {i < updates.length - 1 && (
                <div className="absolute left-[5px] top-5 bottom-[-40px] w-px bg-white/5" />
              )}

              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  {entry.date}
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wider ${tagColors[entry.tag] || tagColors.Improvement}`}>
                  {entry.tag}
                </span>
              </div>

              <ul className="space-y-2.5">
                {entry.changes.map((change, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ─── CTA ─── */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
          <div className="relative">
            <h2 className="text-xl font-bold text-white mb-2">
              Want to see what&apos;s next?
            </h2>
            <p className="text-sm text-slate-400 mb-6 max-w-sm mx-auto">
              Follow us for real-time updates, feature previews, and behind-the-scenes looks at what we&apos;re building.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://x.com/sitesafehq"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all"
              >
                Follow on X <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition-all active:scale-[0.98]"
              >
                Start free trial <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-12 bg-[#070b14]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600">
            © 2026 SiteSafe by TheSift. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}