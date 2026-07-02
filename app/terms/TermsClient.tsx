"use client";

import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import {
  Mail,
  FileText,
  Scale,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Database,
  CreditCard,
  User,
  Ban,
  RefreshCw,
  MessageSquare,
} from "lucide-react";

interface TermsClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    backToSite: "Back to site",
    title: "Terms of Service",
    lastUpdated: "Last updated: June 16, 2026",
    atAGlance: "At a glance",
    contactTitle: "Questions about these terms?",
    contactDesc:
      "We're happy to clarify anything. No legal jargon required — just ask.",
    contactEmail: "hello@thesift.space",
    footer: "© 2026 SiteSafe by TheSift. All rights reserved.",
    glanceItems: [
      "14-day free trial, no credit card required",
      "$49/month flat rate, cancel anytime",
      "You own your data, we just host it",
      "Stripe handles all payment processing",
      "30-day data deletion after cancellation",
      "LGPD compliant for Brazilian customers",
    ],
    sections: [
      {
        id: "acceptance",
        icon: CheckCircle2,
        title: "Acceptance of terms",
        paragraphs: [
          "By accessing or using SiteSafe, you agree to be bound by these Terms of Service. If you do not agree, do not use the service.",
        ],
      },
      {
        id: "description",
        icon: FileText,
        title: "Description of service",
        paragraphs: [
          "SiteSafe provides a digital visitor management platform that includes QR check-in, safety acknowledgment, visitor logging, badge printing, photo capture, document signing, blocklist management, emergency evacuation lists, lockdown mode, and related features.",
        ],
      },
      {
        id: "account",
        icon: User,
        title: "Account registration",
        paragraphs: [
          "You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.",
        ],
      },
      {
        id: "subscription",
        icon: CreditCard,
        title: "Subscription & payment",
        paragraphs: [
          "SiteSafe is offered on a subscription basis. The current pricing is $49/month (USD) for up to 20 sites and unlimited visitors. Payments are processed by Stripe.",
          "You may cancel at any time; cancellation takes effect at the end of the current billing period. No refunds are provided for partial months.",
        ],
      },
      {
        id: "trial",
        icon: Calendar,
        title: "Free trial",
        paragraphs: [
          "New accounts receive a 14-day free trial. No credit card is required to start the trial. At the end of the trial period, you must add a payment method to continue using the service.",
        ],
      },
      {
        id: "use",
        icon: AlertTriangle,
        title: "Acceptable use",
        paragraphs: [
          "You agree not to use SiteSafe for any unlawful purpose or in violation of any applicable laws or regulations. You are responsible for the accuracy and legality of the data you collect from your visitors, including obtaining any necessary consent.",
        ],
      },
      {
        id: "security",
        icon: Lock,
        title: "Security features",
        paragraphs: [
          "SiteSafe provides security tools such as blocklists, lockdown mode, and emergency evacuation lists. You agree to use these features responsibly and in compliance with applicable laws. SiteSafe is not liable for any consequences arising from the activation or deactivation of these features.",
        ],
      },
      {
        id: "ownership",
        icon: Database,
        title: "Data ownership",
        paragraphs: [
          "You retain ownership of all data you collect through SiteSafe, including visitor records, photos, signatures, and pre-screening answers. SiteSafe does not claim ownership of your data. You grant SiteSafe a limited license to host and process your data solely as necessary to provide the service.",
        ],
      },
      {
        id: "liability",
        icon: Scale,
        title: "Limitation of liability",
        paragraphs: [
          "SiteSafe is provided 'as is.' We make no warranties, express or implied, regarding the service's availability, accuracy, or suitability for a particular purpose. In no event shall SiteSafe be liable for any indirect, incidental, or consequential damages arising from your use of the service.",
        ],
      },
      {
        id: "law",
        icon: Scale,
        title: "Governing law",
        paragraphs: [
          "These Terms shall be governed by and construed in accordance with the laws of the United States and the State of New York, without regard to its conflict of law provisions. For customers located in Brazil, we also comply with applicable LGPD requirements.",
        ],
      },
      {
        id: "termination",
        icon: Ban,
        title: "Termination",
        paragraphs: [
          "We reserve the right to suspend or terminate your account for violation of these terms. Upon termination, your data will be deleted within 30 days.",
        ],
      },
      {
        id: "changes",
        icon: RefreshCw,
        title: "Changes to these terms",
        paragraphs: [
          "We may update these Terms of Service from time to time. We will notify you of material changes via email. Continued use after changes take effect constitutes acceptance.",
        ],
      },
      {
        id: "contact",
        icon: MessageSquare,
        title: "Contact",
        paragraphs: [
          "Questions about these terms? Reach out to us at",
        ],
      },
    ],
  },
  pt: {
    backToSite: "Voltar ao site",
    title: "Termos de Serviço",
    lastUpdated: "Última atualização: 16 de junho de 2026",
    atAGlance: "Resumo rápido",
    contactTitle: "Dúvidas sobre estes termos?",
    contactDesc:
      "Ficamos felizes em esclarecer qualquer coisa. Sem jargão jurídico — é só perguntar.",
    contactEmail: "hello@thesift.space",
    footer: "© 2026 SiteSafe by TheSift. Todos os direitos reservados.",
    glanceItems: [
      "Teste grátis de 14 dias, sem cartão de crédito",
      "Preço fixo de R$249/mês, cancele quando quiser",
      "Seus dados são seus, nós apenas os hospedamos",
      "A Stripe processa todos os pagamentos",
      "Exclusão de dados em 30 dias após cancelamento",
      "Conforme com a LGPD para clientes brasileiros",
    ],
    sections: [
      {
        id: "acceptance",
        icon: CheckCircle2,
        title: "Aceitação dos termos",
        paragraphs: [
          "Ao acessar ou usar a SiteSafe, você concorda em ficar vinculado a estes Termos de Serviço. Se não concordar, não use o serviço.",
        ],
      },
      {
        id: "description",
        icon: FileText,
        title: "Descrição do serviço",
        paragraphs: [
          "A SiteSafe fornece uma plataforma digital de gestão de visitantes que inclui check-in por QR, reconhecimento de segurança, registro de visitantes, impressão de crachás, captura de foto, assinatura de documentos, gestão de lista de bloqueio, listas de evacuação de emergência, modo lockdown e funcionalidades relacionadas.",
        ],
      },
      {
        id: "account",
        icon: User,
        title: "Cadastro de conta",
        paragraphs: [
          "Você deve fornecer informações precisas e completas ao criar uma conta. Você é responsável por manter a confidencialidade de suas credenciais de login e por todas as atividades que ocorrerem sob sua conta.",
        ],
      },
      {
        id: "subscription",
        icon: CreditCard,
        title: "Assinatura e pagamento",
        paragraphs: [
          "A SiteSafe é oferecida por assinatura. O preço atual é de R$249/mês para até 20 locais e visitantes ilimitados. Os pagamentos são processados pela Stripe.",
          "Você pode cancelar a qualquer momento; o cancelamento entra em vigor no final do período de cobrança atual. Não há reembolsos para meses parciais.",
        ],
      },
      {
        id: "trial",
        icon: Calendar,
        title: "Teste grátis",
        paragraphs: [
          "Novas contas recebem um teste grátis de 14 dias. Não é necessário cartão de crédito para iniciar o teste. Ao final do período de teste, você deve adicionar uma forma de pagamento para continuar usando o serviço.",
        ],
      },
      {
        id: "use",
        icon: AlertTriangle,
        title: "Uso aceitável",
        paragraphs: [
          "Você concorda em não usar a SiteSafe para qualquer finalidade ilícita ou em violação de quaisquer leis ou regulamentos aplicáveis. Você é responsável pela precisão e legalidade dos dados que coleta de seus visitantes, incluindo a obtenção de qualquer consentimento necessário.",
        ],
      },
      {
        id: "security",
        icon: Lock,
        title: "Funcionalidades de segurança",
        paragraphs: [
          "A SiteSafe fornece ferramentas de segurança como listas de bloqueio, modo lockdown e listas de evacuação de emergência. Você concorda em usar estas funcionalidades de forma responsável e em conformidade com as leis aplicáveis. A SiteSafe não se responsabiliza por quaisquer consequências decorrentes da ativação ou desativação destas funcionalidades.",
        ],
      },
      {
        id: "ownership",
        icon: Database,
        title: "Propriedade dos dados",
        paragraphs: [
          "Você mantém a propriedade de todos os dados que coleta através da SiteSafe, incluindo registros de visitantes, fotos, assinaturas e respostas de pré-triagem. A SiteSafe não reivindica propriedade sobre seus dados. Você concede à SiteSafe uma licença limitada para hospedar e processar seus dados apenas conforme necessário para fornecer o serviço.",
        ],
      },
      {
        id: "liability",
        icon: Scale,
        title: "Limitação de responsabilidade",
        paragraphs: [
          "A SiteSafe é fornecida 'no estado em que se encontra.' Não fazemos garantias, expressas ou implícitas, quanto à disponibilidade, precisão ou adequação do serviço para um propósito particular. Em nenhuma hipótese a SiteSafe será responsável por quaisquer danos indiretos, incidentais ou consequenciais decorrentes do seu uso do serviço.",
        ],
      },
      {
        id: "law",
        icon: Scale,
        title: "Lei aplicável",
        paragraphs: [
          "Estes Termos serão regidos e interpretados de acordo com as leis dos Estados Unidos e do Estado de Nova York, sem considerar suas disposições de conflito de leis. Para clientes localizados no Brasil, também cumprimos os requisitos aplicáveis da LGPD.",
        ],
      },
      {
        id: "termination",
        icon: Ban,
        title: "Rescisão",
        paragraphs: [
          "Reservamo-nos o direito de suspender ou encerrar sua conta por violação destes termos. Após o encerramento, seus dados serão excluídos em até 30 dias.",
        ],
      },
      {
        id: "changes",
        icon: RefreshCw,
        title: "Alterações nestes termos",
        paragraphs: [
          "Podemos atualizar estes Termos de Serviço periodicamente. Notificaremos você sobre alterações materiais por e-mail. O uso continuado após as alterações entrarem em vigor constitui aceitação.",
        ],
      },
      {
        id: "contact",
        icon: MessageSquare,
        title: "Contato",
        paragraphs: [
          "Dúvidas sobre estes termos? Entre em contato conosco em",
        ],
      },
    ],
  },
};

export default function TermsClient({ locale }: TermsClientProps) {
  const copy = t[locale];

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      <PublicHeader locale={locale} narrow />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* ─── Hero ─── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-4">
            <Scale className="w-6 h-6 text-sky-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            {copy.title}
          </h1>
          <p className="text-sm text-slate-500">
            {copy.lastUpdated}
          </p>
        </div>

        {/* ─── Quick Summary ─── */}
        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-6 mb-12">
          <h2 className="text-sm font-semibold text-white mb-4">{copy.atAGlance}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {copy.glanceItems.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Sections ─── */}
        <div className="space-y-6">
          {copy.sections.map((section, idx) => (
            <section
              key={section.id}
              id={section.id}
              className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden scroll-mt-24"
            >
              <div className="bg-white/[0.02] border-b border-white/5 px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-4 h-4 text-sky-400" />
                </div>
                <h2 className="text-sm font-semibold text-white">
                  {idx + 1}. {section.title}
                </h2>
              </div>
              <div className="p-6 text-sm text-slate-300 leading-relaxed space-y-3">
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {section.id === "contact" && (
                  <p>
                    <a
                      href={`mailto:${copy.contactEmail}`}
                      className="text-sky-400 hover:text-sky-300 transition-colors underline underline-offset-2"
                    >
                      {copy.contactEmail}
                    </a>
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* ─── Contact CTA ─── */}
        <div className="mt-12 rounded-xl border border-sky-500/20 bg-sky-500/5 p-8 text-center">
          <h2 className="text-sm font-semibold text-white mb-2">{copy.contactTitle}</h2>
          <p className="text-xs text-slate-400 mb-4 max-w-md mx-auto">
            {copy.contactDesc}
          </p>
          <a
            href={`mailto:${copy.contactEmail}`}
            className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            <Mail className="w-4 h-4" /> {copy.contactEmail}
          </a>
        </div>
      </main>

      {/* ─── Footer ─── */}
      <PublicFooter locale={locale} />
    </div>
  );
}