"use client";

import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import {
  ArrowRight,
  HelpCircle,
  MessageSquare,
  CreditCard,
  Lock,
  Zap,
  Mail,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface FAQClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    home: "Home",
    features: "Features",
    startTrial: "Start free trial",
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about SiteSafe. If you don't find your answer here,",
    emailUs: "email us directly",
    stillQuestions: "Still have questions?",
    stillQuestionsDesc:
      "No sales team. No call centers. Just the people who build the product, answering your email directly.",
    cta: "Start your free 14-day trial",
    trustNoCard: "No credit card",
    trustFree: "14 days free",
    trustCancel: "Cancel anytime",
    footer: "© 2026 SiteSafe by TheSift. All rights reserved.",
    categories: [
      {
        id: "getting-started",
        icon: Sparkles,
        label: "Getting Started",
        items: [
          {
            question: "What is SiteSafe?",
            answer:
              "SiteSafe is a modern visitor management system designed for mid-sized workplaces with multiple locations. It replaces paper logs with QR code check-in, mandatory safety briefings, real-time dashboards, and audit-ready exports — all for a flat $49/month.",
          },
          {
            question: "How does the 14-day free trial work?",
            answer:
              "When you sign up, you get full access to all features for 14 days — no credit card required. At the end of the trial, you can choose to subscribe or your account will simply expire. No automatic charges.",
          },
          {
            question: "What happens when the trial ends?",
            answer:
              "You'll receive a notification that your trial has ended. To continue using SiteSafe, you can add a payment method in your account settings. All your data is retained.",
          },
          {
            question: "Can I use SiteSafe on a single site?",
            answer:
              "Absolutely. Many customers use SiteSafe for just one location. The flat pricing still applies — $49/month for up to 20 sites, whether you have 1 or 20.",
          },
        ],
      },
      {
        id: "pricing",
        icon: CreditCard,
        label: "Pricing & Plans",
        items: [
          {
            question: "Is there a limit on the number of visitors?",
            answer:
              "No. The $49/month plan includes unlimited visitors across all your sites. The only limit is the number of sites — up to 20 sites per account.",
          },
          {
            question: "Can I cancel anytime?",
            answer:
              "Yes. You can cancel your subscription at any time from your account settings. There are no long-term contracts or cancellation fees.",
          },
        ],
      },
      {
        id: "features",
        icon: Zap,
        label: "Features & Setup",
        items: [
          {
            question: "What features are included?",
            answer:
              "Every feature we offer is included: QR check-in, mandatory safety acknowledgment, photo capture, pre-screening questions, watchlist/blocklist, real-time dashboard, host notifications, badge printing, lockdown mode, emergency evacuation list, audit exports (CSV/Excel/PDF), analytics, REST API, webhooks, and document signing. No add-ons or hidden fees.",
          },
          {
            question: "Do I need special hardware?",
            answer:
              "No. Visitors scan a QR code with their phone to check in. You can also print QR codes for each site if you prefer a physical sign. No iPad or kiosk required.",
          },
          {
            question: "What is the emergency evacuation list?",
            answer:
              "It's a one-click PDF that lists every person currently signed in across all your sites. In an emergency, you know exactly who is on site — without searching through paper logs.",
          },
          {
            question: "Can I export my data?",
            answer:
              "Yes. You can export visitor logs as CSV, Excel, or PDF at any time. Exports can be filtered by date, host, or company — ideal for audits and compliance.",
          },
          {
            question: "Does SiteSafe offer a REST API?",
            answer:
              "Yes. We provide a full REST API and webhooks so you can integrate SiteSafe with your own tools like Slack, HR systems, or custom dashboards. Documentation is available at /docs.",
          },
        ],
      },
      {
        id: "security",
        icon: Lock,
        label: "Security & Privacy",
        items: [
          {
            question: "Is SiteSafe secure?",
            answer:
              "Yes. All data is encrypted in transit and at rest. We use SSL encryption, and our authentication system is built on industry-standard practices. SiteSafe is GDPR/LGPD ready. We do not sell or share your data.",
          },
        ],
      },
      {
        id: "support",
        icon: MessageSquare,
        label: "Support",
        items: [
          {
            question: "How do I get support?",
            answer:
              "Support is available via email at hello@thesift.space. We typically respond within 24 hours. There's no sales team — just direct help from the people who build the product.",
          },
        ],
      },
    ],
  },
  pt: {
    home: "Início",
    features: "Funcionalidades",
    startTrial: "Começar teste grátis",
    title: "Perguntas Frequentes",
    subtitle: "Tudo o que você precisa saber sobre a SiteSafe. Se não encontrar sua resposta aqui,",
    emailUs: "nos envie um e-mail",
    stillQuestions: "Ainda tem dúvidas?",
    stillQuestionsDesc:
      "Sem time de vendas. Sem call centers. Apenas as pessoas que constroem o produto, respondendo seu e-mail diretamente.",
    cta: "Comece seu teste grátis de 14 dias",
    trustNoCard: "Sem cartão de crédito",
    trustFree: "14 dias grátis",
    trustCancel: "Cancele quando quiser",
    footer: "© 2026 SiteSafe by TheSift. Todos os direitos reservados.",
    categories: [
      {
        id: "getting-started",
        icon: Sparkles,
        label: "Começando",
        items: [
          {
            question: "O que é a SiteSafe?",
            answer:
              "A SiteSafe é um sistema moderno de gestão de visitantes projetado para locais de trabalho de médio porte com múltiplas unidades. Substitui registros em papel por check-in via QR code, briefings de segurança obrigatórios, painéis em tempo real e exportações prontas para auditoria — tudo por um valor fixo de R$249/mês.",
          },
          {
            question: "Como funciona o teste grátis de 14 dias?",
            answer:
              "Ao se cadastrar, você tem acesso completo a todas as funcionalidades por 14 dias — sem cartão de crédito. Ao final do teste, você pode escolher assinar ou sua conta simplesmente expirará. Sem cobranças automáticas.",
          },
          {
            question: "O que acontece quando o teste acaba?",
            answer:
              "Você receberá uma notificação de que seu teste encerrou. Para continuar usando a SiteSafe, você pode adicionar uma forma de pagamento nas configurações da conta. Todos os seus dados são mantidos.",
          },
          {
            question: "Posso usar a SiteSafe em um único local?",
            answer:
              "Com certeza. Muitos clientes usam a SiteSafe em apenas uma unidade. O preço fixo continua o mesmo — R$249/mês para até 20 locais, seja 1 ou 20.",
          },
        ],
      },
      {
        id: "pricing",
        icon: CreditCard,
        label: "Preços & Planos",
        items: [
          {
            question: "Há limite no número de visitantes?",
            answer:
              "Não. O plano de R$249/mês inclui visitantes ilimitados em todos os seus locais. O único limite é o número de locais — até 20 por conta.",
          },
          {
            question: "Posso cancelar a qualquer momento?",
            answer:
              "Sim. Você pode cancelar sua assinatura a qualquer momento nas configurações da conta. Não há contratos de longo prazo ou taxas de cancelamento.",
          },
        ],
      },
      {
        id: "features",
        icon: Zap,
        label: "Funcionalidades & Configuração",
        items: [
          {
            question: "Quais funcionalidades estão inclusas?",
            answer:
              "Todas as funcionalidades que oferecemos estão inclusas: check-in por QR, reconhecimento obrigatório de segurança, captura de foto, perguntas de pré-triagem, lista de bloqueio/watchlist, painel em tempo real, notificações aos anfitriões, impressão de crachás, modo lockdown, lista de evacuação de emergência, exportações de auditoria (CSV/Excel/PDF), análises, API REST, webhooks e assinatura digital de documentos. Sem complementos ou taxas ocultas.",
          },
          {
            question: "Preciso de hardware especial?",
            answer:
              "Não. Os visitantes escaneiam um QR code com o celular para fazer check-in. Você também pode imprimir QR codes para cada local se preferir uma placa física. Não é necessário iPad ou quiosque.",
          },
          {
            question: "O que é a lista de evacuação de emergência?",
            answer:
              "É um PDF gerado em um clique que lista todas as pessoas atualmente registradas em todos os seus locais. Em uma emergência, você sabe exatamente quem está no local — sem procurar em registros em papel.",
          },
          {
            question: "Posso exportar meus dados?",
            answer:
              "Sim. Você pode exportar registros de visitantes como CSV, Excel ou PDF a qualquer momento. As exportações podem ser filtradas por data, anfitrião ou empresa — ideal para auditorias e compliance.",
          },
          {
            question: "A SiteSafe oferece API REST?",
            answer:
              "Sim. Oferecemos uma API REST completa e webhooks para que você possa integrar a SiteSafe com suas próprias ferramentas como Slack, sistemas de RH ou painéis personalizados. A documentação está disponível em /docs.",
          },
        ],
      },
      {
        id: "security",
        icon: Lock,
        label: "Segurança & Privacidade",
        items: [
          {
            question: "A SiteSafe é segura?",
            answer:
              "Sim. Todos os dados são criptografados em trânsito e em repouso. Usamos criptografia SSL e nosso sistema de autenticação segue práticas padrão da indústria. A SiteSafe está pronta para GDPR/LGPD. Não vendemos nem compartilhamos seus dados.",
          },
        ],
      },
      {
        id: "support",
        icon: MessageSquare,
        label: "Suporte",
        items: [
          {
            question: "Como obtenho suporte?",
            answer:
              "O suporte está disponível por e-mail em hello@thesift.space. Normalmente respondemos em até 24 horas. Não há time de vendas — apenas ajuda direta das pessoas que constroem o produto.",
          },
        ],
      },
    ],
  },
};

export default function FAQClient({ locale }: FAQClientProps) {
  const copy = t[locale];

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      <PublicHeader locale={locale} narrow />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* ─── Hero ─── */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-4">
            <HelpCircle className="w-6 h-6 text-sky-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            {copy.title}
          </h1>
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            {copy.subtitle}{" "}
            <a
              href="mailto:hello@thesift.space"
              className="text-sky-400 hover:text-sky-300 transition-colors underline underline-offset-2"
            >
              {copy.emailUs}
            </a>
            .
          </p>
        </div>

        {/* ─── Category Quick Nav ─── */}
        <div className="flex flex-wrap justify-center gap-2">
          {copy.categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-slate-400 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all"
            >
              <cat.icon className="w-3.5 h-3.5" />
              {cat.label}
            </a>
          ))}
        </div>

        {/* ─── FAQ Sections ─── */}
        <div className="space-y-12">
          {copy.categories.map((cat) => (
            <section key={cat.id} id={cat.id} className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
                  <cat.icon className="w-4 h-4 text-sky-400" />
                </div>
                <h2 className="text-lg font-bold text-white">{cat.label}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.items.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 hover:bg-white/[0.06] hover:border-white/10 transition-all"
                  >
                    <h3 className="font-semibold text-white text-sm mb-2 leading-snug">
                      {faq.question}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* ─── Still Have Questions ─── */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-sky-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            {copy.stillQuestions}
          </h2>
          <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
            {copy.stillQuestionsDesc}
          </p>
          <a
            href="mailto:hello@thesift.space"
            className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            <Mail className="w-4 h-4" />
            hello@thesift.space
          </a>
        </div>

        {/* ─── CTA ─── */}
        <div className="text-center">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
          >
            {copy.cta}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
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