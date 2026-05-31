// app/dashboard/[companySlug]/CompanyDashboardClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

type Site = {
  id: string;
  slug: string;
  name: string;
  address: string | null;
  visitors: {
    id: string;
    fullName: string;
    company: string;
    signedInAt: string;
    signedOutAt: string | null;
    safetyAcknowledged: boolean;
  }[];
};

type Company = {
  id: string;
  name: string;
};

export default function CompanyDashboardClient({
  company,
  sites,
}: {
  company: Company;
  sites: Site[];
}) {
  const [showNewSite, setShowNewSite] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [slug, setSlug] = useState("");

  async function createSite(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/sites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, address, slug, companyId: company.id }),
    });
    if (res.ok) {
      window.location.reload();
    } else {
      alert("Failed to create site");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">{company.name}</h1>
            <p className="text-sm text-slate-500">Site Management</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowNewSite(!showNewSite)}
              className="bg-amber-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-amber-600"
            >
              + New Site
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-gray-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-300"
            >
              Logout
            </button>
          </div>
        </div>

        {showNewSite && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <form onSubmit={createSite} className="space-y-4">
              <input
                type="text"
                placeholder="Site Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
              />
              <input
                type="text"
                placeholder="URL Slug (e.g., downtown)"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
              />
              <button
                type="submit"
                className="bg-amber-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-amber-700"
              >
                Create Site
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sites.map((site) => (
            <Link
              key={site.id}
              href={`/sites/${site.id}`}
              className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-slate-800">{site.name}</h3>
              <p className="text-sm text-slate-500 mt-1">Check-in: /checkin/{site.slug}</p>
              <p className="text-xs text-slate-400 mt-2">
                Visitors today:{" "}
                {site.visitors.filter(
                  (v) => new Date(v.signedInAt).toDateString() === new Date().toDateString()
                ).length}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}