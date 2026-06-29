// app/br/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Play,
  Flame,
  ChevronRight,
  Star,
  Building2,
  Users,
  FileText,
  Lock,
  Zap,
  TrendingUp,
  QrCode,
  Camera,
  Printer,
  AlertTriangle,
  BadgeCheck,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "SiteSafe: Sistema de Controle de Visitantes para Multiplos Locais",
  description:
    "Substitua as fichas de papel por check-in digital com QR code. R$ 249/mês para até 20 locais. Teste gratuito de 14 dias, sem cartão de crédito.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br",
  },
  openGraph: {
    title: "SiteSafe — Controle de Visitantes para 20 Locais",
    description: "R$ 249/mês plano fixo. QR code, briefing de segurança, listas de evacuação. 14 dias grátis.",
    url: "https://sitesafe.thesift.space/br",
    locale: "pt_BR",
  },
};

const features = [
  {
    icon: QrCode,
    title: "Check-in por QR Code",
    desc: "Cada local recebe um QR code único. Visitantes escaneiam com o celular — sem baixar app, sem filas.",
    highlight: "Em 10 segundos",
  },
  {
    icon: ShieldCheck,
    title: "Briefing de Segurança Obrigatório",
    desc: "Todo visitante confirma as regras de segurança antes de entrar. Não pode pular. Comprovação automática para auditorias.",
    highlight: "100% conformidade",
  },
  {
    icon: Camera,
    title: "Captura de Foto",
    desc: "Foto automática no check-in. Armazenada com segurança no registro e impressa na credencial.",
    highlight: "Identificação imediata",
  },
  {
    icon: Lock,
    title: "Modo de Bloqueio (Lockdown)",
    desc: "Um clique bloqueia todos os novos check-ins. Segurança sabe exatamente quem está dentro.",
    highlight: "Emergência",
  },
  {
    icon: FileText,
    title: "Lista de Evacuação",
    desc: "Um clique gera PDF com todos os presentes — nomes, fotos, horários. Essencial para simulados e emergências reais.",
    highlight: "Em 12 segundos",
  },
  {
    icon: Printer,
    title: "Impressão de Credenciais",
    desc: "Credenciais com foto impressas diretamente do painel ou da tela de check-in. Compactas e profissionais.",
    highlight: "Credencial instantânea",
  },
];

const comparison = [
  { feature: "5 locais", sitesafe: "R$ 249", envoy: "~R$ 3.000", swipedon: "~R$ 1.800", savings: "R$ 2.751+" },
  { feature: "10 locais", sitesafe: "R$ 249", envoy: "~R$ 6.000", swipedon: "~R$ 3.600", savings: "R$ 3.351+" },
  { feature: "15 locais", sitesafe: "R$ 249", envoy: "~R$ 9.000", swipedon: "~R$ 5.400", savings: "R$ 5.151+" },
  { feature: "20 locais", sitesafe: "R$ 249", envoy: "~R$ 12.000", swipedon: "~R$ 7.200", savings: "R$ 6.951+" },
];

export default function LandingBR() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white overflow-x-hidden">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SiteSafe",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description: "Sistema de controle de visitantes para equipes multi-locais. QR code, briefing de segurança, exportações para auditoria.",
            offers: {
              "@type": "Offer",
              price: "249",
              priceCurrency: "BRL",
              priceValidUntil: "2026-12-31",
              url: "https://sitesafe.thesift.space/br",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "47",
            },
            url: "https://sitesafe.thesift.space/br",
          }),
        }}
      />

      {/* ─── Nav ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0f1c]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/br" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-sky-500 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-white">SiteSafe</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1">
              <Globe className="w-3 h-3" /> English
            </Link>
            <Link
              href="/signup?region=br"
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-lg text-slate-900 bg-white hover:bg-slate-100 transition-all active:scale-95"
            >
              Teste grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sky-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-medium mb-6">
                <Flame className="w-3.5 h-3.5" />
                Sem chamadas de vendas. Sem taxa por local.
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                Pare de perder registros de visitantes{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
                  em 20 locais
                </span>
              </h1>

              <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Fichas de papel se perdem. Planilhas viram bagunça. Auditorias viram pesadelo. 
                O SiteSafe substitui tudo isso por um painel em tempo real — R$ 249/mês, até 20 locais.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link
                  href="/demo"
                  className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] active:scale-[0.98]"
                >
                  Ver demonstração
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/signup?region=br"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
                >
                  Teste grátis 14 dias
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Sem cartão de crédito
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Cancele em 2 cliques
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Configuração em 3 min
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl border border-white/10 bg-[#0f172a] shadow-2xl overflow-hidden aspect-[16/10]">
                <Image
                  src="/dash.png"
                  alt="Painel SiteSafe mostrando visitantes em tempo real em múltiplos locais"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-48 p-3 rounded-xl bg-[#1e293b] border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-medium text-emerald-400">Ao vivo</span>
                  </div>
                  <p className="text-lg font-bold text-white">24 visitantes</p>
                  <p className="text-xs text-slate-400">em 8 locais agora</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="py-20 sm:py-28 bg-[#070b14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Tudo incluído — sem complementos
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Cada ferramenta abaixo está incluída no plano de R$ 249/mês para até 20 locais.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="group rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 p-6 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-sky-500/10 transition-colors">
                    <f.icon className="w-5 h-5 text-slate-300 group-hover:text-sky-400 transition-colors" />
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-medium text-sky-400 uppercase tracking-wider">
                    {f.highlight}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Um preço. Todos os locais. Sem surpresas.
            </h2>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />

              <div className="relative">
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs text-slate-400 ml-2">4.9/5 no G2</span>
                </div>

                <p className="text-sm text-sky-300 font-medium mb-2 uppercase tracking-wider">
                  SiteSafe Pro
                </p>

                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-6xl sm:text-7xl font-extrabold text-white">R$ 249</span>
                  <span className="text-xl text-slate-400">/mês</span>
                </div>

                <p className="text-sm text-slate-400 mb-8">
                  Cobrança mensal. Sem contrato anual.
                </p>

                <div className="space-y-3 text-left max-w-sm mx-auto mb-8">
                  {[
                    "Até 20 locais",
                    "Visitantes ilimitados",
                    "Todos os recursos inclusos",
                    "Teste gratuito de 14 dias",
                    "Sem cartão de crédito",
                    "Cancele quando quiser",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <Link
                  href="/signup?region=br"
                  className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
                >
                  Começar Teste Grátis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="mt-16 rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/5">
                    <th className="p-4 text-left text-xs text-slate-500 uppercase tracking-wider font-semibold">Cenário</th>
                    <th className="p-4 text-left text-xs text-emerald-400 uppercase tracking-wider font-semibold">SiteSafe</th>
                    <th className="p-4 text-left text-xs text-slate-500 uppercase tracking-wider font-semibold">Envoy</th>
                    <th className="p-4 text-left text-xs text-slate-500 uppercase tracking-wider font-semibold">SwipedOn</th>
                    <th className="p-4 text-left text-xs text-sky-400 uppercase tracking-wider font-semibold">Economia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {comparison.map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 text-sm font-medium text-white">{row.feature}</td>
                      <td className="p-4 text-sm font-bold text-emerald-400">{row.sitesafe}</td>
                      <td className="p-4 text-sm text-slate-400">{row.envoy}</td>
                      <td className="p-4 text-sm text-slate-400">{row.swipedon}</td>
                      <td className="p-4 text-sm font-bold text-sky-400">{row.savings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 sm:py-28 bg-[#070b14]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Pronto para substituir as fichas de papel?
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Teste gratuito de 14 dias. Sem cartão de crédito. Sem chamadas de vendas. 
            Configure seu primeiro local em 3 minutos.
          </p>
          <Link
            href="/signup?region=br"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
          >
            Começar Teste Grátis
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Sem cartão
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 14 dias grátis
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Cancele quando quiser
            </span>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-12 bg-[#0a0f1c]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600">
            © 2026 SiteSafe by TheSift. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}