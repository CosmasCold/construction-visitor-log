import type { Metadata } from "next";
import Link from "next/link";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";

export const metadata: Metadata = {
  title: "The Ultimate Guide to Modern Visitor Management – SiteSafe Blog",
  description:
    "Why paper visitor logs fail audits, how digital check‑in works, and the essential features a modern visitor management system should have.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          The Ultimate Guide to Modern Visitor Management
        </h1>
        <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 5 min read</p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            If your workplace still uses a paper sign‑in sheet, you’re not alone.
            But the risks of paper logs are mounting—lost records, compliance
            gaps, and hours of manual work before every audit. Here’s everything
            you need to know about modernising your visitor management.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">Why paper fails</h2>
          <p>
            Paper logs are easily lost, damaged, or altered. They lack timestamps,
            don’t enforce safety rules, and can’t be quickly filtered or exported.
            In an audit, they often mean hours of frantic searching.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">What a digital system does</h2>
          <p>
            A digital visitor management system replaces the clipboard with a
            tablet or QR code. Visitors sign in electronically, and their
            information is stored securely. You get a real‑time dashboard,
            automatic host notifications, and one‑click audit exports.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">Essential features to look for</h2>
          <ul className="space-y-2 text-slate-200">
            <li>• QR check‑in — no app required</li>
            <li>• Mandatory safety acknowledgment — non‑skippable</li>
            <li>• Photo capture — adds security and identification</li>
            <li>• Pre‑screening questions — customisable yes/no questions</li>
            <li>• Host notifications — automatic email alerts</li>
            <li>• Badge printing — with photo and time stamp</li>
            <li>• Audit exports — CSV, Excel, PDF with date and site filters</li>
            <li>• Multi‑site management — all locations under one account</li>
          </ul>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">Flat pricing vs per‑site fees</h2>
          <p>
            Many platforms charge per location, which can add up quickly.
            SiteSafe charges a flat $49/month, no matter how many sites you have.
            That makes it easy to budget, even as you grow.
          </p>

          <p className="italic text-slate-300 mt-6">
            Ready to upgrade?{" "}
            <Link href="/signup" className="text-sky-400 hover:text-sky-300 transition-colors">
              Start your free 14‑day trial of SiteSafe
            </Link>{" "}
            — no credit card, no sales calls.
          </p>
        </div>
        <BlogPostJsonLd
          title="The Ultimate Guide to Modern Visitor Management"
          description="Why paper visitor logs fail audits, how digital check‑in works, and the essential features a modern visitor management system should have."
          datePublished="2026-06-09"
          dateModified="2026-06-15"
          slug="ultimate-guide-modern-visitor-management"
        />
      </div>
    </div>
  );
}