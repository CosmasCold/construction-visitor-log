// app/dashboard/CompanyDashboardClient.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { logEvent } from "@/lib/analytics";
import Image from "next/image";
import {
  RefreshCw,
  FileSpreadsheet,
  FileText,
  FileDown,
  LogOut,
  Copy,
  Pencil,
  Trash2,
  Plus,
  X,
  Users,
  Building2,
  ClipboardList,
  CheckCircle2,
  XCircle,
  QrCode,
  DoorClosed,
  ShieldCheck,
  AlertTriangle,
  Zap,
  ShieldAlert,
  Clock,
  TrendingUp,
  ChevronDown,
  Lock,
  Download,
  BarChart3,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Search,
  Filter,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import ConfirmModal from "@/components/ConfirmModal";
import QRModal from "@/components/QRModal";
import DashboardTutorial from "@/components/DashboardTutorial";
import SkeletonTable from "@/components/SkeletonTable";
import { useToast } from "@/components/Toast";

type Visitor = {
  id: string;
  fullName: string;
  company: string;
  phone: string | null;
  hostName: string | null;
  safetyAcknowledged: boolean;
  signedInAt: string;
  signedOutAt: string | null;
  siteName: string;
  siteId: string;
  answers?: Record<string, boolean> | null;
  photoUrl?: string | null;
  signatureUrl?: string | null;
};

type Site = {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  safetyBriefingText: string;
  visitorsToday: number;
  questions?: string[] | null;
  documentSigningEnabled?: boolean;
  documentTemplateData?: string | null;
  lockdownEnabled?: boolean;
  showVisitorListOnCheckin?: boolean;
  locale?: string;
};

type Host = {
  id: string;
  name: string;
  email: string;
};

type ExpectedVisitor = {
  id: string;
  name: string;
  company: string;
};

type BlocklistEntry = {
  id: string;
  value: string;
  type: string;
  note?: string | null;
};

export default function CompanyDashboardClient({
  companyId,
  companySlug,
  companyName,
  logs,
  sites: initialSites,
  currentDateFrom,
  currentDateTo,
}: {
  companyId: string;
  companySlug: string;
  companyName: string;
  logs: Visitor[];
  sites: Site[];
  currentDateFrom?: string;
  currentDateTo?: string;
}) {
  const router = useRouter();
  const { addToast } = useToast();

  const [editLocale, setEditLocale] = useState<string>("en");

  const [dateFrom, setDateFrom] = useState(currentDateFrom || "");
  const [dateTo, setDateTo] = useState(currentDateTo || "");
  const [sites, setSites] = useState(initialSites);
  const [showNewSite, setShowNewSite] = useState(false);
  const [editingSiteId, setEditingSiteId] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [qrSite, setQrSite] = useState<{ id: string; name: string } | null>(null);

  // Edit form fields
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editBriefing, setEditBriefing] = useState("");

  // Host management
  const [hostsForEdit, setHostsForEdit] = useState<Host[]>([]);
  const [newHostName, setNewHostName] = useState("");
  const [newHostEmail, setNewHostEmail] = useState("");

  // Expected visitor management
  const [expectedForEdit, setExpectedForEdit] = useState<ExpectedVisitor[]>([]);
  const [newVisitorName, setNewVisitorName] = useState("");
  const [newVisitorCompany, setNewVisitorCompany] = useState("");

  // Pre‑screening questions management
  const [editQuestions, setEditQuestions] = useState<string[]>([]);
  const [newQuestion, setNewQuestion] = useState("");

  // Blocklist state
  const [blocklistEntries, setBlocklistEntries] = useState<BlocklistEntry[]>([]);
  const [newBlocklistValue, setNewBlocklistValue] = useState("");
  const [newBlocklistType, setNewBlocklistType] = useState("name");
  const [newBlocklistNote, setNewBlocklistNote] = useState("");

  // Webhook settings
  const [webhookUrl, setWebhookUrl] = useState("");

  // Document signing settings
  const [docSigningEnabled, setDocSigningEnabled] = useState(false);
  const [docTemplateUploading, setDocTemplateUploading] = useState(false);

  // Visitor list privacy toggle
  const [showVisitorList, setShowVisitorList] = useState(true);

  // Export loading states
  const [exporting, setExporting] = useState<string | null>(null);

  // Accordion state for site edit
  const [openSection, setOpenSection] = useState<string | null>("basic");

  // Skeleton loading state
  const [loading, setLoading] = useState(true);

  // Auto‑refresh every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 5000);
    return () => clearInterval(interval);
  }, [router]);

  // Simulate initial load skeleton
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Fetch blocklist and company settings on mount
  useEffect(() => {
    fetch("/api/blocklist")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBlocklistEntries(data);
      })
      .catch(() => {});

    fetch("/api/company/settings")
      .then((res) => res.json())
      .then((data) => {
        setWebhookUrl(data.webhookUrl || "");
      })
      .catch(() => {});
  }, []);

  async function handleSignOutRemote(visitorId: string) {
    const res = await fetch("/api/checkin/signout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: visitorId }),
    });
    if (res.ok) {
      router.refresh();
      addToast("Visitor signed out", "success");
    } else {
      addToast("Failed to sign out visitor", "error");
    }
  }

  function applyFilter() {
    const params = new URLSearchParams();
    params.set("slug", companySlug);
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);
    router.push(`/dashboard?${params.toString()}`);
  }

  function clearFilter() {
    setDateFrom("");
    setDateTo("");
    router.push(`/dashboard?slug=${companySlug}`);
  }

  async function handleDeleteSite(siteId: string) {
    const res = await fetch(`/api/sites/${siteId}`, { method: "DELETE" });
    if (res.ok) {
      setSites((prev) => prev.filter((s) => s.id !== siteId));
      setDeleteTarget(null);
      addToast("Site deleted", "success");
    } else {
      addToast("Failed to delete site", "error");
    }
  }

  function startEdit(site: Site) {
    setEditingSiteId(site.id);
    setEditName(site.name);
    setEditSlug(site.slug);
    setEditAddress(site.address || "");
    setEditBriefing(site.safetyBriefingText);
    setEditQuestions(site.questions || []);
    setDocSigningEnabled(site.documentSigningEnabled || false);
    setShowVisitorList(site.showVisitorListOnCheckin ?? true);
    setEditLocale(site.locale || "en");
    setOpenSection("basic");

    fetch(`/api/sites/${site.id}/hosts`)
      .then((res) => res.json())
      .then((data) => setHostsForEdit(Array.isArray(data) ? data : []))
      .catch(() => setHostsForEdit([]));

    fetch(`/api/sites/${site.id}/expected-visitors`)
      .then((res) => res.json())
      .then((data) => setExpectedForEdit(Array.isArray(data) ? data : []))
      .catch(() => setExpectedForEdit([]));

    setNewHostName("");
    setNewHostEmail("");
    setNewVisitorName("");
    setNewVisitorCompany("");
    setNewQuestion("");
  }

  function cancelEdit() {
    setEditingSiteId(null);
    setHostsForEdit([]);
    setExpectedForEdit([]);
    setEditQuestions([]);
  }

  async function saveEdit(siteId: string) {
    const res = await fetch(`/api/sites/${siteId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editName,
        slug: editSlug,
        address: editAddress,
        safetyBriefingText: editBriefing,
        questions: editQuestions,
        documentSigningEnabled: docSigningEnabled,
        showVisitorListOnCheckin: showVisitorList,
        locale: editLocale,
      }),
    });

    if (res.ok) {
      setSites((prev) =>
        prev.map((s) =>
          s.id === siteId
            ? {
                ...s,
                name: editName,
                slug: editSlug,
                address: editAddress,
                safetyBriefingText: editBriefing,
                questions: editQuestions,
                documentSigningEnabled: docSigningEnabled,
                showVisitorListOnCheckin: showVisitorList,
                locale: editLocale,
              }
            : s
        )
      );

      setEditingSiteId(null);
      setHostsForEdit([]);
      setExpectedForEdit([]);
      setEditQuestions([]);
      addToast("Site updated", "success");
    } else {
      addToast("Failed to update site", "error");
    }
  }

  function copyCheckinUrl(slug: string) {
    const url = `${window.location.origin}/checkin/${slug}`;
    navigator.clipboard
      .writeText(url)
      .then(() => addToast("Check-in URL copied!", "success"))
      .catch(() => prompt("Copy this URL:", url));
  }

  function exportCSV() {
    const headers = [
      "Site",
      "Name",
      "Company",
      "Phone",
      "Host",
      "Safety OK",
      "Signed In",
      "Signed Out",
      "Pre‑screening",
      "Signature",
    ];
    const rows = logs.map((v) => [
      v.siteName,
      v.fullName,
      v.company,
      v.phone || "",
      v.hostName || "",
      v.safetyAcknowledged ? "Yes" : "No",
      v.signedInAt,
      v.signedOutAt || "Still on site",
      v.answers
        ? Object.entries(v.answers)
            .map(([q, a]) => `${q}: ${a ? "Yes" : "No"}`)
            .join("; ")
        : "",
      v.signatureUrl || "—",
    ]);
    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((cell: string) => `"${cell.replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `visitors_${companySlug}_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    logEvent("export", { format: "csv" });
  }

  async function exportExcel() {
    const XLSX = await import("xlsx");
    const wsData = logs.map((v) => ({
      Site: v.siteName,
      Name: v.fullName,
      Company: v.company,
      Phone: v.phone || "",
      Host: v.hostName || "",
      "Safety OK": v.safetyAcknowledged ? "Yes" : "No",
      "Signed In": v.signedInAt,
      "Signed Out": v.signedOutAt || "Still on site",
      "Pre‑screening": v.answers
        ? Object.entries(v.answers)
            .map(([q, a]) => `${q}: ${a ? "Yes" : "No"}`)
            .join("; ")
        : "",
      Signature: v.signatureUrl || "—",
    }));
    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Visitors");
    XLSX.writeFile(
      wb,
      `visitors_${companySlug}_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
    logEvent("export", { format: "xlsx" });
  }

  async function exportPDF() {
    const jsPDF = (await import("jspdf")).default;
    const autoTable = (await import("jspdf-autotable")).default;
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });
    const headers = [
      "Site",
      "Name",
      "Company",
      "Phone",
      "Host",
      "Safety OK",
      "Signed In",
      "Signed Out",
      "Pre‑screening",
      "Signature",
    ];
    const rows = logs.map((v) => [
      v.siteName,
      v.fullName,
      v.company,
      v.phone || "",
      v.hostName || "",
      v.safetyAcknowledged ? "Yes" : "No",
      new Date(v.signedInAt).toLocaleString(),
      v.signedOutAt ? new Date(v.signedOutAt).toLocaleString() : "On site",
      v.answers
        ? Object.entries(v.answers)
            .map(([q, a]) => `${q}: ${a ? "Yes" : "No"}`)
            .join("; ")
        : "",
      v.signatureUrl ? "Yes" : "No",
    ]);
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 20,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [15, 23, 42] },
    });
    doc.text(
      `Visitor Log – ${dateFrom || "start"} to ${dateTo || "end"}`,
      14,
      15
    );
    doc.save(
      `visitors_${companySlug}_${new Date().toISOString().slice(0, 10)}.pdf`
    );
    logEvent("export", { format: "pdf" });
  }

  // Export handlers with loading states
  async function handleExportCSV() {
    setExporting("csv");
    exportCSV();
    setTimeout(() => setExporting(null), 1000);
  }
  async function handleExportExcel() {
    setExporting("xlsx");
    await exportExcel();
    setExporting(null);
  }
  async function handleExportPDF() {
    setExporting("pdf");
    await exportPDF();
    setExporting(null);
  }

  // Blocklist handlers
  async function addBlocklistEntry() {
    if (!newBlocklistValue.trim()) return;
    const res = await fetch("/api/blocklist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        value: newBlocklistValue.trim(),
        type: newBlocklistType,
        note: newBlocklistNote || null,
      }),
    });
    if (res.ok) {
      const created = await res.json();
      setBlocklistEntries((prev) => [created, ...prev]);
      setNewBlocklistValue("");
      setNewBlocklistNote("");
      addToast("Blocklist entry added", "success");
    } else {
      addToast("Failed to add blocklist entry", "error");
    }
  }

  async function removeBlocklistEntry(id: string) {
    const res = await fetch(`/api/blocklist/${id}`, { method: "DELETE" });
    if (res.ok) {
      setBlocklistEntries((prev) => prev.filter((e) => e.id !== id));
      addToast("Entry removed", "success");
    }
  }

  // Webhook handler
  async function saveWebhookUrl(url: string) {
    const res = await fetch("/api/company/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ webhookUrl: url }),
    });
    if (res.ok) addToast("Webhook saved", "success");
  }

  // Stats calculations
  const activeVisitors = logs.filter((v) => !v.signedOutAt).length;
  const todayVisitors = logs.filter(
    (v) => new Date(v.signedInAt).toDateString() === new Date().toDateString()
  ).length;
  const avgDuration =
    logs
      .filter((v) => v.signedOutAt)
      .reduce(
        (acc, v) =>
          acc +
          (new Date(v.signedOutAt!).getTime() - new Date(v.signedInAt).getTime()),
        0
      ) /
    (logs.filter((v) => v.signedOutAt).length || 1) /
    60000;
  const totalVisitors = logs.length;

  const showOnboarding =
    showWelcome && sites.length === 1 && sites[0].name === "Default Site";

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      {/* ─── Top Navigation Bar ─── */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0f1c]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white leading-tight">{companyName}</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.refresh()}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              title="Refresh data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            
            <div className="h-4 w-px bg-white/10 mx-1" />
            
            <button
              onClick={() => router.push(`/dashboard/analytics?slug=${companySlug}`)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </button>
            
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* ─── Welcome Banner ─── */}
        {showOnboarding && (
          <div className="relative overflow-hidden rounded-xl border border-sky-500/20 bg-sky-500/5 p-4 sm:p-5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ClipboardList className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Welcome to SiteSafe</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-lg">
                    Start by renaming your first site or adding a new one below. 
                    Click <span className="text-sky-300 font-medium">Edit</span> next to your site to customize its name, safety briefing, and check-in settings.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowWelcome(false)}
                className="p-1 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ─── Stats Row ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Users,
              label: "Active now",
              value: activeVisitors,
              subtext: "on site",
              color: "text-emerald-400",
              bg: "bg-emerald-500/10",
            },
            {
              icon: TrendingUp,
              label: "Today's visitors",
              value: todayVisitors,
              subtext: "checked in",
              color: "text-sky-400",
              bg: "bg-sky-500/10",
            },
            {
              icon: Clock,
              label: "Avg. visit",
              value: Math.round(avgDuration),
              subtext: "minutes",
              color: "text-amber-400",
              bg: "bg-amber-500/10",
            },
            {
              icon: Building2,
              label: "Total sites",
              value: sites.length,
              subtext: "locations",
              color: "text-violet-400",
              bg: "bg-violet-500/10",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/5 bg-white/[0.03] p-4 hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-xs text-slate-500">{stat.subtext}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Toolbar: Date Filter + Export + New Site ─── */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] p-1.5">
              <div className="flex items-center gap-2 px-2">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none w-32"
                />
              </div>
              <span className="text-slate-600 text-sm">→</span>
              <div className="flex items-center gap-2 px-2">
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none w-32"
                />
              </div>
              <div className="h-6 w-px bg-white/5 mx-1" />
              <button
                onClick={applyFilter}
                className="px-3 py-1.5 rounded-lg bg-sky-500/10 text-sky-300 text-xs font-medium hover:bg-sky-500/20 transition-colors"
              >
                Apply
              </button>
              {(dateFrom || dateTo) && (
                <button
                  onClick={clearFilter}
                  className="px-2 py-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="flex items-center gap-1.5 rounded-xl border border-white/5 bg-white/[0.03] p-1">
              <button
                onClick={handleExportCSV}
                disabled={exporting === "csv"}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
                title="Export CSV"
              >
                {exporting === "csv" ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
                CSV
              </button>
              <div className="h-4 w-px bg-white/5" />
              <button
                onClick={handleExportExcel}
                disabled={exporting === "xlsx"}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
                title="Export Excel"
              >
                {exporting === "xlsx" ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <FileSpreadsheet className="w-3.5 h-3.5" />}
                Excel
              </button>
              <div className="h-4 w-px bg-white/5" />
              <button
                onClick={handleExportPDF}
                disabled={exporting === "pdf"}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
                title="Export PDF"
              >
                {exporting === "pdf" ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <FileDown className="w-3.5 h-3.5" />}
                PDF
              </button>
            </div>

            <div className="h-6 w-px bg-white/5 hidden lg:block" />

            <button
              onClick={() => setShowNewSite(!showNewSite)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                showNewSite
                  ? "bg-white/10 text-white"
                  : "bg-sky-500 hover:bg-sky-600 text-white"
              }`}
            >
              {showNewSite ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showNewSite ? "Cancel" : "New Site"}
            </button>
          </div>
        </div>

        {/* ─── New Site Form ─── */}
        {showNewSite && (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Create new site</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const res = await fetch("/api/sites", {
                  method: "POST",
                  body: formData,
                });
                if (res.ok) {
                  const newSite = await res.json();
                  setSites((prev) => [
                    ...prev,
                                        {
                      id: newSite.id,
                      name: newSite.name,
                      slug: newSite.slug,
                      address: newSite.address,
                      safetyBriefingText: newSite.safetyBriefingText,
                      visitorsToday: 0,
                      questions: [],
                      documentSigningEnabled: false,
                      documentTemplateData: null,
                      lockdownEnabled: false,
                      showVisitorListOnCheckin: true,
                      locale: "en",
                    },
                  ]);
                  setShowNewSite(false);
                  addToast("Site created", "success");
                } else {
                  const data = await res.json().catch(() => ({}));
                  addToast(data.error || "Failed to create site", "error");
                }
              }}
              className="grid sm:grid-cols-3 gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Site Name"
                required
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
              />
              <input
                type="text"
                name="address"
                placeholder="Address (optional)"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
              />
              <input
                type="text"
                name="slug"
                placeholder="URL Slug (e.g., main-office)"
                required
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
              />
              <div className="sm:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-[0.98]"
                >
                  Create Site
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ─── Sites Section ─── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Your Sites</h2>
            <span className="text-xs text-slate-500">{sites.length} of 20 sites</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {sites.length === 0 ? (
              <div className="md:col-span-2 xl:col-span-3 rounded-xl border border-white/5 bg-white/[0.02] p-12 text-center">
                <Building2 className="w-10 h-10 mx-auto text-slate-600 mb-3" />
                <p className="text-sm font-medium text-slate-400">No sites yet</p>
                <p className="text-xs text-slate-600 mt-1">Create your first site to start checking in visitors.</p>
              </div>
            ) : (
              sites.map((site) => (
                <div
                  key={site.id}
                  className={`group relative rounded-xl border ${
                    site.lockdownEnabled 
                      ? "border-red-500/30 bg-red-500/[0.03]" 
                      : "border-white/5 bg-white/[0.03] hover:bg-white/[0.05]"
                  } transition-all duration-200 overflow-hidden`}
                >
                  {/* Lockdown Banner */}
                  {site.lockdownEnabled && (
                    <div className="flex items-center justify-center gap-1.5 bg-red-500/10 border-b border-red-500/20 py-1.5">
                      <Lock className="w-3 h-3 text-red-400" />
                      <span className="text-[10px] font-semibold text-red-400 uppercase tracking-wider">Lockdown Active</span>
                    </div>
                  )}

                  {editingSiteId === site.id ? (
                    <div className="p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-white">Edit Site</h3>
                        <button onClick={cancelEdit} className="text-xs text-slate-500 hover:text-white transition-colors">
                          Cancel
                        </button>
                      </div>

                      {/* Accordion Sections */}
                      {[
                        { id: "basic", label: "Basic Info", content: (
                          <div className="space-y-3 pt-2">
                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1 block">Site Name</label>
                              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1 block">Slug</label>
                                <input type="text" value={editSlug} onChange={(e) => setEditSlug(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50" />
                              </div>
                              <div>
                                <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1 block">Address</label>
                                <input type="text" value={editAddress} onChange={(e) => setEditAddress(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50" />
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1 block">Safety Briefing</label>
                              <textarea value={editBriefing} onChange={(e) => setEditBriefing(e.target.value)} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50" />
                            </div>
                            <div>
  <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1 block">Check-in Language</label>
  <select
    value={editLocale}
    onChange={(e) => setEditLocale(e.target.value)}
    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
  >
    <option value="en" className="bg-[#0f172a]">English</option>
    <option value="pt" className="bg-[#0f172a]">Português (Brazil)</option>
  </select>
  <p className="text-[10px] text-slate-600 mt-1">Language shown to visitors during check-in</p>
</div>
                          </div>
                        )},
                        { id: "hosts", label: `Hosts (${hostsForEdit.length})`, content: (
                          <div className="space-y-2 pt-2">
                            {hostsForEdit.length > 0 && (
                              <div className="space-y-1 mb-3">
                                {hostsForEdit.map((host) => (
                                  <div key={host.id} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-white/5">
                                    <div className="flex items-center gap-2">
                                      <div className="w-5 h-5 rounded-full bg-sky-500/10 flex items-center justify-center">
                                        <span className="text-[10px] font-bold text-sky-400">{host.name.charAt(0)}</span>
                                      </div>
                                      <div>
                                        <p className="text-xs text-white">{host.name}</p>
                                        <p className="text-[10px] text-slate-500">{host.email}</p>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={async () => {
                                        await fetch(`/api/sites/${site.id}/hosts/${host.id}`, { method: "DELETE" });
                                        setHostsForEdit((prev) => prev.filter((h) => h.id !== host.id));
                                      }}
                                      className="text-rose-400 hover:text-rose-300 text-xs px-2 py-1 rounded hover:bg-rose-500/10 transition-colors"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="flex gap-2">
                              <input type="text" placeholder="Name" value={newHostName} onChange={(e) => setNewHostName(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                              <input type="email" placeholder="Email" value={newHostEmail} onChange={(e) => setNewHostEmail(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                              <button
                                type="button"
                                onClick={async () => {
                                  if (!newHostName || !newHostEmail) return;
                                  const res = await fetch(`/api/sites/${site.id}/hosts`, {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ name: newHostName, email: newHostEmail }),
                                  });
                                  if (res.ok) {
                                    const created = await res.json();
                                    setHostsForEdit((prev) => [...prev, created]);
                                    setNewHostName("");
                                    setNewHostEmail("");
                                  }
                                }}
                                className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded-lg text-xs font-medium"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        )},
                        { id: "pre", label: `Pre-screening (${editQuestions.length})`, content: (
                          <div className="space-y-2 pt-2">
                            {editQuestions.length > 0 && (
                              <div className="space-y-1 mb-3">
                                {editQuestions.map((q, i) => (
                                  <div key={i} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-white/5">
                                    <span className="text-xs text-slate-300">{q}</span>
                                    <button
                                      type="button"
                                      onClick={() => setEditQuestions((prev) => prev.filter((_, idx) => idx !== i))}
                                      className="text-rose-400 hover:text-rose-300 text-xs px-2 py-1 rounded hover:bg-rose-500/10 transition-colors"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="flex gap-2">
                              <input type="text" placeholder="e.g., Completed site induction?" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                              <button
                                type="button"
                                onClick={() => {
                                  if (!newQuestion.trim()) return;
                                  setEditQuestions((prev) => [...prev, newQuestion.trim()]);
                                  setNewQuestion("");
                                }}
                                className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded-lg text-xs font-medium"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        )},
                        { id: "doc", label: "Document Signing", content: (
                          <div className="space-y-3 pt-2">
                            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={docSigningEnabled}
                                onChange={(e) => setDocSigningEnabled(e.target.checked)}
                                className="rounded border-slate-600 bg-white/10 text-sky-500 focus:ring-sky-500/50"
                              />
                              Require visitors to sign a document before entry
                            </label>
                            {(() => {
                              const currentSite = sites.find((s) => s.id === editingSiteId);
                              if (currentSite?.documentTemplateData) {
                                return (
                                  <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                                    <FileText className="w-4 h-4 text-sky-400" />
                                    <span className="text-xs text-slate-300">Template uploaded</span>
                                    <a href={currentSite.documentTemplateData} target="_blank" rel="noopener noreferrer" className="text-xs text-sky-400 hover:underline">View</a>
                                    <button
                                      type="button"
                                      onClick={async () => {
                                        await fetch(`/api/sites/${editingSiteId}/document-template`, { method: "DELETE" });
                                        setSites((prev) => prev.map((s) => s.id === editingSiteId ? { ...s, documentTemplateData: null } : s));
                                      }}
                                      className="text-xs text-rose-400 hover:text-rose-300 ml-auto"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                );
                              }
                              return (
                                <div className="flex items-center gap-3">
                                  <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;
                                      setDocTemplateUploading(true);
                                      const reader = new FileReader();
                                      reader.onload = async (ev) => {
                                        const fileBase64 = ev.target?.result as string;
                                        const res = await fetch(`/api/sites/${editingSiteId}/document-template`, {
                                          method: "POST",
                                          headers: { "Content-Type": "application/json" },
                                          body: JSON.stringify({ fileBase64 }),
                                        });
                                        if (res.ok) {
                                          setSites((prev) => prev.map((s) => s.id === editingSiteId ? { ...s, documentTemplateData: fileBase64 } : s));
                                          addToast("Template uploaded", "success");
                                        } else {
                                          addToast("Upload failed", "error");
                                        }
                                        setDocTemplateUploading(false);
                                      };
                                      reader.readAsDataURL(file);
                                    }}
                                    className="text-xs text-slate-400 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-white/10 file:text-slate-300 hover:file:bg-white/20"
                                  />
                                  {docTemplateUploading && <span className="text-xs text-sky-400">Uploading…</span>}
                                </div>
                              );
                            })()}
                          </div>
                        )},
                        { id: "privacy", label: "Privacy", content: (
                          <div className="pt-2">
                            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={showVisitorList}
                                onChange={(e) => setShowVisitorList(e.target.checked)}
                                className="rounded border-slate-600 bg-white/10 text-sky-500 focus:ring-sky-500/50"
                              />
                              Show visitor list on check-in page (disable for privacy)
                            </label>
                          </div>
                        )},
                      ].map((section) => (
                        <div key={section.id} className="border border-white/5 rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                            className="w-full flex items-center justify-between px-3 py-2.5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                          >
                            <span className="text-xs font-medium text-slate-300">{section.label}</span>
                            <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openSection === section.id ? "rotate-180" : ""}`} />
                          </button>
                          <div className={`accordion-content ${openSection === section.id ? "open" : ""}`}>
                            <div className="p-3 border-t border-white/5">
                              {section.content}
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="flex gap-2 pt-2">
                        <button type="button" onClick={() => saveEdit(site.id)} className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg text-xs font-medium transition-all">
                          Save Changes
                        </button>
                        <button type="button" onClick={cancelEdit} className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <a
                              href={`/checkin/${encodeURIComponent(site.slug)}`}
                              target="_blank"
                              className="text-sm font-semibold text-white hover:text-sky-300 transition-colors truncate"
                            >
                              {site.name}
                            </a>
                            <ExternalLink className="w-3 h-3 text-slate-600 flex-shrink-0" />
                          </div>
                                                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <span className="font-mono">/{site.slug}</span>
                            <span className="text-slate-700">•</span>
                            <span>{site.visitorsToday} today</span>
                            {site.locale === "pt" && (
                              <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400">
                                🇧🇷 PT
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => startEdit(site)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-sky-300 hover:bg-sky-500/10 transition-all"
                            title="Edit site"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(site.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-300 hover:bg-rose-500/10 transition-all"
                            title="Delete site"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => copyCheckinUrl(site.slug)}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white transition-all border border-white/5"
                        >
                          <Copy className="w-3.5 h-3.5" /> Copy URL
                        </button>
                        <button
                          onClick={() => setQrSite({ id: site.id, name: site.name })}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white transition-all border border-white/5"
                        >
                          <QrCode className="w-3.5 h-3.5" /> QR Code
                        </button>
                        <button
                          onClick={() => window.open(`/api/sites/${site.id}/emergency-list`)}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-amber-400 hover:text-amber-300 transition-all border border-white/5"
                        >
                          <AlertTriangle className="w-3.5 h-3.5" /> Emergency List
                        </button>
                        <button
                          onClick={async () => {
                            const newLockdown = !site.lockdownEnabled;
                            const res = await fetch(`/api/sites/${site.id}/lockdown`, {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ lockdown: newLockdown }),
                            });
                            if (res.ok) {
                              setSites((prev) => prev.map((s) => s.id === site.id ? { ...s, lockdownEnabled: newLockdown } : s));
                              addToast(newLockdown ? "Lockdown activated" : "Lockdown ended", newLockdown ? "error" : "success");
                            }
                          }}
                          className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                            site.lockdownEnabled
                              ? "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
                              : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                          {site.lockdownEnabled ? "End Lockdown" : "Lockdown"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        {/* ─── Admin Settings Grid ─── */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Blocklist */}
          <section className="rounded-xl border border-white/5 bg-white/[0.03] p-6">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-semibold text-white">Watchlist / Blocklist</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Flag visitors by name, email, or phone. Alerts show at check-in.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                type="text"
                placeholder="Name, email, or phone"
                value={newBlocklistValue}
                onChange={(e) => setNewBlocklistValue(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
              <select
                value={newBlocklistType}
                onChange={(e) => setNewBlocklistType(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              >
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
              <input
                type="text"
                placeholder="Note (optional)"
                value={newBlocklistNote}
                onChange={(e) => setNewBlocklistNote(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
              <button
                onClick={addBlocklistEntry}
                className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-all"
              >
                Add
              </button>
            </div>

            {blocklistEntries.length > 0 ? (
              <div className="border border-white/5 rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-white/[0.03] text-slate-500 uppercase tracking-wider text-[10px]">
                      <th className="p-2.5 text-left font-medium">Value</th>
                      <th className="p-2.5 text-left font-medium">Type</th>
                      <th className="p-2.5 text-left font-medium">Note</th>
                      <th className="p-2.5 w-16"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {blocklistEntries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-2.5 font-medium text-white">{entry.value}</td>
                        <td className="p-2.5">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/5 text-slate-400 capitalize">
                            {entry.type}
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-500">{entry.note || "—"}</td>
                        <td className="p-2.5 text-right">
                          <button
                            onClick={() => removeBlocklistEntry(entry.id)}
                            className="text-rose-400 hover:text-rose-300 text-xs px-2 py-1 rounded hover:bg-rose-500/10 transition-colors"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 rounded-lg border border-dashed border-white/5">
                <p className="text-xs text-slate-600">No entries yet. Add your first watchlist item above.</p>
              </div>
            )}
          </section>

          {/* Webhooks */}
          <section className="rounded-xl border border-white/5 bg-white/[0.03] p-6">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-semibold text-white">Webhooks</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Receive real-time JSON payloads for check-ins, check-outs, and blocklist hits.
            </p>
            <div className="flex gap-2 mb-3">
              <input
                type="url"
                placeholder="https://your-tool.com/webhook"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
              <button
                onClick={() => saveWebhookUrl(webhookUrl)}
                className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-all"
              >
                Save
              </button>
            </div>
            {webhookUrl && (
              <button
                onClick={async () => {
                  await fetch("/api/webhook/test", { method: "POST" });
                  addToast("Test event sent", "success");
                }}
                className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
              >
                <Zap className="w-3 h-3" /> Send test event
              </button>
            )}
          </section>
        </div>

        {/* ─── Visitor Log ─── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Visitor Log</h2>
              <p className="text-xs text-slate-500 mt-0.5">{logs.length} records {dateFrom && dateTo ? `• ${dateFrom} to ${dateTo}` : ""}</p>
            </div>
          </div>

          {loading ? (
            <SkeletonTable />
          ) : (
            <div className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden overflow-x-auto">
              <table className="w-full text-sm min-w-[1000px]">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/5 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                    <th className="p-3 text-left w-12">Photo</th>
                    <th className="p-3 text-left">Visitor</th>
                    <th className="p-3 text-left">Site</th>
                    <th className="p-3 text-left">Host</th>
                    <th className="p-3 text-left">Time</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Safety</th>
                    <th className="p-3 text-left">Pre-screening</th>
                    <th className="p-3 text-left w-20">Signature</th>
                    <th className="p-3 text-left w-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="p-8 text-center">
                        <Users className="w-8 h-8 mx-auto text-slate-700 mb-2" />
                        <p className="text-sm text-slate-500">No visitors found</p>
                        <p className="text-xs text-slate-600 mt-1">Share the check-in link to get started</p>
                      </td>
                    </tr>
                  ) : (
                    logs.map((v) => (
                      <tr key={v.id} className="text-slate-300 hover:bg-white/[0.04] transition-colors group">
                        <td className="p-3">
                          {v.photoUrl ? (
                            <a href={v.photoUrl} target="_blank" rel="noopener noreferrer" className="block w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/5 hover:ring-sky-500/50 transition-all">
                              <Image src={v.photoUrl} alt="" width={32} height={32} unoptimized className="w-full h-full object-cover" />
                            </a>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                              <span className="text-[10px] font-bold text-slate-600">{v.fullName.charAt(0)}</span>
                            </div>
                          )}
                        </td>
                        <td className="p-3">
                          <p className="text-sm font-medium text-white">{v.fullName}</p>
                          <p className="text-xs text-slate-500">{v.company}</p>
                          {v.phone && (
                            <p className="text-[10px] text-slate-600 flex items-center gap-1 mt-0.5">
                              <Phone className="w-2.5 h-2.5" /> {v.phone}
                            </p>
                          )}
                        </td>
                        <td className="p-3 text-xs text-slate-400">{v.siteName}</td>
                        <td className="p-3 text-xs text-slate-400">{v.hostName || "—"}</td>
                        <td className="p-3">
                          <div className="text-xs text-slate-400">
                            <p>In: {new Date(v.signedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            {v.signedOutAt && (
                              <p className="text-slate-600 mt-0.5">Out: {new Date(v.signedOutAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          {v.signedOutAt ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-500/10 text-slate-400">
                              <Clock className="w-2.5 h-2.5" /> Completed
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> On site
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          {v.safetyAcknowledged ? (
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" /> OK
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs text-rose-400">
                              <XCircle className="w-3.5 h-3.5" /> No
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          {v.answers ? (
                            <div className="text-[10px] text-slate-500 max-w-[150px] truncate" title={Object.entries(v.answers).map(([q, a]) => `${q}: ${a ? "Yes" : "No"}`).join(", ")}>
                              {Object.entries(v.answers).length} answered
                            </div>
                          ) : (
                            <span className="text-xs text-slate-600">—</span>
                          )}
                        </td>
                        <td className="p-3">
                          {v.signatureUrl ? (
                            <a href={v.signatureUrl} target="_blank" rel="noopener noreferrer" className="block w-12 h-6 rounded bg-white/5 overflow-hidden hover:ring-1 hover:ring-sky-500/50 transition-all">
                              <Image src={v.signatureUrl} alt="" width={48} height={24} unoptimized className="w-full h-full object-contain" />
                            </a>
                          ) : (
                            <span className="text-xs text-slate-600">—</span>
                          )}
                        </td>
                        <td className="p-3">
                          {!v.signedOutAt && (
                            <button
                              onClick={() => handleSignOutRemote(v.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100"
                              title="Sign out remotely"
                            >
                              <DoorClosed className="w-3.5 h-3.5" /> Sign out
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <ConfirmModal
        open={deleteTarget !== null}
        title="Delete site"
        message="This will permanently delete the site and all its visitor records. This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => deleteTarget && handleDeleteSite(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
      <QRModal
        open={qrSite !== null}
        siteName={qrSite?.name || ""}
        qrUrl={qrSite ? `/api/sites/${qrSite.id}/qr` : ""}
        onClose={() => setQrSite(null)}
      />
      <DashboardTutorial />
    </div>
  );
}