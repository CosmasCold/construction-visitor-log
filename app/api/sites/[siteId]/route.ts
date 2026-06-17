import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params;

  const site = await prisma.site.findUnique({
    where: { id: siteId },
    select: {
      id: true,
      name: true,
      documentSigningEnabled: true,
      documentTemplateData: true,
      showVisitorListOnCheckin: true,
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
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { siteId } = await params;

  // Verify the user belongs to the company that owns this site
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { company: { select: { id: true } } },
  });

  const site = await prisma.site.findUnique({
    where: { id: siteId },
    select: { companyId: true },
  });

  if (!site || !user?.company?.id || site.companyId !== user.company.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const {
    name,
    slug,
    address,
    safetyBriefingText,
    questions,
    documentSigningEnabled,
    showVisitorListOnCheckin,
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
    },
  });

  return NextResponse.json(updated);
}