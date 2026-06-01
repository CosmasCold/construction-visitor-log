// app/blog/page.tsx
export const metadata = {
  title: "SiteSafe Blog – Construction Safety & Visitor Management",
  description:
    "Tips and insights on construction site safety, OSHA compliance, and digital visitor logs.",
};
import Link from "next/link";

const posts = [
  {
    slug: "paper-sign-in-sheets-safety-risk",
    title: "Why Paper Sign‑In Sheets Are a Safety Risk",
    date: "2026-06-01",
    excerpt: "Paper logs get lost, ruined, and are illegible. Here's why a digital check‑in is safer.",
  },
  {
    slug: "osha-inspector-visitor-log",
    title: "What an OSHA Inspector Actually Looks for in a Visitor Log",
    date: "2026-06-02",
    excerpt: "A complete visitor log can make or break an inspection. Here's what inspectors check.",
  },
  {
    slug: "cost-of-failed-safety-audit",
    title: "The Real Cost of a Failed Safety Audit",
    date: "2026-06-03",
    excerpt: "Fines are just the start. A failed audit can cost you contracts, reputation, and months of work.",
  },
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white">Blog</h1>
        {posts.map((post) => (
          <div key={post.slug} className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 text-slate-800">
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${post.slug}`} className="hover:text-sky-600 transition-colors">
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-slate-500 mt-1">{post.date}</p>
            <p className="text-sm text-slate-600 mt-3">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}