// app/br/blog/custo-auditoria-seguranca-falha/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  DollarSign,
  Clock,
  FileText,
  HardHat,
} from "lucide-react";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "O Custo Real de uma Auditoria de Seguranca Falha em 2026",
  description:
    "Multas NR18, paralisacao de obra, perda de contratos. O custo oculto de nao ter controle de visitantes e maior que voce imagina. Veja os numeros reais.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/blog/custo-auditoria-seguranca-falha",
    languages: {
      "pt-BR": "https://sitesafe.thesift.space/br/blog/custo-auditoria-seguranca-falha",
    },
  },
  openGraph: {
    title: "O Custo Real de uma Auditoria de Seguranca Falha",
    description: "Multas, paralisacao, perda de contratos. Os numeros reais de nao ter controle de visitantes.",
    url: "https://sitesafe.thesift.space/br/blog/custo-auditoria-seguranca-falha",
    locale: "pt_BR",
  },
};

const costBreakdown = [
  {
    item: "Multa NR18 (falta de registro de visitantes)",
    min: "R$ 5.000",
    max: "R$ 50.000",
    probability: "Alta",
  },
  {
    item: "Paralisacao da obra ate regularizar",
    min: "2 dias",
    max: "5 dias",
    probability: "Media",
  },
  {
    item: "Custo de mao de obra parada (50 funcionarios)",
    min: "R$ 8.000",
    max: "R$ 20.000",
    probability: "Alta",
  },
  {
    item: "Perda de contrato por nao comprovar seguranca",
    min: "R$ 50.000",
    max: "R$ 500.000",
    probability: "Baixa, mas catastrofica",
  },
  {
    item: "Processo trabalhista (acidente com visitante)",
    min: "R$ 30.000",
    max: "R$ 200.000",
    probability: "Media",
  },
  {
    item: "Tempo do gestor refazendo registros em papel",
    min: "R$ 800/mes",
    max: "R$ 1.500/mes",
    probability: "100%",
  },
];

const inspectorChecks = [
  "Registro completo de todos os visitantes (nome, empresa, data, hora de entrada e saida)",
  "Comprovacao de que visitante recebeu instrucoes de seguranca antes de entrar",
  "Assinatura ou confirmacao digital do visitante",
  "Controle de acesso de estranhos a area de trabalho",
  "Capacidade de gerar relatorio de presenca em caso de emergencia",
  "Armazenamento de registros por pelo menos 12 meses",
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
            headline: "O Custo Real de uma Auditoria de Seguranca Falha em 2026",
            description: "Multas NR18, paralisacao de obra, perda de contratos. Os numeros reais.",
            author: {
              "@type": "Organization",
              name: "SiteSafe",
            },
            datePublished: "2026-07-02",
            dateModified: "2026-07-02",
            url: "https://sitesafe.thesift.space/br/blog/custo-auditoria-seguranca-falha",
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
          <span className="text-slate-400">Custo auditoria falha</span>
        </nav>

        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            Alerta para gestores
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            O Custo Real de uma{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
              Auditoria de Seguranca Falha
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Multas NR18, paralisacao de obra, perda de contratos. O custo oculto de nao ter controle de visitantes e maior que voce imagina. Veja os numeros reais.
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
            <span>SiteSafe</span>
            <span>·</span>
            <span>10 min de leitura</span>
            <span>·</span>
            <span>02/07/2026</span>
          </div>
        </header>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-slate-300 mb-6">
            A auditoria estava marcada para sexta-feira. Na segunda, o gestor descobriu que <strong className="text-white">as fichas de visitantes dos ultimos 3 meses tinham sumido</strong>. Chuva. Ou vento. Ou alguem jogou fora sem querer.
          </p>

          <p className="leading-relaxed text-slate-300 mb-6">
            Resultado: <strong className="text-white">multa de R$ 15.000</strong>, obra paralisada por 3 dias e um cliente que quase cancelou o contrato por falta de seriedade em seguranca.
          </p>

          <p className="leading-relaxed text-slate-300 mb-8">
            Essa historia e real. Acontece toda semana em alguma obra do Brasil. E o pior: <strong className="text-white">e completamente evitavel</strong>. Custa R$ 249/mes prevenir. Custou R$ 40.000+ nao prevenir.
          </p>

          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-rose-400" />
            A Conta: Quanto Custa uma Auditoria Falha
          </h2>

          <div className="rounded-2xl border border-white/10 overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/[0.05] border-b border-white/10">
                    <th className="p-4 text-left text-xs text-slate-400 uppercase tracking-wider font-semibold">Custo</th>
                    <th className="p-4 text-left text-xs text-slate-400 uppercase tracking-wider font-semibold">Minimo</th>
                    <th className="p-4 text-left text-xs text-slate-400 uppercase tracking-wider font-semibold">Maximo</th>
                    <th className="p-4 text-left text-xs text-slate-400 uppercase tracking-wider font-semibold">Probabilidade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {costBreakdown.map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 text-sm font-medium text-white">{row.item}</td>
                      <td className="p-4 text-sm text-rose-400">{row.min}</td>
                      <td className="p-4 text-sm text-rose-400">{row.max}</td>
                      <td className="p-4 text-sm text-slate-400">{row.probability}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-6 mb-10 text-center">
            <p className="text-3xl font-bold text-rose-400 mb-2">R$ 93.800 - R$ 791.500</p>
            <p className="text-sm text-slate-400">Custo total potencial em 12 meses</p>
            <p className="text-xs text-slate-500 mt-2">vs R$ 2.988/ano para prevenir com SiteSafe</p>
          </div>

          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-sky-400" />
            O que o Fiscal Realmente Verifica
          </h2>

          <p className="leading-relaxed text-slate-300 mb-4">
            A NR18 e clara. O fiscal nao esta la para te pegar. Ele esta la para garantir que ninguem morra. E esses sao os 6 pontos que ele verifica em toda auditoria:
          </p>

          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5 mb-6">
            <ol className="space-y-3">
              {inspectorChecks.map((check, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  {check}
                </li>
              ))}
            </ol>
          </div>

          <p className="leading-relaxed text-slate-300 mb-8">
            <strong className="text-white">O problema:</strong> com papel, voce falha em 4 dos 6 itens. Sem comprovacao digital, sem relatorio rapido, sem backup. O fiscal anota. Voce assina a multa.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">
            Custo Oculto que Ninguem Conta
          </h2>

          <p className="leading-relaxed text-slate-300 mb-4">
            As empresas que usam papel nao falham so na auditoria. Elas falham em <strong className="text-white">todos os momentos que importam</strong>:
          </p>

          <div className="space-y-4 mb-8">
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" /> Simulado de emergencia
              </h4>
              <p className="text-sm text-slate-400">
                Sirene toca. Precisa saber quem esta dentro em 30 segundos. Com papel? 15 minutos catafichas molhadas. Com SiteSafe? 1 clique, PDF pronto. A diferenca entre vida e morte.
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <HardHat className="w-4 h-4 text-amber-400" /> Acidente com visitante
              </h4>
              <p className="text-sm text-slate-400">
                Visitante cai, quebra perna. Processo trabalhista. Sem comprovacao de que ele leu as regras de seguranca? Sem chance de defesa. Com SiteSafe, voce tem registro digital com timestamp e IP.
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" /> Cliente exige comprovacao
              </h4>
              <p className="text-sm text-slate-400">
                Grande construtora contratante exige relatorio de seguranca mensal. Sem sistema digital? Voce gera 2 dias. Com SiteSafe? Exporta CSV em 10 segundos. Diferenca entre ganhar e perder o contrato.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            Como Prevenir por R$ 249/mes
          </h2>

          <p className="leading-relaxed text-slate-300 mb-4">
            O calculo e simples. Papel custa R$ 800+/mes em tempo de gestor + risco de R$ 93.800 em multas. SiteSafe custa <strong className="text-white">R$ 249/mes para 20 locais</strong>.
          </p>

          <p className="leading-relaxed text-slate-300 mb-4">
            Em 3 minutos voce configura:
          </p>

          <ol className="space-y-3 mb-6 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold flex items-center justify-center">1</span>
              <span>Crie o local (obra, armazem, escritorio)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold flex items-center justify-center">2</span>
              <span>Imprima o QR code e cole na portaria</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold flex items-center justify-center">3</span>
              <span>Pronto. Todo visitante passa pelo briefing obrigatorio antes de entrar</span>
            </li>
          </ol>

          <p className="leading-relaxed text-slate-300 mb-8">
            Na proxima auditoria, voce abre o painel, clica em Exportar, entrega PDF com todos os registros, fotos, timestamps e confirmacoes de seguranca. O fiscal assina. Voce passa.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">
            Perguntas Frequentes
          </h2>

          <div className="space-y-4 mb-8">
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
              <h4 className="font-semibold text-white mb-2">E se eu ja tiver sido multado?</h4>
              <p className="text-sm text-slate-400">
                Implemente o sistema digital imediatamente e documente a mudanca. Mostra proatividade. Na recorrencia, argumente que voce tomou medidas corretivas. Juizes costumam reduzir multas quando veem investimento em seguranca.
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
              <h4 className="font-semibold text-white mb-2">A ficha de papel nao serve mais?</h4>
              <p className="text-sm text-slate-400">
                Serve para controle interno informal. Para auditoria NR18? Nao. Sem comprovacao de que o visitante leu as regras, sem backup digital, sem relatorio rapido. E se a ficha molhar, sumir ou a assinatura for ilegivel? Nao vale como prova.
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
              <h4 className="font-semibold text-white mb-2">Preciso de internet na obra?</h4>
              <p className="text-sm text-slate-400">
                O visitante preenche no celular dele. Os dados sincronizam quando houver conexao. Ou use um tablet com 4G por R$ 50/mes. Funciona em qualquer lugar, ate obra no meio do mato.
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
              <h4 className="font-semibold text-white mb-2">E se a auditoria for amanha?</h4>
              <p className="text-sm text-slate-400">
                Configure SiteSafe hoje, importe seus registros manuais (se tiver), e ja gera relatorio completo. Leva 10 minutos. Melhor que entregar nada ou fichas molhadas.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-b from-sky-500/10 to-sky-500/5 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-3">
              Nao Espere a Multa. Previna por R$ 249/mes.
            </h3>
            <p className="text-sm text-slate-300 mb-6 max-w-md mx-auto">
              14 dias gratis. Sem cartao. Sem contrato. Configure em 3 minutos e durma tranquilo na proxima auditoria.
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
              <Link href="/br/blog/check-in-digital-obras" className="block text-sm text-sky-400 hover:text-sky-300">
                → Check-in Digital para Obras: Guia Pratico 2026
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