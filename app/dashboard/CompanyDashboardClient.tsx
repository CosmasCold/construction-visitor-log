// app/dashboard/CompanyDashboardClient.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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
  Construction,
  ClipboardList,
  CheckCircle2,
  XCircle,
  QrCode,
} from "lucide-react";
import ConfirmModal from "@/components/ConfirmModal";
import QRModal from "@/components/QRModal";

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
};

type Site = {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  safetyBriefingText: string;
  visitorsToday: number;
  questions?: string[] | null;
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

  // Auto‑refresh every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 5000);
    return () => clearInterval(interval);
  }, [router]);

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

    // Fetch hosts
    fetch(`/api/sites/${site.id}/hosts`)
      .then((res) => res.json())
      .then((data) => setHostsForEdit(Array.isArray(data) ? data : []))
      .catch(() => setHostsForEdit([]));

    // Fetch expected visitors
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
      "Site", "Name", "Company", "Phone", "Host", "Safety OK", "Signed In", "Signed Out", "Pre‑screening",
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
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell: string) => `"${cell.replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `visitors_${companySlug}_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function exportExcel() {
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
    }));
    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Visitors");
    XLSX.writeFile(
      wb,
      `visitors_${companySlug}_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  }

  function exportPDF() {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });
    const headers = [
      "Site", "Name", "Company", "Phone", "Host", "Safety OK", "Signed In", "Signed Out", "Pre‑screening",
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
              <Construction className="w-6 h-6 text-sky-400" /> {companyName}
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
              onClick={() => router.push(`/dashboard/analytics?slug=${companySlug}`)}
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
                action="/api/sites"
                method="POST"
                className="space-y-4 mt-3"
              >
                <input type="hidden" name="companyId" value={companyId} />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sites.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-slate-400">
              <Construction className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium">No sites yet</p>
              <p className="text-sm mt-1">
                Create your first site to start checking in visitors.
              </p>
            </div>
          ) : (
            sites.map((site) => (
              <div
                key={site.id}
                className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised hover:shadow-card-raised transition-shadow duration-300 p-4"
              >
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
                                headers: { "Content-Type": "application/json" },
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
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  name: newVisitorName,
                                  company: newVisitorCompany,
                                }),
                              }
                            );
                            if (res.ok) {
                              const created = await res.json();
                              setExpectedForEdit((prev) => [...prev, created]);
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
                            setEditQuestions((prev) => [...prev, newQuestion.trim()]);
                            setNewQuestion("");
                          }}
                          className="bg-sky-500 hover:bg-sky-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Add
                        </button>
                      </div>
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

        {/* Visitors table */}
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5">
              <tr className="text-xs font-medium uppercase tracking-wider text-slate-400">
                <th className="p-3 text-left">Photo</th>
                <th className="p-3 text-left">Site</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Company</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Host</th>
                <th className="p-3 text-left">Signed In</th>
                <th className="p-3 text-left">Signed Out</th>
                <th className="p-3 text-left">Safety</th>
                <th className="p-3 text-left">Pre‑screening</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-4 text-center text-slate-500">
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
                        <a href={v.photoUrl} target="_blank" rel="noopener noreferrer">
                          <img src={v.photoUrl} alt={v.fullName} className="w-10 h-10 rounded object-cover" />
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
    </div>
  );
}