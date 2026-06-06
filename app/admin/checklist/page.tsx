// app/admin/checklist/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ChecklistAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "super_admin") redirect("/admin/login");

  const requests = await prisma.checklistRequest.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, email: true, createdAt: true },
  });

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">Checklist Requests</h1>
          <Link
            href="/admin"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Admin
          </Link>
        </div>

        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5">
              <tr className="text-xs font-medium uppercase tracking-wider text-slate-400">
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={2} className="p-6 text-center text-slate-500">
                    No checklist requests yet.
                  </td>
                </tr>
              ) : (
                requests.map((r: { id: string; email: string; createdAt: Date }) => (
                  <tr key={r.id} className="text-slate-300 hover:bg-white/[0.03] transition-colors">
                    <td className="p-3">{r.email}</td>
                    <td className="p-3">{new Date(r.createdAt).toLocaleString()}</td>
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