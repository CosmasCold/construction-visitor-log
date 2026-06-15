import { NextRequest, NextResponse } from "next/server";
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
      documentTemplateData: true,   // ✅ corrected field name
    },
  });

  if (!site) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(site);
}