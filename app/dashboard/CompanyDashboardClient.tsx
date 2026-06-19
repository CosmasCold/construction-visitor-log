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
} from "lucide-react";
import ConfirmModal from "@/components/ConfirmModal";
import QRModal from "@/components/QRModal";
import DashboardTutorial from "@/components/DashboardTutorial";

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

  // Auto‑refresh every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 5000);
    return () => clearInterval(interval);
  }, [router]);

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
    } else {
      alert("Failed to sign out visitor. Try again.");
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
    } else {
      alert("Failed to delete site.");
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
      const updated = await res.json();
      setSites((prev) =>
        prev.map((s) =>
          s.id === siteId
            ? {
                ...s,
                name: updated.name,
                slug: updated.slug,
                address: updated.address,
                safetyBriefingText: updated.safetyBriefingText,
                questions: updated.questions,
                documentSigningEnabled: updated.documentSigningEnabled,
                showVisitorListOnCheckin: updated.showVisitorListOnCheckin,
              }
            : s
        )
      );
      setEditingSiteId(null);
      setHostsForEdit([]);
      setExpectedForEdit([]);
      setEditQuestions([]);
    } else {
      alert("Failed to update site.");
    }
  }

  function copyCheckinUrl(slug: string) {
    const url = `${window.location.origin}/checkin/${slug}`;
    navigator.clipboard
      .writeText(url)
      .then(() => alert("Check-in URL copied!"))
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
    }
  }

  async function removeBlocklistEntry(id: string) {
    const res = await fetch(`/api/blocklist/${id}`, { method: "DELETE" });
    if (res.ok) {
      setBlocklistEntries((prev) => prev.filter((e) => e.id !== id));
    }
  }

  // Webhook handler
  async function saveWebhookUrl(url: string) {
    await fetch("/api/company/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ webhookUrl: url }),
    });
  }

  const showOnboarding =
    showWelcome && sites.length === 1 && sites[0].name === "Default Site";

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
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
              title="Refresh"
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 transition-all duration-200 active:scale-[0.98] flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button
              onClick={exportCSV}
              title="CSV"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98] flex items-center gap-1"
            >
              <FileText className="w-4 h-4" /> CSV
            </button>
            <button
              onClick={exportExcel}
              title="Excel"
              className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98] flex items-center gap-1"
            >
              <FileSpreadsheet className="w-4 h-4" /> Excel
            </button>
            <button
              onClick={exportPDF}
              title="PDF"
              className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98] flex items-center gap-1"
            >
              <FileDown className="w-4 h-4" /> PDF
            </button>
            <button
              onClick={() =>
                router.push(`/dashboard/analytics?slug=${companySlug}`)
              }
              className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98] flex items-center gap-1"
            >
              <FileSpreadsheet className="w-4 h-4" /> Analytics
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              title="Logout"
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 transition-all duration-200 active:scale-[0.98] flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Onboarding banner */}
        {showOnboarding && (
          <div className="bg-sky-500/10 backdrop-blur-sm border border-sky-400/30 rounded-2xl p-4 flex justify-between items-start">
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

        {/* Two‑column row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date filter */}
          <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-4 flex flex-wrap items-end gap-3">
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
          <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-4">
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
                  } else {
                    const data = await res.json().catch(() => ({}));
                    alert(data.error || "Failed to create site.");
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
                className={`relative bg-white/[0.06] backdrop-blur-md rounded-2xl border ${
                  site.lockdownEnabled ? "border-red-400/30" : "border-white/10"
                } shadow-card-raised hover:shadow-card-raised transition-shadow duration-300 p-4`}
              >
                {site.lockdownEnabled && (
                  <div className="absolute top-0 left-0 right-0 bg-red-500/10 text-red-400 text-xs text-center py-0.5 rounded-t-2xl border-b border-red-400/20">
                    🔒 LOCKDOWN
                  </div>
                )}
                {editingSiteId === site.id ? (
                  <div className="space-y-3">
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

                    {/* Hosts section */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <h4 className="text-sm font-semibold text-white mb-2">
                        Hosts (for email notifications)
                      </h4>
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

                    {/* Expected visitors section */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <h4 className="text-sm font-semibold text-white mb-2">
                        Expected visitors (quick sign‑in)
                      </h4>
                      {expectedForEdit.length > 0 && (
                        <ul className="space-y-1 mb-3">
                          {expectedForEdit.map((visitor) => (
                            <li
                              key={visitor.id}
                              className="flex justify-between items-center text-xs text-slate-300"
                            >
                              <span>
                                {visitor.name} — {visitor.company}
                              </span>
                              <button
                                type="button"
                                onClick={async () => {
                                  await fetch(
                                    `/api/sites/${site.id}/expected-visitors/${visitor.id}`,
                                    { method: "DELETE" }
                                  );
                                  setExpectedForEdit((prev) =>
                                    prev.filter((v) => v.id !== visitor.id)
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
                          value={newVisitorName}
                          onChange={(e) => setNewVisitorName(e.target.value)}
                          className="flex-1 bg-white/10 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Company"
                          value={newVisitorCompany}
                          onChange={(e) =>
                            setNewVisitorCompany(e.target.value)
                          }
                          className="flex-1 bg-white/10 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            if (!newVisitorName || !newVisitorCompany) return;
                            const res = await fetch(
                              `/api/sites/${site.id}/expected-visitors`,
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  name: newVisitorName,
                                  company: newVisitorCompany,
                                }),
                              }
                            );
                            if (res.ok) {
                              const created = await res.json();
                              setExpectedForEdit((prev) => [
                                ...prev,
                                created,
                              ]);
                              setNewVisitorName("");
                              setNewVisitorCompany("");
                            }
                          }}
                          className="bg-sky-500 hover:bg-sky-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Pre‑screening questions section */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <h4 className="text-sm font-semibold text-white mb-2">
                        Pre‑screening questions (yes/no)
                      </h4>
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

                    {/* Document Signing */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-sky-400" /> Document Signing (NDA)
                      </h4>
                      <label className="flex items-center gap-2 text-xs text-slate-200 mb-2">
                        <input
                          type="checkbox"
                          checked={docSigningEnabled}
                          onChange={(e) => setDocSigningEnabled(e.target.checked)}
                          className="h-4 w-4 rounded border-slate-600 bg-white/10 text-sky-500"
                        />
                        Require visitors to sign a document before entry
                      </label>
                      {(() => {
                        const currentSite = sites.find((s) => s.id === editingSiteId);
                        if (currentSite?.documentTemplateData) {
                          return (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-400">Template uploaded</span>
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
                                  await fetch(`/api/sites/${editingSiteId}/document-template`, { method: 'DELETE' });
                                  setSites((prev) =>
                                    prev.map((s) =>
                                      s.id === editingSiteId ? { ...s, documentTemplateData: null } : s
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
                                  const fileBase64 = ev.target?.result as string;
                                  const res = await fetch(`/api/sites/${editingSiteId}/document-template`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ fileBase64 }),
                                  });

                                  if (res.ok) {
                                    setSites((prev) =>
                                      prev.map((s) =>
                                        s.id === editingSiteId ? { ...s, documentTemplateData: fileBase64 } : s
                                      )
                                    );
                                    alert('Template uploaded');
                                  } else {
                                    alert('Upload failed');
                                  }
                                  setDocTemplateUploading(false);
                                };
                                reader.readAsDataURL(file);
                              }}
                              className="text-xs text-white"
                            />
                            {docTemplateUploading && <span className="text-xs text-sky-400">Uploading…</span>}
                          </div>
                        );
                      })()}
                    </div>

                    {/* Visitor list privacy toggle */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <h4 className="text-sm font-semibold text-white mb-2">
                        Check‑in Page Privacy
                      </h4>
                      <label className="flex items-center gap-2 text-xs text-slate-200 mb-2">
                        <input
                          type="checkbox"
                          checked={showVisitorList}
                          onChange={(e) => setShowVisitorList(e.target.checked)}
                          className="h-4 w-4 rounded border-slate-600 bg-white/10 text-sky-500"
                        />
                        Show visitor list on check‑in page (disabling hides it for privacy)
                      </label>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(site.id)}
                        className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 active:scale-[0.98]"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 active:scale-[0.98]"
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
                          onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const newLockdown = !site.lockdownEnabled;
                            const res = await fetch(`/api/sites/${site.id}/lockdown`, {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ lockdown: newLockdown }),
                            });
                            if (res.ok) {
                              setSites((prev) =>
                                prev.map((s) =>
                                  s.id === site.id ? { ...s, lockdownEnabled: newLockdown } : s
                                )
                              );
                            }
                          }}
                          className={`inline-flex items-center transition-colors duration-150 ${
                            site.lockdownEnabled
                              ? "text-red-400 hover:text-red-300"
                              : "text-slate-400 hover:text-white"
                          }`}
                          title={site.lockdownEnabled ? "End lockdown" : "Activate lockdown"}
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
                        onClick={() => startEdit(site)}
                        className="text-sky-400 hover:text-sky-300 text-xs transition-colors duration-150 flex items-center gap-0.5"
                        title="Edit site"
                      >
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
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
        <div id="blocklist-section" className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-400" /> Watchlist / Blocklist
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Automatically flag visitors whose name, email, or phone number matches
            an entry. Alerts are shown at check‑in.
          </p>

          {/* Add form */}
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
              onClick={addBlocklistEntry}
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-xs font-medium"
            >
              Add
            </button>
          </div>

          {/* Entries table */}
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
        <div id="webhook-section" className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-sky-400" /> Webhooks
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Send real‑time events (check‑in, check‑out, blocklist hits) to your own tools. Enter a URL to receive JSON payloads.
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
              onClick={() => saveWebhookUrl(webhookUrl)}
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-xs font-medium"
            >
              Save
            </button>
          </div>
          {webhookUrl && (
            <button
              onClick={async () => {
                await fetch("/api/webhook/test", { method: "POST" });
                alert("Test event sent");
              }}
              className="mt-3 text-xs text-sky-400 hover:text-sky-300"
            >
              Send test event
            </button>
          )}
        </div>

        {/* Visitors table */}
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5">
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
                    className="text-slate-300 hover:bg-white/[0.03] transition-colors duration-150"
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