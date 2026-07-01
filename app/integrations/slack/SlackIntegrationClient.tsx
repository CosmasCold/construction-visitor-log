"use client";

import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MessageSquare,
  Zap,
  Bell,
  Users,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

interface SlackIntegrationClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    backToIntegrations: "Integrations",
    startTrial: "Start free trial",
    heroBadge: "No-code integration · Setup in 2 minutes",
    heroTitle: "Get visitor alerts",
    heroTitleGradient: "in Slack — instantly",
    heroSubtitle:
      "Know the moment a visitor checks in, a blocked person attempts entry, or lockdown mode is triggered. No code required. No developers needed.",
    whatYouGetTitle: "What you'll receive in Slack",
    setupTitle: "Set up in 3 steps",
    previewTitle: "What the notification looks like",
    previewNote: "Actual notification includes visitor photo and safety briefing status.",
    ctaTitle: "Ready to get Slack alerts?",
    ctaSubtitle:
      "Start your free trial, connect Slack in 2 minutes, and never miss a visitor check-in again.",
    ctaPrimary: "Start Free Trial",
    ctaSecondary: "Try Live Demo",
    trustNoCard: "No credit card",
    trustFree: "14 days free",
    trustCancel: "Cancel anytime",
    moreIntegrations: "More integrations",
    supportTitle: "Need help with setup?",
    supportDesc:
      "We can walk you through the Slack webhook setup in under 5 minutes. No sales pitch.",
    supportEmail: "hello@thesift.space",
    footer: "© 2026 SiteSafe by TheSift. All rights reserved.",
    notificationTypes: [
      {
        icon: Bell,
        title: "Check-in alerts",
        description: "Instant notification when any visitor signs in, with name, company, and host.",
      },
      {
        icon: Lock,
        title: "Blocklist warnings",
        description: "Immediate alert if a flagged visitor attempts to check in at any site.",
      },
      {
        icon: Users,
        title: "Lockdown notifications",
        description: "Alert sent to security team when lockdown mode is activated or deactivated.",
      },
    ],
    steps: [
      {
        number: "01",
        title: "Create a Slack webhook",
        description:
          "In Slack, go to Settings & administration → Manage apps → Incoming Webhooks. Create a new webhook and choose the channel where you want notifications. Copy the webhook URL.",
        tip: "Pro tip: Create a dedicated #visitors channel so alerts don't clutter your main channels.",
      },
      {
        number: "02",
        title: "Paste it in SiteSafe",
        description:
          "Go to Settings in your SiteSafe dashboard, scroll to Slack Notifications, paste the URL, and click Save. That's it — no code, no developers, no IT ticket.",
        tip: "You can add multiple webhooks if different sites need different channels.",
      },
      {
        number: "03",
        title: "Test it live",
        description:
          "Click Send test message in Settings. You should see a message appear in your Slack channel. Then sign in a visitor — a notification will arrive instantly.",
        tip: "Test with a real check-in to see the full notification with visitor name, company, and host.",
      },
    ],
    slackPreview: {
      channel: "#visitors",
      botName: "SiteSafe",
      newVisitor: "● New visitor",
      at: "at",
      nameLabel: "Name:",
      companyLabel: "Company:",
      hostLabel: "Host:",
      timeLabel: "Time:",
      visitorName: "Sarah Johnson",
      visitorCompany: "Acme Corp",
      visitorHost: "Marcus Chen",
      visitorTime: "2:34 PM",
      siteName: "Headquarters",
    },
  },
  pt: {
    backToIntegrations: "Integrações",
    startTrial: "Começar teste grátis",
    heroBadge: "Integração no-code · Configuração em 2 minutos",
    heroTitle: "Receba alertas de visitantes",
    heroTitleGradient: "no Slack — instantaneamente",
    heroSubtitle:
      "Saiba no momento em que um visitante faz check-in, uma pessoa bloqueada tenta entrar ou o modo lockdown é ativado. Sem código. Sem desenvolvedores.",
    whatYouGetTitle: "O que você receberá no Slack",
    setupTitle: "Configure em 3 passos",
    previewTitle: "Como a notificação aparece",
    previewNote: "A notificação real inclui foto do visitante e status do briefing de segurança.",
    ctaTitle: "Pronto para receber alertas no Slack?",
    ctaSubtitle:
      "Comece seu teste grátis, conecte o Slack em 2 minutos e nunca mais perca um check-in de visitante.",
    ctaPrimary: "Começar Teste Grátis",
    ctaSecondary: "Experimentar Demonstração",
    trustNoCard: "Sem cartão de crédito",
    trustFree: "14 dias grátis",
    trustCancel: "Cancele quando quiser",
    moreIntegrations: "Mais integrações",
    supportTitle: "Precisa de ajuda na configuração?",
    supportDesc:
      "Podemos guiá-lo pela configuração do webhook do Slack em menos de 5 minutos. Sem pitch de vendas.",
    supportEmail: "hello@thesift.space",
    footer: "© 2026 SiteSafe by TheSift. Todos os direitos reservados.",
    notificationTypes: [
      {
        icon: Bell,
        title: "Alertas de check-in",
        description: "Notificação instantânea quando qualquer visitante faz check-in, com nome, empresa e anfitrião.",
      },
      {
        icon: Lock,
        title: "Avisos de lista de bloqueio",
        description: "Alerta imediato se um visitante sinalizado tenta fazer check-in em qualquer local.",
      },
      {
        icon: Users,
        title: "Notificações de lockdown",
        description: "Alerta enviado à equipe de segurança quando o modo lockdown é ativado ou desativado.",
      },
    ],
    steps: [
      {
        number: "01",
        title: "Crie um webhook do Slack",
        description:
          "No Slack, vá em Configurações e administração → Gerenciar apps → Webhooks de entrada. Crie um novo webhook e escolha o canal onde deseja receber notificações. Copie a URL do webhook.",
        tip: "Dica profissional: Crie um canal dedicado #visitantes para que os alertas não poluam seus canais principais.",
      },
      {
        number: "02",
        title: "Cole na SiteSafe",
        description:
          "Vá em Configurações no painel SiteSafe, role até Notificações Slack, cole a URL e clique em Salvar. É isso — sem código, sem desenvolvedores, sem ticket de TI.",
        tip: "Você pode adicionar múltiplos webhooks se diferentes locais precisarem de canais diferentes.",
      },
      {
        number: "03",
        title: "Teste ao vivo",
        description:
          "Clique em Enviar mensagem de teste em Configurações. Você verá uma mensagem aparecer no canal do Slack. Depois registre um visitante — uma notificação chegará instantaneamente.",
        tip: "Teste com um check-in real para ver a notificação completa com nome do visitante, empresa e anfitrião.",
      },
    ],
    slackPreview: {
      channel: "#visitantes",
      botName: "SiteSafe",
      newVisitor: "● Novo visitante",
      at: "em",
      nameLabel: "Nome:",
      companyLabel: "Empresa:",
      hostLabel: "Anfitrião:",
      timeLabel: "Horário:",
      visitorName: "Sarah Johnson",
      visitorCompany: "Acme Corp",
      visitorHost: "Marcus Chen",
      visitorTime: "14:34",
      siteName: "Matriz",
    },
  },
};

export default function SlackIntegrationClient({ locale }: SlackIntegrationClientProps) {
  const copy = t[locale];

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      <PublicHeader locale={locale} narrow />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        {/* ─── Hero ─── */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-medium mb-6">
            <MessageSquare className="w-3.5 h-3.5" />
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

        {/* ─── What You Get ─── */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6 text-center">
            {copy.whatYouGetTitle}
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {copy.notificationTypes.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-sky-400" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Setup Steps ─── */}
        <section>
          <h2 className="text-xl font-bold text-white mb-8 text-center">
            {copy.setupTitle}
          </h2>
          <div className="space-y-6">
            {copy.steps.map((step, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 sm:p-8 hover:bg-white/[0.06] transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-sky-400">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-sky-500/5 border border-sky-500/10">
                      <Zap className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-sky-300">{step.tip}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Slack Message Preview ─── */}
        <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
          
          <div className="relative">
            <h2 className="text-lg font-bold text-white mb-6 text-center">
              {copy.previewTitle}
            </h2>
            
            {/* Fake Slack message */}
            <div className="max-w-md mx-auto rounded-lg bg-[#1a1d21] border border-white/10 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1d21] border-b border-white/5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-slate-400">{copy.slackPreview.channel}</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-sky-500 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{copy.slackPreview.botName}</p>
                    <p className="text-xs text-slate-300 mt-1">
                      <span className="text-emerald-400 font-medium">{copy.slackPreview.newVisitor}</span> {copy.slackPreview.at} <strong className="text-white">{copy.slackPreview.siteName}</strong>
                    </p>
                    <div className="mt-2 p-2 rounded bg-white/5 text-xs text-slate-300 space-y-1">
                      <p><span className="text-slate-500">{copy.slackPreview.nameLabel}</span> {copy.slackPreview.visitorName}</p>
                      <p><span className="text-slate-500">{copy.slackPreview.companyLabel}</span> {copy.slackPreview.visitorCompany}</p>
                      <p><span className="text-slate-500">{copy.slackPreview.hostLabel}</span> {copy.slackPreview.visitorHost}</p>
                      <p><span className="text-slate-500">{copy.slackPreview.timeLabel}</span> {copy.slackPreview.visitorTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 text-center mt-4">
              {copy.previewNote}
            </p>
          </div>
        </section>

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
                href="/demo"
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

        {/* ─── Other Integrations ─── */}
        <div className="text-center">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            {copy.moreIntegrations}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/integrations/google-sheets"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-white/[0.03] text-sm text-slate-300 hover:bg-white/[0.06] transition-all"
            >
              Google Sheets
            </Link>
            <Link
              href="/integrations/zapier"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-white/[0.03] text-sm text-slate-300 hover:bg-white/[0.06] transition-all"
            >
              Zapier
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-white/[0.03] text-sm text-slate-300 hover:bg-white/[0.06] transition-all"
            >
              REST API
            </Link>
          </div>
        </div>

        {/* ─── Support ─── */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8 text-center">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-5 h-5 text-sky-400" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">{copy.supportTitle}</h2>
          <p className="text-sm text-slate-400 mb-4 max-w-md mx-auto">
            {copy.supportDesc}
          </p>
          <a
            href={`mailto:${copy.supportEmail}`}
            className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            <Mail className="w-4 h-4" />
            {copy.supportEmail}
          </a>
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-12 bg-[#070b14]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600">
            {copy.footer}
          </p>
        </div>
      </footer>
    </div>
  );
}