// app/dashboard/[companySlug]/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import CompanyDashboardClient from "./CompanyDashboardClient";

export default async function CompanyDashboardPage({
  params,
}: {
  params: { companySlug: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  // Only company owners can access, or super admin
  if (!session.user.email) redirect("/admin/login");

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
                  signedInAt: true,
                  signedOutAt: true,
                  safetyAcknowledged: true,
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

  if (!user.company || user.company.slug !== params.companySlug) {
    notFound();
  }

  const company = {
    id: user.company.id,
    name: user.company.name,
  };

  const sites = user.company.sites.map((site) => ({
    ...site,
    visitors: site.visitors.map((v) => ({
      ...v,
      signedInAt: v.signedInAt.toISOString(),
      signedOutAt: v.signedOutAt?.toISOString() ?? null,
    })),
  }));

  return <CompanyDashboardClient company={company} sites={sites} />;
}