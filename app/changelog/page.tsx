// app/changelog/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog – SiteSafe",
  description: "Recent updates and improvements to SiteSafe, the smart visitor management platform.",
};

const updates = [
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
              <ul className="space-y-2">
                {entry.changes.map((change, j) => (
                  <li key={j} className="text-sm text-slate-200 leading-relaxed flex gap-2">
                    <span className="text-sky-400 mt-1 flex-shrink-0">•</span>
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-500 mt-12">
          We ship updates frequently. Follow us on{" "}
          <a
            href="https://twitter.com/sitesafehq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-sky-300 transition-colors"
          >
            Twitter
          </a>{" "}
          for real‑time news.
        </p>
      </div>
    </div>
  );
}