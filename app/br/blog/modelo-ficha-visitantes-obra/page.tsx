import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Modelo Ficha de Visitantes para Obra [Gratis] — PDF para Imprimir",
  description:
    "Baixe gratis a ficha de controle de visitantes para obras. Conforme com auditorias de seguranca. PDF pronto para imprimir.",
  keywords: [
    "modelo ficha visitantes obra",
    "ficha de visitantes para obra",
    "controle de visitantes obra",
    "ficha visitante construcao civil",
    "registro de visitantes obra",
    "controle entrada saida visitantes",
    "check in visitantes obra",
    "NR18 visitantes obra",
    "ficha visitante obra PDF",
    "planilha controle visitantes obra",
  ],
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/blog/modelo-ficha-visitantes-obra",
  },
  openGraph: {
    title: "Modelo Ficha de Visitantes para Obra [Gratis] — PDF para Imprimir",
    description:
      "Baixe gratis a ficha de controle de visitantes para obras. Conforme com auditorias de seguranca. PDF pronto para imprimir.",
    type: "article",
    url: "https://sitesafe.thesift.space/br/blog/modelo-ficha-visitantes-obra",
    images: [
      {
        url: "https://sitesafe.thesift.space/og/blog-modelo-ficha-obra.png",
        width: 1200,
        height: 630,
        alt: "Modelo Ficha de Visitantes para Obra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modelo Ficha de Visitantes para Obra [Gratis] — PDF para Imprimir",
    description:
      "Baixe gratis a ficha de controle de visitantes para obras. Conforme com auditorias de seguranca.",
    images: ["https://sitesafe.thesift.space/og/blog-modelo-ficha-obra.png"],
  },
};

const faqs = [
  {
    q: "O que deve constar em uma ficha de visitantes para obra?",
    a: "Uma ficha completa deve conter: nome do visitante, empresa, CPF ou documento, data e hora de entrada e saida, motivo da visita, responsavel pela obra, confirmacao de EPI (capacete, botina, colete), e assinatura do visitante confirmando que recebeu instrucoes de seguranca.",
  },
  {
    q: "A NR18 exige controle de visitantes em obras?",
    a: "Sim. A Norma Regulamentadora 18 (NR-18) exige controle de acesso e identificacao de todas as pessoas que entram no canteiro de obras, incluindo visitantes, prestadores de servico e fiscalizacao. A ausencia desse controle e uma irregularidade grave em auditorias.",
  },
  {
    q: "Posso usar uma ficha em papel ou preciso de sistema digital?",
    a: "Ambos sao validos, mas o digital e superior. Fichas em papel se perdem, molham, ficam ilegiveis e nao permitem busca rapida. Sistemas digitais como o SiteSafe geram relatorios de auditoria em segundos, mantem backups automaticos e eliminam o risco de perda de dados.",
  },
  {
    q: "Quanto tempo devo guardar os registros de visitantes?",
    a: "A legislacao trabalhista brasileira e as normas de seguranca recomendam a retencao por pelo menos 3 anos. Registros digitais facilitam esse armazenamento sem ocupar espaco fisico.",
  },
  {
    q: "O modelo de ficha e gratuito?",
    a: "Sim. O PDF e gratuito e pode ser usado imediatamente. Se voce gerencia varias obras, considere um sistema digital para centralizar todos os registros em um unico painel.",
  },
  {
    q: "Como funciona o check-in digital para obras?",
    a: "O gestor cadastra a obra no sistema e gera um QR code unico. Visitantes escaneiam o QR com o celular, preenchem os dados e confirmam o uso de EPI. Tudo e registrado em tempo real no painel do gestor, com fotos, timestamps e relatorios prontos para auditoria.",
  },
];

export default function ModeloFichaVisitantesObra() {
  const faqSchema = {
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Modelo Ficha de Visitantes para Obra [Gratis] — PDF para Imprimir",
    description:
      "Baixe gratis a ficha de controle de visitantes para obras. Conforme com auditorias de seguranca. PDF pronto para imprimir.",
    image: "https://sitesafe.thesift.space/og/blog-modelo-ficha-obra.png",
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
    datePublished: "2026-07-08T00:00:00+00:00",
    dateModified: "2026-07-08T00:00:00+00:00",
    inLanguage: "pt-BR",
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Como Criar uma Ficha de Visitantes para Obra",
    description: "Guia passo a passo para criar uma ficha de controle de visitantes conforme a NR18.",
    totalTime: "PT10M",
    supply: ["Impressora", "Papel A4", "Caneta"],
    tool: ["Modelo PDF gratis", "Word ou Excel (opcional)"],
    step: [
      {
        "@type": "HowToStep",
        name: "Baixe o modelo",
        text: "Baixe nosso modelo PDF gratuito de ficha de visitantes para obra. Inclui campos para dados pessoais, EPI, e assinatura de seguranca.",
        url: "https://sitesafe.thesift.space/br/blog/modelo-ficha-visitantes-obra#step1",
      },
      {
        "@type": "HowToStep",
        name: "Imprima e coloque na obra",
        text: "Imprima varias copias e deixe na portaria ou sala de controle da obra. Tenha canetas disponiveis.",
        url: "https://sitesafe.thesift.space/br/blog/modelo-ficha-visitantes-obra#step2",
      },
      {
        "@type": "HowToStep",
        name: "Oriente os visitantes",
        text: "Solicite que todo visitante preencha nome, empresa, CPF, horario, motivo da visita e confirme o uso de EPI. A assinatura e obrigatoria.",
        url: "https://sitesafe.thesift.space/br/blog/modelo-ficha-visitantes-obra#step3",
      },
      {
        "@type": "HowToStep",
        name: "Armazene com seguranca",
        text: "Guarde as fichas preenchidas em local seco e seguro. A retencao minima recomendada e de 3 anos para fins de auditoria.",
        url: "https://sitesafe.thesift.space/br/blog/modelo-ficha-visitantes-obra#step4",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <PublicHeader locale="pt" />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-slate-50 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">
              Modelo Gratis — Atualizado Julho 2026
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Modelo Ficha de Visitantes para Obra [Gratis]
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
              Baixe gratis a ficha de controle de visitantes para obras. 
              Conforme com auditorias de seguranca e a NR18. PDF pronto para imprimir.
            </p>
          </div>
        </section>

        {/* Template Preview */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">O que o Modelo Inclui</h2>
          <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">FICHA DE CONTROLE DE VISITANTES</h3>
              <p className="text-sm text-slate-500">Obra: _______________________</p>
              <p className="text-sm text-slate-500">Responsavel: _______________________</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-800">
                    <th className="py-2 px-2 text-left font-semibold text-slate-700 border-r border-slate-300">Data</th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700 border-r border-slate-300">Nome</th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700 border-r border-slate-300">Empresa</th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700 border-r border-slate-300">CPF</th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700 border-r border-slate-300">Motivo</th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700 border-r border-slate-300">Entrada</th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700 border-r border-slate-300">Saida</th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700">Assinatura</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
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
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-800 font-semibold">CONFIRMACAO DE EPI:</p>
              <p className="text-xs text-amber-700">Capacete [ ] Botina [ ] Colete [ ] Oculos [ ] Luva [ ]</p>
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">
              Preview. Baixe o PDF completo abaixo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/templates/ficha-visitantes-obra.pdf"
              className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Baixar PDF Gratis
            </Link>
            <Link
              href="/br/signup"
              className="inline-flex items-center justify-center bg-slate-100 text-slate-700 font-semibold px-8 py-3 rounded-lg hover:bg-slate-200 transition"
            >
              Testar Versao Digital Gratis &rarr;
            </Link>
          </div>
        </section>

        {/* Como Usar */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Como Usar Este Modelo</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: "1", title: "Baixe", desc: "Baixe o PDF gratis e imprima quantas copias precisar." },
              { step: "2", title: "Coloque na Obra", desc: "Deixe na portaria ou sala de controle com canetas." },
              { step: "3", title: "Oriente", desc: "Solicite que todo visitante preencha e confirme EPI." },
              { step: "4", title: "Guarde", desc: "Armazene em local seguro por pelo menos 3 anos." },
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

        {/* Papel vs Digital */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Papel vs. Digital: O que a Auditoria Ve</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">O Problema do Papel</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Violacao de privacidade:</strong> Todos veem quem visitou antes</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Letra ilegivel:</strong> Impossivel ler apos 6 meses</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Sem busca:</strong> Encontrar um visitante exige folhear paginas</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Facil de perder:</strong> Chuva, lama ou descarte acidental</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Falha em auditoria:</strong> Sem timestamps ou prova de EPI</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Como o Digital Resolve</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Privado:</strong> Cada visitante ve apenas seu proprio registro</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Buscavel:</strong> Encontre qualquer visitante em segundos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Timestamps automaticos:</strong> Sem adivinhar horarios</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Backup na nuvem:</strong> Registros sobrevivem a qualquer situacao</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Pronto para auditoria:</strong> Exporte PDF/CSV em um clique</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* NR18 Compliance */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Conformidade com a NR18</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-3">O que a NR18 exige:</h3>
            <ul className="space-y-2 text-amber-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>Controle de acesso de todas as pessoas ao canteiro de obras</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>Identificacao de visitantes, prestadores e fiscalizacao</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>Comprovacao de uso de Equipamentos de Protecao Individual (EPI)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>Registro de instrucoes de seguranca fornecidas aos visitantes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>Retencao de registros por pelo menos 3 anos</span>
              </li>
            </ul>
          </div>
          <p className="text-slate-600">
            Nosso modelo de ficha inclui todos os campos necessarios para atender a NR18. 
            Para gestao de multiplas obras, o SiteSafe automatiza todo o processo com 
            check-in por QR code, confirmacao digital de EPI e relatorios de auditoria instantaneos.
          </p>
        </section>

        {/* Mid-page CTA */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Gerencia varias obras? O papel nao escala.
            </h3>
            <p className="text-blue-800 mb-4">
              2 horas/semana de trabalho administrativo por obra = ~R$800/mes em mao de obra. 
              Um sistema digital se paga na primeira semana.
            </p>
            <Link
              href="/br/signup"
              className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Testar SiteSafe Gratis por 14 Dias &rarr;
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
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
              O PDF e gratis e funciona imediatamente. Mas se voce gerencia 
              2+ obras, um sistema digital economiza horas toda semana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/templates/ficha-visitantes-obra.pdf"
                className="inline-block bg-white text-slate-900 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition"
              >
                Baixar PDF Gratis
              </Link>
              <Link
                href="/br/signup"
                className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-500 transition"
              >
                Testar SiteSafe Gratis
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter locale="pt" />
    </>
  );
}