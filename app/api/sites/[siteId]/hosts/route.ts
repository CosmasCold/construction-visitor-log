import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params;
  const hosts = await prisma.host.findMany({
    where: { siteId },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(hosts);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params;
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Verify user has access to this site's company
  const site = await prisma.site.findUnique({ where: { id: siteId }, select: { companyId: true } });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email! }, select: { companyId: true, role: true } });
  if (!user || (user.role !== "super_admin" && user.companyId !== site.companyId)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { name, email } = await request.json();
  if (!name || !email) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const host = await prisma.host.create({
    data: { name, email, siteId },
  });

  return NextResponse.json(host);
}