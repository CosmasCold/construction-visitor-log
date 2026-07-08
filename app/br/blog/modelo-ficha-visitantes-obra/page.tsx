import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Modelo Ficha de Visitantes para Obra [Grátis] — PDF para Imprimir",
  description:
    "Baixe grátis o modelo de ficha de visitantes para obra. Atende à NR18. Inclui nome, empresa, EPI, briefing de segurança e assinatura. PDF pronto para imprimir.",
  keywords: [
    "modelo ficha visitantes obra",
    "ficha de visitantes para obra",
    "controle de visitantes obra",
    "registro de visitantes obra",
    "lista de visitantes obra",
    "ficha visitante construção civil",
    "controle entrada saída obra",
    "modelo controle visitantes NR18",
    "planilha controle visitantes obra",
    "check in visitantes obra",
  ],
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/blog/modelo-ficha-visitantes-obra",
    languages: {
      en: "https://sitesafe.thesift.space/blog/visitor-sign-in-sheet-template",
      "pt-BR": "https://sitesafe.thesift.space/br/blog/modelo-ficha-visitantes-obra",
    },
  },
  openGraph: {
    title: "Modelo Ficha de Visitantes para Obra [Grátis] — PDF para Imprimir",
    description:
      "Baixe grátis o modelo de ficha de visitantes para obra. Atende à NR18. PDF pronto para imprimir.",
    url: "https://sitesafe.thesift.space/br/blog/modelo-ficha-visitantes-obra",
    locale: "pt_BR",
    images: [
      {
        url: "https://sitesafe.thesift.space/og/blog-modelo-ficha-visitantes.png",
        width: 1200,
        height: 630,
        alt: "Modelo Ficha de Visitantes para Obra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modelo Ficha de Visitantes para Obra [Grátis] — PDF para Imprimir",
    description:
      "Baixe grátis o modelo de ficha de visitantes para obra. Atende à NR18. PDF pronto para imprimir.",
    images: ["https://sitesafe.thesift.space/og/blog-modelo-ficha-visitantes.png"],
  },
};

const faqs = [
  {
    q: "O que é a ficha de visitantes para obra?",
    a: "A ficha de visitantes para obra é um documento obrigatório que registra todas as pessoas que entram e saem de um canteiro de obras. Deve conter nome, empresa, motivo da visita, horário de entrada e saída, e confirmação de que o visitante recebeu o briefing de segurança. É exigida pela NR18 para fins de auditoria e segurança.",
  },
  {
    q: "A NR18 exige controle de visitantes na obra?",
    a: "Sim. A NR18 (Norma Regulamentadora nº 18) estabelece que é proibido o ingresso ou permanência de pessoas no canteiro de obras sem que estejam asseguradas pelas medidas preventivas da norma. Isso inclui o controle de acesso de visitantes, fornecedores e prestadores de serviço, com registro de entrada e saída.",
  },
  {
    q: "Como fazer uma ficha de visitantes para obra?",
    a: "Você pode criar uma ficha manualmente em papel ou planilha, incluindo: nome completo, empresa, documento, motivo da visita, responsável pelo acompanhamento, horário de entrada e saída, confirmação de EPIs, e assinatura do visitante confirmando que recebeu as instruções de segurança. Ou baixe nosso modelo pronto em PDF.",
  },
  {
    q: "Quanto tempo devo guardar as fichas de visitantes da obra?",
    a: "Recomenda-se a guarda por no mínimo 3 anos. Em caso de acidente ou auditoria do Ministério do Trabalho, o registro de visitantes pode ser solicitado como prova de que a empresa cumpriu as medidas de segurança. Sistemas digitais facilitam esse armazenamento com backup automático.",
  },
  {
    q: "Papel ou digital: qual é melhor para controle de visitantes na obra?",
    a: "Papel funciona no curto prazo, mas tem problemas: letras ilegíveis, risco de perda ou dano, e violação de privacidade (qualquer um pode ler os dados dos outros visitantes). Digital elimina esses riscos, cria trilha de auditoria automática, e permite exportar relatórios em segundos para fiscalizações.",
  },
  {
    q: "O que acontece se eu não tiver controle de visitantes na obra?",
    a: "A falta de controle de visitantes pode resultar em multas durante auditorias da NR18, dificuldade em comprovar cumprimento de normas de segurança, e responsabilização civil em caso de acidentes envolvendo visitantes. A multa por descumprimento da NR18 pode chegar a R$ 5.000 a R$ 50.000 por infração.",
  },
];

function FAQSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ArticleSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Modelo Ficha de Visitantes para Obra [Grátis] — PDF para Imprimir",
    description:
      "Baixe grátis o modelo de ficha de visitantes para obra. Atende à NR18. PDF pronto para imprimir.",
    image: "https://sitesafe.thesift.space/og/blog-modelo-ficha-visitantes.png",
    author: {
      "@type": "Organization",
      name: "SiteSafe",
      url: "https://sitesafe.thesift.space",
    },
    publisher: {
      "@type": "Organization",
      name: "SiteSafe",
      logo: {
        "@type": "ImageObject",
        url: "https://sitesafe.thesift.space/logo.png",
      },
    },
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    inLanguage: "pt-BR",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function HowToSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Como Criar uma Ficha de Visitantes para Obra",
    description: "Passo a passo para criar e usar uma ficha de visitantes que atende à NR18.",
    totalTime: "PT10M",
    supply: ["Impressora", "Papel A4", "Caneta"],
    tool: ["Modelo PDF grátis", "Planilha Excel (opcional)"],
    step: [
      {
        "@type": "HowToStep",
        name: "Baixe o modelo",
        text: "Baixe nosso modelo PDF gratuito de ficha de visitantes para obra. Ele já inclui todos os campos exigidos pela NR18.",
        url: "https://sitesafe.thesift.space/br/blog/modelo-ficha-visitantes-obra#step1",
      },
      {
        "@type": "HowToStep",
        name: "Imprima e coloque na portaria",
        text: "Imprima quantas cópias forem necessárias e deixe na portaria ou na entrada do canteiro, junto com canetas.",
        url: "https://sitesafe.thesift.space/br/blog/modelo-ficha-visitantes-obra#step2",
      },
      {
        "@type": "HowToStep",
        name: "Exija preenchimento de todos os visitantes",
        text: "Todo visitante, fornecedor ou prestador deve preencher a ficha antes de entrar na obra. Não aceite fichas incompletas.",
        url: "https://sitesafe.thesift.space/br/blog/modelo-ficha-visitantes-obra#step3",
      },
      {
        "@type": "HowToStep",
        name: "Armazene com segurança",
        text: "Guarde as fichas preenchidas em local seguro e seco. Recomenda-se digitalização para backup. Prazo mínimo de guarda: 3 anos.",
        url: "https://sitesafe.thesift.space/br/blog/modelo-ficha-visitantes-obra#step4",
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ModeloFichaVisitantesObra() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <ArticleSchema />
      <HowToSchema />
      <PublicHeader locale="pt" />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-slate-50 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">
              Grátis &mdash; Atualizado Julho 2026
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Modelo Ficha de Visitantes para Obra
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
              Baixe grátis o modelo de ficha de visitantes que atende à NR18. 
              PDF pronto para imprimir. Inclui briefing de segurança, EPI e assinatura.
            </p>
          </div>
        </section>

        {/* Template Preview */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">O Que o Modelo Inclui</h2>
          <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">Ficha de Controle de Visitantes</h3>
              <p className="text-sm text-slate-500">Obra / Canteiro: _______________________</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-800">
                    <th className="py-2 px-2 text-left font-semibold text-slate-700 border-r border-slate-300">Data</th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700 border-r border-slate-300">Nome</th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700 border-r border-slate-300">Empresa</th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700 border-r border-slate-300">CPF/RG</th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700 border-r border-slate-300">Motivo</th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700 border-r border-slate-300">Entrada</th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700 border-r border-slate-300">Saída</th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700">Assinatura</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((i) => (
                    <tr key={i} className="border-b border-slate-200">
                      <td className="py-4 px-2 border-r border-slate-200">&nbsp;</td>
                      <td className="py-4 px-2 border-r border-slate-200">&nbsp;</td>
                      <td className="py-4 px-2 border-r border-slate-200">&nbsp;</td>
                      <td className="py-4 px-2 border-r border-slate-200">&nbsp;</td>
                      <td className="py-4 px-2 border-r border-slate-200">&nbsp;</td>
                      <td className="py-4 px-2 border-r border-slate-200">&nbsp;</td>
                      <td className="py-4 px-2 border-r border-slate-200">&nbsp;</td>
                      <td className="py-4 px-2">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-slate-50 rounded border border-slate-200 text-xs text-slate-500">
              <strong>Declaração de segurança:</strong> Declaro que recebi as instruções de segurança do canteiro, 
              estou usando os EPIs obrigatórios (capacete, botina, colete) e cumprirei todas as normas da NR18.
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">
              Pré-visualização. Baixe o PDF completo abaixo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/templates/ficha-visitantes-obra.pdf"
              className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Baixar PDF Grátis
            </Link>
            <Link
              href="/br/signup"
              className="inline-flex items-center justify-center bg-slate-100 text-slate-700 font-semibold px-8 py-3 rounded-lg hover:bg-slate-200 transition"
            >
              Versão Digital Grátis &rarr;
            </Link>
          </div>
        </section>

        {/* Como Usar */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Como Usar Este Modelo</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: "1", title: "Baixe", desc: "Faça o download do PDF gratuito. Não precisa de cadastro." },
              { step: "2", title: "Imprima", desc: "Imprima quantas cópias precisar e deixe na portaria da obra." },
              { step: "3", title: "Exija", desc: "Todo visitante deve preencher antes de entrar no canteiro." },
              { step: "4", title: "Guarde", desc: "Armazene por no mínimo 3 anos. Faça backup digital se possível." },
            ].map((item) => (
              <div key={item.step} id={`step${item.step}`} className="border border-slate-200 rounded-lg p-5 text-center">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  {item.step}
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* O Que a NR18 Exige */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">O Que a NR18 Exige para Visitantes</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            A NR18 (Norma Regulamentadora nº 18) estabelece diretrizes de segurança para a indústria da construção civil. 
            Quanto ao controle de visitantes, a norma exige que toda pessoa que entre no canteiro de obras 
            esteja sujeita às medidas preventivas de segurança.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-slate-200 rounded-lg p-5">
              <h3 className="font-semibold text-slate-900 mb-3">Itens Obrigatórios na Ficha</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Nome completo do visitante</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Empresa ou organização</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Documento de identificação (CPF/RG)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Motivo da visita e área acessada</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Horário de entrada e saída</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Nome do responsável pelo acompanhamento</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Confirmação de uso de EPIs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Assinatura confirmando briefing de segurança</span>
                </li>
              </ul>
            </div>
            <div className="border border-slate-200 rounded-lg p-5">
              <h3 className="font-semibold text-slate-900 mb-3">EPIs Obrigatórios para Visitantes</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Capacete de segurança com aba frontal</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Botina com biqueira de aço</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Colete refletivo ou alta visibilidade</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Óculos de proteção (quando necessário)</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Luvas de proteção (quando necessário)</span>
                </li>
              </ul>
              <p className="text-xs text-slate-400 mt-3">
                Fonte: NR18, Anexo I — Equipamentos de Proteção Individual.
              </p>
            </div>
          </div>
        </section>

        {/* Papel vs Digital */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Papel vs Digital: Qual Escolher?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-3 px-4 text-left font-semibold text-slate-700">Critério</th>
                  <th className="py-3 px-4 text-left font-semibold text-slate-700">Ficha em Papel</th>
                  <th className="py-3 px-4 text-left font-semibold text-slate-700">Sistema Digital</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Custo inicial", "Grátis (apenas papel)", "R$ 249/mês (SiteSafe)"],
                  ["Custo a longo prazo", "Alto (tempo, armazenamento, risco)", "Fixo e previsível"],
                  ["Legibilidade", "Ruim (letra à mão)", "Perfeita (digitado)"],
                  ["Busca de registros", "Manual, demorado", "Instantânea por nome/data"],
                  ["Backup", "Nenhum (risco de perda)", "Automático na nuvem"],
                  ["Privacidade (LGPD)", "Violação (dados visíveis)", "Criptografado, acesso restrito"],
                  ["Relatório para auditoria", "Fotocópia manual", "PDF/CSV em 10 segundos"],
                  ["Foto do visitante", "Não", "Sim, automaticamente"],
                  ["Notificação ao responsável", "Não", "Sim, por email/SMS"],
                  ["Lista de evacuação", "Manual, demorado", "1 clique, em tempo real"],
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium text-slate-900">{row[0]}</td>
                    <td className="py-3 px-4 text-slate-600">{row[1]}</td>
                    <td className="py-3 px-4 text-green-700 font-medium">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Ainda usando papel? Você está pagando mais do que imagina.
            </h3>
            <p className="text-blue-800 mb-4">
              2 horas/semana de trabalho administrativo por obra = cerca de R$ 800/mês em mão de obra. 
              Um sistema digital se paga sozinho na primeira semana.
            </p>
            <Link
              href="/br/signup"
              className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Teste Grátis por 14 Dias &rarr;
            </Link>
          </div>
        </section>

        {/* Quem Precisa */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quem Precisa Deste Modelo?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "Construtoras", desc: "Controle de fornecedores, inspetores e visitas técnicas em múltiplas obras." },
              { title: "Incorporadoras", desc: "Visitas de clientes às unidades em construção. Registro para segurança e marketing." },
              { title: "Empreiteiras", desc: "Controle de mão de obra terceirizada e visitas de auditoria." },
              { title: "Arquitetos e Engenheiros", desc: "Visitas técnicas a obras de clientes. Comprovação de presença." },
              { title: "Gestores de Facilities", desc: "Controle de prestadores de serviço em prédios comerciais." },
              { title: "Indústrias", desc: "Acesso de fornecedores, auditores e visitantes à planta fabril." },
            ].map((item) => (
              <div key={item.title} className="border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Leia Também</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/br/blog/melhor-sistema-controle-visitantes-2026" className="block border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:bg-blue-50 transition">
              <h4 className="font-semibold text-slate-900 mb-1">Melhor Sistema de Controle de Visitantes 2026</h4>
              <p className="text-sm text-slate-500">Comparativo completo com preços reais para o mercado brasileiro.</p>
            </Link>
            <Link href="/br/blog/check-in-digital-obras" className="block border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:bg-blue-50 transition">
              <h4 className="font-semibold text-slate-900 mb-1">Check-in Digital para Obras</h4>
              <p className="text-sm text-slate-500">Como funciona o check-in por QR code em canteiros de obras.</p>
            </Link>
            <Link href="/blog/visitor-sign-in-sheet-template" className="block border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:bg-blue-50 transition">
              <h4 className="font-semibold text-slate-900 mb-1">Visitor Sign-In Sheet Template (EN)</h4>
              <p className="text-sm text-slate-500">English version of the visitor log template for international teams.</p>
            </Link>
            <Link href="/blog/envoy-alternative" className="block border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:bg-blue-50 transition">
              <h4 className="font-semibold text-slate-900 mb-1">Envoy Alternative — SiteSafe Comparison</h4>
              <p className="text-sm text-slate-500">See how SiteSafe compares to Envoy for multi-location teams.</p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Perguntas Frequentes</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-100 pb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-4xl mx-auto px-6 py-12 mb-16">
          <div className="bg-slate-900 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Baixe o modelo. Ou pule direto para o digital.
            </h2>
            <p className="text-slate-300 mb-6 max-w-xl mx-auto">
              O PDF é grátis e funciona imediatamente. Mas se você gerencia 2+ obras, 
              um sistema digital economiza horas toda semana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/templates/ficha-visitantes-obra.pdf"
                className="inline-block bg-white text-slate-900 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition"
              >
                Baixar PDF Grátis
              </Link>
              <Link
                href="/br/signup"
                className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-500 transition"
              >
                Testar SiteSafe Grátis
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter locale="pt" />
    </>
  );
}