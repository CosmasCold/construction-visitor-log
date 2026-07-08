import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";

export const metadata: Metadata = {
  title: "How a Small Business Chooses a Visitor Log — SiteSafe Blog",
  description:
    "A walk through how a small business owner compares Envoy, SwipedOn, and SiteSafe — and why the simplest, most affordable option wins.",
  keywords: [
    "visitor log small business",
    "visitor management small business",
    "choose visitor management system",
    "Envoy vs SwipedOn vs SiteSafe",
    "small business visitor check-in",
    "visitor log comparison",
  ],
  alternates: {
    canonical: "https://sitesafe.thesift.space/blog/case-study-small-business",
  },
  openGraph: {
    title: "How a Small Business Chooses a Visitor Log — SiteSafe Blog",
    description:
      "A walk through how a small business owner compares Envoy, SwipedOn, and SiteSafe — and why the simplest, most affordable option wins.",
    type: "article",
    url: "https://sitesafe.thesift.space/blog/case-study-small-business",
    images: [
      {
        url: "https://sitesafe.thesift.space/og/blog-case-study-small-business.png",
        width: 1200,
        height: 630,
        alt: "How a Small Business Chooses a Visitor Log",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How a Small Business Chooses a Visitor Log — SiteSafe Blog",
    description:
      "A walk through how a small business owner compares Envoy, SwipedOn, and SiteSafe — and why the simplest, most affordable option wins.",
    images: ["https://sitesafe.thesift.space/og/blog-case-study-small-business.png"],
  },
};

const faqs = [
  {
    q: "What is the best visitor log for a small business?",
    a: "For small businesses with 1-3 locations, the best visitor log balances simplicity, cost, and compliance. SiteSafe offers flat pricing at $49/month for up to 20 sites, mandatory safety briefings, and audit-ready exports. SwipedOn is simpler but charges per location. Envoy is powerful but expensive and requires sales demos.",
  },
  {
    q: "How much does a visitor management system cost for small business?",
    a: "Costs vary widely. SwipedOn charges ~$39/month per location. Envoy starts at ~$99/month per location. SiteSafe charges $49/month flat for up to 20 locations. For a 3-location business, that means $117/month with SwipedOn vs $49/month with SiteSafe.",
  },
  {
    q: "Do I need a sales demo to try visitor management software?",
    a: "Not necessarily. Envoy requires a sales demo before you can see pricing or try the product. SwipedOn and SiteSafe offer self-serve free trials. SiteSafe&rsquo;s trial is 14 days with no credit card required.",
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

export default function BlogPost() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <PublicHeader locale="en" />
      <main className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
          <p className="text-sm font-semibold text-sky-400 uppercase tracking-wide mb-4">
            Case Study &mdash; Updated July 2026
          </p>
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            How a Small Business Chooses a Visitor Log
          </h1>
          <p className="text-sm text-slate-400 mb-6">By the SiteSafe team &middot; 4 min read &middot; Published June 6, 2026</p>

          <div className="space-y-4 text-sm leading-relaxed text-slate-200">
            <p>
              Meet Sarah. She runs a medium-sized facilities company with three
              active locations. She&rsquo;s been using paper sign-in sheets for years,
              but after a near-miss during a safety audit, she knows it&rsquo;s time for
              something better.
            </p>
            <p>
              Sarah starts her search online. She finds three options:{" "}
              <strong>Envoy</strong>, <strong>SwipedOn</strong>, and{" "}
              <strong>SiteSafe</strong>. Here&rsquo;s how she made her decision &mdash; and
              why it might matter for your business.
            </p>

            <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
              First impressions: price and complexity
            </h2>
            <p>
              Envoy&rsquo;s website looks polished, but Sarah quickly realizes she can&rsquo;t
              see any pricing without booking a demo. That&rsquo;s a red flag &mdash; she&rsquo;s
              not interested in a sales call.
            </p>
            <p>
              SwipedOn is more transparent, but the per-location pricing adds up
              fast. Three sites would cost more than she expected, and some
              features like pre-registration are locked behind higher tiers.
            </p>
            <p>
              SiteSafe shows a simple price right on the landing page:{" "}
              <strong>$49/month flat</strong>. Unlimited sites, unlimited
              visitors. No per-site fees. She can sign up in 60 seconds without a
              credit card.
            </p>

            <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
              The feature that matters most
            </h2>
            <p>
              For Sarah, the must-have is the mandatory safety briefing
              acknowledgment. Her old paper sheets had no way to enforce it, and
              she knows that&rsquo;s exactly what an inspector will ask for. Both Envoy
              and SwipedOn offer a visitor sign-in, but neither makes the safety
              acknowledgment a non-skippable step. SiteSafe does &mdash; every single
              time.
            </p>

            <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
              What she didn&rsquo;t realize she needed
            </h2>
            <p>
              Sarah didn&rsquo;t expect to need host notifications, but when she saw
              that SiteSafe could email a manager when their guest arrives, she
              knew her team would love it. SwipedOn doesn&rsquo;t offer it, and Envoy
              charges extra. SiteSafe includes it for free.
            </p>
            <p>
              Pre-registration is another surprise. Sarah can now add expected
              visitors ahead of time, so they can sign in with one tap. That saves
              her front-desk person a lot of typing.
            </p>

            <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
              The final straw: audit exports
            </h2>
            <p>
              Sarah&rsquo;s biggest fear is another audit. With SiteSafe, she can export
              a complete, date-filtered PDF in seconds. Envoy and SwipedOn both
              offer exports, but again &mdash; often in higher-priced tiers. SiteSafe
              gives her instant CSV, Excel, and PDF without any upsell.
            </p>

            <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
              Sarah&rsquo;s decision
            </h2>
            <p>
              She chose SiteSafe. It cost less than half of the alternatives, gave
              her the mandatory safety acknowledgment she needed, and didn&rsquo;t
              require a demo or sales call. She set up her three sites in under 10
              minutes and had a visitor checked in on the same day.
            </p>

            <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-5 my-6">
              <p className="text-slate-200 mb-3">
                If you&rsquo;re in the same spot as Sarah,{" "}
                <strong>try SiteSafe free for 14 days</strong> &mdash; no credit card, no sales calls.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl px-6 py-2.5 text-sm transition-all shadow-lg"
              >
                Start free trial <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mt-10 pt-8 border-t border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-5">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="text-sm font-semibold text-white mb-1">{faq.q}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Posts */}
          <section className="mt-8 pt-6 border-t border-white/10">
            <h2 className="text-sm font-semibold text-white mb-3">Related Articles</h2>
            <div className="space-y-2">
              <Link href="/blog/best-visitor-management-software-2026" className="block text-sm text-sky-400 hover:text-sky-300 transition">
                &rarr; 10 Best Visitor Management Systems (2026) — Compared
              </Link>
              <Link href="/blog/envoy-alternative" className="block text-sm text-sky-400 hover:text-sky-300 transition">
                &rarr; 7 Best Envoy Alternatives
              </Link>
              <Link href="/blog/visitor-sign-in-sheet-template" className="block text-sm text-sky-400 hover:text-sky-300 transition">
                &rarr; Free Visitor Sign-In Sheet Template
              </Link>
            </div>
          </section>

          <BlogPostJsonLd
            title="How a Small Business Chooses a Visitor Log"
            description="A walk through how a small business owner compares Envoy, SwipedOn, and SiteSafe — and why the simplest, most affordable option wins."
            datePublished="2026-06-06"
            dateModified="2026-07-08"
            slug="case-study-small-business"
          />
        </div>

        <p className="text-sm text-slate-400 italic mt-8 pt-6 border-t border-white/10 max-w-2xl mx-auto text-center">
          Want to make sure your visitor log survives an audit?{" "}
          <Link href="/checklist" className="text-sky-400 hover:underline">
            Grab our free 10-point checklist
          </Link>.
        </p>
      </main>
      <PublicFooter locale="en" />
    </>
  );
}