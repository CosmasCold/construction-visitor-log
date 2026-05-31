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

  let logs;
  let sites: Site[] = [];

  if (isSuperAdmin) {
    logs = await prisma.visitorLog.findMany({
      orderBy: { signedInAt: "desc" },
      include: { site: true },
    });
    sites = await prisma.site.findMany();
  } else {
    // Company owner: show logs only for their company
    if (!session.user.companyId) {
      return <p className="p-8 text-center">You are not assigned to any company.</p>;
    }
    const companySites = await prisma.site.findMany({
      where: { companyId: session.user.companyId },
      select: { id: true },
    });
    const siteIds = companySites.map((s) => s.id);

    logs = await prisma.visitorLog.findMany({
      where: { siteId: { in: siteIds } },
      orderBy: { signedInAt: "desc" },
      include: { site: true },
    });

    // Sites list for admins (only super admins see sites, but we'll keep it for consistency)
    sites = await prisma.site.findMany({
      where: { companyId: session.user.companyId },
    });
  }

  const serializedLogs = logs.map((log) => ({
    ...log,
    signedInAt: log.signedInAt.toISOString(),
    signedOutAt: log.signedOutAt?.toISOString() ?? null,
  }));

  return <AdminClient logs={serializedLogs} sites={sites} isSuperAdmin={isSuperAdmin} />;
}