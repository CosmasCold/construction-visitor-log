// app/blog/sitesafe-vs-envoy-swipedon-paper/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SiteSafe vs Envoy vs SwipedOn vs Paper – SiteSafe Blog",
  description:
    "An honest side‑by‑side comparison of digital visitor log solutions, including pricing, features, and hidden costs.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          SiteSafe vs Envoy vs SwipedOn vs Paper Logs
        </h1>
        <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 3 min read</p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            If you’re responsible for keeping track of visitors at a construction site,
            warehouse, or office, you’ve probably looked at a few options. The big names —
            Envoy and SwipedOn — look polished, but they come with premium pricing and
            sales calls. On the other end, there’s the clipboard. It’s cheap, but it’s a
            liability.
          </p>
          <p>
            We built <strong className="text-white">SiteSafe</strong> to land right in the
            middle: all the features of the enterprise tools, at a flat $49/month, with no
            sales calls ever.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            The comparison at a glance
          </h2>
          <p>
            Here’s how we stack up against the competition — and the clipboard.
          </p>

          <div className="overflow-x-auto mt-3">
            <table className="w-full text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="p-2 text-left">Feature</th>
                  <th className="p-2 text-left">SiteSafe</th>
                  <th className="p-2 text-left">Envoy</th>
                  <th className="p-2 text-left">SwipedOn</th>
                  <th className="p-2 text-left">Paper</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ["QR check‑in", "✅", "✅", "✅", "❌"],
                  ["Mandatory safety acknowledgment", "✅ (cannot skip)", "❌ (optional)", "❌", "❌"],
                  ["Host email notification", "✅ (automatic)", "✅ (paid add‑on)", "❌", "❌"],
                  ["Pre‑registration", "✅", "✅ (paid)", "✅ (paid)", "❌"],
                  ["Visitor badge printing", "✅", "✅", "✅", "❌"],
                  ["Real‑time dashboard", "✅", "✅", "✅", "❌"],
                  ["Remote sign‑out", "✅", "✅", "✅", "❌"],
                  ["Audit exports", "✅ (CSV, Excel, PDF)", "✅ (paid tier)", "✅ (basic)", "❌"],
                  ["Analytics (trend chart)", "✅", "✅ (premium)", "❌", "❌"],
                  ["REST API", "✅ (full docs)", "✅ (enterprise)", "❌", "❌"],
                  ["Multi‑site", "✅ (unlimited, free)", "✅ (per‑site fee)", "✅ (per‑site fee)", "❌"],
                  ["Free trial (no card)", "✅ (14 days)", "❌", "❌", "N/A"],
                  ["Sales calls", "❌ (never)", "✅", "✅", "N/A"],
                  ["Pricing", "$49/mo flat", "$99+/mo + fees", "$39+/mo + fees", "~$20/yr in clipboards"],
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.03]">
                    <td className="p-2 font-medium text-white">{row[0]}</td>
                    <td className="p-2 text-sky-300">{row[1]}</td>
                    <td className="p-2">{row[2]}</td>
                    <td className="p-2">{row[3]}</td>
                    <td className="p-2 text-slate-500">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            The real difference
          </h2>
          <p>
            Envoy and SwipedOn are solid products — but they target enterprises with
            compliance departments and big budgets. That’s why they charge per site, per
            feature, and per visitor. They also require demos and sales calls.
          </p>
          <p>
            SiteSafe was built for the rest of us. You can sign up in 60 seconds, add
            unlimited sites, and start checking in visitors immediately. No salesperson
            will ever call you. And at $49/month, you can put a tablet at every entrance
            without thinking about the bill.
          </p>
          <p>
            See the full comparison at{" "}
            <Link href="/compare" className="text-sky-400 hover:text-sky-300 transition-colors">
              sitesafe.thesift.space/compare
            </Link>.
          </p>
        </div>
      </div>
      <p className="text-sm text-slate-400 italic mt-8 pt-6 border-t border-white/10">
  Want to make sure your visitor log survives an audit?{" "}
  <a href="/checklist" className="text-sky-400 hover:underline">
    Grab our free 10‑point checklist
  </a>.
</p>
    </div>
  );
}