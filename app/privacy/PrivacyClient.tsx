"use client";

import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import {
  ArrowRight,
  Mail,
  Lock,
  Database,
  Eye,
  Trash2,
  ExternalLink,
  FileText,
  ShieldCheck,
} from "lucide-react";

interface PrivacyClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    backToSite: "Back to site",
    title: "Privacy Policy",
    lastUpdated: "Last updated: June 16, 2026",
    encryption: "Encryption",
    compliance: "Compliance",
    infrastructure: "Infrastructure",
    responseTime: "Response Time",
    changesTitle: "Changes to this policy",
    changesContent:
      "We may update this Privacy Policy from time to time. We will notify you of any material changes by email or via a notice on our website. Continued use of SiteSafe after changes take effect constitutes acceptance of the updated policy.",
    questionsTitle: "Questions about your data?",
    questionsDesc:
      "We're transparent about how we handle your information. If anything here is unclear, just ask.",
    email: "hello@thesift.space",
    footer: "© 2026 SiteSafe by TheSift. Your data belongs to you.",
    sections: [
      {
        id: "collect",
        icon: Eye,
        title: "What we collect",
        paragraphs: [
          "When you create a SiteSafe account, we collect your name, email address, company name, and payment details. Payment processing is handled entirely by Stripe — we never see or store your full card number.",
          "When visitors check in at your sites, we store the data you choose to collect: full name, company, phone (optional), email (optional), host name, safety acknowledgment, pre-screening answers, photos, and digital signatures.",
        ],
        subsections: [
          {
            title: "Visitor Photos",
            content:
              "Stored on Vercel Blob Storage. Deleted when the visitor record is deleted. Never shared, sold, or used for any purpose other than identification and badge printing.",
          },
          {
            title: "Digital Signatures",
            content:
              "Stored with the visitor record. Deleted alongside the record when removed. Not used for any other purpose.",
          },
          {
            title: "Blocklist Entries",
            content:
              "Names, emails, or phone numbers added to your watchlist. Only used to compare against new check-ins. Never shared or sold.",
          },
        ],
      },
      {
        id: "use",
        icon: Lock,
        title: "How we use your data",
        paragraphs: [
          "We use your account information to provide the SiteSafe service: creating and managing your account, sending service-related emails, and processing payments. We use visitor data solely to power the check-in and visitor management features you enable. We do not mine, sell, or advertise based on your data. Period.",
        ],
      },
      {
        id: "security",
        icon: Database,
        title: "Data storage & security",
        paragraphs: [
          "All data is stored on secure servers provided by Vercel and Neon (PostgreSQL). Data is encrypted in transit using SSL/TLS and at rest using AES-256.",
        ],
        tags: ["SSL/TLS Encryption", "AES-256 at Rest", "Content Security Policy", "HSTS", "SOC 2 Type II Infrastructure"],
      },
      {
        id: "retention",
        icon: Trash2,
        title: "Data retention & deletion",
        paragraphs: [
          "Visitor records are retained for as long as your account is active. You can delete individual visitor records or entire sites at any time from your dashboard. When a visitor record is deleted, all associated data — including photos and signatures — is permanently removed. If you cancel your account, all data is deleted within 30 days.",
        ],
      },
      {
        id: "third-party",
        icon: ExternalLink,
        title: "Third-party services",
        paragraphs: [
          "We use the following services to operate SiteSafe. Each has its own privacy policy:",
        ],
        services: [
          { name: "Stripe", purpose: "Payment processing", url: "https://stripe.com/privacy" },
          { name: "Brevo", purpose: "Transactional email", url: "https://www.brevo.com/legal/privacypolicy/" },
          { name: "Vercel", purpose: "Hosting and analytics", url: "https://vercel.com/legal/privacy-policy" },
          { name: "Neon", purpose: "PostgreSQL database hosting", url: "https://neon.tech/privacy" },
        ],
        servicesNote:
          "We do not use third-party advertising trackers or analytics that follow users across the web.",
      },
      {
        id: "rights",
        icon: ShieldCheck,
        title: "Your rights",
        paragraphs: [
          "Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data, or to object to or restrict certain processing.",
        ],
        lgpdNote:
          "If you are located in Brazil, you have additional rights under the Lei Geral de Proteção de Dados. We respond to all requests in compliance with LGPD guidelines.",
        rightsContact:
          "To exercise your rights, contact us at",
        rightsResponse: "We respond within 30 days.",
      },
    ],
  },
  pt: {
    backToSite: "Voltar ao site",
    title: "Política de Privacidade",
    lastUpdated: "Última atualização: 16 de junho de 2026",
    encryption: "Criptografia",
    compliance: "Compliance",
    infrastructure: "Infraestrutura",
    responseTime: "Tempo de Resposta",
    changesTitle: "Alterações nesta política",
    changesContent:
      "Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações materiais por e-mail ou através de um aviso em nosso site. O uso continuado da SiteSafe após as alterações entrarem em vigor constitui aceitação da política atualizada.",
    questionsTitle: "Dúvidas sobre seus dados?",
    questionsDesc:
      "Somos transparentes sobre como tratamos suas informações. Se algo aqui não estiver claro, é só perguntar.",
    email: "hello@thesift.space",
    footer: "© 2026 SiteSafe by TheSift. Seus dados pertencem a você.",
    sections: [
      {
        id: "collect",
        icon: Eye,
        title: "O que coletamos",
        paragraphs: [
          "Ao criar uma conta SiteSafe, coletamos seu nome, endereço de e-mail, nome da empresa e dados de pagamento. O processamento de pagamentos é feito inteiramente pela Stripe — nunca vemos ou armazenamos o número completo do seu cartão.",
          "Quando visitantes fazem check-in em seus locais, armazenamos os dados que você escolhe coletar: nome completo, empresa, telefone (opcional), e-mail (opcional), nome do anfitrião, reconhecimento de segurança, respostas de pré-triagem, fotos e assinaturas digitais.",
        ],
        subsections: [
          {
            title: "Fotos de Visitantes",
            content:
              "Armazenadas no Vercel Blob Storage. Excluídas quando o registro do visitante é excluído. Nunca compartilhadas, vendidas ou usadas para qualquer finalidade além de identificação e impressão de crachás.",
          },
          {
            title: "Assinaturas Digitais",
            content:
              "Armazenadas com o registro do visitante. Excluídas junto com o registro quando removido. Não usadas para nenhuma outra finalidade.",
          },
          {
            title: "Entradas na Lista de Bloqueio",
            content:
              "Nomes, e-mails ou telefones adicionados à sua lista de monitoramento. Usados apenas para comparar com novos check-ins. Nunca compartilhados ou vendidos.",
          },
        ],
      },
      {
        id: "use",
        icon: Lock,
        title: "Como usamos seus dados",
        paragraphs: [
          "Usamos suas informações de conta para fornecer o serviço SiteSafe: criar e gerenciar sua conta, enviar e-mails relacionados ao serviço e processar pagamentos. Usamos os dados de visitantes exclusivamente para alimentar os recursos de check-in e gestão de visitantes que você ativa. Não mineramos, vendemos ou fazemos propaganda baseada nos seus dados. Ponto final.",
        ],
      },
      {
        id: "security",
        icon: Database,
        title: "Armazenamento e segurança de dados",
        paragraphs: [
          "Todos os dados são armazenados em servidores seguros fornecidos pela Vercel e Neon (PostgreSQL). Os dados são criptografados em trânsito usando SSL/TLS e em repouso usando AES-256.",
        ],
        tags: ["Criptografia SSL/TLS", "AES-256 em Repouso", "Política de Segurança de Conteúdo", "HSTS", "Infraestrutura SOC 2 Tipo II"],
      },
      {
        id: "retention",
        icon: Trash2,
        title: "Retenção e exclusão de dados",
        paragraphs: [
          "Os registros de visitantes são mantidos enquanto sua conta estiver ativa. Você pode excluir registros individuais de visitantes ou locais inteiros a qualquer momento pelo painel. Quando um registro de visitante é excluído, todos os dados associados — incluindo fotos e assinaturas — são removidos permanentemente. Se você cancelar sua conta, todos os dados são excluídos em até 30 dias.",
        ],
      },
      {
        id: "third-party",
        icon: ExternalLink,
        title: "Serviços de terceiros",
        paragraphs: [
          "Usamos os seguintes serviços para operar a SiteSafe. Cada um tem sua própria política de privacidade:",
        ],
        services: [
          { name: "Stripe", purpose: "Processamento de pagamentos", url: "https://stripe.com/privacy" },
          { name: "Brevo", purpose: "E-mail transacional", url: "https://www.brevo.com/legal/privacypolicy/" },
          { name: "Vercel", purpose: "Hospedagem e análises", url: "https://vercel.com/legal/privacy-policy" },
          { name: "Neon", purpose: "Hospedagem de banco de dados PostgreSQL", url: "https://neon.tech/privacy" },
        ],
        servicesNote:
          "Não usamos rastreadores de publicidade de terceiros ou análises que sigam usuários pela web.",
      },
      {
        id: "rights",
        icon: ShieldCheck,
        title: "Seus direitos",
        paragraphs: [
          "Dependendo da sua jurisdição, você pode ter o direito de acessar, corrigir ou excluir seus dados pessoais, ou de se opor a ou restringir certos processamentos.",
        ],
        lgpdNote:
          "Se você está localizado no Brasil, tem direitos adicionais sob a Lei Geral de Proteção de Dados. Respondemos a todas as solicitações em conformidade com as diretrizes da LGPD.",
        rightsContact:
          "Para exercer seus direitos, entre em contato conosco em",
        rightsResponse: "Respondemos em até 30 dias.",
      },
    ],
  },
};

export default function PrivacyClient({ locale }: PrivacyClientProps) {
  const copy = t[locale];

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      <PublicHeader locale={locale} narrow />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* ─── Hero ─── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-4">
            <Lock className="w-6 h-6 text-sky-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            {copy.title}
          </h1>
          <p className="text-sm text-slate-500">
            {copy.lastUpdated}
          </p>
        </div>

        {/* ─── Quick Trust Bar ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {[
            { label: copy.encryption, value: "AES-256", icon: Lock },
            { label: copy.compliance, value: "LGPD Ready", icon: ShieldCheck },
            { label: copy.infrastructure, value: "SOC 2 Type II", icon: Database },
            { label: copy.responseTime, value: locale === "pt" ? "Em até 30 Dias" : "Within 30 Days", icon: Mail },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mx-auto mb-2">
                <item.icon className="w-4 h-4 text-sky-400" />
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium mb-1">{item.label}</p>
              <p className="text-xs font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        {/* ─── Sections ─── */}
        <div className="space-y-8">
          {copy.sections.map((section, idx) => (
            <section
              key={section.id}
              id={section.id}
              className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden"
            >
              <div className="bg-white/[0.02] border-b border-white/5 px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
                  <section.icon className="w-4 h-4 text-sky-400" />
                </div>
                <h2 className="text-sm font-semibold text-white">
                  {idx + 1}. {section.title}
                </h2>
              </div>
              <div className="p-6 text-sm text-slate-300 leading-relaxed">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className={i < section.paragraphs.length - 1 ? "mb-4" : ""}>
                    {p}
                  </p>
                ))}

                {section.subsections && (
                  <div className="space-y-3 mt-4">
                    {section.subsections.map((sub, i) => (
                      <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                        <h4 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-sky-400" /> {sub.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {sub.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {section.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {section.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-medium text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {section.services && (
                  <>
                    <div className="space-y-2 mt-4">
                      {section.services.map((service) => (
                        <a
                          key={service.name}
                          href={service.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group"
                        >
                          <div>
                            <p className="text-sm font-medium text-white">{service.name}</p>
                            <p className="text-xs text-slate-500">{service.purpose}</p>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                        </a>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-slate-500">
                      {section.servicesNote}
                    </p>
                  </>
                )}

                {section.lgpdNote && (
                  <>
                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 mt-4">
                      <p className="text-xs text-emerald-300 leading-relaxed">
                        <strong>LGPD (Brazil):</strong> {section.lgpdNote}
                      </p>
                    </div>
                    <p className="mt-4">
                      {section.rightsContact}{" "}
                      <a href={`mailto:${copy.email}`} className="text-sky-400 hover:underline">
                        {copy.email}
                      </a>. {section.rightsResponse}
                    </p>
                  </>
                )}
              </div>
            </section>
          ))}

          {/* Changes & Contact */}
          <section className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
            <div className="bg-white/[0.02] border-b border-white/5 px-6 py-4">
              <h2 className="text-sm font-semibold text-white">7. {copy.changesTitle}</h2>
            </div>
            <div className="p-6 text-sm text-slate-300 leading-relaxed">
              <p>{copy.changesContent}</p>
            </div>
          </section>

          <section className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-8 text-center">
            <h2 className="text-sm font-semibold text-white mb-2">{copy.questionsTitle}</h2>
            <p className="text-xs text-slate-400 mb-4 max-w-md mx-auto">
              {copy.questionsDesc}
            </p>
            <a
              href={`mailto:${copy.email}`}
              className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
            >
              <Mail className="w-4 h-4" /> {copy.email}
            </a>
          </section>
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-8 bg-[#070b14]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600">
            {copy.footer}
          </p>
        </div>
      </footer>
    </div>
  );
}