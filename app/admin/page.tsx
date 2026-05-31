// app/admin/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  if (session.user?.role !== "super_admin") redirect("/");

  const { dateFrom, dateTo } = await searchParams;

  // Build date filter – default to today
  let dateFilter: { gte?: Date; lte?: Date } = {};
  if (dateFrom || dateTo) {
    if (typeof dateFrom === "string") dateFilter.gte = new Date(dateFrom);
    if (typeof dateTo === "string") {
      const endDate = new Date(dateTo);
      endDate.setHours(23, 59, 59, 999);
      dateFilter.lte = endDate;
    }
  } else {
    // Default: today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    dateFilter = { gte: startOfToday, lte: endOfToday };
  }

  const logs = await prisma.visitorLog.findMany({
    where: {
      signedInAt: dateFilter,
    },
    orderBy: { signedInAt: "desc" },
    include: { site: true },
  });

  const sites = await prisma.site.findMany({ orderBy: { name: "asc" } });

  const serializedLogs = logs.map((log) => ({
    ...log,
    signedInAt: log.signedInAt.toISOString(),
    signedOutAt: log.signedOutAt?.toISOString() ?? null,
  }));

  return (
    <AdminClient
      logs={serializedLogs}
      sites={sites}
      isSuperAdmin={true}
      currentDateFrom={typeof dateFrom === "string" ? dateFrom : ""}
      currentDateTo={typeof dateTo === "string" ? dateTo : ""}
    />
  );
}