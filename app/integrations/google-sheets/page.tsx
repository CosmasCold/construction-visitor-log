// app/integrations/google-sheets/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google Sheets Integration – SiteSafe",
  description: "Automatically sync SiteSafe visitor data to a Google Sheet using Apps Script.",
};

export default function GoogleSheetsIntegration() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Google Sheets Sync</h1>
        <p className="text-sm text-slate-400 mb-8">
          Append new visitor records to a Google Sheet automatically.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">Step 1 – Get your API key</h2>
        <p className="text-sm text-slate-300">
          Go to <strong>Settings</strong> in your SiteSafe dashboard and copy your API key.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">Step 2 – Open Apps Script in your Sheet</h2>
        <p className="text-sm text-slate-300">
          Open a new Google Sheet. Click <strong>Extensions → Apps Script</strong>.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">Step 3 – Paste the script</h2>
        <p className="text-sm text-slate-300">
          Replace the default code with the script below. Insert your API key and the site ID you want to sync (optional).
        </p>

        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mt-2 text-xs text-slate-200 overflow-x-auto font-mono whitespace-pre-wrap">
{`const API_KEY = 'YOUR_API_KEY';
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
}
`}
        </div>

        <h2 className="text-lg font-semibold mt-6 mb-3">Step 4 – Run and schedule</h2>
        <p className="text-sm text-slate-300">
          Click <strong>Run</strong> → review permissions → the first rows will appear. Then go to <strong>Triggers</strong> (clock icon) and add a time‑driven trigger (e.g., every 10 minutes) to keep the sheet updated automatically.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">Need help?</h2>
        <p className="text-sm text-slate-300">
          Check the <a href="/docs" className="text-sky-400 hover:underline">API docs</a> or email us at{" "}
          <a href="mailto:cloudandclipboard@gmail.com" className="text-sky-400 hover:underline">cloudandclipboard@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}