"use client";

import { useState } from "react";
import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import {
  Users,
  Building2,
  Clock,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  Flame,
  Eye,
} from "lucide-react";

interface DemoClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    bannerTag: "Live Demo",
    bannerSub: "Sample data — no account required",
    bannerCta: "Start free trial",
    headerCta: "Start free trial",
    pageTitle: "Demo Company Dashboard",
    pageSubtitle: "3 sites · 44 visitors today · Real-time preview",
    getThis: "Get this for your team",
    stats: [
      { label: "Active now", color: "text-emerald-400", bg: "bg-emerald-500/10" },
      { label: "Today", color: "text-sky-400", bg: "bg-sky-500/10" },
      { label: "Sites", color: "text-violet-400", bg: "bg-violet-500/10" },
      { label: "Avg visit", color: "text-amber-400", bg: "bg-amber-500/10" },
    ],
    liveBadge: "Live",
    tabDashboard: "Dashboard",
    tabLogs: "Visitor Log",
    lockdown: "Lockdown",
    active: "Active",
    visitorsToday: "visitors today",
    copyUrl: "Copy URL",
    qrCode: "QR Code",
    everythingIncluded: "Everything included",
    featuresHeadline: "What you get with SiteSafe",
    features: [
      "Real-time dashboard across all sites",
      "One-click CSV, Excel, and PDF exports",
      "Photo capture and badge printing",
      "Watchlist & instant blocklist alerts",
      "Lockdown mode & emergency evacuation lists",
      "Digital document signing with signatures",
      "REST API, webhooks, and Zapier integration",
      "Flat $49/mo — up to 20 sites",
    ],
    sampleDataNote: "This is sample data. Your actual dashboard will show real visitors.",
    startTrial: "Start Free Trial",
    allSites: "All sites",
    visitors: "visitors",
    tableHeaders: ["Visitor", "Site", "Host", "Time", "Status", "Safety"],
    onSite: "On site",
    completed: "Completed",
    bottomCtaTitle: "See your own visitor data here",
    bottomCtaSub: "Set up your first site in 3 minutes",
    stickyCta: "Start Free Trial",
  },
  pt: {
    bannerTag: "Demonstração",
    bannerSub: "Dados de exemplo — não precisa de conta",
    bannerCta: "Comece o teste grátis",
    headerCta: "Comece o teste grátis",
    pageTitle: "Painel da Empresa Demo",
    pageSubtitle: "3 locais · 44 visitantes hoje · Visualização em tempo real",
    getThis: "Tenha isso para sua equipe",
    stats: [
      { label: "Ativos agora", color: "text-emerald-400", bg: "bg-emerald-500/10" },
      { label: "Hoje", color: "text-sky-400", bg: "bg-sky-500/10" },
      { label: "Locais", color: "text-violet-400", bg: "bg-violet-500/10" },
      { label: "Média visita", color: "text-amber-400", bg: "bg-amber-500/10" },
    ],
    liveBadge: "Ao vivo",
    tabDashboard: "Painel",
    tabLogs: "Registro de Visitantes",
    lockdown: "Lockdown",
    active: "Ativo",
    visitorsToday: "visitantes hoje",
    copyUrl: "Copiar URL",
    qrCode: "QR Code",
    everythingIncluded: "Tudo incluso",
    featuresHeadline: "O que você recebe com a SiteSafe",
    features: [
      "Painel em tempo real para todos os locais",
      "Exportações CSV, Excel e PDF em um clique",
      "Captura de foto e impressão de crachás",
      "Lista de bloqueio e alertas instantâneos",
      "Modo lockdown e listas de evacuação",
      "Assinatura digital de documentos",
      "API REST, webhooks e integração Zapier",
      "R$249/mês — até 20 locais",
    ],
    sampleDataNote: "Estes são dados de exemplo. Seu painel real mostrará visitantes reais.",
    startTrial: "Começar Teste Grátis",
    allSites: "Todos os locais",
    visitors: "visitantes",
    tableHeaders: ["Visitante", "Local", "Anfitrião", "Horário", "Status", "Segurança"],
    onSite: "No local",
    completed: "Concluído",
    bottomCtaTitle: "Veja seus próprios dados de visitantes aqui",
    bottomCtaSub: "Configure seu primeiro local em 3 minutos",
    stickyCta: "Começar Teste Grátis",
  },
};

const mockSites = [
  { id: "1", name: "Main Warehouse", slug: "main-wh", visitorsToday: 12, lockdownEnabled: false },
  { id: "2", name: "Site B - Construction", slug: "site-b", visitorsToday: 8, lockdownEnabled: true },
  { id: "3", name: "Downtown Office", slug: "downtown", visitorsToday: 24, lockdownEnabled: false },
];

const mockLogs = [
  { id: "1", fullName: "James Wilson", company: "Apex Electrical", phone: "555-0142", hostName: "Sarah Chen", safetyAcknowledged: true, signedInAt: "2026-06-24T08:30:00", signedOutAt: null, siteName: "Main Warehouse", photoUrl: null, signatureUrl: null },
  { id: "2", fullName: "Maria Garcia", company: "SafeBuild Inc", phone: null, hostName: null, safetyAcknowledged: true, signedInAt: "2026-06-24T09:15:00", signedOutAt: "2026-06-24T11:30:00", siteName: "Downtown Office", photoUrl: null, signatureUrl: null },
  { id: "3", fullName: "Robert Taylor", company: "Metro Logistics", phone: "555-0199", hostName: "David Park", safetyAcknowledged: false, signedInAt: "2026-06-24T09:45:00", signedOutAt: null, siteName: "Site B - Construction", photoUrl: null, signatureUrl: null },
  { id: "4", fullName: "Lisa Wong", company: "InspectPro", phone: null, hostName: "Sarah Chen", safetyAcknowledged: true, signedInAt: "2026-06-24T10:00:00", signedOutAt: null, siteName: "Main Warehouse", photoUrl: null, signatureUrl: null },
  { id: "5", fullName: "Ahmed Hassan", company: "Hassan Contractors", phone: "555-0177", hostName: null, safetyAcknowledged: true, signedInAt: "2026-06-24T07:00:00", signedOutAt: "2026-06-24T12:15:00", siteName: "Site B - Construction", photoUrl: null, signatureUrl: null },
];

export default function DemoClient({ locale }: DemoClientProps) {
  const copy = t[locale];
  const [activeTab, setActiveTab] = useState<"dashboard" | "logs">("dashboard");
  const [selectedSite, setSelectedSite] = useState<string>("all");

  const filteredLogs = selectedSite === "all"
    ? mockLogs
    : mockLogs.filter(l => l.siteName === mockSites.find(s => s.id === selectedSite)?.name);

  const activeVisitors = mockLogs.filter(v => !v.signedOutAt).length;
  const todayVisitors = mockLogs.length;

  const stats = [
    { icon: Users, value: activeVisitors, ...copy.stats[0], pulse: true },
    { icon: TrendingUp, value: todayVisitors, ...copy.stats[1], pulse: false },
    { icon: Building2, value: 3, ...copy.stats[2], pulse: false },
    { icon: Clock, value: "45m", ...copy.stats[3], pulse: false },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      {/* ─── Demo Banner ─── */}
      <div className="bg-sky-500/10 border-b border-sky-500/20 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sky-500/20 text-[10px] font-bold uppercase tracking-wider text-sky-300">
              <Eye className="w-2.5 h-2.5" /> {copy.bannerTag}
            </span>
            <p className="text-xs text-slate-400 hidden sm:block">
              {copy.bannerSub}
            </p>
          </div>
          <Link
            href="/signup"
            className="text-xs font-medium text-sky-300 hover:text-white transition-colors flex items-center gap-1"
          >
            {copy.bannerCta} <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <PublicHeader locale={locale} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* ─── Page Header ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white">{copy.pageTitle}</h1>
            <p className="text-xs text-slate-500 mt-0.5">{copy.pageSubtitle}</p>
          </div>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center bg-sky-500 hover:bg-sky-400 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] shadow-lg shadow-sky-500/20"
          >
            {copy.getThis}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* ─── Stats ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-white/[0.03] p-4 hover:bg-white/[0.06] transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">{stat.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                {stat.pulse && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium bg-emerald-500/10 text-emerald-400">
                    <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> {copy.liveBadge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ─── Tabs ─── */}
        <div className="flex items-center gap-1 border-b border-white/5">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "dashboard" ? "text-sky-400 border-sky-400" : "text-slate-500 border-transparent hover:text-slate-300"
            }`}
          >
            {copy.tabDashboard}
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "logs" ? "text-sky-400 border-sky-400" : "text-slate-500 border-transparent hover:text-slate-300"
            }`}
          >
            {copy.tabLogs}
          </button>
        </div>

        {activeTab === "dashboard" ? (
          <div className="space-y-6">
            {/* Sites Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {mockSites.map((site) => (
                <div
                  key={site.id}
                  className={`rounded-xl border p-4 transition-all hover:bg-white/[0.04] ${
                    site.lockdownEnabled ? "border-red-500/20 bg-red-500/[0.03]" : "border-white/5 bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-white">{site.name}</h3>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">sitesafe.thesift.space/checkin/{site.slug}</p>
                    </div>
                    {site.lockdownEnabled ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                        <AlertTriangle className="w-2.5 h-2.5" /> {copy.lockdown}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {copy.active}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-xs text-slate-400">{site.visitorsToday} {copy.visitorsToday}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                      {copy.copyUrl}
                    </button>
                    <button className="flex-1 py-2 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                      {copy.qrCode}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Teaser */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
              
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    <Flame className="w-2.5 h-2.5" /> {copy.everythingIncluded}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-4">{copy.featuresHeadline}</h3>
                
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {copy.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-slate-500">{copy.sampleDataNote}</p>
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center bg-white hover:bg-slate-100 text-slate-900 px-6 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] shadow-lg"
                  >
                    {copy.startTrial}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Filter */}
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                className="bg-[#0f172a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              >
                <option value="all" className="bg-[#0f172a]">{copy.allSites}</option>
                {mockSites.map(s => (
                  <option key={s.id} value={s.id} className="bg-[#0f172a]">{s.name}</option>
                ))}
              </select>
              <span className="text-xs text-slate-500 ml-2">{filteredLogs.length} {copy.visitors}</span>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/5 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                    {copy.tableHeaders.map((h, i) => (
                      <th key={i} className="p-3 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredLogs.map((v) => (
                    <tr key={v.id} className="text-slate-300 hover:bg-white/[0.02] transition-colors">
                      <td className="p-3">
                        <p className="text-sm font-medium text-white">{v.fullName}</p>
                        <p className="text-xs text-slate-500">{v.company}</p>
                      </td>
                      <td className="p-3 text-xs text-slate-400">{v.siteName}</td>
                      <td className="p-3 text-xs text-slate-400">{v.hostName || "—"}</td>
                      <td className="p-3 text-xs text-slate-400">
                        {new Date(v.signedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-3">
                        {!v.signedOutAt ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {copy.onSite}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-500/10 text-slate-400">
                            <Clock className="w-2.5 h-2.5" /> {copy.completed}
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        {v.safetyAcknowledged ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom CTA */}
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-white">{copy.bottomCtaTitle}</p>
                <p className="text-xs text-slate-500">{copy.bottomCtaSub}</p>
              </div>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center bg-sky-500 hover:bg-sky-400 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]"
              >
                {copy.startTrial}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* ─── Sticky Bottom CTA (mobile) ─── */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#0a0f1c]/95 backdrop-blur-xl p-4 sm:hidden z-50">
        <Link
          href="/signup"
          className="flex items-center justify-center w-full bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-xl px-6 py-3 text-sm transition-all active:scale-[0.98]"
        >
          {copy.stickyCta}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}