// components/QRModal.tsx
import Image from "next/image";
import { X } from "lucide-react";

export default function QRModal({
  open,
  siteName,
  qrUrl,
  onClose,
}: {
  open: boolean;
  siteName: string;
  qrUrl: string;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl p-8 max-w-sm w-full text-center accent-glow aurora-bg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-semibold text-white mb-4">{siteName}</h3>
        <div className="bg-white p-4 rounded-xl inline-block mb-3">
          <Image
            src={qrUrl}
            alt={`QR code for ${siteName}`}
            width={200}
            height={200}
            unoptimized
            className="rounded-lg"
          />
        </div>
        <p className="text-sm text-slate-300">Scan to check in</p>
        <p className="text-xs text-slate-400 mt-1">
          Visitors can scan this QR code with their phone camera
        </p>
      </div>
    </div>
  );
}