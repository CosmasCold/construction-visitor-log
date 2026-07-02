// app/br/blog/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/data/blog-posts";
import { ArrowRight, Calendar, Clock, Globe } from "lucide-react";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Blog SiteSafe — Controle de Visitantes para Equipes Multi-Local",
  description:
    "Guias praticos sobre controle de visitantes, conformidade de seguranca, preparacao para auditorias e substituicao de registros em papel.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/blog",
    languages: {
      en: "https://sitesafe.thesift.space/blog",
      "pt-BR": "https://sitesafe.thesift.space/br/blog",
    },
  },
};

export default function BlogIndexPT() {
  // Filter PT posts only
  const ptPosts = posts.filter((post) => post.locale === "pt" || post.locale === "both");

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      <PublicHeader locale="pt" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Blog
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
            Guias praticos sobre controle de visitantes, conformidade de seguranca e substituicao de registros em papel em multiplos locais.
          </p>
        </div>

        <div className="space-y-4">
          {ptPosts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-200 overflow-hidden"
            >
              <Link href={`/br/blog/${post.slug}`} className="block p-6">
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
                        Atualizado {post.lastModified}
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
                  Ler artigo <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </article>
          ))}
        </div>

        {ptPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-slate-500">
              Nenhum post ainda. Volte em breve.
            </p>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-xs text-slate-500 mb-4">
            Posts em ingles também disponíveis:
          </p>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            Ver blog em ingles
          </Link>
        </div>
      </main>

      <PublicFooter locale="pt" />
    </div>
  );
}