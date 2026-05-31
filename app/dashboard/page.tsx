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
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  if (!session.user?.email) redirect("/admin/login");

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

  // Combine all visitors from all sites into one array for the table
  const allVisitors = company.sites.flatMap((site) =>
    site.visitors.map((v) => ({ ...v, siteName: site.name, siteId: site.id }))
  );

  // Sort by signed in time desc
  allVisitors.sort((a, b) => new Date(b.signedInAt).getTime() - new Date(a.signedInAt).getTime());

  // Serialize dates for the client component
  const logs = allVisitors.map((v) => ({
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
      logs={logs}
      sites={sites}
    />
  );
}