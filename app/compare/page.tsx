// app/compare/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  X,
  Minus,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  BarChart3,
  Bell,
  FileText,
  Users,
  Printer,
  QrCode,
  Camera,
  Globe,
  Wallet,
  TrendingUp,
  Zap,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Compare SiteSafe – Smart Visitor Management",
  description:
    "See how SiteSafe compares to Envoy, SwipedOn, and paper visitor logs. QR check‑in, mandatory safety acknowledgment, real‑time dashboard, flat pricing.",
};

type CompareRow = {
  feature: string;
  icon: React.ElementType;
  sitesafe: string | boolean;
  envoy: string | boolean;
  swipedon: string | boolean;
  paper: string | boolean;
  highlight?: boolean;
};

const rows: CompareRow[] = [
  {
    feature: "QR check‑in",
    icon: QrCode,
    sitesafe: true,
    envoy: true,
    swipedon: true,
    paper: false,
  },
  {
    feature: "Photo capture",
    icon: Camera,
    sitesafe: true,
    envoy: true,
    swipedon: false,
    paper: false,
    highlight: true,
  },
  {
    feature: "Mandatory safety acknowledgment",
    icon: ShieldCheck,
    sitesafe: "Mandatory",
    envoy: "Optional",
    swipedon: false,
    paper: false,
    highlight: true,
  },
  {
    feature: "Host email notifications",
    icon: Bell,
    sitesafe: "Included",
    envoy: "Paid add‑on",
    swipedon: false,
    paper: false,
  },
  {
    feature: "Pre‑registration",
    icon: Users,
    sitesafe: "Included",
    envoy: "Paid add‑on",
    swipedon: "Paid add‑on",
    paper: false,
  },
  {
    feature: "Visitor badge printing",
    icon: Printer,
    sitesafe: true,
    envoy: true,
    swipedon: true,
    paper: false,
  },
  {
    feature: "Real‑time dashboard",
    icon: BarChart3,
    sitesafe: "Every 5 sec",
    envoy: "Standard",
    swipedon: "Standard",
    paper: false,
  },
  {
    feature: "Remote sign‑out",
    icon: Globe,
    sitesafe: true,
    envoy: true,
    swipedon: true,
    paper: false,
  },
  {
    feature: "Audit exports (CSV/Excel/PDF)",
    icon: FileText,
    sitesafe: "Filterable",
    envoy: "Paid tier",
    swipedon: "Basic",
    paper: false,
  },
  {
    feature: "Built‑in analytics",
    icon: TrendingUp,
    sitesafe: "30‑day, CSV",
    envoy: "Premium",
    swipedon: false,
    paper: false,
  },
  {
    feature: "REST API",
    icon: Zap,
    sitesafe: "Full docs",
    envoy: "Enterprise",
    swipedon: false,
    paper: false,
  },
  {
    feature: "Multi‑site management",
    icon: Building2,
    sitesafe: "Unlimited, free",
    envoy: "Per‑site fee",
    swipedon: "Per‑site fee",
    paper: false,
  },
  {
    feature: "Watchlist / Blocklist",
    icon: ShieldCheck,
    sitesafe: true,
    envoy: "Paid add‑on",
    swipedon: false,
    paper: false,
    highlight: true,
  },
  {
    feature: "Emergency evacuation list",
    icon: AlertTriangle,
    sitesafe: true,
    envoy: false,
    swipedon: false,
    paper: false,
    highlight: true,
  },
  {
    feature: "Lockdown mode",
    icon: ShieldAlert,
    sitesafe: true,
    envoy: false,
    swipedon: false,
    paper: false,
    highlight: true,
  },
  {
    feature: "Webhooks",
    icon: Zap,
    sitesafe: true,
    envoy: "Enterprise",
    swipedon: false,
    paper: false,
    highlight: true,
  },
  {
    feature: "Digital document signing",
    icon: FileText,
    sitesafe: true,
    envoy: "Enterprise",
    swipedon: false,
    paper: false,
    highlight: true,
  },
  {
    feature: "Free trial",
    icon: Wallet,
    sitesafe: "14 days, no card",
    envoy: false,
    swipedon: false,
    paper: "N/A",
    highlight: true,
  },
  {
    feature: "Sales calls required",
    icon: HelpCircle,
    sitesafe: false,
    envoy: "Demo required",
    swipedon: "Often required",
    paper: "N/A",
    highlight: true,
  },
  {
    feature: "Pricing model",
    icon: Wallet,
    sitesafe: "$49/mo flat",
    envoy: "$99+/mo + fees",
    swipedon: "$39+/mo + fees",
    paper: "$20/yr clipboards",
    highlight: true,
  },
  {
    feature: "Hidden costs",
    icon: HelpCircle,
    sitesafe: "None",
    envoy: "Per‑visitor fees",
    swipedon: "Upsells",
    paper: "Audit risk",
  },
];

function renderCell(value: string | boolean) {
  if (value === true) return <Check className="w-5 h-5 text-emerald-400" />;
  if (value === false) return <X className="w-5 h-5 text-slate-600" />;
  return <span className="text-sm font-medium text-slate-200">{value}</span>;
}

export default function ComparePage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            SiteSafe vs the alternatives
          </h1>
          <p className="text-sm text-slate-400">
            A side‑by‑side look at how SiteSafe compares to Envoy, SwipedOn, and
            the classic paper log.
          </p>
        </div>

        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400">
                <th scope="col" className="p-4 text-left font-medium">
                  Feature
                </th>
                <th scope="col" className="p-4 text-center font-medium text-sky-300">
                  SiteSafe
                </th>
                <th scope="col" className="p-4 text-center font-medium">
                  Envoy
                </th>
                <th scope="col" className="p-4 text-center font-medium">
                  SwipedOn
                </th>
                <th scope="col" className="p-4 text-center font-medium">
                  Paper log
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`text-slate-300 hover:bg-white/[0.03] transition-colors ${
                    row.highlight ? "bg-sky-500/5" : ""
                  }`}
                >
                  <td className="p-4 flex items-center gap-2 text-white font-medium">
                    <row.icon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    {row.feature}
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center justify-center text-sky-300 font-semibold">
                      {renderCell(row.sitesafe)}
                    </span>
                  </td>
                  <td className="p-4 text-center">{renderCell(row.envoy)}</td>
                  <td className="p-4 text-center">{renderCell(row.swipedon)}</td>
                  <td className="p-4 text-center text-slate-500">
                    {renderCell(row.paper)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center space-y-4">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg"
          >
            Start free trial <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <p className="text-sm text-slate-400">
            No credit card • No sales call • 14‑day trial
          </p>
        </div>
      </div>
    </div>
  );
}