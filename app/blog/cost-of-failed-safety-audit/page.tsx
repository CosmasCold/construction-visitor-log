import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, AlertTriangle, ShieldCheck, TrendingUp } from "lucide-react";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";

export const metadata: Metadata = {
  title: "The Real Cost of a Failed Safety Audit — SiteSafe Blog",
  description:
    "Fines are just the start. A failed safety audit can cost contracts, reputation, insurance premiums, and months of corrective work. Here's what's really at stake.",
  keywords: [
    "failed safety audit cost",
    "safety audit fines",
    "visitor log audit requirements",
    "safety audit compliance",
    "visitor management audit",
    "audit failure consequences",
  ],
  alternates: {
    canonical: "https://sitesafe.thesift.space/blog/cost-of-failed-safety-audit",
  },
  openGraph: {
    title: "The Real Cost of a Failed Safety Audit — SiteSafe Blog",
    description:
      "Fines are just the start. A failed safety audit can cost contracts, reputation, insurance premiums, and months of corrective work.",
    type: "article",
    url: "https://sitesafe.thesift.space/blog/cost-of-failed-safety-audit",
    images: [
      {
        url: "https://sitesafe.thesift.space/og/blog-failed-safety-audit.png",
        width: 1200,
        height: 630,
        alt: "The Real Cost of a Failed Safety Audit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Real Cost of a Failed Safety Audit — SiteSafe Blog",
    description:
      "Fines are just the start. A failed safety audit can cost contracts, reputation, insurance premiums, and months of corrective work.",
    images: ["https://sitesafe.thesift.space/og/blog-failed-safety-audit.png"],
  },
};

const faqs = [
  {
    q: "What happens if you fail a safety audit?",
    a: "Failing a safety audit can result in fines, contract losses, increased insurance premiums, mandatory corrective work, and reputational damage. In regulated industries, repeated failures can lead to operational shutdowns or loss of licenses.",
  },
  {
    q: "How much does a failed safety audit cost?",
    a: "Direct fines vary by industry and jurisdiction, but the hidden costs are often larger: lost contracts, increased insurance premiums (sometimes 20-50% higher), legal fees, and months of corrective work. For small businesses, a single failed audit can cost tens of thousands in direct and indirect costs.",
  },
  {
    q: "What do safety auditors look for in visitor logs?",
    a: "Auditors check for complete visitor records including name, company, purpose of visit, time in/out, host contact, and proof of safety briefing acknowledgment. Missing signatures, incomplete entries, or illegible handwriting are common failure points.",
  },
  {
    q: "Can a digital visitor log prevent audit failures?",
    a: "Yes. Digital visitor logs eliminate the most common audit failure points: incomplete entries (mandatory fields), illegible handwriting (typed data), missing timestamps (automatic), and lost records (cloud backup). They also enable instant export of audit-ready reports.",
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
            Compliance Guide &mdash; Updated July 2026
          </p>
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            The Real Cost of a Failed Safety Audit
          </h1>
          <p className="text-sm text-slate-400 mb-6">By the SiteSafe team &middot; 5 min read &middot; Published June 3, 2026</p>

          <div className="space-y-4 text-sm leading-relaxed text-slate-200">
            <p>
              A failed safety audit doesn&rsquo;t just mean a fine. It can mean
              contract losses, increased insurance premiums, and months of
              corrective work. Here&rsquo;s what&rsquo;s really at stake.
            </p>

            <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
              The fine is just the beginning
            </h2>
            <p>
              Most businesses think about audits in terms of the direct fine. But
              the real cost is everything that comes after: lost revenue from
              suspended contracts, higher insurance premiums for years, legal fees,
              and the time your team spends on corrective actions instead of
              operations.
            </p>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 my-6">
              <h3 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Hidden Costs of a Failed Audit
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">&bull;</span>
                  <span><strong>Contract losses:</strong> Clients often require proof of compliance. A failed audit can void existing contracts or disqualify you from new bids.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">&bull;</span>
                  <span><strong>Insurance premiums:</strong> Insurers view failed audits as increased risk. Premiums can rise 20-50% for 3-5 years.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">&bull;</span>
                  <span><strong>Corrective work:</strong> Months of documentation, retraining, and system overhauls — all while normal operations suffer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">&bull;</span>
                  <span><strong>Reputational damage:</strong> Failed audits become public record in many jurisdictions. Competitors and clients can see them.</span>
                </li>
              </ul>
            </div>

            <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
              The visitor log: where most audits fail first
            </h2>
            <p>
              One of the first things an inspector checks is the visitor log.
              If it&rsquo;s incomplete, illegible, or missing safety acknowledgments,
              you start at a disadvantage. Paper logs are the weakest link because
              they rely on human compliance — and humans make mistakes.
            </p>
            <p>
              Common visitor log failures that trigger audit penalties:
            </p>
            <ul className="space-y-2 list-disc pl-5">
              <li>Missing signatures or incomplete fields</li>
              <li>Illegible handwriting that can&rsquo;t be verified</li>
              <li>No proof that visitors received safety briefings</li>
              <li>Lost or damaged records</li>
              <li>Inconsistent formatting across locations</li>
              <li>No timestamps or incorrect dates</li>
            </ul>

            <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
              How digital visitor management eliminates audit risk
            </h2>
            <p>
              A digital visitor management system like SiteSafe eliminates the
              most common audit failure points by design:
            </p>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong>Mandatory fields:</strong> Visitors cannot complete check-in without filling every required field</li>
              <li><strong>Automatic timestamps:</strong> No guessing, no backdating, no human error</li>
              <li><strong>Legible records:</strong> Typed data, photos, and digital signatures</li>
              <li><strong>Safety briefing enforcement:</strong> Visitors must acknowledge before entry — every time</li>
              <li><strong>Cloud backup:</strong> Records survive fires, floods, and office moves</li>
              <li><strong>Instant exports:</strong> PDF/CSV reports in seconds for any date range</li>
            </ul>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 my-6">
              <h3 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                The Math Is Simple
              </h3>
              <p className="text-sm text-slate-300">
                A digital visitor management system costs $49/month. A failed audit
                can cost $10,000-$50,000 in direct and indirect costs. The system
                pays for itself if it prevents even one audit failure over 10 years.
              </p>
            </div>

            <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
              What to do before your next audit
            </h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <strong>Audit your current visitor logs.</strong> Check the last 30 days for incomplete entries, missing signatures, and illegible handwriting.
              </li>
              <li>
                <strong>Verify safety briefing records.</strong> Can you prove every visitor acknowledged your safety rules? If not, that&rsquo;s an immediate failure point.
              </li>
              <li>
                <strong>Test your retrieval process.</strong> How long does it take to find a specific visitor&rsquo;s record from 6 months ago? If it&rsquo;s more than 2 minutes, you&rsquo;re not audit-ready.
              </li>
              <li>
                <strong>Consider going digital.</strong> The cost of prevention is a fraction of the cost of failure.
              </li>
            </ol>

            <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-5 my-6 text-center">
              <p className="text-slate-200 mb-3">
                Don&rsquo;t wait for an audit to find your weak points.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl px-6 py-2.5 text-sm transition-all shadow-lg"
              >
                Start free 14-day trial <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-slate-500 mt-2">No credit card. No sales calls. Set up in 3 minutes.</p>
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
              <Link href="/blog/osha-inspector-visitor-log" className="block text-sm text-sky-400 hover:text-sky-300 transition">
                &rarr; What an Inspector Actually Looks For in a Visitor Log
              </Link>
              <Link href="/blog/pass-osha-audit-visitor-log" className="block text-sm text-sky-400 hover:text-sky-300 transition">
                &rarr; How to Pass a Safety Audit: Visitor Log Checklist
              </Link>
              <Link href="/blog/visitor-sign-in-sheet-template" className="block text-sm text-sky-400 hover:text-sky-300 transition">
                &rarr; Free Visitor Sign-In Sheet Template
              </Link>
            </div>
          </section>

          <BlogPostJsonLd
            title="The Real Cost of a Failed Safety Audit"
            description="Fines are just the start. A failed audit can cost contracts, reputation, and months of work."
            datePublished="2026-06-03"
            dateModified="2026-07-08"
            slug="cost-of-failed-safety-audit"
          />
        </div>
      </main>
      <PublicFooter locale="en" />
    </>
  );
}