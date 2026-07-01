"use client";

import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";

interface ZapierIntegrationClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    title: "Zapier & Make Integration",
    subtitle: "Connect SiteSafe to 5,000+ apps without writing code.",
    step1Title: "Step 1 – Get your API key",
    step1Desc: "In SiteSafe, go to",
    settings: "Settings",
    step1Desc2: "and copy your API key.",
    step2Title: "Step 2 – Create a Zap in Zapier",
    step2List: [
      "Choose",
      "as the trigger (e.g., every 15 minutes).",
      "Add an action – search for",
      "and choose",
      "Set the URL to",
      "Under",
      "add:",
      "Test the step – you should see your visitor data.",
      "Add any other action (e.g., Google Sheets, Slack, email) using the visitor data.",
    ],
    schedule: "Schedule",
    webhooksByZapier: "Webhooks by Zapier",
    get: "GET",
    headers: "Headers",
    step3Title: "Step 3 – Turn on your Zap",
    step3Desc: "Your Zap will now run on schedule and pull new visitors into your chosen apps.",
    helpTitle: "Need help?",
    helpDesc: "Check the",
    apiDocs: "API docs",
    helpDesc2: "or email us at",
    email: "hello@thesift.space",
  },
  pt: {
    title: "Integração Zapier & Make",
    subtitle: "Conecte a SiteSafe a mais de 5.000 apps sem escrever código.",
    step1Title: "Passo 1 – Obtenha sua chave API",
    step1Desc: "Na SiteSafe, vá em",
    settings: "Configurações",
    step1Desc2: "e copie sua chave API.",
    step2Title: "Passo 2 – Crie um Zap no Zapier",
    step2List: [
      "Escolha",
      "como gatilho (ex: a cada 15 minutos).",
      "Adicione uma ação – procure por",
      "e escolha",
      "Defina a URL como",
      "Em",
      "adicione:",
      "Teste a etapa – você deve ver seus dados de visitantes.",
      "Adicione qualquer outra ação (ex: Google Sheets, Slack, e-mail) usando os dados do visitante.",
    ],
    schedule: "Agendamento",
    webhooksByZapier: "Webhooks by Zapier",
    get: "GET",
    headers: "Cabeçalhos",
    step3Title: "Passo 3 – Ative seu Zap",
    step3Desc: "Seu Zap agora será executado conforme o agendamento e trará novos visitantes para os apps escolhidos.",
    helpTitle: "Precisa de ajuda?",
    helpDesc: "Consulte a",
    apiDocs: "documentação da API",
    helpDesc2: "ou nos envie um e-mail em",
    email: "hello@thesift.space",
  },
};

export default function ZapierIntegrationClient({ locale }: ZapierIntegrationClientProps) {
  const copy = t[locale];

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white">
      <PublicHeader locale={locale} narrow />

      <main className="py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-8">
          <h1 className="text-2xl font-bold tracking-tight mb-2">{copy.title}</h1>
          <p className="text-sm text-slate-400 mb-8">{copy.subtitle}</p>

          <h2 className="text-lg font-semibold mt-6 mb-3">{copy.step1Title}</h2>
          <p className="text-sm text-slate-300">
            {copy.step1Desc} <strong>{copy.settings}</strong> {copy.step1Desc2}
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-3">{copy.step2Title}</h2>
          <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2">
            <li>
              {copy.step2List[0]} <strong>{copy.schedule}</strong> {copy.step2List[1]}
            </li>
            <li>
              {copy.step2List[2]} <strong>{copy.webhooksByZapier}</strong> {copy.step2List[3]} <strong>{copy.get}</strong>.
            </li>
            <li>
              {copy.step2List[4]}{" "}
              <code className="bg-white/10 px-1 rounded text-xs">
                https://sitesafe.thesift.space/api/v1/visitors
              </code>
            </li>
            <li>
              {copy.step2List[5]} <strong>{copy.headers}</strong>, {copy.step2List[6]}
              <ul className="list-disc list-inside ml-4 mt-1 text-xs text-slate-400">
                <li>
                  <code>Authorization: Bearer YOUR_API_KEY</code>
                </li>
                <li>
                  <code>Content-Type: application/json</code>
                </li>
              </ul>
            </li>
            <li>{copy.step2List[7]}</li>
            <li>{copy.step2List[8]}</li>
          </ol>

          <h2 className="text-lg font-semibold mt-6 mb-3">{copy.step3Title}</h2>
          <p className="text-sm text-slate-300">{copy.step3Desc}</p>

          <h2 className="text-lg font-semibold mt-6 mb-3">{copy.helpTitle}</h2>
          <p className="text-sm text-slate-300">
            {copy.helpDesc}{" "}
            <Link href="/docs" className="text-sky-400 hover:underline">
              {copy.apiDocs}
            </Link>{" "}
            {copy.helpDesc2}{" "}
            <a href={`mailto:${copy.email}`} className="text-sky-400 hover:underline">
              {copy.email}
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}