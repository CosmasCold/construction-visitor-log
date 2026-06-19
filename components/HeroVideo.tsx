// components/HeroVideo.tsx
import Image from "next/image";

export default function HeroVideo() {
  return (
    <div className="mt-8 max-w-lg mx-auto relative">
      {/* Floating illustration */}
      <div className="animate-fade-in-up relative">
        {/* Main screen */}
        <div className="relative z-10 rounded-xl overflow-hidden border border-white/20 shadow-2xl">
          <Image
            src="/checkin.png"
            alt="SiteSafe visitor check‑in screen"
            width={600}
            height={338}
            className="w-full h-auto max-h-72 object-contain bg-slate-900"
            priority
          />
          <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5 pointer-events-none" />
        </div>

        {/* Floating badge */}
        <div className="absolute -top-4 -right-4 z-20 bg-slate-800 border border-white/10 rounded-lg px-3 py-2 shadow-lg animate-float">
          <p className="text-xs font-semibold text-white">Visitor Badge</p>
          <p className="text-[10px] text-slate-400">Photo + Name + Host</p>
        </div>

        {/* Floating QR code chip */}
        <div className="absolute -bottom-3 -left-3 z-20 bg-sky-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg animate-float" style={{ animationDelay: "0.5s" }}>
          QR check‑in
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-3 text-center">
        Visitor check‑in with host selection and photo capture
      </p>
    </div>
  );
}