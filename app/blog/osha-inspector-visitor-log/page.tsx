import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "What Safety Inspectors Look For in a Visitor Log — SiteSafe Blog",
  description:
    "A complete visitor log can make or break a safety inspection. Here is exactly what inspectors check and how to prepare.",
  keywords: [
    "safety inspector visitor log",
    "visitor log inspection requirements",
    "visitor log audit checklist",
    "what inspectors look for visitor log",
    "safety audit visitor records",
    "visitor management compliance",
  ],
  alternates: {
    canonical: "https://sitesafe.thesift.space/blog/osha-inspector-visitor-log",
  },
  openGraph: {
    title: "What Safety Inspectors Look For in a Visitor Log — SiteSafe Blog",
    description:
      "A complete visitor log can make or break a safety inspection. Here is exactly what inspectors check and how to prepare.",
    type: "article",
    url: "https://sitesafe.thesift.space/blog/osha-inspector-visitor-log",
    images: [
      {
        url: "https://sitesafe.thesift.space/og/blog-inspector-visitor-log.png",
        width: 1200,
        height: 630,
        alt: "What Safety Inspectors Look For in a Visitor Log",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Safety Inspectors Look For in a Visitor Log — SiteSafe Blog",
    description:
      "A complete visitor log can make or break a safety inspection. Here is exactly what inspectors check and how to prepare.",
    images: ["https://sitesafe.thesift.space/og/blog-inspector-visitor-log.png"],
  },
};

const inspectorChecks = [
  {
    title: "Complete visitor identification",
    desc: "Full name, company affiliation, and contact information for every person who enters the facility. Partial entries or nicknames are immediate red flags.",
    icon: "shield",
  },
  {
    title: "Proof of safety briefing acknowledgment",
    desc: "Documentation that every visitor received and understood safety protocols before entering. This is often the first thing inspectors verify.",
    icon: "shield",
  },
  {
    title: "Accurate entry and exit timestamps",
    desc: "Precise sign-in and sign-out times. Gaps in records or visitors who signed in but never signed out trigger deeper investigation.",
    icon: "shield",
  },
  {
    title: "Host or escort identification",
    desc: "Name of the employee responsible for the visitor during their stay. Unescorted visitors in restricted areas are a serious violation.",
    icon: "shield",
  },
  {
    title: "Purpose of visit and areas accessed",
    desc: "Clear documentation of why the visitor was on-site and which areas they entered. Vague entries like 'meeting' without specifics are insufficient.",
    icon: "shield",
  },
  {
    title: "Rapid record retrieval capability",
    desc: "Inspectors expect you to produce records within minutes, not hours. Fumbling through paper logs or requesting 'a few days' to compile data signals poor record-keeping.",
    icon: "alert",
  },
];

const commonFailures = [
  "Missing signatures or incomplete fields",
  "Illegible handwriting that cannot be verified",
  "No proof of safety briefing acknowledgment",
  "Visitors who signed in but never signed out",
  "Lost or damaged paper records",
  "Inconsistent formatting across locations",
  "No timestamps or incorrect dates",
  "Inability to produce records within 10 minutes",
];

const faqs = [
  {
    q: "What do safety inspectors look for in visitor logs?",
    a: "Inspectors verify complete visitor identification, proof of safety briefing acknowledgment, accurate entry/exit timestamps, host identification, purpose of visit, and the ability to rapidly retrieve records. Missing any of these elements can result in audit failures.",
  },
  {
    q: "How long should visitor logs be kept for inspections?",
    a: "Most industries require 1-3 years of visitor records. In regulated environments like construction and manufacturing, 3 years is the standard. Digital systems make long-term retention effortless with automatic backups.",
  },
  {
    q: "Can paper visitor logs pass a safety inspection?",
    a: "Yes, but they are high-risk. Paper logs are vulnerable to illegible handwriting, incomplete entries, loss, and damage. They also make rapid retrieval difficult. Digital visitor logs eliminate these failure points by enforcing complete entries, automatic timestamps, and instant search.",
  },
  {
    q: "What happens if visitor logs are incomplete during an inspection?",
    a: "Incomplete visitor logs can trigger citations, fines, and deeper investigation into other compliance areas. In severe cases, inspectors may halt operations until corrective actions are completed. The cost of a single failed audit often exceeds years of digital visitor management software.",
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
    headline: "What Safety Inspectors Look For in a Visitor Log",
    description:
      "A complete visitor log can make or break a safety inspection. Here is exactly what inspectors check and how to prepare.",
    image: "https://sitesafe.thesift.space/og/blog-inspector-visitor-log.png",
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
    datePublished: "2026-06-02",
    dateModified: "2026-07-08",
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
      <ArticleSchema />
      <PublicHeader locale="en" />
      <main className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
          <p className="text-sm font-semibold text-sky-400 uppercase tracking-wide mb-4">
            Compliance Guide — Updated July 2026
          </p>
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            What Safety Inspectors Look For in a Visitor Log
          </h1>
          <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 5 min read · Published June 2, 2026</p>

          <div className="space-y-4 text-sm leading-relaxed text-slate-200">
            <p>
              When a safety inspector arrives, one of the first documents they&rsquo;ll
              ask for is your visitor log. It&rsquo;s not a formality — it&rsquo;s a direct
              window into how seriously your organization takes safety, compliance,
              and accountability.
            </p>
            <p>
              Here&rsquo;s exactly what inspectors check, why it matters, and how to
              make sure your visitor log passes every time.
            </p>

            <h2 className="text-lg font-semibold tracking-tight text-white mt-8">
              The 6 things inspectors verify first
            </h2>

            <div className="space-y-4 mt-4">
              {inspectorChecks.map((check, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {check.icon === "alert" ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{check.title}</h3>
                    <p className="text-slate-400 text-sm mt-0.5">{check.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-semibold tracking-tight text-white mt-8">
              Common visitor log failures that trigger penalties
            </h2>

            <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-5 my-4">
              <ul className="space-y-2 text-sm text-slate-300">
                {commonFailures.map((failure, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>{failure}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="text-lg font-semibold tracking-tight text-white mt-8">
              Why paper logs fail inspections
            </h2>
            <p>
              Paper visitor logs fail for predictable reasons: humans forget to
              fill every field, handwriting becomes illegible, sheets get lost or
              damaged, and finding a specific record from six months ago can take
              hours. Inspectors know this. When they see paper, they dig deeper.
            </p>
            <p>
              Digital visitor management systems eliminate these failure points by
              design. Mandatory fields ensure completeness. Typed data ensures
              legibility. Cloud storage prevents loss. And instant search turns
              record retrieval from a multi-hour task into a 10-second action.
            </p>

            <h2 className="text-lg font-semibold tracking-tight text-white mt-8">
              How to prepare for your next inspection
            </h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <strong>Audit your current logs.</strong> Check the last 30 days for
                incomplete entries, missing signatures, and illegible handwriting.
              </li>
              <li>
                <strong>Verify safety briefing records.</strong> Can you prove every
                visitor acknowledged your safety protocols? If not, that&rsquo;s your
                highest-risk gap.
              </li>
              <li>
                <strong>Test your retrieval speed.</strong> Time how long it takes to
                find a specific visitor&rsquo;s record from 3 months ago. If it&rsquo;s more
                than 2 minutes, you&rsquo;re not audit-ready.
              </li>
              <li>
                <strong>Consider going digital.</strong> The cost of prevention is
                always less than the cost of a failed audit.
              </li>
            </ol>

            <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-5 my-6 text-center">
              <p className="text-slate-200 mb-3">
                Don&rsquo;t wait for an inspector to find your gaps.
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
              <Link href="/blog/cost-of-failed-safety-audit" className="block text-sm text-sky-400 hover:text-sky-300 transition">
                → The Real Cost of a Failed Safety Audit
              </Link>
              <Link href="/blog/pass-osha-audit-visitor-log" className="block text-sm text-sky-400 hover:text-sky-300 transition">
                → How to Pass a Safety Audit: Visitor Log Checklist
              </Link>
              <Link href="/blog/visitor-sign-in-sheet-template" className="block text-sm text-sky-400 hover:text-sky-300 transition">
                → Free Visitor Sign-In Sheet Template
              </Link>
            </div>
          </section>


        </div>
      </main>
      <PublicFooter locale="en" />
    </>
  );
}