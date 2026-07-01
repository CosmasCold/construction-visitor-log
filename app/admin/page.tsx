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

  const { dateFrom, dateTo, companyId } = await searchParams;

  let dateFilter: { gte?: Date; lte?: Date } = {};
  if (dateFrom || dateTo) {
    if (typeof dateFrom === "string") dateFilter.gte = new Date(dateFrom);
    if (typeof dateTo === "string") {
      const endDate = new Date(dateTo);
      endDate.setHours(23, 59, 59, 999);
      dateFilter.lte = endDate;
    }
  } else {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    dateFilter = { gte: startOfToday, lte: endOfToday };
  }

  const whereClause: {
    signedInAt: { gte?: Date; lte?: Date };
    site?: { companyId: string };
  } = {
    signedInAt: dateFilter,
  };
  if (typeof companyId === "string" && companyId.length > 0) {
    whereClause.site = { companyId };
  }

  const logs = await prisma.visitorLog.findMany({
    where: whereClause,
    orderBy: { signedInAt: "desc" },
    include: {
      site: {
        select: { name: true, slug: true, companyId: true },
      },
    },
  });

  const sites = await prisma.site.findMany({ orderBy: { name: "asc" } });
  const companies = await prisma.company.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  const serializedLogs = logs.map((log) => ({
    ...log,
    signedInAt: log.signedInAt.toISOString(),
    signedOutAt: log.signedOutAt?.toISOString() ?? null,
    site: log.site,
  }));

  return (
    <AdminClient
      logs={serializedLogs}
      sites={sites}
      companies={companies}
      isSuperAdmin={true}
      currentDateFrom={typeof dateFrom === "string" ? dateFrom : ""}
      currentDateTo={typeof dateTo === "string" ? dateTo : ""}
      currentCompanyId={typeof companyId === "string" ? companyId : ""}
    />
  );
}