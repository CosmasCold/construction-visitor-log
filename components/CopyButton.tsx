// components/CopyButton.tsx
"use client";

import { useState } from "react";
import { CheckCircle2, Copy } from "lucide-react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 transition-colors"
    >
      {copied ? (
        <>
          <CheckCircle2 className="w-3 h-3" /> Copied
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" /> Copy to clipboard
        </>
      )}
    </button>
  );
}