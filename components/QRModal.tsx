// components/QRModal.tsx
"use client";

import Image from "next/image";

interface QRModalProps {
  open: boolean;
  siteName: string;
  qrUrl: string;    // the URL to the QR image (e.g., /api/sites/[siteId]/qr)
  onClose: () => void;
}

export default function QRModal({ open, siteName, qrUrl, onClose }: QRModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">{siteName} – QR Code</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl leading-none">&times;</button>
        </div>
        <div className="bg-white rounded-xl p-4 flex justify-center">
          <Image
            src={qrUrl}
            alt={`QR code for ${siteName}`}
            width={250}
            height={250}
            unoptimized
            className="w-full max-w-[250px] h-auto"
          />
        </div>
        <p className="text-xs text-slate-400 mt-4 text-center">
          Scan this code with any phone camera to go directly to the check‑in page.
        </p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              // Copy the check‑in URL to clipboard
              const checkinUrl = qrUrl.replace(/\/api\/sites\/[^/]+\/qr/, (match) =>
                match.replace(/\/api\/sites\/([^/]+)\/qr/, '/checkin/$1')
              );
              navigator.clipboard.writeText(checkinUrl).then(() => alert("Check‑in URL copied!"));
            }}
            className="text-xs text-sky-400 hover:text-sky-300"
          >
            Copy check‑in URL
          </button>
        </div>
      </div>
    </div>
  );
}