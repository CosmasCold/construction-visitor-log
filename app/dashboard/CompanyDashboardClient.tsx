// app/dashboard/CompanyDashboardClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
};

type Site = {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  safetyBriefingText: string;
  visitorsToday: number;
};

export default function CompanyDashboardClient({
  companyId,
  companySlug,
  companyName,
  logs,
  sites,
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
  const [showNewSite, setShowNewSite] = useState(false);

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
    if (!confirm("Delete this site and all its visitor records?")) return;
    const res = await fetch(`/api/sites/${siteId}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete site.");
    }
  }

  function exportCSV() {
    const headers = ["Site", "Name", "Company", "Phone", "Host", "Safety OK", "Signed In", "Signed Out"];
    const rows = logs.map((v) => [
      v.siteName,
      v.fullName,
      v.company,
      v.phone || "",
      v.hostName || "",
      v.safetyAcknowledged ? "Yes" : "No",
      v.signedInAt,
      v.signedOutAt || "Still on site",
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `visitors_${companySlug}_${new Date().toISOString().slice(0, 10)}.csv`;
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
    }));
    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Visitors");
    XLSX.writeFile(wb, `visitors_${companySlug}_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  function exportPDF() {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const headers = [
      "Site", "Name", "Company", "Phone", "Host",
      "Safety OK", "Signed In", "Signed Out",
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
    doc.save(`visitors_${companySlug}_${new Date().toISOString().slice(0, 10)}.pdf`);
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">{companyName}</h1>
            <p className="text-sm text-slate-300">Visitor Log & Site Management</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => router.refresh()}
              className="bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/20 border border-white/20"
              title="Refresh data"
            >
              🔄 Refresh
            </button>
            <button onClick={exportCSV} className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700">
              CSV
            </button>
            <button onClick={exportExcel} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700">
              Excel
            </button>
            <button onClick={exportPDF} className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-700">
              PDF
            </button>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/20 border border-white/20">
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-4 flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-xs text-slate-600 mb-1">From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm bg-white/70"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-600 mb-1">To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm bg-white/70"
            />
          </div>
          <button onClick={applyFilter} className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-700">
            Apply
          </button>
          <button onClick={clearFilter} className="text-slate-600 hover:text-slate-800 text-sm">
            Clear
          </button>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6">
          <button
            onClick={() => setShowNewSite(!showNewSite)}
            className="text-sky-600 font-medium text-sm mb-3"
          >
            {showNewSite ? "– Cancel" : "+ New Site"}
          </button>
          {showNewSite && (
            <form action="/api/sites" method="POST" className="space-y-4 mt-3">
              <input type="hidden" name="companyId" value={companyId} />
              <input
                type="text"
                name="name"
                placeholder="Site Name"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white/70 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white/70 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <input
                type="text"
                name="slug"
                placeholder="URL Slug (e.g., downtown)"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white/70 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <button
                type="submit"
                className="bg-sky-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-sky-700 transition-colors"
              >
                Create Site
              </button>
            </form>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sites.length === 0 ? (
            <p className="text-slate-400 col-span-2 text-center">No sites yet.</p>
          ) : (
            sites.map((site) => (
              <div
                key={site.id}
                className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-white/20 p-4 flex justify-between items-start"
              >
                <a
                  href={`/checkin/${encodeURIComponent(site.slug)}`}
                  target="_blank"
                  className="flex-1"
                >
                  <h3 className="font-semibold text-slate-800">{site.name}</h3>
                  <p className="text-xs text-slate-500">/{site.slug}</p>
                  <p className="text-xs text-slate-400 mt-1">{site.visitorsToday} today</p>
                </a>
                <button
                  onClick={() => handleDeleteSite(site.id)}
                  className="text-red-500 hover:text-red-700 text-xs ml-2 mt-1"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/50">
              <tr>
                <th className="p-3 text-left">Site</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Company</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Host</th>
                <th className="p-3 text-left">Signed In</th>
                <th className="p-3 text-left">Signed Out</th>
                <th className="p-3 text-left">Safety</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-slate-500">
                    No records for this period
                  </td>
                </tr>
              ) : (
                logs.map((v) => (
                  <tr key={v.id} className="border-t border-gray-100">
                    <td className="p-3">{v.siteName}</td>
                    <td className="p-3 font-medium">{v.fullName}</td>
                    <td className="p-3">{v.company}</td>
                    <td className="p-3">{v.phone || "—"}</td>
                    <td className="p-3">{v.hostName || "—"}</td>
                    <td className="p-3">{new Date(v.signedInAt).toLocaleString()}</td>
                    <td className="p-3">
                      {v.signedOutAt
                        ? new Date(v.signedOutAt).toLocaleString()
                        : "✓ On site"}
                    </td>
                    <td className="p-3">{v.safetyAcknowledged ? "✅" : "❌"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}