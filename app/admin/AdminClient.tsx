// app/admin/AdminClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  ClipboardList,
  Calendar,
  Filter,
  Download,
  ChevronRight,
  Shield,
  Clock,
  AlertTriangle,
  Search,
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

  // Stats
  const activeNow = logs.filter((v) => !v.signedOutAt).length;
  const totalRecords = logs.length;
  const sitesCount = sites.length;

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0f1c]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white leading-tight">Admin Dashboard</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Full audit trail</p>
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
            
            {isSuperAdmin && (
              <Link
                href="/admin/analytics"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Analytics</span>
              </Link>
            )}
            
            <Link
              href="/admin/checklist"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all"
            >
              <ClipboardList className="w-4 h-4" />
              <span className="hidden sm:inline">Checklist</span>
            </Link>
            
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
        
        {/* ─── Stats ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Active now", value: activeNow, color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { icon: FileText, label: "Total records", value: totalRecords, color: "text-sky-400", bg: "bg-sky-500/10" },
            { icon: Building, label: "Sites", value: sitesCount, color: "text-violet-400", bg: "bg-violet-500/10" },
            { icon: Calendar, label: "Date range", value: dateFrom && dateTo ? `${dateFrom} → ${dateTo}` : "All time", color: "text-amber-400", bg: "bg-amber-500/10", isText: true },
          ].map((stat, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-white/[0.03] p-4 hover:bg-white/[0.05] transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">{stat.label}</span>
              </div>
              <p className={`text-lg font-bold ${stat.isText ? "text-slate-300 text-sm truncate" : "text-white"}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* ─── Filters & Exports ─── */}
        <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
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
            </div>

            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
              <select
                value={selectedCompanyId}
                onChange={(e) => setSelectedCompanyId(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 rounded-xl pl-9 pr-8 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              >
                <option value="" className="bg-[#0f172a] text-slate-400">All companies</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#0f172a]">
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 rotate-90 pointer-events-none" />
            </div>

            <button
              onClick={applyFilter}
              className="px-4 py-2.5 rounded-xl bg-sky-500/10 text-sky-300 text-sm font-medium hover:bg-sky-500/20 transition-all active:scale-[0.98]"
            >
              Apply
            </button>
            {(dateFrom || dateTo || selectedCompanyId) && (
              <button
                onClick={clearFilter}
                className="px-3 py-2.5 text-sm text-slate-500 hover:text-slate-300 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-white/5 bg-white/[0.03] p-1">
            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              title="Export CSV"
            >
              <FileText className="w-3.5 h-3.5" /> CSV
            </button>
            <div className="h-4 w-px bg-white/5" />
            <button
              onClick={exportExcel}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              title="Export Excel"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> Excel
            </button>
            <div className="h-4 w-px bg-white/5" />
            <button
              onClick={exportPDF}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              title="Export PDF"
            >
              <FileDown className="w-3.5 h-3.5" /> PDF
            </button>
          </div>
        </div>

        {/* ─── Sites (Super Admin) ─── */}
        {isSuperAdmin && sites.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                <Building className="w-4 h-4 text-violet-400" /> All Sites
              </h2>
              <span className="text-xs text-slate-500">{sites.length} sites</span>
            </div>
            
            <div className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/5 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                    <th className="p-3 text-left">Site</th>
                    <th className="p-3 text-left">Slug</th>
                    <th className="p-3 text-left">Address</th>
                    <th className="p-3 text-left w-24">Check-in</th>
                    <th className="p-3 text-right w-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {sites.map((site) => (
                    <tr key={site.id} className="text-slate-300 hover:bg-white/[0.02] transition-colors">
                      <td className="p-3">
                        <p className="text-sm font-medium text-white">{site.name}</p>
                      </td>
                      <td className="p-3">
                        <span className="font-mono text-xs text-slate-500">/{site.slug}</span>
                      </td>
                      <td className="p-3 text-xs text-slate-500">
                        {site.address || "—"}
                      </td>
                      <td className="p-3">
                        <a
                          href={`/checkin/${encodeURIComponent(site.slug)}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 transition-colors"
                        >
                          Open <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setDeleteTarget(site.id)}
                          className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 px-2 py-1 rounded hover:bg-rose-500/10 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ─── Visitor Log ─── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" /> Visitor Log
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {logs.length} records {dateFrom && dateTo ? `• ${dateFrom} to ${dateTo}` : ""}
                {selectedCompanyId ? `• ${companies.find(c => c.id === selectedCompanyId)?.name || 'Filtered'}` : ""}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[1000px]">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/5 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  <th className="p-3 text-left">Site</th>
                  <th className="p-3 text-left">Visitor</th>
                  <th className="p-3 text-left">Company</th>
                  <th className="p-3 text-left">Contact</th>
                  <th className="p-3 text-left">Host</th>
                  <th className="p-3 text-left">Time</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left w-16">Safety</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center">
                      <Users className="w-8 h-8 mx-auto text-slate-700 mb-2" />
                      <p className="text-sm text-slate-500">No records for this period</p>
                      <p className="text-xs text-slate-600 mt-1">Adjust your filters or date range</p>
                    </td>
                  </tr>
                ) : (
                  logs.map((v) => (
                    <tr key={v.id} className="text-slate-300 hover:bg-white/[0.02] transition-colors group">
                      <td className="p-3">
                        <span className="text-xs font-medium text-white">{v.site.name}</span>
                      </td>
                      <td className="p-3">
                        <p className="text-sm font-medium text-white">{v.fullName}</p>
                      </td>
                      <td className="p-3 text-xs text-slate-400">{v.company}</td>
                      <td className="p-3">
                        <div className="text-xs text-slate-400 space-y-0.5">
                          {v.phone && <p>{v.phone}</p>}
                          {v.email && <p className="text-slate-600">{v.email}</p>}
                          {!v.phone && !v.email && <span className="text-slate-600">—</span>}
                        </div>
                      </td>
                      <td className="p-3 text-xs text-slate-400">{v.hostName || "—"}</td>
                      <td className="p-3">
                        <div className="text-xs text-slate-400 space-y-0.5">
                          <p>{new Date(v.signedInAt).toLocaleDateString()}</p>
                          <p className="text-slate-600">{new Date(v.signedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
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
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400" />
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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
    </div>
  );
}