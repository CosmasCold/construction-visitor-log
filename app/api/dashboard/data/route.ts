import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const companyId = searchParams.get("companyId");

  if (!companyId) {
    return NextResponse.json({ error: "Missing companyId" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { company: { select: { id: true } } },
  });

  if (!user?.company || user.company.id !== companyId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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