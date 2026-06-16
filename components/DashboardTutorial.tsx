"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, X } from "lucide-react";

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
    title: "Analytics & Exports",
    description:
      "Use the toolbar at the top to export visitor logs as CSV, Excel, or PDF, and visit the Analytics page to see 30‑day trend charts.",
  },
  {
    title: "Emergency Evacuation List",
    description:
      "Click the ⚠️ icon on any site card to instantly download a PDF of everyone currently on site — including photos and host names.",
  },
  {
    title: "Lockdown Mode",
    description:
      "Activate lockdown from the shield icon on a site card. It blocks all new check‑ins and flags the site. One click to end it.",
  },
  {
    title: "Document Signing",
    description:
      "When editing a site, enable document signing to require visitors to sign an NDA or waiver right on the check‑in screen.",
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
  const [tooltipPos, setTooltipPos] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const step = steps[currentStep];
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);

  // Position the tooltip next to the highlighted element (deferred)
  useEffect(() => {
    if (!visible) return;

    // Cancel any pending animation / timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const doUpdate = () => {
      if (!step.highlight) {
        setTooltipPos(null);
        return;
      }

      const el = document.getElementById(step.highlight);
      if (!el) {
        setTooltipPos(null);
        return;
      }

      el.scrollIntoView({ behavior: "smooth", block: "center" });

      timeoutRef.current = setTimeout(() => {
        const rect = el.getBoundingClientRect();
        setTooltipPos({
          top: rect.top + rect.height / 2,
          left: rect.right + 16,
        });
        timeoutRef.current = null;
      }, 350);
    };

    // Defer all state changes to the next animation frame (asynchronous)
    rafRef.current = requestAnimationFrame(doUpdate);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible, step]);

  // Recalculate on window resize
  useEffect(() => {
    if (!visible || !step.highlight) return;

    const handleResize = () => {
      const el = document.getElementById(step.highlight!);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setTooltipPos({
        top: rect.top + rect.height / 2,
        left: rect.right + 16,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [visible, step]);

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

  return (
    <div className="fixed inset-0 z-50">
      {/* Plain dim overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Tooltip */}
      <div
        className={`absolute max-w-xs w-full transition-all duration-300 ${
          tooltipPos
            ? ""
            : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        }`}
        style={
          tooltipPos
            ? {
                top: tooltipPos.top,
                left: tooltipPos.left,
                transform: "translateY(-50%)",
              }
            : undefined
        }
      >
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative">
          <button
            onClick={dismiss}
            className="absolute top-3 right-3 text-slate-400 hover:text-white"
            aria-label="Close tutorial"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-2">
            <span className="text-xs text-slate-500">
              {currentStep + 1} of {steps.length}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-white mb-2">
            {step.title}
          </h3>
          <p className="text-sm text-slate-300 mb-4">{step.description}</p>

          <div className="flex justify-between items-center">
            <button
              onClick={dismiss}
              className="text-xs text-slate-400 hover:text-white"
            >
              Skip tutorial
            </button>
            <button
              onClick={next}
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl px-4 py-2 text-sm transition-colors"
            >
              {currentStep === steps.length - 1
                ? "Start using SiteSafe"
                : "Next"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}