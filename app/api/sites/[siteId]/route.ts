// app/api/sites/[siteId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireSiteAccess } from "@/lib/auth-guard";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params;

  // Note: GET is public (used by QR code check-in), so no auth required
  // But we should NOT expose sensitive fields
  const site = await prisma.site.findUnique({
    where: { id: siteId },
    select: {
      id: true,
      name: true,
      documentSigningEnabled: true,
      documentTemplateData: true,
      showVisitorListOnCheckin: true,
      locale: true,
      lockdownEnabled: true,
    },
  });

  if (!site) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(site);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { user, companyId, response } = await requireAuth(req);
  if (response) return response;

  const { siteId } = await params;

  const denied = await requireSiteAccess(siteId, companyId!);
  if (denied) return denied;

  const {
    name,
    slug,
    address,
    safetyBriefingText,
    questions,
    documentSigningEnabled,
    showVisitorListOnCheckin,
    locale,
  } = await req.json();

  const updated = await prisma.site.update({
    where: { id: siteId },
    data: {
      name,
      slug,
      address,
      safetyBriefingText,
      questions,
      documentSigningEnabled,
      showVisitorListOnCheckin,
      locale,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { user, companyId, response } = await requireAuth(req);
  if (response) return response;

  const { siteId } = await params;

  const denied = await requireSiteAccess(siteId, companyId!);
  if (denied) return denied;

  await prisma.site.delete({
    where: { id: siteId },
  });

  return NextResponse.json({ success: true });
}