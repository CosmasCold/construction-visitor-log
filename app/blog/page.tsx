// app/blog/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "SiteSafe Blog – Smart Visitor Management",
  description:
    "Tips and insights on site safety, OSHA compliance, and digital visitor logs.",
};

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
            <p className="text-xs text-slate-400 mt-1">
              {post.date}
              {post.lastModified && post.lastModified !== post.date && (
                <> · Updated {post.lastModified}</>
              )}
            </p>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}