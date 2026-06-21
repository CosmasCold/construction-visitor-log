// app/blog/swipedon-alternative/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Top 5 SwipedOn Alternatives for Multi-Site Teams (2026)",
  description:
    "Looking for a SwipedOn alternative? Compare 5 top visitor management systems for multi-site teams — SiteSafe offers flat pricing for up to 20 sites.",
  openGraph: {
    title: "Top 5 SwipedOn Alternatives for Multi-Site Teams (2026)",
    description:
      "Looking for a SwipedOn alternative? Compare 5 top visitor management systems for multi-site teams — SiteSafe offers flat pricing for up to 20 sites.",
    type: "article",
    url: "https://sitesafe.thesift.space/blog/swipedon-alternative",
  },
};

const alternatives = [
  {
    name: "SiteSafe",
    rank: 1,
    tagline: "Best for Multi-Site Teams",
    pricing: "$49/month flat for up to 20 sites",
    bestFor: "Businesses with 2-20 locations",
    comparison: [
      ["Starting price", "~$39/mo/site", "**$49/mo flat**"],
      ["Per-site fee", "Yes", "**No**"],
      ["Multi-site dashboard", "Limited", "**Full visibility**"],
      ["Mandatory safety briefing", "Not available", "**Mandatory**"],
      ["Emergency evacuation list", "Not available", "**Included**"],
      ["Host notifications", "Paid add-on", "**Included**"],
      ["Free trial", "Yes", "**14 days, no card**"],
    ],
    bottomLine:
      "SwipedOn charges per location — if you have three sites, your monthly bill triples. SiteSafe gives you unlimited sites for a flat $49/month. Whether you operate one office or twenty construction yards, you pay the same.",
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
    name: "Sine",
    rank: 3,
    tagline: "Best for Basic Check-in",
    pricing: "~$39/month per location",
    bestFor: "Simple check-in at a single location",
    whyAlternative:
      "Sine offers basic check-in features at a reasonable price.",
    catch:
      "No mandatory safety acknowledgment. No watchlist. No emergency evacuation list.",
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
    name: "iLobby",
    rank: 5,
    tagline: "Best for Enterprise Screening",
    pricing: "Custom quote",
    bestFor: "Large enterprises with complex security needs",
    whyAlternative:
      "iLobby offers advanced visitor screening and government watchlist checks.",
    catch:
      "Overkill for most small and mid-sized businesses. Long deployment process.",
  },
];

const whySiteSafePoints = [
  {
    title: "1. Truly unlimited sites for one price",
    body: "SwipedOn charges per location. SiteSafe gives you unlimited sites for a flat $49/month.",
  },
  {
    title: "2. Host notifications included (paid add-on in SwipedOn)",
    body: "When a visitor selects their host, SiteSafe automatically emails that person — no extra configuration, no extra cost. SwipedOn either doesn’t offer this or gates it behind a higher-priced plan.",
  },
  {
    title: "3. Mandatory safety briefing — compliance built-in",
    body: "Neither SwipedOn nor most competitors enforce a safety acknowledgment before sign-in. SiteSafe does. It’s a non-skippable step that every visitor must complete, which is a lifesaver during audits.",
  },
  {
    title: "4. No sales calls, no credit card required",
    body: "You can test SiteSafe for 14 days without ever talking to a salesperson or entering payment details. If you’ve been burned by pushy demos, you’ll appreciate how simple our sign-up is.",
  },
];

export default function SwipedOnAlternativePage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <article className="max-w-4xl mx-auto space-y-12 text-white">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            The 5 Best SwipedOn Alternatives for 2026
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            SwipedOn is a popular visitor management tool, but its pricing model — per-location fees and locked features — often surprises growing teams.
          </p>
          <p className="text-slate-300 max-w-2xl mx-auto">
            If you’re managing multiple sites or just want a straightforward alternative, here are the 5 best SwipedOn alternatives for 2026.
          </p>
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
                    Best SwipedOn Alternative
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
                        <th className="p-3 text-left">SwipedOn</th>
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
          <h2 className="text-2xl font-bold">Why SiteSafe Is the Better Choice</h2>
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
            If you’re managing multiple sites,{" "}
            <strong className="text-white">SwipedOn’s per-location pricing doesn’t make sense</strong>. SiteSafe gives you everything you need — mandatory safety compliance, real-time multi-site visibility, and flat pricing — all without the per-site fees.
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