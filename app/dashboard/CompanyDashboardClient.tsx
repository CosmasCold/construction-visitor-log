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
      }),
    });

    if (res.ok) {
      // Update local sites array directly from state so checkbox persists
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
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6 animate-fade-in-up">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-sky-400" /> {companyName}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Visitor Log & Site Management
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => router.refresh()}
              className="glass-card px-4 py-2 text-sm font-medium flex items-center gap-1 text-white"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button
              onClick={handleExportCSV}
              disabled={exporting === "csv"}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98] flex items-center gap-1"
            >
              {exporting === "csv" ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <FileText className="w-4 h-4" />
              )}{" "}
              CSV
            </button>
            <button
              onClick={handleExportExcel}
              disabled={exporting === "xlsx"}
              className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98] flex items-center gap-1"
            >
              {exporting === "xlsx" ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <FileSpreadsheet className="w-4 h-4" />
              )}{" "}
              Excel
            </button>
            <button
              onClick={handleExportPDF}
              disabled={exporting === "pdf"}
              className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98] flex items-center gap-1"
            >
              {exporting === "pdf" ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <FileDown className="w-4 h-4" />
              )}{" "}
              PDF
            </button>
            <button
              onClick={() =>
                router.push(`/dashboard/analytics?slug=${companySlug}`)
              }
              className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98] flex items-center gap-1"
            >
              <FileSpreadsheet className="w-4 h-4" /> Analytics
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="glass-card px-4 py-2 text-sm font-medium flex items-center gap-1 text-white"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Onboarding banner */}
        {showOnboarding && (
          <div className="glass-card border-sky-400/30 p-4 flex justify-between items-start accent-glow">
            <p className="text-sm text-sky-100">
              <ClipboardList className="w-4 h-4 inline-block mr-1" />
              Welcome! Start by renaming your first site or adding a new one
              below. Click <strong>Edit</strong> next to your site to change
              its name, slug, or safety briefing.
            </p>
            <button
              onClick={() => setShowWelcome(false)}
              className="text-sky-300 hover:text-white ml-3 text-xl leading-none transition-colors duration-150"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              icon: Users,
              label: "Active now",
              value: activeVisitors,
              color: "text-emerald-400",
            },
            {
              icon: TrendingUp,
              label: "Today",
              value: todayVisitors,
              color: "text-sky-400",
            },
            {
              icon: Clock,
              label: "Avg visit (min)",
              value: Math.round(avgDuration),
              color: "text-amber-400",
            },
            {
              icon: Building2,
              label: "Sites",
              value: sites.length,
              color: "text-violet-400",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-card accent-glow aurora-bg p-4 flex items-center gap-3"
            >
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div>
                <p className="text-xs text-slate-400">{stat.label}</p>
                <p className="text-lg font-bold text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Two‑column row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date filter */}
          <div className="glass-card accent-glow aurora-bg p-4 flex flex-wrap items-end gap-3">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">
                From
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">
                To
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
              />
            </div>
            <button
              onClick={applyFilter}
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 active:scale-[0.98]"
            >
              Apply
            </button>
            <button
              onClick={clearFilter}
              className="text-slate-400 hover:text-slate-200 text-sm transition-colors duration-150"
            >
              Clear
            </button>
          </div>

          {/* New Site */}
          <div className="glass-card accent-glow aurora-bg p-4">
            <button
              onClick={() => setShowNewSite(!showNewSite)}
              className="text-sky-400 font-medium text-sm mb-3 hover:text-sky-300 transition-colors duration-150 flex items-center gap-1"
            >
              {showNewSite ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showNewSite ? "Cancel" : "New Site"}
            </button>
            {showNewSite && (
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
                      },
                    ]);
                    setShowNewSite(false);
                    addToast("Site created", "success");
                  } else {
                    const data = await res.json().catch(() => ({}));
                    addToast(data.error || "Failed to create site", "error");
                  }
                }}
                className="space-y-4 mt-3"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Site Name"
                  required
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
                />
                <input
                  type="text"
                  name="slug"
                  placeholder="URL Slug"
                  required
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98]"
                >
                  Create
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Sites grid */}
        <div id="sites-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sites.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-slate-400">
              <Building2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium">No sites yet</p>
              <p className="text-sm mt-1">
                Create your first site to start checking in visitors.
              </p>
            </div>
          ) : (
            sites.map((site) => (
              <div
                key={site.id}
                className={`relative glass-card ${
                  site.lockdownEnabled ? "border-red-400/30" : ""
                } p-4 group`}
              >
                {site.lockdownEnabled && (
                  <div className="absolute top-0 left-0 right-0 bg-red-500/10 text-red-400 text-xs text-center py-0.5 rounded-t-2xl border-b border-red-400/20">
                    <Lock className="w-3 h-3 inline mr-1" /> LOCKDOWN
                  </div>
                )}
                {editingSiteId === site.id ? (
                  <div className="space-y-3">
                    {/* Basic Info Accordion */}
                    <button
                      type="button"
                      onClick={() =>
                        setOpenSection(openSection === "basic" ? null : "basic")
                      }
                      className="w-full flex items-center justify-between text-sm font-semibold text-white"
                    >
                      <span>Basic Info</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openSection === "basic" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`accordion-content ${
                        openSection === "basic" ? "open" : ""
                      }`}
                    >
                      <div className="space-y-2 pt-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="Site Name"
                          className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
                        />
                        <input
                          type="text"
                          value={editSlug}
                          onChange={(e) => setEditSlug(e.target.value)}
                          placeholder="Slug"
                          className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
                        />
                        <input
                          type="text"
                          value={editAddress}
                          onChange={(e) => setEditAddress(e.target.value)}
                          placeholder="Address"
                          className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
                        />
                        <textarea
                          value={editBriefing}
                          onChange={(e) => setEditBriefing(e.target.value)}
                          placeholder="Safety Briefing"
                          rows={2}
                          className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Hosts Accordion */}
                    <button
                      type="button"
                      onClick={() =>
                        setOpenSection(openSection === "hosts" ? null : "hosts")
                      }
                      className="w-full flex items-center justify-between text-sm font-semibold text-white"
                    >
                      <span>Hosts</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openSection === "hosts" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`accordion-content ${
                        openSection === "hosts" ? "open" : ""
                      }`}
                    >
                      <div className="pt-2 space-y-2">
                        {hostsForEdit.length > 0 && (
                          <ul className="space-y-1 mb-3">
                            {hostsForEdit.map((host) => (
                              <li
                                key={host.id}
                                className="flex justify-between items-center text-xs text-slate-300"
                              >
                                <span>
                                  {host.name} &lt;{host.email}&gt;
                                </span>
                                <button
                                  type="button"
                                  onClick={async () => {
                                    await fetch(
                                      `/api/sites/${site.id}/hosts/${host.id}`,
                                      { method: "DELETE" }
                                    );
                                    setHostsForEdit((prev) =>
                                      prev.filter((h) => h.id !== host.id)
                                    );
                                  }}
                                  className="text-rose-400 hover:text-rose-300"
                                >
                                  Remove
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Name"
                            value={newHostName}
                            onChange={(e) => setNewHostName(e.target.value)}
                            className="flex-1 bg-white/10 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            value={newHostEmail}
                            onChange={(e) => setNewHostEmail(e.target.value)}
                            className="flex-1 bg-white/10 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={async () => {
                              if (!newHostName || !newHostEmail) return;
                              const res = await fetch(
                                `/api/sites/${site.id}/hosts`,
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    name: newHostName,
                                    email: newHostEmail,
                                  }),
                                }
                              );
                              if (res.ok) {
                                const created = await res.json();
                                setHostsForEdit((prev) => [...prev, created]);
                                setNewHostName("");
                                setNewHostEmail("");
                              }
                            }}
                            className="bg-sky-500 hover:bg-sky-600 text-white px-2 py-1 rounded text-xs"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Pre‑screening Questions Accordion */}
                    <button
                      type="button"
                      onClick={() =>
                        setOpenSection(openSection === "pre" ? null : "pre")
                      }
                      className="w-full flex items-center justify-between text-sm font-semibold text-white"
                    >
                      <span>Pre‑screening Questions</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openSection === "pre" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`accordion-content ${
                        openSection === "pre" ? "open" : ""
                      }`}
                    >
                      <div className="pt-2 space-y-2">
                        {editQuestions.length > 0 && (
                          <ul className="space-y-1 mb-3">
                            {editQuestions.map((q, i) => (
                              <li
                                key={i}
                                className="flex justify-between items-center text-xs text-slate-300"
                              >
                                <span>{q}</span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setEditQuestions((prev) =>
                                      prev.filter((_, idx) => idx !== i)
                                    )
                                  }
                                  className="text-rose-400 hover:text-rose-300"
                                >
                                  Remove
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Question (e.g., Completed induction?)"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            className="flex-1 bg-white/10 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (!newQuestion.trim()) return;
                              setEditQuestions((prev) => [
                                ...prev,
                                newQuestion.trim(),
                              ]);
                              setNewQuestion("");
                            }}
                            className="bg-sky-500 hover:bg-sky-600 text-white px-2 py-1 rounded text-xs"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Document Signing Accordion */}
                    <button
                      type="button"
                      onClick={() =>
                        setOpenSection(openSection === "doc" ? null : "doc")
                      }
                      className="w-full flex items-center justify-between text-sm font-semibold text-white"
                    >
                      <span>Document Signing</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openSection === "doc" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`accordion-content ${
                        openSection === "doc" ? "open" : ""
                      }`}
                    >
                      <div className="pt-2 space-y-2">
                        <label className="flex items-center gap-2 text-xs text-slate-200">
                          <input
                            type="checkbox"
                            checked={docSigningEnabled}
                            onChange={(e) =>
                              setDocSigningEnabled(e.target.checked)
                            }
                            className="h-4 w-4 rounded border-slate-600 bg-white/10 text-sky-500"
                          />
                          Require visitors to sign a document before entry
                        </label>
                        {(() => {
                          const currentSite = sites.find(
                            (s) => s.id === editingSiteId
                          );
                          if (currentSite?.documentTemplateData) {
                            return (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400">
                                  Template uploaded
                                </span>
                                <a
                                  href={currentSite.documentTemplateData}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sky-400 text-xs underline"
                                >
                                  View
                                </a>
                                <button
                                  type="button"
                                  onClick={async () => {
                                    await fetch(
                                      `/api/sites/${editingSiteId}/document-template`,
                                      { method: "DELETE" }
                                    );
                                    setSites((prev) =>
                                      prev.map((s) =>
                                        s.id === editingSiteId
                                          ? {
                                              ...s,
                                              documentTemplateData: null,
                                            }
                                          : s
                                      )
                                    );
                                  }}
                                  className="text-rose-400 text-xs hover:text-rose-300"
                                >
                                  Remove
                                </button>
                              </div>
                            );
                          }
                          return (
                            <div className="flex gap-2">
                              <input
                                type="file"
                                accept=".pdf"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  setDocTemplateUploading(true);
                                  const reader = new FileReader();
                                  reader.onload = async (ev) => {
                                    const fileBase64 = ev.target
                                      ?.result as string;
                                    const res = await fetch(
                                      `/api/sites/${editingSiteId}/document-template`,
                                      {
                                        method: "POST",
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({ fileBase64 }),
                                      }
                                    );
                                    if (res.ok) {
                                      setSites((prev) =>
                                        prev.map((s) =>
                                          s.id === editingSiteId
                                            ? {
                                                ...s,
                                                documentTemplateData:
                                                  fileBase64,
                                              }
                                            : s
                                        )
                                      );
                                      addToast(
                                        "Template uploaded",
                                        "success"
                                      );
                                    } else {
                                      addToast("Upload failed", "error");
                                    }
                                    setDocTemplateUploading(false);
                                  };
                                  reader.readAsDataURL(file);
                                }}
                                className="text-xs text-white"
                              />
                              {docTemplateUploading && (
                                <span className="text-xs text-sky-400">
                                  Uploading…
                                </span>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Privacy Accordion */}
                    <button
                      type="button"
                      onClick={() =>
                        setOpenSection(
                          openSection === "privacy" ? null : "privacy"
                        )
                      }
                      className="w-full flex items-center justify-between text-sm font-semibold text-white"
                    >
                      <span>Privacy</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openSection === "privacy" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`accordion-content ${
                        openSection === "privacy" ? "open" : ""
                      }`}
                    >
                      <div className="pt-2">
                        <label className="flex items-center gap-2 text-xs text-slate-200">
                          <input
                            type="checkbox"
                            checked={showVisitorList}
                            onChange={(e) =>
                              setShowVisitorList(e.target.checked)
                            }
                            className="h-4 w-4 rounded border-slate-600 bg-white/10 text-sky-500"
                          />
                          Show visitor list on check‑in page (disabling hides it
                          for privacy)
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => saveEdit(site.id)}
                        className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <a
                      href={`/checkin/${encodeURIComponent(site.slug)}`}
                      target="_blank"
                      className="flex-1"
                    >
                      <h3 className="font-semibold tracking-tight text-white">
                        {site.name}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        /{site.slug}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            copyCheckinUrl(site.slug);
                          }}
                          className="text-sky-400 hover:text-sky-300 inline-flex items-center transition-colors duration-150"
                          title="Copy check-in URL"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setQrSite({ id: site.id, name: site.name });
                          }}
                          className="text-sky-400 hover:text-sky-300 inline-flex items-center transition-colors duration-150"
                          title="Show QR code"
                        >
                          <QrCode className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(
                              `/api/sites/${site.id}/emergency-list`
                            );
                          }}
                          className="text-amber-400 hover:text-amber-300 inline-flex items-center transition-colors duration-150"
                          title="Download emergency list"
                        >
                          <AlertTriangle className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const newLockdown = !site.lockdownEnabled;
                            const res = await fetch(
                              `/api/sites/${site.id}/lockdown`,
                              {
                                method: "PUT",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  lockdown: newLockdown,
                                }),
                              }
                            );
                            if (res.ok) {
                              setSites((prev) =>
                                prev.map((s) =>
                                  s.id === site.id
                                    ? {
                                        ...s,
                                        lockdownEnabled: newLockdown,
                                      }
                                    : s
                                )
                              );
                            }
                          }}
                          className={`inline-flex items-center transition-colors duration-150 ${
                            site.lockdownEnabled
                              ? "text-red-400 hover:text-red-300"
                              : "text-slate-400 hover:text-white"
                          }`}
                          title={
                            site.lockdownEnabled
                              ? "End lockdown"
                              : "Activate lockdown"
                          }
                        >
                          <ShieldAlert className="w-4 h-4" />
                        </button>
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {site.visitorsToday} today
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 italic">
                        Click Edit to change name, slug, or safety briefing.
                      </p>
                    </a>
                    <div className="flex gap-1 ml-2">
                      <button
                        type="button"
                        onClick={() => startEdit(site)}
                        className="text-sky-400 hover:text-sky-300 text-xs transition-colors duration-150 flex items-center gap-0.5"
                        title="Edit site"
                      >
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(site.id)}
                        className="text-rose-400 hover:text-rose-300 text-xs transition-colors duration-150 flex items-center gap-0.5"
                        title="Delete site"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Blocklist section */}
        <div className="glass-card accent-glow aurora-bg p-6">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-400" /> Watchlist /
            Blocklist
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Automatically flag visitors whose name, email, or phone number
            matches an entry. Alerts are shown at check‑in.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="text"
              placeholder="Name, email, or phone"
              value={newBlocklistValue}
              onChange={(e) => setNewBlocklistValue(e.target.value)}
              className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-400"
            />
            <select
              value={newBlocklistType}
              onChange={(e) => setNewBlocklistType(e.target.value)}
              className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
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
              className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={addBlocklistEntry}
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-xs font-medium"
            >
              Add
            </button>
          </div>

          {blocklistEntries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-400 uppercase tracking-wider">
                    <th className="p-2 text-left">Value</th>
                    <th className="p-2 text-left">Type</th>
                    <th className="p-2 text-left">Note</th>
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {blocklistEntries.map((entry) => (
                    <tr key={entry.id}>
                      <td className="p-2">{entry.value}</td>
                      <td className="p-2 capitalize">{entry.type}</td>
                      <td className="p-2">{entry.note || "—"}</td>
                      <td className="p-2 text-right">
                        <button
                          type="button"
                          onClick={() => removeBlocklistEntry(entry.id)}
                          className="text-rose-400 hover:text-rose-300"
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
            <p className="text-xs text-slate-500">No entries yet.</p>
          )}
        </div>

        {/* Webhook Settings */}
        <div className="glass-card accent-glow aurora-bg p-6">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-sky-400" /> Webhooks
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Send real‑time events (check‑in, check‑out, blocklist hits) to your
            own tools. Enter a URL to receive JSON payloads.
          </p>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://your-tool.com/webhook"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => saveWebhookUrl(webhookUrl)}
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-xs font-medium"
            >
              Save
            </button>
          </div>
          {webhookUrl && (
            <button
              type="button"
              onClick={async () => {
                await fetch("/api/webhook/test", { method: "POST" });
                addToast("Test event sent", "success");
              }}
              className="mt-3 text-xs text-sky-400 hover:text-sky-300"
            >
              Send test event
            </button>
          )}
        </div>

        {/* Visitors table */}
        {loading ? (
          <SkeletonTable />
        ) : (
          <div className="glass-card accent-glow aurora-bg overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 sticky top-0 z-10 backdrop-blur-sm">
                <tr className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  <th scope="col" className="p-3 text-left">
                    Photo
                  </th>
                  <th scope="col" className="p-3 text-left">
                    Site
                  </th>
                  <th scope="col" className="p-3 text-left">
                    Name
                  </th>
                  <th scope="col" className="p-3 text-left">
                    Company
                  </th>
                  <th scope="col" className="p-3 text-left">
                    Phone
                  </th>
                  <th scope="col" className="p-3 text-left">
                    Host
                  </th>
                  <th scope="col" className="p-3 text-left">
                    Signed In
                  </th>
                  <th scope="col" className="p-3 text-left">
                    Signed Out
                  </th>
                  <th scope="col" className="p-3 text-left">
                    Safety
                  </th>
                  <th scope="col" className="p-3 text-left">
                    Pre‑screening
                  </th>
                  <th scope="col" className="p-3 text-left">
                    Signature
                  </th>
                  <th scope="col" className="p-3 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {logs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={12}
                      className="p-4 text-center text-slate-500"
                    >
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>
                        No visitors yet. Share the check‑in link with your team
                        to get started!
                      </p>
                    </td>
                  </tr>
                ) : (
                  logs.map((v) => (
                    <tr
                      key={v.id}
                      className="text-slate-300 hover:bg-white/[0.10] transition-colors duration-150"
                    >
                      <td className="p-3">
                        {v.photoUrl ? (
                          <a
                            href={v.photoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              src={v.photoUrl}
                              alt={v.fullName}
                              width={40}
                              height={40}
                              unoptimized
                              className="rounded object-cover"
                            />
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="p-3">{v.siteName}</td>
                      <td className="p-3 font-medium text-white">
                        {v.fullName}
                      </td>
                      <td className="p-3">{v.company}</td>
                      <td className="p-3">{v.phone || "—"}</td>
                      <td className="p-3">{v.hostName || "—"}</td>
                      <td className="p-3">
                        {new Date(v.signedInAt).toLocaleString()}
                      </td>
                      <td className="p-3">
                        {v.signedOutAt
                          ? new Date(v.signedOutAt).toLocaleString()
                          : "✓ On site"}
                      </td>
                      <td className="p-3">
                        {v.safetyAcknowledged ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 inline" />
                        )}
                      </td>
                      <td className="p-3">
                        {v.answers
                          ? Object.entries(v.answers)
                              .map(([q, a]) => `${q}: ${a ? "Yes" : "No"}`)
                              .join(", ")
                          : "—"}
                      </td>
                      <td className="p-3">
                        {v.signatureUrl ? (
                          <Image
                            src={v.signatureUrl}
                            alt="Signature"
                            width={40}
                            height={20}
                            unoptimized
                            className="rounded"
                          />
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="p-3">
                        {!v.signedOutAt && (
                          <button
                            type="button"
                            onClick={() => handleSignOutRemote(v.id)}
                            className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition-colors"
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
      </div>

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