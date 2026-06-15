// app/changelog/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog – SiteSafe",
  description:
    "Recent updates and improvements to SiteSafe, the smart visitor management platform.",
};

const updates = [
  {
    date: "2026-06-15",
    changes: [
      "Launched Lockdown Mode – instantly block all new check‑ins and flag active visitors from the dashboard.",
      "Added Webhooks support – real‑time event streaming for check‑ins, check‑outs, and blocklist hits.",
      "Introduced digital document signing – require visitors to sign NDAs, waivers, or policies before entry.",
      "Added Watchlist / Blocklist to the landing page feature grid.",
      "Updated the comparison page with new safety and security rows.",
      "Fixed video thumbnail loading and internal linking for city pages.",
    ],
  },
  {
    date: "2026-06-14",
    changes: [
      "Added Emergency Evacuation List with visitor photos – one‑click PDF of everyone on site.",
      "Added Lockdown Mode toggle per site.",
      "Added Webhooks settings in the company dashboard.",
      "Integrated digital document signing with signature pad on check‑in page.",
      "Launched programmatic city+industry landing pages (500+ locations).",
      "Fixed Open Graph metadata and added IndexNow support.",
    ],
  },
  {
    date: "2026-06-13",
    changes: [
      "Revamped the landing page: new neutral hero subtitle (“the digital check‑in for any workplace”), grouped features by capability, and added a mid‑page call‑to‑action.",
      "Screenshot gallery redesigned with a darker display case, left/right scroll buttons, keyboard navigation, and click‑to‑enlarge for any image.",
      "Launched dedicated Pricing and Compare pages so visitors can see pricing instantly and compare SiteSafe side‑by‑side with Envoy, SwipedOn, and paper logs.",
      "Performance overhaul: lazy‑loaded Excel/PDF export libraries, inlined structured data, added preconnects for external domains.",
      "Switched hero background from external Unsplash image to a local optimized WebP — faster loads, no third‑party dependency.",
      "Enabled automatic next‑gen image formats (WebP/AVIF) for all local screenshots and added cache headers for static assets.",
      "Added Vercel Analytics event tracking for CTA clicks, checklist submissions, demo video plays, and file exports.",
      "Improved table accessibility across both dashboards with scope=\"col\" attributes on all column headers.",
      "Updated trust copy from “No third‑party trackers” to “No behavioural ad trackers” for accuracy.",
      "Fixed visitor photo rendering in the company dashboard to use next/image for better performance.",
      "Added empty‑state fallbacks throughout the landing page so the UI degrades gracefully if any data is missing.",
    ],
  },
  {
    date: "2026-06-12",
    changes: [
      "Site managers can now sign visitors out remotely from the dashboard – one click and the visitor is marked as departed.",
      "Analytics page upgraded with custom date range picker, site filter dropdown, and automatic chart updates.",
      "Redesigned the 'See the product' section on the landing page with a horizontal scrollable gallery featuring five product screenshots.",
      "Added SaaS Hub review badge alongside existing trust badges.",
      "Replaced the construction icon on the company dashboard with a neutral building icon to better represent all industries.",
      "Updated the FAQ page to cover every new feature, including remote sign‑out, pre‑screening, photo capture, analytics, and integrations.",
      "Added SourceForge, Slashdot, and TopBusinessSoftware review badges to the landing page.",
      "Multiple security improvements: tightened Content Security Policy, added HSTS preload, and hardened default‑src.",
      "Changed the testimonial name and title on the landing page.",
      "Replaced the 2‑minute overview video with a 30‑second version and updated the caption.",
    ],
  },
  {
    date: "2026-06-10",
    changes: [
      "Added pre‑screening questions – site managers can now define custom yes/no questions that visitors must answer before signing in.",
      "Added real‑time photo capture – take a visitor photo at check‑in. Stored securely and included on printed badges.",
      "Dashboard now auto‑refreshes every 5 seconds, giving you a true real‑time view of who's on site.",
      "Printed badges are now compact (4×3‑inch label format) and include visitor photos.",
      "Added SourceForge, Slashdot, and TopBusinessSoftware review badges to the landing page.",
      "Updated Privacy Policy to cover photo storage, pre‑screening answers, and data retention.",
    ],
  },
  {
    date: "2026-06-09",
    changes: [
      "Launched dedicated Features, About, Pricing, and Security pages.",
      "Published the Ultimate Guide to Modern Visitor Management on the blog.",
      "Added Fazier launch badge alongside the existing SaasDB badge.",
      "Introduced a 'Trusted across industries' section on the landing page.",
    ],
  },
  {
    date: "2026-06-06",
    changes: [
      "Added Visitor Log Audit Checklist email capture on the landing page.",
      "Upgraded landing page to focus on smart visitor management for all workplaces.",
      "Introduced trial activation email sequence (Day 0, Day 2, Day 12) via Vercel Cron.",
    ],
  },
  {
    date: "2026-06-05",
    changes: [
      "Launched REST API v1 with Bearer token authentication and full documentation.",
      "Added email verification for new signups to improve account security.",
      "Hashed API keys stored in the database for better protection.",
    ],
  },
  {
    date: "2026-06-04",
    changes: [
      "Released QR code check‑in with auto‑generated site‑specific codes.",
      "Added host email notifications (via Brevo) when a visitor selects a host.",
      "Introduced pre‑registration of expected visitors with one‑tap sign‑in.",
      "Visitor badge printing now available for all active visitors on the check‑in page.",
    ],
  },
  {
    date: "2026-06-03",
    changes: [
      "Published comparison page (SiteSafe vs Envoy vs SwipedOn vs paper logs).",
      "Added analytics dashboard with 30‑day trend chart and CSV export.",
    ],
  },
  {
    date: "2026-06-01",
    changes: [
      "Initial launch of SiteSafe with free 14‑day trial, multi‑site management, and audit‑ready exports.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Changelog</h1>
        <p className="text-sm text-slate-400 mb-8">
          All notable updates and improvements to SiteSafe.
        </p>

        <div className="space-y-8">
          {updates.map((entry, i) => (
            <div key={i} className="border-l-2 border-sky-400 pl-4">
              <h2 className="text-sm font-semibold text-sky-300 uppercase tracking-wider mb-2">
                {entry.date}
              </h2>
              <ul className="space-y-2 list-disc list-inside">
                {entry.changes.map((change, j) => (
                  <li key={j} className="text-sm text-slate-200 leading-relaxed pl-1">
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-500 mt-12">
          We ship updates frequently. Follow us on{" "}
          <a
            href="https://x.com/sitesafehq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-sky-300 transition-colors"
          >
            X
          </a>{" "}
          for real‑time news.
        </p>
      </div>
    </div>
  );
}