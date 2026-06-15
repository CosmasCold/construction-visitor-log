import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Expect a JSON body with `fileBase64` (data URL) and optional `fileName`
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { siteId } = await params;
  const { fileBase64 } = await req.json();

  if (!fileBase64 || typeof fileBase64 !== "string" || !fileBase64.startsWith("data:application/pdf")) {
    return NextResponse.json({ error: "Invalid PDF data" }, { status: 400 });
  }

  // Store the base64 data URL directly in the database
  await prisma.site.update({
    where: { id: siteId },
    data: { documentTemplateData: fileBase64 },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { siteId } = await params;
  await prisma.site.update({
    where: { id: siteId },
    data: { documentTemplateData: null },
  });
  return NextResponse.json({ success: true });
}