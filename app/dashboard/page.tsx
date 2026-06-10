// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CompanyDashboardClient from "./CompanyDashboardClient";

export const dynamic = "force-dynamic";

// ── types matching the Prisma select ─────────────────────────────────
interface SelectedVisitor {
  id: string;
  fullName: string;
  company: string;
  phone: string | null;
  hostName: string | null;
  safetyAcknowledged: boolean;
  signedInAt: Date;
  signedOutAt: Date | null;
  answers: Record<string, boolean> | null;
  photoUrl: string | null;
}

interface SelectedSite {
  name: string;
  id: string;
  slug: string;
  address: string | null;
  safetyBriefingText: string;
  questions: string[];
  visitors: SelectedVisitor[];
}

// ── client‑ready types ───────────────────────────────────────────────
export interface DashboardVisitor {
  id: string;
  fullName: string;
  company: string;
  phone: string | null;
  hostName: string | null;
  safetyAcknowledged: boolean;
  signedInAt: string;
  signedOutAt: string | null;
  siteName: string;
  siteId: string;
  answers: Record<string, boolean> | null;
  photoUrl: string | null;
}

export interface DashboardSite {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  safetyBriefingText: string;
  visitorsToday: number;
  questions: string[];
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  if (!session.user?.email) redirect("/admin/login");

  const { slug, dateFrom, dateTo } = await searchParams;

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
                  answers: true,
                  photoUrl: true,
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

  // Subscription check
  const subscription = company.subscription;
  const isTrialing = subscription?.status === "trialing";
  const isActive = subscription?.status === "active";
  if (!isActive && !isTrialing) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 max-w-md text-center">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Trial ended</h2>
          <p className="text-slate-600 mb-6">
            Your free trial has expired. To continue using SiteSafe, please set up a payment method.
          </p>
          <a href="/settings" className="inline-block bg-sky-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-sky-700 transition-colors">
            Manage subscription
          </a>
        </div>
      </div>
    );
  }

  // Build date filter
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

  // Cast the nested sites to our explicit type
  const selectedSites = company.sites as unknown as SelectedSite[];

  // Combine visitors across all sites, apply date filter, include photoUrl
  const allVisitors: DashboardVisitor[] = selectedSites.flatMap((site) =>
    site.visitors
      .filter((v) => {
        const time = v.signedInAt.getTime();
        if (dateFilter.gte && time < dateFilter.gte.getTime()) return false;
        if (dateFilter.lte && time > dateFilter.lte.getTime()) return false;
        return true;
      })
      .map((v) => ({
        id: v.id,
        fullName: v.fullName,
        company: v.company,
        phone: v.phone,
        hostName: v.hostName,
        safetyAcknowledged: v.safetyAcknowledged,
        signedInAt: v.signedInAt.toISOString(),
        signedOutAt: v.signedOutAt?.toISOString() ?? null,
        siteName: site.name,
        siteId: site.id,
        answers: v.answers,
        photoUrl: v.photoUrl,
      }))
  );

  // Sort by signed in time descending
  allVisitors.sort(
    (a, b) => new Date(b.signedInAt).getTime() - new Date(a.signedInAt).getTime()
  );

  // Build site cards
  const sites: DashboardSite[] = selectedSites.map((site) => ({
    id: site.id,
    name: site.name,
    slug: site.slug,
    address: site.address,
    safetyBriefingText: site.safetyBriefingText,
    visitorsToday: site.visitors.filter(
      (v) => new Date(v.signedInAt).toDateString() === new Date().toDateString()
    ).length,
    questions: site.questions,
  }));

  return (
    <CompanyDashboardClient
      companyId={company.id}
      companySlug={company.slug}
      companyName={company.name}
      logs={allVisitors}
      sites={sites}
      currentDateFrom={typeof dateFrom === "string" ? dateFrom : ""}
      currentDateTo={typeof dateTo === "string" ? dateTo : ""}
    />
  );
}