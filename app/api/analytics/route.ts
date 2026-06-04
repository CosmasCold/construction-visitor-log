// app/api/analytics/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { company: { select: { id: true } } },
  });

  if (!user || (!user.company && user.role !== "super_admin")) {
    return NextResponse.json({ error: "No company found" }, { status: 404 });
  }

  const companyId = user.company?.id;
  if (!companyId && user.role !== "super_admin") {
    return NextResponse.json({ error: "No company found" }, { status: 404 });
  }

  // Default: last 30 days
  const days = 30;
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - (days - 1));
  startDate.setHours(0, 0, 0, 0);

  // Build where clause with proper types
  const whereClause: {
    signedInAt: { gte: Date; lte: Date };
    site?: { companyId: string };
  } = {
    signedInAt: {
      gte: startDate,
      lte: endDate,
    },
  };
  if (companyId) {
    whereClause.site = { companyId };
  }

  const logs = await prisma.visitorLog.findMany({
    where: whereClause,
    select: {
      signedInAt: true,
    },
    orderBy: { signedInAt: "asc" },
  });

  // Aggregate by day
  const dailyCounts: Record<string, number> = {};
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const key = date.toISOString().slice(0, 10);
    dailyCounts[key] = 0;
  }

  logs.forEach((log: { signedInAt: Date }) => {
    const key = log.signedInAt.toISOString().slice(0, 10);
    if (dailyCounts[key] !== undefined) {
      dailyCounts[key]++;
    }
  });

  const labels = Object.keys(dailyCounts);
  const data = Object.values(dailyCounts);

  return NextResponse.json({ labels, data });
}