"use client";

import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

interface GoogleSheetsClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    title: "Google Sheets Sync",
    subtitle: "Append new visitor records to a Google Sheet automatically.",
    step1Title: "Step 1 – Get your API key",
    step1Desc: "Go to",
    step1Desc2: "in your SiteSafe dashboard and copy your API key.",
    settings: "Settings",
    step2Title: "Step 2 – Open Apps Script in your Sheet",
    step2Desc: "Open a new Google Sheet. Click",
    extensions: "Extensions",
    appsScript: "Apps Script",
    step3Title: "Step 3 – Paste the script",
    step3Desc: "Replace the default code with the script below. Insert your API key and the site ID you want to sync (optional).",
    step4Title: "Step 4 – Run and schedule",
    step4Desc: "Click",
    run: "Run",
    step4Desc2: "→ review permissions → the first rows will appear. Then go to",
    triggers: "Triggers",
    step4Desc3: "(clock icon) and add a time-driven trigger (e.g., every 10 minutes) to keep the sheet updated automatically.",
    helpTitle: "Need help?",
    helpDesc: "Check the",
    apiDocs: "API docs",
    helpDesc2: "or email us at",
    script: `const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://sitesafe.thesift.space/api/v1/visitors';
const SITE_ID = ''; // optional – leave empty for all sites

function syncVisitors() {
  const sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Full Name', 'Company', 'Host', 'Signed In', 'Signed Out', 'Safety OK']);
  }
  const url = SITE_ID ? BASE_URL + '?siteId=' + SITE_ID : BASE_URL;
  const response = UrlFetchApp.fetch(url, {
    headers: { Authorization: 'Bearer ' + API_KEY },
  });
  const visitors = JSON.parse(response.getContentText());
  visitors.forEach(v => {
    sheet.appendRow([
      v.fullName,
      v.company,
      v.hostName || '',
      v.signedInAt,
      v.signedOutAt || '',
      v.safetyAcknowledged ? 'Yes' : 'No',
    ]);
  });
}`,
  },
  pt: {
    title: "Sincronização com Google Sheets",
    subtitle: "Adicione novos registros de visitantes automaticamente a uma planilha Google.",
    step1Title: "Passo 1 – Obtenha sua chave API",
    step1Desc: "Vá para",
    step1Desc2: "no painel SiteSafe e copie sua chave API.",
    settings: "Configurações",
    step2Title: "Passo 2 – Abra o Apps Script na sua planilha",
    step2Desc: "Abra uma nova planilha Google. Clique em",
    extensions: "Extensões",
    appsScript: "Apps Script",
    step3Title: "Passo 3 – Cole o script",
    step3Desc: "Substitua o código padrão pelo script abaixo. Insira sua chave API e o ID do local que deseja sincronizar (opcional).",
    step4Title: "Passo 4 – Execute e agende",
    step4Desc: "Clique em",
    run: "Executar",
    step4Desc2: "→ revise as permissões → as primeiras linhas aparecerão. Depois vá para",
    triggers: "Gatilhos",
    step4Desc3: "(ícone de relógio) e adicione um gatilho baseado em tempo (ex: a cada 10 minutos) para manter a planilha atualizada automaticamente.",
    helpTitle: "Precisa de ajuda?",
    helpDesc: "Consulte a",
    apiDocs: "documentação da API",
    helpDesc2: "ou nos envie um e-mail em",
    script: `const API_KEY = 'SUA_CHAVE_API';
const BASE_URL = 'https://sitesafe.thesift.space/api/v1/visitors';
const SITE_ID = ''; // opcional – deixe vazio para todos os locais

function syncVisitors() {
  const sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Nome Completo', 'Empresa', 'Anfitrião', 'Entrada', 'Saída', 'Segurança OK']);
  }
  const url = SITE_ID ? BASE_URL + '?siteId=' + SITE_ID : BASE_URL;
  const response = UrlFetchApp.fetch(url, {
    headers: { Authorization: 'Bearer ' + API_KEY },
  });
  const visitors = JSON.parse(response.getContentText());
  visitors.forEach(v => {
    sheet.appendRow([
      v.fullName,
      v.company,
      v.hostName || '',
      v.signedInAt,
      v.signedOutAt || '',
      v.safetyAcknowledged ? 'Sim' : 'Não',
    ]);
  });
}`,
  },
};

export default function GoogleSheetsClient({ locale }: GoogleSheetsClientProps) {
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
          <p className="text-sm text-slate-300">
            {copy.step2Desc} <strong>{copy.extensions} → {copy.appsScript}</strong>.
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-3">{copy.step3Title}</h2>
          <p className="text-sm text-slate-300 mb-2">
            {copy.step3Desc}
          </p>

          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mt-2 text-xs text-slate-200 overflow-x-auto font-mono whitespace-pre-wrap">
            {copy.script}
          </div>

          <h2 className="text-lg font-semibold mt-6 mb-3">{copy.step4Title}</h2>
          <p className="text-sm text-slate-300">
            {copy.step4Desc} <strong>{copy.run}</strong> {copy.step4Desc2} <strong>{copy.triggers}</strong> {copy.step4Desc3}
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-3">{copy.helpTitle}</h2>
          <p className="text-sm text-slate-300">
            {copy.helpDesc}{" "}
            <Link href="/docs" className="text-sky-400 hover:underline">
              {copy.apiDocs}
            </Link>{" "}
            {copy.helpDesc2}{" "}
            <a href="mailto:hello@thesift.space" className="text-sky-400 hover:underline">
              hello@thesift.space
            </a>.
          </p>
        </div>
      </main>
    </div>
  );
}