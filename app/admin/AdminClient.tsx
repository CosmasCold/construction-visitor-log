// app/admin/AdminClient.tsx
"use client";

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
  site: { name: string; slug: string };
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
  async function handleDeleteSite(siteId: string) {
    if (!confirm("Delete this site and all its visitor records?")) return;
    const res = await fetch(`/api/sites/${siteId}`, { method: "DELETE" });
    if (res.ok) {
      window.location.reload();
    } else {
      alert("Failed to delete site.");
    }
  }

  function exportCSV() {
    const headers = ["Site", "Name", "Company", "Phone", "Email", "Host", "Safety OK", "Signed In", "Signed Out"];
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
      Email: v.email || "",
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
            <button onClick={exportCSV} className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700">
              Export CSV
            </button>
            <button onClick={exportExcel} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700">
              Export Excel
            </button>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="bg-gray-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-300">
              Logout
            </button>
          </div>
        </div>

        {isSuperAdmin && sites.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Sites</h2>
            <ul className="divide-y">
              {sites.map((site) => (
                <li key={site.id} className="py-3 flex justify-between items-center">
                  <div>
                    <a
                      href={`/checkin/${encodeURIComponent(site.slug)}`}
                      target="_blank"
                      className="font-medium text-sky-600 hover:underline"
                    >
                      {site.name}
                    </a>
                    <p className="text-sm text-slate-500">Check-in: /checkin/{site.slug}</p>
                    {site.address && (
                      <p className="text-xs text-slate-400">{site.address}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteSite(site.id)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Delete
                  </button>
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
                <th className="p-3">Email</th>
                <th className="p-3">Host</th>
                <th className="p-3">Signed In</th>
                <th className="p-3">Signed Out</th>
                <th className="p-3">Safety</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-6 text-center text-slate-500">No records yet</td>
                </tr>
              ) : (
                logs.map((v) => (
                  <tr key={v.id} className="border-t border-gray-100">
                    <td className="p-3">{v.site.name}</td>
                    <td className="p-3 font-medium">{v.fullName}</td>
                    <td className="p-3">{v.company}</td>
                    <td className="p-3">{v.phone || "—"}</td>
                    <td className="p-3">{v.email || "—"}</td>
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