// components/DownloadPDFButton.tsx
"use client";

export default function DownloadPDFButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg transition-colors"
    >
      Download PDF
    </button>
  );
}