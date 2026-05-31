// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CompanyDashboardClient from "./CompanyDashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  if (!session.user?.email) redirect("/admin/login");

  const { slug, dateFrom, dateTo } = await searchParams;

  // If no slug, redirect to user's company slug
  if (!slug) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { company: { select: { slug: true } } },
    });
    if (user?.company?.slug) {
      redirect(`/dashboard?slug=${user.company.slug}`);
    }
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">No company found.</p>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      company: {
        include: {
          sites: {
            include: {
              visitors: {
                select: {
                  id: true,
                  fullName: true,
                  company: true,
                  phone: true,
                  hostName: true,
                  safetyAcknowledged: true,
                  signedInAt: true,
                  signedOutAt: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) redirect("/admin/login");
  if (user.role === "super_admin") redirect("/admin");

  const company = user.company;
  if (!company || company.slug !== slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">Company not found or access denied.</p>
      </div>
    );
  }

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
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    dateFilter = { gte: start, lte: end };
  }

  // Flatten visitors across all sites of this company, applying date filter
  const allVisitors = company.sites.flatMap((site) =>
    site.visitors
      .filter((v) => {
        const time = new Date(v.signedInAt).getTime();
        if (dateFilter.gte && time < dateFilter.gte.getTime()) return false;
        if (dateFilter.lte && time > dateFilter.lte.getTime()) return false;
        return true;
      })
      .map((v) => ({ ...v, siteName: site.name, siteId: site.id }))
  );

  allVisitors.sort(
    (a, b) => new Date(b.signedInAt).getTime() - new Date(a.signedInAt).getTime()
  );

  const serializedLogs = allVisitors.map((v) => ({
    ...v,
    signedInAt: v.signedInAt.toISOString(),
    signedOutAt: v.signedOutAt?.toISOString() ?? null,
  }));

  const sites = company.sites.map((site) => ({
    id: site.id,
    name: site.name,
    slug: site.slug,
    address: site.address,
    safetyBriefingText: site.safetyBriefingText,
    visitorsToday: site.visitors.filter(
      (v) => new Date(v.signedInAt).toDateString() === new Date().toDateString()
    ).length,
  }));

  return (
    <CompanyDashboardClient
      companyId={company.id}
      companySlug={company.slug}
      companyName={company.name}
      logs={serializedLogs}
      sites={sites}
      currentDateFrom={typeof dateFrom === "string" ? dateFrom : ""}
      currentDateTo={typeof dateTo === "string" ? dateTo : ""}
    />
  );
}