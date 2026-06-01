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

  // If no slug, redirect to the user's company slug
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
        <p className="text-white text-lg">No company found. Please contact support.</p>
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
          subscription: true,
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

  // Check subscription status – block access if not active or trialing
  const now = new Date();
  const trialValid = company.trialEndsAt && company.trialEndsAt > now;
  const subscriptionActive = company.subscription?.status === "active" || company.subscription?.status === "trialing";

  if (!trialValid && !subscriptionActive) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 max-w-md text-center">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Trial ended
          </h2>
          <p className="text-slate-600 mb-6">
            Your free trial has expired. To continue using SiteSafe, please set up a
            payment method.
          </p>
          <a
            href="/settings"
            className="inline-block bg-sky-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-sky-700 transition-colors"
          >
            Manage subscription
          </a>
        </div>
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

  // Combine visitors across all sites and apply date filter
  const allVisitors = company.sites.flatMap((site) =>
    site.visitors
      .filter((v) => {
        const time = new Date(v.signedInAt).getTime();
        if (dateFilter.gte && time < dateFilter.gte.getTime()) return false;
        if (dateFilter.lte && time > dateFilter.lte.getTime()) return false;
        return true;
      })
      .map((v) => ({
        ...v,
        siteName: site.name,
        siteId: site.id,
      }))
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