// app/blog/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/data/blog-posts";
import { ArrowRight, Calendar, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "SiteSafe Blog — Visitor Management for Multi-Site Teams",
  description:
    "Practical guides on visitor management, safety compliance, audit readiness, and replacing paper logs across multiple locations.",
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      {/* ─── Header ─── */}
      <header className="border-b border-white/5 bg-[#0a0f1c]/90 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-sky-500 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-white">SiteSafe</span>
          </Link>
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1"
          >
            Back to site <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* ─── Hero ─── */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Blog
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
            Practical guides on visitor management, safety compliance, and replacing paper logs across multiple sites.
          </p>
        </div>

        {/* ─── Post List ─── */}
        <div className="space-y-4">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-200 overflow-hidden"
            >
              <Link href={`/blog/${post.slug}`} className="block p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 uppercase tracking-wider font-medium">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  {post.lastModified && post.lastModified !== post.date && (
                    <>
                      <span className="text-slate-700">·</span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-sky-400 uppercase tracking-wider font-medium">
                        <Clock className="w-3 h-3" />
                        Updated {post.lastModified}
                      </span>
                    </>
                  )}
                </div>
                
                <h2 className="text-lg font-semibold text-white group-hover:text-sky-300 transition-colors mb-2">
                  {post.title}
                </h2>
                
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="mt-4 flex items-center gap-1 text-xs text-sky-400 group-hover:text-sky-300 transition-colors">
                  Read article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* ─── Empty State ─── */}
        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-slate-500">No posts yet. Check back soon.</p>
          </div>
        )}
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-8 bg-[#070b14]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600">
            © 2026 SiteSafe by TheSift
          </p>
        </div>
      </footer>
    </div>
  );
}