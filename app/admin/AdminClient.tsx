// app/admin/AdminClient.tsx
"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import * as XLSX from "xlsx";

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
  site: { name: string };
};

type Site = {
  id: string;
  slug: string;
  name: string;
  address: string | null;
  safetyBriefingText: string;
};

export default function AdminClient({
  logs,
  sites,
  isSuperAdmin,
}: {
  logs: Visitor[];
  sites: Site[];
  isSuperAdmin: boolean;
}) {
  const [showNewSite, setShowNewSite] = useState(false);
  const [siteName, setSiteName] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [siteSlug, setSiteSlug] = useState("");
  const [siteBriefing, setSiteBriefing] = useState("");
  const [creatingSite, setCreatingSite] = useState(false);

  async function handleCreateSite(e: React.FormEvent) {
    e.preventDefault();
    setCreatingSite(true);
    const res = await fetch("/api/admin/sites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: siteName,
        address: siteAddress,
        slug: siteSlug,
        safetyBriefingText: siteBriefing,
      }),
    });
    if (res.ok) {
      alert("Site created. Refresh the page.");
      setShowNewSite(false);
    } else {
      alert("Failed to create site");
    }
    setCreatingSite(false);
  }

  function exportCSV() {
    const headers = ["Site", "Name", "Company", "Phone", "Host", "Safety OK", "Signed In", "Signed Out"];
    const rows = logs.map((v) => [
      v.site.name,
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
    link.download = `visitor_log_${new Date().toISOString()}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function exportExcel() {
    const wsData = logs.map((v) => ({
      Site: v.site.name,
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
    XLSX.utils.book_append_sheet(wb, ws, "Visitor Log");
    XLSX.writeFile(wb, `visitor_log_${new Date().toISOString()}.xlsx`);
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Admin Dashboard</h1>
            <p className="text-sm text-slate-500">Full audit trail</p>
          </div>
          <div className="flex gap-3">
            {isSuperAdmin && (
              <button onClick={() => setShowNewSite(!showNewSite)} className="bg-amber-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-amber-700">
                New Site
              </button>
            )}
            <button onClick={exportCSV} className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700">Export CSV</button>
            <button onClick={exportExcel} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700">Export Excel</button>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="bg-gray-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-300">Logout</button>
          </div>
        </div>

        {showNewSite && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Create New Site</h2>
            <form onSubmit={handleCreateSite} className="space-y-4">
              <input type="text" placeholder="Site Name" value={siteName} onChange={(e) => setSiteName(e.target.value)} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm" />
              <input type="text" placeholder="Address" value={siteAddress} onChange={(e) => setSiteAddress(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm" />
              <input type="text" placeholder="Slug (URL part, e.g., 'my-site')" value={siteSlug} onChange={(e) => setSiteSlug(e.target.value)} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm" />
              <textarea placeholder="Safety Briefing" value={siteBriefing} onChange={(e) => setSiteBriefing(e.target.value)} rows={3} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm" />
              <button type="submit" disabled={creatingSite} className="bg-amber-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-amber-700">
                {creatingSite ? "Creating..." : "Create Site"}
              </button>
            </form>
          </div>
        )}

        {isSuperAdmin && sites.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Sites</h2>
            <ul className="divide-y">
              {sites.map((site) => (
                <li key={site.id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{site.name}</p>
                    <p className="text-sm text-slate-500">Check-in URL: /checkin/{site.slug}</p>
                  </div>
                  <span className="text-xs text-slate-400">{site.address}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3">Site</th>
                <th className="p-3">Name</th>
                <th className="p-3">Company</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Host</th>
                <th className="p-3">Signed In</th>
                <th className="p-3">Signed Out</th>
                <th className="p-3">Safety</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr><td colSpan={8} className="p-6 text-center text-slate-500">No records yet</td></tr>
              ) : (
                logs.map((v) => (
                  <tr key={v.id} className="border-t border-gray-100">
                    <td className="p-3">{v.site.name}</td>
                    <td className="p-3 font-medium">{v.fullName}</td>
                    <td className="p-3">{v.company}</td>
                    <td className="p-3">{v.phone || "—"}</td>
                    <td className="p-3">{v.hostName || "—"}</td>
                    <td className="p-3">{new Date(v.signedInAt).toLocaleString()}</td>
                    <td className="p-3">{v.signedOutAt ? new Date(v.signedOutAt).toLocaleString() : "✓ On site"}</td>
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