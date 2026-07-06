// app/api/sites/[siteId]/hosts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireSiteAccess } from "@/lib/auth-guard";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params;

  const siteExists = await prisma.site.findUnique({
    where: { id: siteId },
    select: { id: true },
  });

  if (!siteExists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const hosts = await prisma.host.findMany({
    where: { siteId },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(hosts);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { user, companyId, response } = await requireAuth(request);
  if (response) return response;

  const { siteId } = await params;

  const denied = await requireSiteAccess(siteId, companyId!);
  if (denied) return denied;

  const { name, email } = await request.json();
  if (!name || !email) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const host = await prisma.host.create({
    data: { name, email, siteId },
  });

  return NextResponse.json(host);
}