// app/blog/ilobby-alternative/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Top 5 iLobby Alternatives for Small & Mid-Sized Businesses (2026)",
  description:
    "Looking for an iLobby alternative? Compare 5 top visitor management systems for small and mid-sized businesses — starting at $49/mo for 20 sites.",
  openGraph: {
    title: "Top 5 iLobby Alternatives for Small & Mid-Sized Businesses (2026)",
    description:
      "Looking for an iLobby alternative? Compare 5 top visitor management systems for small and mid-sized businesses — starting at $49/mo for 20 sites.",
    type: "article",
    url: "https://sitesafe.thesift.space/blog/ilobby-alternative",
  },
};

const alternatives = [
  {
    name: "SiteSafe",
    rank: 1,
    tagline: "Best Overall iLobby Alternative",
    pricing: "$49/month flat for up to 20 sites",
    bestFor: "Small and mid-sized businesses with 2-20 locations",
    comparison: [
      ["Starting price", "Custom quote", "**$49/mo flat**"],
      ["Setup time", "Days or weeks", "**2 minutes**"],
      ["Mandatory safety briefing", "Not available", "**Mandatory**"],
      ["Emergency evacuation list", "Not available", "**Included**"],
      ["Lockdown mode", "Not available", "**Included**"],
      ["Free trial", "Requires demo", "**14 days, no card**"],
      ["Sales call required", "Yes", "**No**"],
    ],
    bottomLine:
      "iLobby is built for enterprises with complex security needs. SiteSafe is built for small and mid-sized businesses that need compliance and visibility without the enterprise overhead.",
    cta: true,
  },
  {
    name: "Envoy",
    rank: 2,
    tagline: "Best for Large Enterprises",
    pricing: "~$99+/month per site",
    bestFor: "Large enterprises with custom workflows",
    whyAlternative:
      "Envoy offers a polished interface and strong integrations.",
    catch:
      "Per-location pricing. Mandatory sales demos. Features locked behind paid add-ons.",
  },
  {
    name: "SwipedOn",
    rank: 3,
    tagline: "Best for Single-Site Offices",
    pricing: "~$39/month per location",
    bestFor: "Single-office businesses",
    whyAlternative:
      "SwipedOn offers a simple iPad-based check-in experience.",
    catch:
      "Per-location pricing. No mandatory safety acknowledgment. Limited multi-site visibility.",
  },
  {
    name: "Proxyclick",
    rank: 4,
    tagline: "Best for Enterprise Security",
    pricing: "Custom quote",
    bestFor: "Large enterprises with dedicated security teams",
    whyAlternative:
      "Proxyclick offers powerful security features and custom workflows.",
    catch:
      "Complex to deploy. Expensive. Requires sales engagement.",
  },
  {
    name: "Sine",
    rank: 5,
    tagline: "Best for Basic Check-in",
    pricing: "~$39/month per location",
    bestFor: "Simple check-in at a single location",
    whyAlternative:
      "Sine offers basic check-in features at a reasonable price.",
    catch:
      "No mandatory safety acknowledgment. No watchlist. No emergency evacuation list.",
  },
];

const whySiteSafePoints = [
  {
    title: "1. Faster setup — no heavy configuration",
    body: "iLobby requires a deployment process that can take days or weeks. SiteSafe is self-serve: you create an account, name your first site, and you have a working QR code in under two minutes.",
  },
  {
    title: "2. Mandatory safety acknowledgment",
    body: "iLobby focuses on visitor screening, not safety compliance. SiteSafe was built for workplaces where safety briefings are mandatory. Our check-in flow makes the safety acknowledgment a non-skippable step, giving you a clean audit trail.",
  },
  {
    title: "3. Flat pricing — no per-visitor fees",
    body: "iLobby’s pricing is custom-quote, and often includes per-visitor charges for advanced screening. SiteSafe charges a flat $49/month for unlimited visitors across all your sites.",
  },
  {
    title: "4. Built for small teams, not just enterprises",
    body: "Our entire product is designed for companies with 1-50 employees. You get pre-registration, badge printing, host notifications, and audit exports without the enterprise overhead.",
  },
];

export default function ILobbyAlternativePage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <article className="max-w-4xl mx-auto space-y-12 text-white">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            The 5 Best iLobby Alternatives for 2026
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            iLobby is built for large enterprises with complex security needs. But if you’re a construction company, warehouse, or small office, you probably don’t need visitor screening against government watchlists or enterprise SSO.
          </p>
          <p className="text-slate-300 max-w-2xl mx-auto">
            You need fast check-in, compliance proof, and a price that makes sense.
          </p>
          <p className="text-slate-300">Here are the 5 best iLobby alternatives for small and mid-sized businesses.</p>
        </div>

        {/* Alternatives list */}
        <div className="space-y-12">
          {alternatives.map((alt) => (
            <section key={alt.rank} className="glass-card p-6 sm:p-8 space-y-5">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-sky-400">{alt.rank}.</span> {alt.name} —{" "}
                {alt.tagline}
                {alt.rank === 1 && (
                  <span className="bg-sky-500/20 text-sky-300 text-xs font-semibold px-2 py-0.5 rounded-full">
                    Best iLobby Alternative
                  </span>
                )}
              </h2>

              <p className="text-sm text-slate-300">
                <strong>Pricing:</strong> {alt.pricing}
              </p>
              <p className="text-sm text-slate-300">
                <strong>Best for:</strong> {alt.bestFor}
              </p>

              {alt.whyAlternative && (
                <p className="text-sm text-slate-300">
                  <strong>Why it’s an alternative:</strong> {alt.whyAlternative}
                </p>
              )}

              {alt.catch && (
                <p className="text-sm text-slate-400">
                  <strong>The catch:</strong> {alt.catch}
                </p>
              )}

              {alt.comparison && (
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-sm border border-white/10 rounded-xl">
                    <thead className="bg-white/5">
                      <tr className="text-slate-300">
                        <th className="p-3 text-left">Feature</th>
                        <th className="p-3 text-left">iLobby</th>
                        <th className="p-3 text-left">SiteSafe</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {alt.comparison.map((row, i) => (
                        <tr key={i} className="text-slate-400 hover:bg-white/[0.03]">
                          <td className="p-3 font-medium text-slate-200">{row[0]}</td>
                          <td className="p-3">{row[1]}</td>
                          <td className="p-3 font-semibold text-white">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {alt.bottomLine && (
                <p className="text-sm text-slate-200 italic border-l-2 border-sky-400 pl-3">
                  <strong>The bottom line:</strong> {alt.bottomLine}
                </p>
              )}

              {alt.cta && (
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl px-6 py-2.5 text-sm transition-all shadow-lg cta-pulse mt-2"
                >
                  Start your free trial <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </section>
          ))}
        </div>

        {/* Why SiteSafe Is the Better Choice */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Why SiteSafe Is the Better Choice for Most Businesses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whySiteSafePoints.map((point, idx) => (
              <div key={idx} className="glass-card p-5 space-y-2">
                <h3 className="font-semibold text-white text-sm">{point.title}</h3>
                <p className="text-xs text-slate-400">{point.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Line */}
        <section className="glass-card p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold">The Bottom Line</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            If you’re a small or mid-sized business, iLobby is overkill.{" "}
            <strong className="text-white">
              SiteSafe gives you the compliance and visibility you need — without the enterprise complexity or price tag.
            </strong>
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl px-8 py-3 text-sm transition-all shadow-lg cta-pulse"
          >
            Start your free 14-day trial <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Back to blog */}
        <div className="text-center pt-8">
          <Link href="/blog" className="text-slate-400 hover:text-white text-sm transition-colors">
            ← Back to blog
          </Link>
        </div>
      </article>
    </div>
  );
}