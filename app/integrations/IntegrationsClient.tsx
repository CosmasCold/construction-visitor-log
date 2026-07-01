"use client";

import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  FileSpreadsheet,
  Webhook,
  Code,
  Mail,
  MessageSquare,
  GitBranch,
  Star,
} from "lucide-react";

interface IntegrationsClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    home: "Home",
    features: "Features",
    startTrial: "Start free trial",
    heroBadge: "All included — no add-ons, no upsells",
    heroTitle: "Connect SiteSafe to",
    heroTitleGradient: "everything you use",
    heroSubtitle:
      "Slack alerts, Google Sheets sync, Zapier workflows, webhooks, and a full REST API. Every integration is included in the flat $49/mo plan.",
    noCodeTitle: "No-code integrations",
    noCodeDesc:
      "Slack, Google Sheets, and Zapier work out of the box. No developer needed. Connect your accounts in the dashboard and start receiving data in minutes.",
    noCodeSetup: "Setup time: under 5 minutes",
    devTitle: "Developer tools",
    devDesc:
      "Webhooks and REST API for custom integrations. Bearer token auth, JSON payloads, comprehensive documentation. Build exactly what your team needs.",
    devDocs: "Full API docs at /docs",
    ctaTitle: "All integrations included",
    ctaSubtitle:
      "No per-integration fees. No enterprise tiers. Every tool above is included in the flat $49/mo plan for up to 20 sites.",
    ctaPrimary: "Start Free Trial",
    ctaSecondary: "Browse API Docs",
    trustNoCard: "No credit card",
    trustFree: "14 days free",
    trustCancel: "Cancel anytime",
    customTitle: "Need a custom integration?",
    customDesc:
      "We build custom integrations for enterprise teams. Tell us what you need and we'll scope it.",
    customEmail: "hello@thesift.space",
    footer: "© 2026 SiteSafe by TheSift. All rights reserved.",
    integrations: [
      {
        name: "Slack",
        tagline: "Real-time visitor alerts in your team channel",
        description:
          "Get instant Slack notifications when a visitor checks in, checks out, or triggers a blocklist alert. Your security team knows immediately — no manual checking required.",
        link: "/integrations/slack",
        badge: "No-code",
        features: ["Check-in alerts", "Blocklist warnings", "Lockdown notifications", "Custom channel routing"],
        cta: "Set up",
      },
      {
        name: "Google Sheets",
        tagline: "Auto-sync visitor logs for custom reporting",
        description:
          "Every check-in, check-out, and pre-screening answer automatically syncs to a Google Sheet. Build custom dashboards, share with stakeholders, or archive for compliance.",
        link: "/integrations/google-sheets",
        badge: "No-code",
        features: ["Real-time sync", "Filtered exports", "Custom columns", "Shareable reports"],
        cta: "Set up",
      },
      {
        name: "Zapier",
        tagline: "Connect to 5,000+ apps without writing code",
        description:
          "Trigger workflows from visitor events. Add checked-in visitors to your CRM, send welcome emails, create support tickets, or update project management tools automatically.",
        link: "/integrations/zapier",
        badge: "No-code",
        features: ["5,000+ app connections", "Event-based triggers", "Multi-step workflows", "No developer needed"],
        cta: "Set up",
      },
      {
        name: "Webhooks",
        tagline: "Real-time events to any URL",
        description:
          "Send check-in, check-out, blocklist hit, and lockdown events to any endpoint. Build custom workflows, sync with your HR system, or trigger internal alerts.",
        link: "/docs",
        badge: "Developer",
        features: ["JSON payloads", "Event filtering", "Retry logic", "Signature verification"],
        cta: "View docs",
      },
      {
        name: "REST API",
        tagline: "Full programmatic access to your data",
        description:
          "Bearer token authentication, JSON responses, and comprehensive endpoints. Pull visitor logs, manage sites, export data, and build custom dashboards.",
        link: "/docs",
        badge: "Developer",
        features: ["Bearer token auth", "CSV/Excel/PDF exports", "Site management", "Visitor CRUD"],
        cta: "View docs",
      },
    ],
  },
  pt: {
    home: "Início",
    features: "Funcionalidades",
    startTrial: "Começar teste grátis",
    heroBadge: "Tudo incluso — sem complementos, sem upsells",
    heroTitle: "Conecte a SiteSafe a",
    heroTitleGradient: "tudo o que você usa",
    heroSubtitle:
      "Alertas Slack, sincronização Google Sheets, fluxos Zapier, webhooks e API REST completa. Cada integração está inclusa no plano fixo de R$249/mês.",
    noCodeTitle: "Integrações no-code",
    noCodeDesc:
      "Slack, Google Sheets e Zapier funcionam imediatamente. Sem desenvolvedor necessário. Conecte suas contas no painel e comece a receber dados em minutos.",
    noCodeSetup: "Tempo de configuração: menos de 5 minutos",
    devTitle: "Ferramentas para desenvolvedores",
    devDesc:
      "Webhooks e API REST para integrações personalizadas. Autenticação Bearer token, payloads JSON, documentação completa. Construa exatamente o que sua equipe precisa.",
    devDocs: "Documentação completa da API em /docs",
    ctaTitle: "Todas as integrações inclusas",
    ctaSubtitle:
      "Sem taxas por integração. Sem tiers enterprise. Cada ferramenta acima está inclusa no plano fixo de R$249/mês para até 20 locais.",
    ctaPrimary: "Começar Teste Grátis",
    ctaSecondary: "Ver Documentação da API",
    trustNoCard: "Sem cartão de crédito",
    trustFree: "14 dias grátis",
    trustCancel: "Cancele quando quiser",
    customTitle: "Precisa de uma integração personalizada?",
    customDesc:
      "Construímos integrações personalizadas para equipes enterprise. Nos diga o que você precisa e faremos o escopo.",
    customEmail: "hello@thesift.space",
    footer: "© 2026 SiteSafe by TheSift. Todos os direitos reservados.",
    integrations: [
      {
        name: "Slack",
        tagline: "Alertas de visitantes em tempo real no canal da equipe",
        description:
          "Receba notificações instantâneas no Slack quando um visitante faz check-in, check-out ou dispara um alerta da lista de bloqueio. Sua equipe de segurança sabe imediatamente — sem verificação manual.",
        link: "/integrations/slack",
        badge: "No-code",
        features: ["Alertas de check-in", "Avisos de lista de bloqueio", "Notificações de lockdown", "Roteamento de canal personalizado"],
        cta: "Configurar",
      },
      {
        name: "Google Sheets",
        tagline: "Sincronização automática de registros para relatórios personalizados",
        description:
          "Cada check-in, check-out e resposta de pré-triagem sincroniza automaticamente com uma planilha Google. Construa painéis personalizados, compartilhe com stakeholders ou arquive para compliance.",
        link: "/integrations/google-sheets",
        badge: "No-code",
        features: ["Sincronização em tempo real", "Exportações filtradas", "Colunas personalizadas", "Relatórios compartilháveis"],
        cta: "Configurar",
      },
      {
        name: "Zapier",
        tagline: "Conecte-se a mais de 5.000 apps sem escrever código",
        description:
          "Dispare fluxos a partir de eventos de visitantes. Adicione visitantes que fizeram check-in ao seu CRM, envie e-mails de boas-vindas, crie tickets de suporte ou atualize ferramentas de gestão de projetos automaticamente.",
        link: "/integrations/zapier",
        badge: "No-code",
        features: ["Mais de 5.000 conexões de apps", "Gatilhos baseados em eventos", "Fluxos multi-etapa", "Sem desenvolvedor necessário"],
        cta: "Configurar",
      },
      {
        name: "Webhooks",
        tagline: "Eventos em tempo real para qualquer URL",
        description:
          "Envie eventos de check-in, check-out, detecção na lista de bloqueio e lockdown para qualquer endpoint. Construa fluxos personalizados, sincronize com seu sistema de RH ou dispare alertas internos.",
        link: "/docs",
        badge: "Developer",
        features: ["Payloads JSON", "Filtragem de eventos", "Lógica de retry", "Verificação de assinatura"],
        cta: "Ver docs",
      },
      {
        name: "REST API",
        tagline: "Acesso programático completo aos seus dados",
        description:
          "Autenticação Bearer token, respostas JSON e endpoints abrangentes. Extraia registros de visitantes, gerencie locais, exporte dados e construa painéis personalizados.",
        link: "/docs",
        badge: "Developer",
        features: ["Auth Bearer token", "Exportações CSV/Excel/PDF", "Gestão de locais", "CRUD de visitantes"],
        cta: "Ver docs",
      },
    ],
  },
};

export default function IntegrationsClient({ locale }: IntegrationsClientProps) {
  const copy = t[locale];

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      <PublicHeader locale={locale} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* ─── Hero ─── */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-medium mb-6">
            <GitBranch className="w-3.5 h-3.5" />
            {copy.heroBadge}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            {copy.heroTitle}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              {copy.heroTitleGradient}
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {copy.heroSubtitle}
          </p>
        </div>

        {/* ─── Integration Cards ─── */}
        <div className="space-y-6">
          {copy.integrations.map((item, i) => (
            <div
              key={item.name}
              className="group rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 overflow-hidden transition-all duration-300"
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Left: Icon + Badge */}
                  <div className="flex items-start gap-4 lg:w-64 flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                      {item.name === "Slack" && <MessageSquare className="w-6 h-6 text-sky-400" />}
                      {item.name === "Google Sheets" && <FileSpreadsheet className="w-6 h-6 text-sky-400" />}
                      {item.name === "Zapier" && <Zap className="w-6 h-6 text-sky-400" />}
                      {item.name === "Webhooks" && <Webhook className="w-6 h-6 text-sky-400" />}
                      {item.name === "REST API" && <Code className="w-6 h-6 text-sky-400" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-white">{item.name}</h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                          item.badge === "No-code" 
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}>
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-sm text-sky-400">{item.tagline}</p>
                    </div>
                  </div>

                  {/* Middle: Description */}
                  <div className="flex-1">
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feature, j) => (
                        <span
                          key={j}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-400"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: CTA */}
                  <div className="lg:w-40 flex-shrink-0 flex lg:justify-end">
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all group-hover:border-white/20"
                    >
                      {item.cta}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── No-Code vs Developer ─── */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{copy.noCodeTitle}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              {copy.noCodeDesc}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {copy.noCodeSetup}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
              <Code className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{copy.devTitle}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              {copy.devDesc}
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {copy.devDocs}
            </div>
          </div>
        </div>

        {/* ─── CTA ─── */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
          
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {copy.ctaTitle}
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              {copy.ctaSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
              >
                {copy.ctaPrimary}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
              >
                {copy.ctaSecondary}
              </Link>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {copy.trustNoCard}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {copy.trustFree}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {copy.trustCancel}
              </span>
            </div>
          </div>
        </div>

        {/* ─── Custom Integration ─── */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8 text-center">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-5 h-5 text-sky-400" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">
            {copy.customTitle}
          </h2>
          <p className="text-sm text-slate-400 mb-4 max-w-md mx-auto">
            {copy.customDesc}
          </p>
          <a
            href={`mailto:${copy.customEmail}`}
            className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            <Mail className="w-4 h-4" />
            {copy.customEmail}
          </a>
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-12 bg-[#070b14]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600">
            {copy.footer}
          </p>
        </div>
      </footer>
    </div>
  );
}