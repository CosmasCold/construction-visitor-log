"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SavingsCalculator() {
  const [sites, setSites] = useState(5);

  const envoyCost = sites * 120;   // approx $120/site
  const swipedonCost = sites * 72; // approx $72/site
  const siteSafeCost = 49;

  return (
    <div className="bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-6 accent-glow aurora-bg max-w-md mx-auto text-center">
      <h3 className="text-lg font-semibold text-white mb-2">How much would you save?</h3>
      <p className="text-sm text-slate-400 mb-4">
        Move the slider to match your number of sites.
      </p>
      <input
        type="range"
        min="1"
        max="20"
        value={sites}
        onChange={(e) => setSites(Number(e.target.value))}
        className="w-full mb-4 accent-sky-500"
      />
      <p className="text-xl font-bold text-white mb-4">{sites} sites</p>
      <div className="text-left space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Envoy (est.)</span>
          <span className="text-rose-400 font-semibold">${envoyCost}/mo</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">SwipedOn (est.)</span>
          <span className="text-rose-400 font-semibold">${swipedonCost}/mo</span>
        </div>
        <div className="flex justify-between text-sm border-t border-white/10 pt-2">
          <span className="text-sky-300 font-semibold">SiteSafe</span>
          <span className="text-sky-300 font-bold">$49/mo</span>
        </div>
      </div>
      <Link
        href="/signup"
        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg"
      >
        Start My Free Trial <ArrowRight className="ml-2 w-4 h-4" />
      </Link>
    </div>
  );
}