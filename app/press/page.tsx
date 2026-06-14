import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Press Kit – SiteSafe",
  description:
    "Official logos, screenshots, and brand assets for SiteSafe – the smart visitor management platform.",
};

export default function PressPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Press Kit
          </h1>
          <p className="text-sm text-slate-400">
            Everything you need to write about SiteSafe.
          </p>
        </div>

        {/* Boilerplate */}
        <section className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-2">Boilerplate</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            SiteSafe is a smart digital visitor check‑in built for
            construction sites, warehouses, offices, and any workplace that
            needs to track visitors. It replaces paper sign‑in sheets with QR
            codes, enforces mandatory safety acknowledgments, and gives teams a
            real‑time dashboard and instant audit exports. Flat $49/month,
            unlimited sites, no sales calls — just a simple, reliable tool
            trusted across over 100 U.S. cities.
          </p>
        </section>

        {/* Founder */}
        <section className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-2">Founder</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Gabriel Freitas founded SiteSafe to solve the problem he kept hearing
            from facility managers: paper visitor logs fail audits, and
            existing software is too expensive or complicated. He built the
            entire platform — from check‑in to analytics — with a focus on
            simplicity, compliance, and transparent pricing.
          </p>
        </section>

        {/* Logos */}
        <section className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Logos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-xl p-6 text-center">
              <Image
                src="/favicon.svg"
                alt="SiteSafe logo"
                width={48}
                height={48}
                className="mx-auto mb-2"
              />
              <p className="text-xs text-slate-400">Icon (SVG)</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <Image
                src="/favicon.svg"
                alt="SiteSafe logo light bg"
                width={48}
                height={48}
                className="mx-auto mb-2"
              />
              <p className="text-xs text-slate-500">Icon on light background</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Download: right‑click → Save image as. For additional formats,
            email{" "}
            <a
              href="mailto:hello@sitesafe.thesift.space"
              className="text-sky-400 hover:underline"
            >
              hello@thesift.space
            </a>.
          </p>
        </section>

        {/* Screenshots */}
        <section className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Screenshots
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Image
              src="/checkin.png"
              alt="Visitor check‑in screen"
              width={400}
              height={300}
              className="rounded-lg border border-white/10"
            />
            <Image
              src="/dashboard.png"
              alt="Real‑time dashboard"
              width={400}
              height={300}
              className="rounded-lg border border-white/10"
            />
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Right‑click to download. High‑res versions available on request.
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
              href="mailto:hello@sitesafe.thesift.space"
              className="text-sky-400 hover:underline"
            >
              hello@thesift.space
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}