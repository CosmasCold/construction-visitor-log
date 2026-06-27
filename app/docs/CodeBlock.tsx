"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative group rounded-xl bg-[#0d1117] border border-white/10 overflow-hidden">
      <button
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
        title="Copy to clipboard"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
      <pre className="p-4 text-xs text-slate-300 font-mono leading-relaxed overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}