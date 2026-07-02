// app/blog/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { posts } from "@/data/blog-posts";
import { ArrowRight, Calendar, Clock, ShieldCheck, Globe } from "lucide-react";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Blog SiteSafe — Controle de Visitantes para Equipes Multi-Local"
      : "SiteSafe Blog — Visitor Management for Multi-Site Teams",
    description: isPT
      ? "Guias práticos sobre controle de visitantes, conformidade de segurança, preparação para auditorias e substituição de registros em papel."
      : "Practical guides on visitor management, safety compliance, audit readiness, and replacing paper logs across multiple locations.",
  };
}

export default async function BlogIndex() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  // Filter posts by locale
  const visiblePosts = posts.filter((post) => {
    if (post.locale === "both") return true;
    if (post.locale === "en" && !isPT) return true;
    if (post.locale === "pt" && isPT) return true;
    // Show EN posts to PT users with a notice (for now, until translated)
    if (post.locale === "en" && isPT) return true;
    return false;
  });

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      <PublicHeader locale={locale} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* ─── Hero ─── */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            {isPT ? "Blog" : "Blog"}
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
            {isPT
              ? "Guias práticos sobre controle de visitantes, conformidade de segurança e substituição de registros em papel em múltiplos locais."
              : "Practical guides on visitor management, safety compliance, and replacing paper logs across multiple sites."}
          </p>
        </div>

        {/* ─── Post List ─── */}
        <div className="space-y-4">
          {visiblePosts.map((post) => (
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
                        {isPT ? "Atualizado" : "Updated"} {post.lastModified}
                      </span>
                    </>
                  )}
                  {post.locale === "en" && isPT && (
                    <>
                      <span className="text-slate-700">·</span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 uppercase tracking-wider font-medium">
                        <Globe className="w-3 h-3" />
                        EN
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
                  {isPT ? "Ler artigo" : "Read article"} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* ─── Empty State ─── */}
        {visiblePosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-slate-500">
              {isPT ? "Nenhum post ainda. Volte em breve." : "No posts yet. Check back soon."}
            </p>
          </div>
        )}
      </main>

      <PublicFooter locale={locale} />
    </div>
  );
}