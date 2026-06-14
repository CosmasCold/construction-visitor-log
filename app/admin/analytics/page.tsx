// app/admin/analytics/page.tsx
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { AnalyticsEvent } from "@prisma/client";
import {
  BarChart3,
  Users,
  CheckCircle2,
  Download,
  MousePointerClick,
} from "lucide-react";

export default async function AdminAnalyticsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "super_admin") {
    redirect("/admin/login");
  }

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const events: AnalyticsEvent[] = await prisma.analyticsEvent.findMany({
    where: { createdAt: { gte: thirtyDaysAgo } },
    orderBy: { createdAt: "desc" },
  });

  const ctaClicks = events.filter((e) => e.name === "cta_click").length;
  const auditCompleted = events.filter((e) => e.name === "self_audit_completed").length;
  const checklistSubmitted = events.filter(
    (e) => e.name === "checklist_submitted" || e.name === "checklist_submitted_exit_popup"
  ).length;
  const exports = events.filter((e) => e.name === "export").length;

  const recentUsers = await prisma.user.count({
    where: { createdAt: { gte: thirtyDaysAgo } },
  });

  const stats = [
    { icon: MousePointerClick, label: "CTA clicks (30d)", value: ctaClicks },
    { icon: CheckCircle2, label: "Audits completed (30d)", value: auditCompleted },
    { icon: Users, label: "New sign‑ups (30d)", value: recentUsers },
    { icon: Download, label: "Checklist downloads (30d)", value: checklistSubmitted },
    { icon: BarChart3, label: "Exports (30d)", value: exports },
  ];

  const recentEvents = events.slice(0, 20);

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-2xl font-semibold text-white">Analytics</h1>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-4 text-center"
            >
              <stat.icon className="w-5 h-5 text-sky-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent events table */}
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5">
              <tr className="text-xs font-medium uppercase text-slate-400">
                <th scope="col" className="p-3 text-left">Event</th>
                <th scope="col" className="p-3 text-left">Details</th>
                <th scope="col" className="p-3 text-left">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {recentEvents.map((event) => (
                <tr key={event.id}>
                  <td className="p-3 font-medium text-white">{event.name}</td>
                  <td className="p-3 text-xs">
                    {event.data ? JSON.stringify(event.data) : "—"}
                  </td>
                  <td className="p-3 text-xs">
                    {new Date(event.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
              {recentEvents.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-slate-500">
                    No events yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}