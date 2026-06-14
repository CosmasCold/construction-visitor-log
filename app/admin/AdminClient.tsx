// app/admin/AdminClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { logEvent } from "@/lib/analytics";
import {
  RefreshCw,
  FileSpreadsheet,
  FileText,
  FileDown,
  LogOut,
  Trash2,
  ExternalLink,
  Building,
  Users,
  CheckCircle2,
  XCircle,
  BarChart3,
} from "lucide-react";
import ConfirmModal from "@/components/ConfirmModal";

type Visitor = {
  id: string;
  fullName: string;
  company: string;
  phone: string | null;
  email: string | null;
  hostName: string | null;
  safetyAcknowledged: boolean;
  signedInAt: string;
  signedOutAt: string | null;
  site: { name: string; slug: string; companyId: string };
};

type Site = {
  id: string;
  slug: string;
  name: string;
  address: string | null;
  safetyBriefingText: string;
};

type Company = {
  id: string;
  name: string;
};

export default function AdminClient({
  logs,
  sites,
  companies,
  isSuperAdmin,
  currentDateFrom,
  currentDateTo,
  currentCompanyId,
}: {
  logs: Visitor[];
  sites: Site[];
  companies: Company[];
  isSuperAdmin: boolean;
  currentDateFrom?: string;
  currentDateTo?: string;
  currentCompanyId?: string;
}) {
  const router = useRouter();
  const [dateFrom, setDateFrom] = useState(currentDateFrom || "");
  const [dateTo, setDateTo] = useState(currentDateTo || "");
  const [selectedCompanyId, setSelectedCompanyId] = useState(
    currentCompanyId || ""
  );
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  function applyFilter() {
    const params = new URLSearchParams();
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);
    if (selectedCompanyId) params.set("companyId", selectedCompanyId);
    router.push(`/admin?${params.toString()}`);
  }

  function clearFilter() {
    setDateFrom("");
    setDateTo("");
    setSelectedCompanyId("");
    router.push("/admin");
  }

  async function handleDeleteSite(siteId: string) {
    const res = await fetch(`/api/sites/${siteId}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
      setDeleteTarget(null);
    } else {
      alert("Failed to delete site.");
    }
  }

  function exportCSV() {
    const headers = [
      "Site",
      "Name",
      "Company",
      "Phone",
      "Email",
      "Host",
      "Safety OK",
      "Signed In",
      "Signed Out",
    ];
    const rows = logs.map((v) => [
      v.site.name,
      v.fullName,
      v.company,
      v.phone || "",
      v.email || "",
      v.hostName || "",
      v.safetyAcknowledged ? "Yes" : "No",
      v.signedInAt,
      v.signedOutAt || "Still on site",
    ]);
    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((cell: string) => `"${cell.replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `visitor_log_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    logEvent("export", { format: "csv" });
  }

  async function exportExcel() {
    const XLSX = await import("xlsx");
    const wsData = logs.map((v) => ({
      Site: v.site.name,
      Name: v.fullName,
      Company: v.company,
      Phone: v.phone || "",
      Email: v.email || "",
      Host: v.hostName || "",
      "Safety OK": v.safetyAcknowledged ? "Yes" : "No",
      "Signed In": v.signedInAt,
      "Signed Out": v.signedOutAt || "Still on site",
    }));
    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Visitor Log");
    XLSX.writeFile(
      wb,
      `visitor_log_${new Date().toISOString().slice(0, 10)}.xlsx`
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
      "Email",
      "Host",
      "Safety OK",
      "Signed In",
      "Signed Out",
    ];
    const rows = logs.map((v) => [
      v.site.name,
      v.fullName,
      v.company,
      v.phone || "",
      v.email || "",
      v.hostName || "",
      v.safetyAcknowledged ? "Yes" : "No",
      new Date(v.signedInAt).toLocaleString(),
      v.signedOutAt ? new Date(v.signedOutAt).toLocaleString() : "On site",
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
      `visitor_log_${new Date().toISOString().slice(0, 10)}.pdf`
    );
    logEvent("export", { format: "pdf" });
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
              <Building className="w-6 h-6 text-sky-400" /> Admin Dashboard
            </h1>
            <p className="text-sm text-slate-400">Full audit trail</p>
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
            {isSuperAdmin && (
              <a
                href="/admin/analytics"
                className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1"
              >
                <BarChart3 className="w-4 h-4" /> Analytics
              </a>
            )}
            <a
              href="/admin/checklist"
              className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1"
            >
              Checklist Requests
            </a>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              title="Logout"
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 transition-all duration-200 active:scale-[0.98] flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Filters */}
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
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">
              Company
            </label>
            <select
              value={selectedCompanyId}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
            >
              <option value="">All companies</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
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

        {/* Sites list (super admin only) */}
        {isSuperAdmin && sites.length > 0 && (
          <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6">
            <h2 className="text-lg font-semibold tracking-tight text-white mb-4 flex items-center gap-2">
              <Building className="w-5 h-5 text-sky-400" /> Sites
            </h2>
            <ul className="divide-y divide-white/5">
              {sites.map((site) => (
                <li
                  key={site.id}
                  className="py-3 flex justify-between items-center"
                >
                  <div>
                    <a
                      href={`/checkin/${encodeURIComponent(site.slug)}`}
                      target="_blank"
                      className="font-medium text-sky-400 hover:text-sky-300 transition-colors duration-150 flex items-center gap-1"
                    >
                      {site.name} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <p className="text-sm text-slate-400">
                      Check-in: /checkin/{site.slug}
                    </p>
                    {site.address && (
                      <p className="text-xs text-slate-500">{site.address}</p>
                    )}
                  </div>
                  <button
                    onClick={() => setDeleteTarget(site.id)}
                    className="text-rose-400 hover:text-rose-300 text-xs transition-colors duration-150 flex items-center gap-0.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Visitors table */}
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5">
              <tr className="text-xs font-medium uppercase tracking-wider text-slate-400">
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
                  Email
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
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="p-6 text-center text-slate-500"
                  >
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No records for this period</p>
                  </td>
                </tr>
              ) : (
                logs.map((v) => (
                  <tr
                    key={v.id}
                    className="text-slate-300 hover:bg-white/[0.03] transition-colors duration-150"
                  >
                    <td className="p-3">{v.site.name}</td>
                    <td className="p-3 font-medium text-white">
                      {v.fullName}
                    </td>
                    <td className="p-3">{v.company}</td>
                    <td className="p-3">{v.phone || "—"}</td>
                    <td className="p-3">{v.email || "—"}</td>
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
    </div>
  );
}