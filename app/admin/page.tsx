// app/admin/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";
import type { Site } from "@prisma/client";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const isSuperAdmin = session.user.role === "super_admin";
  const managerSiteId = session.user.siteId;

  let logs;
  let sites: Site[] = [];   // 👈 typed, no implicit any

  if (isSuperAdmin) {
    logs = await prisma.visitorLog.findMany({
      orderBy: { signedInAt: "desc" },
      include: { site: true },
    });
    sites = await prisma.site.findMany();
  } else {
    if (!managerSiteId) {
      return <p className="p-8 text-center">You are not assigned to any site.</p>;
    }
    logs = await prisma.visitorLog.findMany({
      where: { siteId: managerSiteId },
      orderBy: { signedInAt: "desc" },
      include: { site: true },
    });
  }

  const serializedLogs = logs.map((log) => ({
    ...log,
    signedInAt: log.signedInAt.toISOString(),
    signedOutAt: log.signedOutAt?.toISOString() ?? null,
  }));

  return <AdminClient logs={serializedLogs} sites={sites} isSuperAdmin={isSuperAdmin} />;
}