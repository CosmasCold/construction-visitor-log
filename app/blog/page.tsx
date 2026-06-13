// app/blog/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SiteSafe Blog – Smart Visitor Management",
  description:
    "Tips and insights on site safety, OSHA compliance, and digital visitor logs.",
};

const posts = [
  {
    slug: "envoy-alternative",
    title: "Envoy Alternative: Why SiteSafe Is the Better Choice for Small Teams",
    date: "2026-06-13",
    excerpt:
      "Envoy's mandatory demos, per‑site fees, and hidden pricing don't work for small teams. Here's how SiteSafe compares — flat $49/mo, no sales calls, and a mandatory safety acknowledgment Envoy can't match.",
  },
  {
    slug: "swipedon-alternative",
    title: "SwipedOn Alternative: Flat Pricing, No Per‑Location Fees",
    date: "2026-06-13",
    excerpt:
      "SwipedOn's per‑location pricing adds up fast. SiteSafe offers unlimited sites for one flat price, plus host notifications and mandatory safety briefings included.",
  },
  {
    slug: "ilobby-alternative",
    title: "iLobby Alternative: Simpler Visitor Management for Small Teams",
    date: "2026-06-13",
    excerpt:
      "iLobby is built for enterprises with complex needs. SiteSafe gives small teams fast check‑in, compliance proof, and flat pricing — no long deployment, no sales calls.",
  },
  {
    slug: "best-visitor-management-systems",
    title: "The 5 Best Visitor Management Systems for Small Businesses",
    date: "2026-06-13",
    excerpt:
      "Compare Envoy, SwipedOn, iLobby, SiteSafe, and paper logs side‑by‑side on pricing, compliance features, and ease of use. Find the right fit for your workplace.",
  },
  {
    slug: "what-inspectors-look-for-in-visitor-log",
    title: "What Inspectors Look for in a Visitor Log",
    date: "2026-06-13",
    excerpt:
      "From mandatory safety acknowledgments to time‑stamped records, here's exactly what OSHA and safety inspectors check when they review your visitor log.",
  },
  {
    slug: "ultimate-guide-modern-visitor-management",
    title: "The Ultimate Guide to Modern Visitor Management",
    date: "2026-06-09",
    excerpt:
      "Why paper visitor logs fail audits, how digital check‑in works, and the essential features a modern visitor management system should have.",
  },
  {
    slug: "case-study-small-business",
    title: "How a Small Business Chooses a Visitor Log",
    date: "2026-06-06",
    excerpt:
      "A walk through how a fictional small business owner compares Envoy, SwipedOn, and SiteSafe — and why the simplest, most affordable option wins.",
  },
  {
    slug: "sitesafe-vs-envoy-swipedon-paper",
    title: "SiteSafe vs Envoy vs SwipedOn vs Paper Logs",
    date: "2026-06-04",
    excerpt:
      "An honest side‑by‑side comparison of digital visitor log solutions, including pricing, features, and hidden costs.",
  },
  {
    slug: "feedback-wanted",
    title: "Help Us Improve SiteSafe – Feedback Wanted",
    date: "2026-06-04",
    excerpt:
      "We built a simple digital visitor log and need your honest feedback to make it better.",
  },
  {
    slug: "cost-of-failed-safety-audit",
    title: "The Real Cost of a Failed Safety Audit",
    date: "2026-06-03",
    excerpt:
      "Fines are just the start. A failed audit can cost contracts, reputation, and months of work.",
  },
  {
    slug: "osha-inspector-visitor-log",
    title: "What an OSHA Inspector Actually Looks For in a Visitor Log",
    date: "2026-06-02",
    excerpt:
      "A complete visitor log can make or break an inspection. Here is what inspectors check.",
  },
  {
    slug: "paper-sign-in-sheets-safety-risk",
    title: "Why Paper Sign‑In Sheets Are a Safety Risk",
    date: "2026-06-01",
    excerpt:
      "Paper logs get lost, ruined, and are illegible. Here is why a digital check‑in is safer.",
  },
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Blog</h1>
        {posts.map((post) => (
          <div
            key={post.slug}
            className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised hover:shadow-card-raised transition-shadow duration-300 p-8"
          >
            <h2 className="text-xl font-semibold tracking-tight">
              <Link
                href={`/blog/${post.slug}`}
                className="text-white hover:text-sky-400 transition-colors duration-150"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-xs text-slate-400 mt-1">{post.date}</p>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}