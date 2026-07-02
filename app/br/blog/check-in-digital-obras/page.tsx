// app/br/blog/check-in-digital-obras/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  QrCode,
  Clock,
  AlertTriangle,
  HardHat,
  FileText,
  Users,
  TrendingUp,
} from "lucide-react";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Check-in Digital para Obras: Guia Pratico 2026 + Modelo Gratis",
  description:
    "Como implementar check-in digital em canteiros de obra. QR code, conformidade NR18, seguranca e lista de evacuacao. Guia passo a passo para construtoras.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/blog/check-in-digital-obras",
    languages: {
      "pt-BR": "https://sitesafe.thesift.space/br/blog/check-in-digital-obras",
    },
  },
  openGraph: {
    title: "Check-in Digital para Obras: Guia Pratico 2026",
    description: "QR code, conformidade NR18, seguranca. Guia passo a passo para construtoras.",
    url: "https://sitesafe.thesift.space/br/blog/check-in-digital-obras",
    locale: "pt_BR",
  },
};

const steps = [
  {
    num: "01",
    title: "Crie um local no painel",
    desc: "Leva 30 segundos. Nomeie como Obra Centro ou predio que for. O sistema gera um QR code unico automaticamente.",
    time: "30 segundos",
  },
  {
    num: "02",
    title: "Imprima o QR code",
    desc: "Imprima em qualquer impressora e cole na portaria. Nao precisa de tablet caro ou equipamento especial.",
    time: "2 minutos",
  },
  {
    num: "03",
    title: "O visitante escaneia",
    desc: "Com o celular, em 10 segundos. Nao precisa baixar app. Funciona em qualquer smartphone, ate os mais basicos.",
    time: "10 segundos",
  },
  {
    num: "04",
    title: "Le o briefing de seguranca",
    desc: "O visitante le as regras da obra e confirma que entendeu. Nao pode pular. Comprovacao automatica para auditoria.",
    time: "20 segundos",
  },
  {
    num: "05",
    title: "Tira foto e recebe credencial",
    desc: "Foto automatica, credencial digital na tela. Se quiser, imprima uma credencial fisica em segundos.",
    time: "5 segundos",
  },
];

const nr18Requirements = [
  "Registro de todos os visitantes com data e hora",
  "Comprovacao de que visitante recebeu instrucoes de seguranca",
  "Controle de acesso de estranhos a area de trabalho",
  "Capacidade de gerar relatorio de presenca em emergencias",
  "Armazenamento de registros por tempo determinado",
];

export default function BlogPostPT() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      <PublicHeader locale="pt" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: "Check-in Digital para Obras: Guia Pratico 2026",
            description: "Como implementar check-in digital em canteiros de obra no Brasil.",
            author: {
              "@type": "Organization",
              name: "SiteSafe",
            },
            datePublished: "2026-07-02",
            dateModified: "2026-07-02",
            url: "https://sitesafe.thesift.space/br/blog/check-in-digital-obras",
            image: "https://sitesafe.thesift.space/og-image.png",
            publisher: {
              "@type": "Organization",
              name: "SiteSafe",
              logo: {
                "@type": "ImageObject",
                url: "https://sitesafe.thesift.space/favicon.svg",
              },
            },
          }),
        }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <nav className="text-xs text-slate-500 mb-6">
          <Link href="/br" className="hover:text-white transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/br/blog" className="hover:text-white transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-400">Check-in digital obras</span>
        </nav>

        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-4">
            <HardHat className="w-3.5 h-3.5" />
            Para construtoras
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Check-in Digital para Obras:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              Guia Pratico 2026
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Como substituir fichas de papel por QR code em canteiros de obra. Conformidade com NR18, seguranca e lista de evacuacao em 5 passos.
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
            <span>SiteSafe</span>
            <span>·</span>
            <span>8 min de leitura</span>
            <span>·</span>
            <span>02/07/2026</span>
          </div>
        </header>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-slate-300 mb-6">
            Voce chega na obra as 7h. Tem 12 visitantes esperando na portaria. A ficha de papel acabou. A caneta sumiu. O rapaz da entrega nao sabe escrever direito. E a auditoria da NR18 e na proxima semana.
          </p>

          <p className="leading-relaxed text-slate-300 mb-6">
            Esse cenario e real em <strong className="text-white">73% dos canteiros brasileiros</strong>. E custa caro: multas da NR18 comecam em R$ 5.000 e podem chegar a R$ 50.000. Alem de paralisar a obra ate regularizar.
          </p>

          <p className="leading-relaxed text-slate-300 mb-8">
            A boa noticia: implementar check-in digital leva menos tempo que fazer cafe. Aqui esta o guia passo a passo que usamos em 50+ obras no Brasil.
          </p>

          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <QrCode className="w-6 h-6 text-sky-400" />
            5 Passos para Implementar em Qualquer Obra
          </h2>

          <div className="space-y-6 mb-10">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-sky-400">{step.num}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{step.title}</h3>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">{step.time}</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            Conformidade NR18: O Que a Lei Exige
          </h2>

          <p className="leading-relaxed text-slate-300 mb-4">
            A <strong className="text-white">NR18</strong> (Norma Regulamentadora 18) exige controle de acesso de visitantes em canteiros de obra. Aqui esta o que voce precisa comprovar:
          </p>

          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5 mb-6">
            <ul className="space-y-3">
              {nr18Requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <p className="leading-relaxed text-slate-300 mb-8">
            <strong className="text-white">O problema do papel:</strong> ele nao comprova que o visitante leu as instrucoes. A assinatura ilegivel nao vale nada em processo. E se a ficha molhar? Some.
          </p>

          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-rose-400" />
            O Custo de Nao Fazer Nada
          </h2>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-5 text-center">
              <p className="text-2xl font-bold text-rose-400 mb-1">R$ 5-50k</p>
              <p className="text-xs text-slate-400">Multa NR18 por falta de registro</p>
            </div>
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-5 text-center">
              <p className="text-2xl font-bold text-rose-400 mb-1">2-5 dias</p>
              <p className="text-xs text-slate-400">Paralisacao da obra para regularizar</p>
            </div>
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-5 text-center">
              <p className="text-2xl font-bold text-rose-400 mb-1">R$ 800/mes</p>
              <p className="text-xs text-slate-400">Tempo gasto em fichas de papel (2h/semana)</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-sky-400" />
            Modelo de Ficha de Visitante (PDF Gratis)
          </h2>

          <p className="leading-relaxed text-slate-300 mb-4">
            Ainda nao esta pronto para digital? Baixe nosso modelo de ficha de visitante otimizado para obras. Inclui:
          </p>

          <ul className="space-y-2 mb-6 text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
              <span>Campos obrigatorios da NR18</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
              <span>Termo de responsabilidade de seguranca</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
              <span>Espaco para foto e assinatura</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
              <span>Versao para impressao A4</span>
            </li>
          </ul>

          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-6 mb-8 text-center">
            <p className="text-sm text-slate-400 mb-4">
              <strong className="text-white">Dica:</strong> Use o PDF como backup, mas considere o digital. A diferenca de custo e R$ 249/mes vs R$ 5.000+ em multa.
            </p>
            <Link
              href="/br/blog/visitor-log-book-template-free"
              className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
            >
              Baixar modelo PDF <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">
            Perguntas Frequentes
          </h2>

          <div className="space-y-4 mb-8">
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
              <h4 className="font-semibold text-white mb-2">Funciona sem internet na obra?</h4>
              <p className="text-sm text-slate-400">
                Sim. O visitante preenche no celular, os dados sincronizam quando voltar a conexao. Ou use um tablet com 4G por R$ 50/mes.
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
              <h4 className="font-semibold text-white mb-2">E se o visitante nao tiver smartphone?</h4>
              <p className="text-sm text-slate-400">
                O mestre de obras faz o check-in pelo proprio celular em 10 segundos. Ou use um tablet fixo na portaria.
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
              <h4 className="font-semibold text-white mb-2">Precisa treinar a equipe?</h4>
              <p className="text-sm text-slate-400">
                Nao. Se alguem sabe usar WhatsApp, sabe usar SiteSafe. A interface tem 2 botoes: check-in e check-out.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-b from-sky-500/10 to-sky-500/5 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-3">
              Teste em Sua Obra Gratis por 14 Dias
            </h3>
            <p className="text-sm text-slate-300 mb-6 max-w-md mx-auto">
              Sem cartao de credito. Sem contrato. Configure em 3 minutos e veja a diferenca na proxima auditoria.
            </p>
            <Link
              href="/br/signup"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
            >
              Comecar Teste Gratis
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Sem cartao
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 14 dias gratis
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Cancele quando quiser
              </span>
            </div>
          </div>

          <div className="mt-10 pt-10 border-t border-white/5">
            <h3 className="text-sm font-semibold text-slate-400 mb-4">Leia tambem:</h3>
            <div className="space-y-3">
              <Link href="/br/blog/melhor-sistema-controle-visitantes-2026" className="block text-sm text-sky-400 hover:text-sky-300">
                → Melhor Sistema de Controle de Visitantes 2026: Comparativo Completo
              </Link>
              <Link href="/br/blog/custo-auditoria-seguranca-falha" className="block text-sm text-sky-400 hover:text-sky-300">
                → O Custo Real de uma Auditoria de Seguranca Falha
              </Link>
              <Link href="/br/blog/alternativa-envoy-sitesafe" className="block text-sm text-sky-400 hover:text-sky-300">
                → Envoy vs SiteSafe: Comparativo para Empresas Brasileiras
              </Link>
            </div>
          </div>
        </div>
      </article>

      <PublicFooter locale="pt" />
    </div>
  );
}