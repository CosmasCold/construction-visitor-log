"use client";

import { useState } from "react";
import { ArrowRight, X, Share2 } from "lucide-react";

const steps = [
  {
    title: "Welcome to SiteSafe",
    description:
      "Let’s quickly walk through your dashboard. You can skip this anytime.",
  },
  {
    title: "Your sites",
    description:
      "Each site gets its own QR code and a check‑in link. Share the QR code at reception, or send the link to each floor, station, or device — it all goes to the same place.",
    highlight: "sites-grid",
  },
  {
    title: "Watchlist / Blocklist",
    description:
      "Flag unwanted visitors. Blocked visitors are stopped at check‑in and you're alerted instantly.",
    highlight: "blocklist-section",
  },
  {
    title: "Webhooks",
    description:
      "Send real‑time events (check‑in, check‑out, blocklist hits) to your own tools.",
    highlight: "webhook-section",
  },
  {
    title: "You're all set",
    description:
      "Create your first site, share the QR code or link, and start checking in visitors. No sales calls, no hidden fees.",
  },
];

export default function DashboardTutorial() {
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(() => {
    return localStorage.getItem("sitesafe_tutorial_done") ? false : true;
  });

  function dismiss() {
    localStorage.setItem("sitesafe_tutorial_done", "true");
    setVisible(false);
  }

  function next() {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      dismiss();
    }
  }

  if (!visible) return null;

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center relative">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
          aria-label="Close tutorial"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <span className="text-xs text-slate-500">
            {currentStep + 1} of {steps.length}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
        <p className="text-sm text-slate-300 mb-6">{step.description}</p>

        <button
          onClick={next}
          className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl px-6 py-3 text-sm transition-colors"
        >
          {currentStep === steps.length - 1 ? "Start using SiteSafe" : "Next"}
          <ArrowRight className="w-4 h-4" />
        </button>

        {currentStep > 0 && (
          <button
            onClick={dismiss}
            className="text-xs text-slate-400 hover:text-white block mx-auto mt-3"
          >
            Skip tutorial
          </button>
        )}
      </div>
    </div>
  );
}