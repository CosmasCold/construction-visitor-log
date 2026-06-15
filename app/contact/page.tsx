import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact – SiteSafe",
  description:
    "Get in touch with the SiteSafe team. No sales calls — just real humans when you need help.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Contact</h1>
        <p className="text-sm text-slate-400 mb-6">
          We’re a small team, but we read every message.
        </p>

        <div className="space-y-6 text-sm leading-relaxed text-slate-200">
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">General inquiries</h2>
            <a
              href="mailto:hello@sitesafe.thesift.space"
              className="text-sky-400 hover:text-sky-300 transition-colors"
            >
              hello@thesift.space
            </a>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-1">Press & media</h2>
            <p>
              For logos, screenshots, and brand assets, visit the{" "}
              <Link href="/press" className="text-sky-400 hover:text-sky-300 transition-colors">
                Press Kit
              </Link>.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-1">Partnerships</h2>
            <p>
              If you’re interested in a co‑branded audit tool, integration, or
              reseller arrangement, we’d love to hear from you at the email
              above.
            </p>
          </div>

          <div className="border-t border-white/10 pt-4 mt-4">
            <p className="text-slate-400 italic">
              No sales calls. No chatbots. Just a real person when you need
              one.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}