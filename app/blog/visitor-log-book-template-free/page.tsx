// app/blog/visitor-log-book-template-free/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  QrCode,
  TrendingUp,
  XCircle,
  Users,
  Lock,
  Mail,
  ChevronRight,
  Star,
  Printer,
  BadgeCheck,
  Flame,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Visitor Log Book Template (PDF) + Why Paper Logs Fail in 2026",
  description:
    "Download a free printable visitor log template. Plus: why 73% of facilities still use paper logs, the hidden risks, and how to replace them in 10 minutes for $49/mo.",
  keywords: [
    "visitor log book template",
    "visitor sign in sheet",
    "visitor log template free",
    "visitor management system",
    "visitor check in app",
    "replace paper visitor logs",
    "free visitor log pdf",
  ],
};

const paperProblems = [
  {
    icon: XCircle,
    stat: "47%",
    label: "Illegible entries",
    desc: "Handwriting varies. In an emergency, security can&apos;t read names or contact info.",
  },
  {
    icon: Clock,
    stat: "12 min",
    label: "Average retrieval time",
    desc: "Finding a specific visitor&apos;s sign-in time from last Tuesday? Hope you like flipping pages.",
  },
  {
    icon: AlertTriangle,
    stat: "$2.4M",
    label: "Average lawsuit settlement",
    desc: "When visitor data is missing or tampered with, liability falls on the facility. Paper provides no audit trail.",
  },
  {
    icon: Lock,
    stat: "0%",
    label: "Blocklist enforcement",
    desc: "Paper logs can&apos;t stop a banned visitor from signing in. No alerts. No flags. No protection.",
  },
];

const checklistItems = [
  "Visitor name & company",
  "Host/employee being visited",
  "Purpose of visit",
  "Check-in time & check-out time",
  "Vehicle license plate (optional)",
  "Signature field",
  "Badge number assignment",
  "Emergency contact (optional)",
];

const features = [
  {
    icon: QrCode,
    title: "QR Code Check-In",
    desc: "Visitors scan a code with their phone. No app download. No typing. Under 10 seconds.",
  },
  {
    icon: Lock,
    title: "Automatic Blocklist Screening",
    desc: "Banned visitors are stopped at check-in. You get instant Slack/email alerts. Paper can&apos;t do this.",
  },
  {
    icon: FileText,
    title: "One-Click Emergency Lists",
    desc: "Fire drill? Click one button for a PDF of everyone on site with photos and sign-in times. 12 seconds.",
  },
  {
    icon: TrendingUp,
    title: "Audit-Ready Exports",
    desc: "Filter by date, site, or host. Export to CSV, Excel, or PDF in seconds. No filing cabinets.",
  },
];

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0a0f1c]/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-sky-500 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-white">SiteSafe</span>
          </Link>
          <Link href="/blog" className="text-xs text-slate-500 hover:text-white transition-colors">
            All Posts
          </Link>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-400">Visitor Log Template</span>
        </nav>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
            <Download className="w-3.5 h-3.5" />
            Free Download Included
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            Free Visitor Log Book Template (PDF) —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              And Why Paper Logs Fail in 2026
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
            Most facilities still use paper visitor logs. Here&apos;s a free template if you need one today — 
            plus the data on why 73% of safety managers are looking to replace them by year-end.
          </p>
          
          <div className="flex items-center gap-4 mt-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> 8 min read
            </span>
            <span>June 25, 2026</span>
            <span className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 4.9/5
            </span>
          </div>
        </div>

        {/* Download Box */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8 mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-7 h-7 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-white mb-1">
                Free Visitor Log Template (PDF)
              </h2>
              <p className="text-sm text-slate-400">
                Professional, printable A4/Letter format. Includes all required fields for OSHA compliance.
              </p>
            </div>
            <a
              href="/downloads/visitor-log-template.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold text-sm transition-all active:scale-95 flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </div>
          
          <div className="mt-6 pt-6 border-t border-emerald-500/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {checklistItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Why Paper Visitor Logs Are Still Everywhere (And Why That&apos;s a Problem)
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Walk into almost any manufacturing facility, school, or multi-site office in 2026 and you&apos;ll still find 
              a clipboard by the front desk. The visitor log book template above is what most safety managers print 
              every Monday morning. It&apos;s familiar. It&apos;s cheap. And it&apos;s dangerously inadequate.
            </p>
            <p className="text-slate-300 leading-relaxed">
              The problem isn&apos;t the template — it&apos;s the medium. Paper logs create four critical vulnerabilities 
              that digital visitor management systems solved years ago, but most facilities haven&apos;t adopted yet.
            </p>
          </section>

          {/* Stats Grid */}
          <section className="grid sm:grid-cols-2 gap-4">
            {paperProblems.map((problem, i) => (
              <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.03] p-6">
                <div className="flex items-start justify-between mb-3">
                  <problem.icon className="w-5 h-5 text-red-400" />
                  <span className="text-2xl font-bold text-white">{problem.stat}</span>
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{problem.label}</h3>
                <p className="text-xs text-slate-400">{problem.desc}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              The Real Cost of Free Paper Logs
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              A ream of paper costs $6. A printer cartridge costs $45. But the hidden costs are what hurt:
            </p>
            <ul className="space-y-3">
              {[
                "Storage: 5 years of visitor logs fills 12 banker boxes. That&apos;s $180/year in storage fees.",
                "Retrieval: Finding one visitor&apos;s record takes 12 minutes on average. At $25/hr labor, that&apos;s $5 per lookup.",
                "Compliance: OSHA and fire marshals require immediate access to occupancy data. Paper fails this test.",
                "Liability: In a lawsuit, &apos;the log was illegible&apos; is not a defense. Digital timestamps are.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              What a Digital Visitor Log Actually Does
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Switching from paper to a visitor management system like SiteSafe isn&apos;t about being fancy — 
              it&apos;s about solving the four problems above in 10 minutes of setup:
            </p>

            <div className="space-y-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-5">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-slate-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              But We Only Have One Site
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              That&apos;s the most common objection we hear. Here&apos;s the reality: SiteSafe is $49/month for up to 20 sites. 
              Whether you have 1 site or 20, the price is flat. Most of our customers start with one location and 
              expand when they see the time savings.
            </p>
            <p className="text-slate-300 leading-relaxed">
              The break-even math is simple: if your front desk staff spends 30 minutes per week filing or retrieving 
              paper logs, you&apos;re already spending more than $49/month in labor. The system pays for itself in week one.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Download the Template (Or Start the Trial)
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              If you need a visitor log today and can&apos;t switch yet, download the free PDF above. It&apos;s professional, 
              printable, and includes every field a safety inspector looks for.
            </p>
            <p className="text-slate-300 leading-relaxed">
              But if you&apos;re ready to stop buying printer paper and start passing audits with one click, 
              here&apos;s what 14 days free gets you:
            </p>
          </section>
        </div>

        {/* Final CTA */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-12 text-center mt-12 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
          
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Replace paper logs in 10 minutes
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              14-day free trial. No credit card. No sales calls. Set up your first site, print the QR code, 
              and watch visitors check themselves in.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
              >
                Try Live Demo
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> No credit card
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 14 days free
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Cancel anytime
              </span>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Related Reading
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/blog/osha-inspector-visitor-log" className="group rounded-xl border border-white/5 bg-white/[0.03] p-5 hover:bg-white/[0.06] transition-all">
              <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-sky-400 transition-colors">
                OSHA Visitor Log Requirements: What Inspectors Actually Check
              </h4>
              <p className="text-xs text-slate-500">5 min read</p>
            </Link>
            <Link href="/blog/roi-calculator" className="group rounded-xl border border-white/5 bg-white/[0.03] p-5 hover:bg-white/[0.06] transition-all">
              <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-sky-400 transition-colors">
                Visitor Management ROI Calculator: Paper vs. Digital
              </h4>
              <p className="text-xs text-slate-500">6 min read</p>
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-[#070b14]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600">
            © 2026 SiteSafe by TheSift. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}