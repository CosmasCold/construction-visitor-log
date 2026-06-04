import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params;
  const visitors = await prisma.expectedVisitor.findMany({
    where: { siteId, status: "pending" },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(visitors);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params;
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const site = await prisma.site.findUnique({ where: { id: siteId }, select: { companyId: true } });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email! }, select: { companyId: true, role: true } });
  if (!user || (user.role !== "super_admin" && user.companyId !== site.companyId)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { name, company, hostId } = await request.json();
  if (!name || !company) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const visitor = await prisma.expectedVisitor.create({
    data: { name, company, hostId: hostId || null, siteId },
  });

  return NextResponse.json(visitor);
}