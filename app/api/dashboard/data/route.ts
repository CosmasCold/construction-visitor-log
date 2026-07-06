// app/api/dashboard/data/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-guard";

export async function GET(req: NextRequest) {
  const { user, companyId, response } = await requireAuth(req);
  if (response) return response;

  if (!companyId) {
    return NextResponse.json({ error: "No company" }, { status: 400 });
  }

  const sites = await prisma.site.findMany({
    where: { companyId },
    select: {
      id: true,
      name: true,
      slug: true,
      address: true,
      safetyBriefingText: true,
      questions: true,
      lockdownEnabled: true,
      locale: true,
      showVisitorListOnCheckin: true,
      visitors: {
        select: {
          id: true,
          signedInAt: true,
          signedOutAt: true,
          fullName: true,
          company: true,
        },
      },
    },
  });

  const logs = await prisma.visitorLog.findMany({
    where: { site: { companyId } },
    orderBy: { signedInAt: "desc" },
    take: 100,
    select: {
      id: true,
      fullName: true,
      company: true,
      signedInAt: true,
      signedOutAt: true,
      siteId: true,
      site: { select: { name: true } },
    },
  });

  const today = new Date().toDateString();
  const dashboardSites = sites.map((site) => ({
    id: site.id,
    name: site.name,
    slug: site.slug,
    address: site.address,
    safetyBriefingText: site.safetyBriefingText,
    visitorsToday: site.visitors.filter(
      (v) => new Date(v.signedInAt).toDateString() === today
    ).length,
    questions: site.questions,
    lockdownEnabled: site.lockdownEnabled,
    locale: site.locale,
  }));

  return NextResponse.json({ sites: dashboardSites, logs });
}