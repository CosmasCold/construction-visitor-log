// components/HeroVideo.tsx
import Image from "next/image";

export default function HeroVideo() {
  return (
    <div className="mt-8 max-w-xl mx-auto">
      <Image
        src="/checkin.png"
        alt="SiteSafe visitor check‑in screen"
        width={800}
        height={450}
        className="rounded-xl border border-white/10 w-full h-auto"
        priority
      />
      <p className="text-xs text-slate-500 mt-2 text-center">
        Visitor check‑in with host selection and photo capture
      </p>
    </div>
  );
}