import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Press Kit – SiteSafe",
  description:
    "Official logos, screenshots, and brand assets for SiteSafe – the smart visitor management platform.",
};

const screenshots = [
  {
    src: "/checkin.png",
    alt: "Visitor check‑in form with host selection and photo capture",
    caption: "Check‑in form",
  },
  {
    src: "/dashboard.png",
    alt: "Real‑time dashboard with active visitors and quick actions",
    caption: "Real‑time dashboard",
  },
  {
    src: "/analytics.png",
    alt: "Analytics page with trend chart, date filters, and CSV export",
    caption: "Analytics",
  },
  {
    src: "/activevisitors.png",
    alt: "Active visitors list with photos and sign‑out buttons",
    caption: "Active visitors",
  },
  {
    src: "/lockdown.png",
    alt: "Lockdown mode toggle on a site card",
    caption: "Lockdown mode",
  },
  {
    src: "/newsite.png",
    alt: "New site creation form",
    caption: "New site setup",
  },
];

export default function PressPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Press Kit
          </h1>
          <p className="text-sm text-slate-400">
            Official brand assets and product screenshots. All images can be
            downloaded directly.
          </p>
        </div>

                {/* Boilerplate */}
        <section className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-2">Boilerplate</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            SiteSafe is a smart digital check‑in platform that replaces paper
            visitor logs with QR codes, mandatory safety briefings, and
            real‑time dashboards. It includes advanced security features as
            standard — watchlist/blocklist with instant alerts, one‑click
            emergency evacuation lists with photos, lockdown mode, digital
            document signing, and webhooks — all for a flat $49/month with
            unlimited sites and visitors. No per‑site fees, no sales calls,
            and a 14‑day free trial with no credit card required. SiteSafe
            serves construction companies, warehouses, corporate offices,
            manufacturing plants, logistics hubs, schools, and healthcare
            facilities across the United States and internationally.
          </p>
        </section>

        {/* Founder */}
        <section className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-2">Founder</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Gabriel Freitas founded SiteSafe to solve the problem he kept hearing
            from facility managers: paper visitor logs fail audits, and existing
            software is too expensive or complicated. He built the entire
            platform with a focus on simplicity, compliance, and transparent
            pricing.
          </p>
        </section>

        {/* Logo */}
        <section className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Logo</h2>
          <div className="flex items-center gap-6">
            <div className="bg-slate-900 rounded-xl p-6 flex items-center justify-center w-32 h-32">
              <Image
                src="/favicon.svg"
                alt="SiteSafe logo"
                width={64}
                height={64}
              />
            </div>
            <div>
              <p className="text-sm text-slate-300 mb-2">
                Download the SVG version:
              </p>
              <a
                href="/favicon.svg"
                download
                className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors"
              >
                Download SVG
              </a>
              <p className="text-xs text-slate-500 mt-2">
                The logo appears on a dark background above. For light
                backgrounds, use the same SVG — it remains fully readable.
              </p>
            </div>
          </div>
        </section>

        {/* Screenshots */}
        <section className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Screenshots
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {screenshots.map((shot, idx) => (
              <a
                key={idx}
                href={shot.src}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-slate-800 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover"
                />
                <p className="px-3 py-2 text-xs text-slate-400">
                  {shot.caption}
                </p>
              </a>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Click any screenshot to open the full‑size version. Right‑click →
            Save image as to download.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-2">
            Media Contact
          </h2>
          <p className="text-sm text-slate-300">
            Email:{" "}
            <a
              href="mailto:hello@thesift.space"
              className="text-sky-400 hover:underline"
            >
              hello@sitesafe.thesift.space
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}