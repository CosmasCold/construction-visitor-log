import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "5 Best iLobby Alternatives (2026) — Compared",
  description:
    "iLobby is built for enterprise security. If you need compliance and visibility without the complexity, compare 5 alternatives with real pricing. SiteSafe starts at $49/mo flat.",
  keywords: [
    "ilobby alternative",
    "ilobby competitor",
    "visitor management alternative",
    "enterprise visitor management",
    "ilobby vs sitesafe",
    "visitor management small business",
    "visitor management software 2026",
  ],
  alternates: {
    canonical: "https://sitesafe.thesift.space/blog/ilobby-alternative",
  },
  openGraph: {
    title: "5 Best iLobby Alternatives (2026) — Compared",
    description:
      "iLobby is built for enterprise security. If you need compliance and visibility without the complexity, compare 5 alternatives with real pricing.",
    type: "article",
    url: "https://sitesafe.thesift.space/blog/ilobby-alternative",
    images: [
      {
        url: "https://sitesafe.thesift.space/og/blog-ilobby-alternative.png",
        width: 1200,
        height: 630,
        alt: "iLobby Alternatives 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "5 Best iLobby Alternatives (2026) — Compared",
    description:
      "iLobby is built for enterprise security. If you need compliance and visibility without the complexity, compare 5 alternatives with real pricing.",
    images: ["https://sitesafe.thesift.space/og/blog-ilobby-alternative.png"],
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
    body: "iLobby&rsquo;s pricing is custom-quote, and often includes per-visitor charges for advanced screening. SiteSafe charges a flat $49/month for unlimited visitors across all your sites.",
  },
  {
    title: "4. Built for small teams, not just enterprises",
    body: "Our entire product is designed for companies with 1-50 employees. You get pre-registration, badge printing, host notifications, and audit exports without the enterprise overhead.",
  },
];

const faqs = [
  {
    q: "Is iLobby too expensive for small businesses?",
    a: "iLobby is designed for large enterprises with complex security needs. Their pricing is custom-quote and typically includes per-visitor fees. For small and mid-sized businesses, alternatives like SiteSafe offer flat pricing ($49/month for up to 20 sites) with the core compliance features you need.",
  },
  {
    q: "What is the best iLobby alternative for compliance?",
    a: "SiteSafe is the best iLobby alternative for businesses that need audit-ready compliance. Unlike iLobby, which focuses on visitor screening, SiteSafe includes mandatory safety briefings, automatic timestamps, and one-click audit exports as standard features.",
  },
  {
    q: "Can I try iLobby alternatives without a sales demo?",
    a: "Yes. SiteSafe and SwipedOn both offer self-serve free trials. SiteSafe&rsquo;s trial is 14 days with no credit card required. iLobby and Proxyclick typically require sales engagement before you can evaluate the product.",
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
    headline: "5 Best iLobby Alternatives (2026) — Compared",
    description:
      "iLobby is built for enterprise security. If you need compliance and visibility without the complexity, compare 5 alternatives with real pricing.",
    image: "https://sitesafe.thesift.space/og/blog-ilobby-alternative.png",
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
    datePublished: "2026-01-15",
    dateModified: "2026-07-08",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ILobbyAlternativePage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <ArticleSchema />
      <PublicHeader locale="en" />
      <main className="min-h-screen py-16 px-4">
        <article className="max-w-4xl mx-auto space-y-12 text-white">
          {/* Header */}
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold text-sky-400 uppercase tracking-wide">
              Buyer&rsquo;s Guide &mdash; Updated July 2026
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              5 Best iLobby Alternatives (2026) — Compared
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              iLobby is built for large enterprises with complex security needs. But if you&rsquo;re a small or mid-sized business, you probably don&rsquo;t need visitor screening against government watchlists or enterprise SSO.
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
                  <span className="text-sky-400">{alt.rank}.</span> {alt.name} &mdash;{" "}
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

          {/* FAQ Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-5">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-white/5 pb-5">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Posts */}
          <section className="pt-6 border-t border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4">Related Articles</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/blog/envoy-alternative" className="block rounded-lg border border-white/10 bg-white/[0.03] p-4 hover:border-sky-500/30 transition">
                <h4 className="text-sm font-semibold text-white mb-1">7 Best Envoy Alternatives</h4>
                <p className="text-xs text-slate-400">Tired of per-site pricing? See how SiteSafe compares to Envoy.</p>
              </Link>
              <Link href="/blog/best-visitor-management-software-2026" className="block rounded-lg border border-white/10 bg-white/[0.03] p-4 hover:border-sky-500/30 transition">
                <h4 className="text-sm font-semibold text-white mb-1">10 Best Visitor Management Systems (2026)</h4>
                <p className="text-xs text-slate-400">Compare the top platforms with real pricing and honest pros & cons.</p>
              </Link>
            </div>
          </section>

          {/* Bottom Line */}
          <section className="glass-card p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold">The Bottom Line</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              If you&rsquo;re a small or mid-sized business, iLobby is overkill.{" "}
              <strong className="text-white">
                SiteSafe gives you the compliance and visibility you need &mdash; without the enterprise complexity or price tag.
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
              &larr; Back to blog
            </Link>
          </div>
        </article>
      </main>
      <PublicFooter locale="en" />
    </>
  );
}