import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "7 Best Envoy Alternatives (2026) — Compared",
  description:
    "Tired of per-site pricing and sales demos? Compare 7 Envoy alternatives with real pricing. SiteSafe is $49/month flat for up to 20 sites.",
  keywords: [
    "envoy alternative",
    "envoy competitor",
    "visitor management alternative",
    "multi-site visitor management",
    "envoy vs sitesafe",
    "flat pricing visitor management",
    "visitor management software 2026",
  ],
  alternates: {
    canonical: "https://sitesafe.thesift.space/blog/envoy-alternative",
  },
  openGraph: {
    title: "7 Best Envoy Alternatives (2026) — Compared",
    description:
      "Tired of per-site pricing and sales demos? Compare 7 Envoy alternatives with real pricing. SiteSafe is $49/month flat for up to 20 sites.",
    type: "article",
    url: "https://sitesafe.thesift.space/blog/envoy-alternative",
    images: [
      {
        url: "https://sitesafe.thesift.space/og/blog-envoy-alternative.png",
        width: 1200,
        height: 630,
        alt: "Envoy Alternatives 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "7 Best Envoy Alternatives (2026) — Compared",
    description:
      "Tired of per-site pricing and sales demos? Compare 7 Envoy alternatives with real pricing.",
    images: ["https://sitesafe.thesift.space/og/blog-envoy-alternative.png"],
  },
};

const alternatives = [
  {
    name: "SiteSafe",
    rank: 1,
    tagline: "Best Overall Envoy Alternative",
    pricing: "$49/month flat for up to 20 sites",
    bestFor: "Mid-sized businesses with 2-20 locations",
    comparison: [
      ["Starting price", "~$99+/mo/site", "**$49/mo flat**"],
      ["Per-site fee", "Yes", "**No**"],
      ["Mandatory safety briefing", "Optional add-on", "**Mandatory**"],
      ["Emergency evacuation list", "Not available", "**Included**"],
      ["Lockdown mode", "Not available", "**Included**"],
      ["Watchlist screening", "Paid add-on", "**Included**"],
      ["Free trial", "Requires demo", "**14 days, no card**"],
      ["Sales call required", "Yes", "**No**"],
    ],
    bottomLine:
      "SiteSafe gives you everything Envoy charges extra for — at a fraction of the cost. And you can try it without ever talking to a salesperson.",
    cta: true,
  },
  {
    name: "SwipedOn",
    rank: 2,
    tagline: "Best for Single-Site Offices",
    pricing: "~$39/month per location",
    bestFor: "Single-office businesses",
    whyAlternative:
      "SwipedOn offers a simple iPad-based check-in experience. It&rsquo;s a solid option if you have one office and don&rsquo;t need multi-site visibility.",
    catch:
      "Per-location pricing means costs multiply with every new site. No mandatory safety acknowledgment. Limited features for growing teams.",
  },
  {
    name: "iLobby",
    rank: 3,
    tagline: "Best for Enterprise Security",
    pricing: "Custom quote",
    bestFor: "Large enterprises with complex security needs",
    whyAlternative:
      "iLobby offers advanced visitor screening, government watchlist checks, and enterprise SSO.",
    catch:
      "Overkill for most small and mid-sized businesses. Long deployment process. Custom pricing with per-visitor fees.",
  },
  {
    name: "Proxyclick",
    rank: 4,
    tagline: "Best for Enterprise Workflows",
    pricing: "Custom quote",
    bestFor: "Large enterprises with dedicated security teams",
    whyAlternative:
      "Proxyclick offers powerful security features and custom workflows.",
    catch:
      "Complex to deploy. Expensive. Requires sales engagement to get pricing.",
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
      "No mandatory safety acknowledgment. No watchlist. No emergency evacuation list. Per-location pricing.",
  },
  {
    name: "Traction Guest",
    rank: 6,
    tagline: "Best for Customization",
    pricing: "Custom quote",
    bestFor: "Enterprises that need deep customization",
    whyAlternative:
      "Traction Guest offers highly customizable workflows and enterprise integrations.",
    catch:
      "Expensive. Slow to deploy. Requires sales engagement.",
  },
  {
    name: "Paper Logs",
    rank: 7,
    tagline: "The &ldquo;Free&rdquo; Option",
    pricing: "~$20/year for clipboards",
    bestFor: "No one",
    whyAlternative: "It&rsquo;s cheap. That&rsquo;s the only advantage.",
    catch:
      "No audit trail. No proof of safety acknowledgment. Impossible to search. Emergency evacuation is a guessing game.",
  },
];

const faqs = [
  {
    q: "Is SiteSafe really $49/month for everything?",
    a: "Yes. Up to 20 sites, unlimited visitors, and every feature — including watchlist, emergency evacuation list, lockdown, webhooks, and document signing. No add-ons, no hidden costs.",
  },
  {
    q: "Can I switch from Envoy to SiteSafe?",
    a: "Switching is straightforward. You can export your existing visitor records from Envoy as a CSV for your own archive, then start fresh with SiteSafe. There&rsquo;s no complex data migration — just set up your sites, add your hosts, and you&rsquo;re ready to go.",
  },
  {
    q: "Do I need to talk to sales?",
    a: "Never. Sign up, set up, and start using SiteSafe without ever speaking to a salesperson. Support is available via email if you need help.",
  },
  {
    q: "Why is Envoy so expensive for multi-site teams?",
    a: "Envoy charges per location. If you have 5 sites, you pay 5× the base price. For 10 sites, you could be paying $1,000+/month. SiteSafe uses flat pricing: $49/month covers up to 20 sites.",
  },
  {
    q: "Does SiteSafe work for single-location businesses too?",
    a: "Absolutely. While SiteSafe shines for multi-location teams, single-location businesses get the same features at the same flat price. No need to upgrade or pay per visitor.",
  },
];

function FAQSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ArticleSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "7 Best Envoy Alternatives (2026) — Compared",
    description:
      "Tired of per-site pricing and sales demos? Compare 7 Envoy alternatives with real pricing. SiteSafe is $49/month flat for up to 20 sites.",
    image: "https://sitesafe.thesift.space/og/blog-envoy-alternative.png",
    author: {
      "@type": "Organization",
      name: "SiteSafe",
      url: "https://sitesafe.thesift.space",
    },
    publisher: {
      "@type": "Organization",
      name: "SiteSafe",
      logo: {
        "@type": "ImageObject",
        url: "https://sitesafe.thesift.space/logo.png",
      },
    },
    datePublished: "2026-01-10",
    dateModified: "2026-07-08",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function EnvoyAlternativePage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <ArticleSchema />
      <PublicHeader locale="en" />
      <div className="min-h-screen py-16 px-4">
        <article className="max-w-4xl mx-auto space-y-12 text-white">
          {/* Header */}
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold text-sky-400 uppercase tracking-wide">
              Buyer&rsquo;s Guide — Updated July 2026
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              The 7 Best Envoy Alternatives for 2026
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Envoy is one of the most well-known visitor management platforms. But if
              you&rsquo;re a small or mid-sized business, you&rsquo;ve probably hit a wall:
              mandatory demos, per-site fees, and features locked behind expensive
              tiers.
            </p>
            <p className="text-slate-300 font-medium">
              That&rsquo;s exactly why we built SiteSafe — to give you a faster, cheaper,
              and more compliance-focused alternative.
            </p>
            <p className="text-slate-300">Here are the 7 best Envoy alternatives for 2026.</p>
          </div>

          {/* Alternatives list */}
          <div className="space-y-12">
            {alternatives.map((alt, idx) => (
              <section key={idx} className="glass-card p-6 sm:p-8 space-y-5">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span className="text-sky-400">{alt.rank}.</span> {alt.name} —{" "}
                  {alt.tagline}
                  {alt.rank === 1 && (
                    <span className="bg-sky-500/20 text-sky-300 text-xs font-semibold px-2 py-0.5 rounded-full">
                      Best Envoy Alternative
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
                    <strong>Why it&rsquo;s an alternative:</strong> {alt.whyAlternative}
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
                          <th className="p-3 text-left">Envoy</th>
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

          {/* Why Businesses Are Leaving Envoy */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Why Businesses Are Leaving Envoy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 space-y-2">
                <h3 className="font-semibold text-white">
                  1. Per-site pricing gets expensive fast
                </h3>
                <p className="text-sm text-slate-400">
                  Envoy charges per location. If you have 5 sites, you&rsquo;re paying 5×
                  the base price. For 10 sites, you could be paying $1,000+/month.
                </p>
                <p className="text-sm text-sky-300">
                  SiteSafe charges a flat $49/month for up to 20 sites.
                </p>
              </div>
              <div className="glass-card p-6 space-y-2">
                <h3 className="font-semibold text-white">
                  2. Hidden costs for essential features
                </h3>
                <p className="text-sm text-slate-400">
                  Want watchlist screening? That&rsquo;s a paid add-on. Want emergency
                  evacuation lists? Not available. Want mandatory safety briefings?
                  Optional add-on.
                </p>
                <p className="text-sm text-sky-300">
                  SiteSafe includes all of these — standard.
                </p>
              </div>
              <div className="glass-card p-6 space-y-2">
                <h3 className="font-semibold text-white">
                  3. Mandatory sales demos
                </h3>
                <p className="text-sm text-slate-400">
                  Envoy requires a sales demo before you can see pricing
                  or try the product. That&rsquo;s a lot of friction for a busy facility
                  manager.
                </p>
                <p className="text-sm text-sky-300">
                  SiteSafe lets you start a 14-day free trial instantly — no credit
                  card, no sales call.
                </p>
              </div>
            </div>
          </section>

          {/* Real-World Feedback */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Real-World Feedback</h2>
            <p className="text-sm text-slate-300">
              Envoy has a strong presence on G2 and Capterra, with scores around
              4.5/5. Users praise its design and integrations but frequently mention{" "}
              <strong>high costs</strong> and <strong>mandatory sales calls</strong> as
              drawbacks.
            </p>
            <p className="text-sm text-slate-300">
              SiteSafe is independently owned and operated, with all customer
              feedback handled directly by the founder. Every review you see comes
              from a real user.
            </p>
          </section>

          {/* FAQ */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="glass-card p-5 space-y-2">
                  <h3 className="font-semibold text-white text-sm">{faq.q}</h3>
                  <p className="text-xs text-slate-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Line */}
          <section className="glass-card p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold">The Bottom Line</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              If you&rsquo;re a small or mid-sized business tired of Envoy&rsquo;s per-site fees,
              hidden costs, and mandatory sales demos,{" "}
              <strong className="text-white">SiteSafe is the better choice</strong>.
              Flat pricing. All features included. No sales calls.
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
      <PublicFooter locale="en" />
    </>
  );
}