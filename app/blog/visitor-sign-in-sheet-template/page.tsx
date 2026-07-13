import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Visitor Sign-In Sheet Template (Free) — Digital vs. Paper",
  description:
    "Free visitor sign-in sheet template you can use today. Plus: why digital visitor logs beat paper for security, audits, and compliance. Download the PDF.",
  keywords: [
    "visitor sign in sheet template",
    "free visitor log template",
    "digital visitor sign in sheet",
    "visitor log template PDF",
    "electronic visitor log",
    "visitor sign in app",
    "visitor management template",
    "visitor check in sheet",
    "visitor sign in book template",
    "visitor register template",
    "visitor log book template",
    "sign in sheet template",
  ],
  alternates: {
    canonical: "https://sitesafe.thesift.space/blog/visitor-sign-in-sheet-template",
  },
  openGraph: {
    title: "Visitor Sign-In Sheet Template (Free) — Digital vs. Paper",
    description:
      "Free visitor sign-in sheet template you can use today. Plus: why digital visitor logs beat paper for security, audits, and compliance.",
    type: "article",
    url: "https://sitesafe.thesift.space/blog/visitor-sign-in-sheet-template",
    images: [
      {
        url: "https://sitesafe.thesift.space/og/blog-visitor-sign-in-template.png",
        width: 1200,
        height: 630,
        alt: "Free Visitor Sign-In Sheet Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visitor Sign-In Sheet Template (Free) — Digital vs. Paper",
    description:
      "Free visitor sign-in sheet template you can use today. Plus: why digital visitor logs beat paper for security, audits, and compliance.",
    images: ["https://sitesafe.thesift.space/og/blog-visitor-sign-in-template.png"],
  },
};

const faqs = [
  {
    q: "What should a visitor sign-in sheet include?",
    a: "A complete visitor sign-in sheet should capture: visitor name, company, contact info, host name, purpose of visit, date and time of entry, time of exit, and a signature. For regulated environments, add PPE confirmation, safety briefing acknowledgment, and photo capture.",
  },
  {
    q: "Is a digital visitor log better than paper?",
    a: "Yes. Digital visitor logs eliminate privacy risks (anyone can read a paper sheet), provide instant search and reporting, automate host notifications, and create tamper-proof audit trails. Paper logs are also often illegible, easily lost, and fail compliance checks.",
  },
  {
    q: "Can I use a visitor sign-in sheet template for free?",
    a: "Absolutely. You can download our free PDF template below and print it immediately. For a more robust solution, digital visitor management systems like SiteSafe offer free trials with no credit card required.",
  },
  {
    q: "How long should I keep visitor sign-in records?",
    a: "Most industries require 1-3 years of visitor records for audit and legal purposes. Digital systems make retention effortless with automatic backups. Paper records require physical storage and are vulnerable to damage or loss.",
  },
  {
    q: "Do visitor sign-in sheets comply with GDPR and privacy laws?",
    a: "Paper sign-in sheets often violate privacy laws because visitor data is visible to everyone who signs in after them. Digital systems encrypt data, restrict access to authorized users, and support automatic data purging to comply with GDPR and similar regulations.",
  },
  {
    q: "What is the best visitor sign-in app for small businesses?",
    a: "For small businesses with 1-2 locations, simple apps like Visitly or SwipedOn work well. For multi-location teams, SiteSafe offers flat pricing ($49/month for up to 20 sites) with QR code check-in, photo capture, and audit-ready exports.",
  },
  {
    q: "How do I create a visitor sign-in sheet in Word or Excel?",
    a: "You can create one manually by adding columns for date, name, company, host, purpose, time in, time out, and signature. Or download our ready-made PDF template above — it includes numbered rows, instructions, and an emergency contact section.",
  },
  {
    q: "What is the difference between a visitor log and a visitor management system?",
    a: "A visitor log is a record of who visited your site — typically a paper sheet or simple spreadsheet. A visitor management system is software that automates check-in, captures photos and signatures, sends host notifications, generates reports, and maintains compliance records.",
  },
];

export default function VisitorSignInTemplatePage() {
  const faqSchema = {
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Visitor Sign-In Sheet Template (Free) — Digital vs. Paper",
    description:
      "Free visitor sign-in sheet template you can use today. Plus: why digital visitor logs beat paper for security, audits, and compliance.",
    image: "https://sitesafe.thesift.space/og/blog-visitor-sign-in-template.png",
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
    datePublished: "2026-07-08T00:00:00+00:00",
    dateModified: "2026-07-08T00:00:00+00:00",
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Create a Visitor Sign-In Sheet",
    description: "Step-by-step guide to creating a professional visitor sign-in sheet for your business.",
    totalTime: "PT5M",
    supply: ["Printer", "Paper", "Pen"],
    tool: ["Free PDF template", "Word processor (optional)"],
    step: [
      {
        "@type": "HowToStep",
        name: "Download the template",
        text: "Download our free visitor sign-in sheet PDF template. It includes numbered rows, column headers, and instructions.",
        url: "https://sitesafe.thesift.space/blog/visitor-sign-in-sheet-template#step1",
      },
      {
        "@type": "HowToStep",
        name: "Print and place at reception",
        text: "Print the template and place it at your reception desk or entry point with a pen. Make sure it is easily accessible to all visitors.",
        url: "https://sitesafe.thesift.space/blog/visitor-sign-in-sheet-template#step2",
      },
      {
        "@type": "HowToStep",
        name: "Instruct visitors to sign in",
        text: "Ask every visitor to fill in their name, company, host, purpose, time in, and signature. Remind them to sign out when leaving.",
        url: "https://sitesafe.thesift.space/blog/visitor-sign-in-sheet-template#step3",
      },
      {
        "@type": "HowToStep",
        name: "Store securely",
        text: "Keep completed sheets in a secure location. Most industries require 1-3 years of retention for audit and legal purposes.",
        url: "https://sitesafe.thesift.space/blog/visitor-sign-in-sheet-template#step4",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <PublicHeader locale="en" />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-slate-50 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">
              Free Template &mdash; Updated July 2026
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Visitor Sign-In Sheet Template (Free)
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
              Download a free visitor sign-in sheet template you can print today. 
              Plus: why digital visitor logs beat paper for security, audits, and compliance.
            </p>
          </div>
        </section>

        {/* Template Preview */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">What the Template Includes</h2>
          <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">Visitor Sign-In Log</h3>
              <p className="text-sm text-slate-500">Site / Location: _______________________</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-800">
                    <th className="py-2 px-3 text-left font-semibold text-slate-700 border-r border-slate-300">Date</th>
                    <th className="py-2 px-3 text-left font-semibold text-slate-700 border-r border-slate-300">Name</th>
                    <th className="py-2 px-3 text-left font-semibold text-slate-700 border-r border-slate-300">Company</th>
                    <th className="py-2 px-3 text-left font-semibold text-slate-700 border-r border-slate-300">Host</th>
                    <th className="py-2 px-3 text-left font-semibold text-slate-700 border-r border-slate-300">Purpose</th>
                    <th className="py-2 px-3 text-left font-semibold text-slate-700 border-r border-slate-300">Time In</th>
                    <th className="py-2 px-3 text-left font-semibold text-slate-700 border-r border-slate-300">Time Out</th>
                    <th className="py-2 px-3 text-left font-semibold text-slate-700">Signature</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b border-slate-200">
                      <td className="py-4 px-3 border-r border-slate-200">&nbsp;</td>
                      <td className="py-4 px-3 border-r border-slate-200">&nbsp;</td>
                      <td className="py-4 px-3 border-r border-slate-200">&nbsp;</td>
                      <td className="py-4 px-3 border-r border-slate-200">&nbsp;</td>
                      <td className="py-4 px-3 border-r border-slate-200">&nbsp;</td>
                      <td className="py-4 px-3 border-r border-slate-200">&nbsp;</td>
                      <td className="py-4 px-3 border-r border-slate-200">&nbsp;</td>
                      <td className="py-4 px-3">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">
              Preview only. Download the full PDF below.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/templates/visitor-sign-in-sheet.pdf"
              className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Download Free PDF Template
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center bg-slate-100 text-slate-700 font-semibold px-8 py-3 rounded-lg hover:bg-slate-200 transition"
            >
              Try Digital Version Free &rarr;
            </Link>
          </div>
        </section>

        {/* How to Use */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How to Use This Template</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: "1", title: "Download", desc: "Get the free PDF and print as many copies as you need." },
              { step: "2", title: "Place at Entry", desc: "Put the sheet and a pen at your reception or front desk." },
              { step: "3", title: "Instruct Visitors", desc: "Ask every guest to fill in all fields and sign." },
              { step: "4", title: "Store Securely", desc: "Keep completed sheets for 1-3 years per your industry requirements." },
            ].map((item) => (
              <div key={item.step} id={`step${item.step}`} className="border border-slate-200 rounded-lg p-5 text-center">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  {item.step}
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Digital Wins */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Digital Visitor Logs Beat Paper</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">The Problem with Paper</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Privacy violation:</strong> Everyone can see who visited before them</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Illegible handwriting:</strong> Good luck reading that signature in 6 months</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>No search:</strong> Finding a specific visitor means flipping through pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Easy to lose:</strong> Fire, water, or simple misplacement kills your records</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Audit failure:</strong> Auditors want timestamps and proof &mdash; paper can&rsquo;t provide that</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">How Digital Fixes It</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Private:</strong> Each visitor sees only their own entry</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Searchable:</strong> Find any visitor by name, date, or company in seconds</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Automatic timestamps:</strong> No guessing when someone arrived or left</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Cloud backup:</strong> Records survive fires, floods, and office moves</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Audit-ready:</strong> Export PDF/CSV reports with one click</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Who Needs a Visitor Sign-In System?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "Construction Sites", desc: "Track contractors, inspectors, and deliveries. Mandatory safety briefings." },
              { title: "Manufacturing Plants", desc: "Vendor access, PPE compliance, and OSHA audit trails." },
              { title: "Office Buildings", desc: "Professional check-in, host notifications, and visitor badges." },
              { title: "Healthcare Clinics", desc: "Patient privacy, contactless check-in, and HIPAA compliance." },
              { title: "Schools & Universities", desc: "Parent pickup, contractor screening, and emergency roll calls." },
              { title: "Warehouses", desc: "Driver check-in, delivery tracking, and after-hours access." },
            ].map((item) => (
              <div key={item.title} className="border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Still using paper? You&rsquo;re paying more than you think.
            </h3>
            <p className="text-blue-800 mb-4">
              2 hours/week of admin time per location = ~$800/month in labor. 
              A digital system pays for itself in week one.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Start Free 14-Day Trial &rarr;
            </Link>
          </div>
        </section>

        {/* Related Templates */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Templates & Guides</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/blog/best-visitor-management-software-2026" className="block border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:bg-blue-50 transition">
              <h4 className="font-semibold text-slate-900 mb-1">10 Best Visitor Management Systems (2026)</h4>
              <p className="text-sm text-slate-500">Compare the top platforms with real pricing and honest pros & cons.</p>
            </Link>
            <Link href="/blog/envoy-alternative" className="block border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:bg-blue-50 transition">
              <h4 className="font-semibold text-slate-900 mb-1">7 Best Envoy Alternatives</h4>
              <p className="text-sm text-slate-500">Tired of per-site pricing? See how SiteSafe compares to Envoy and others.</p>
            </Link>
            <Link href="/br/blog/check-in-digital-obras" className="block border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:bg-blue-50 transition">
              <h4 className="font-semibold text-slate-900 mb-1">Check-in Digital para Obras (PT)</h4>
              <p className="text-sm text-slate-500">Guia pratico de check-in digital para construcao e obras no Brasil.</p>
            </Link>
            <Link href="/br/blog/melhor-sistema-controle-visitantes-2026" className="block border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:bg-blue-50 transition">
              <h4 className="font-semibold text-slate-900 mb-1">Melhor Sistema de Controle de Visitantes (PT)</h4>
              <p className="text-sm text-slate-500">Comparativo completo em portugues com precos reais para o mercado brasileiro.</p>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-100 pb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-4xl mx-auto px-6 py-12 mb-16">
          <div className="bg-slate-900 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Download the template. Or skip ahead to digital.
            </h2>
            <p className="text-slate-300 mb-6 max-w-xl mx-auto">
              The PDF template is free and works immediately. But if you&rsquo;re managing 
              2+ locations, a digital system saves hours every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/templates/visitor-sign-in-sheet.pdf"
                className="inline-block bg-white text-slate-900 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition"
              >
                Download Free PDF
              </Link>
              <Link
                href="/signup"
                className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-500 transition"
              >
                Try SiteSafe Free
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter locale="en" />
    </>
  );
}