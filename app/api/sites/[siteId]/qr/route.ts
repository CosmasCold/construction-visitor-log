// app/api/sites/[siteId]/qr/route.ts
import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params;

  // Fetch the site to get its slug
  const site = await prisma.site.findUnique({
    where: { id: siteId },
    select: { slug: true },
  });

  if (!site) {
    return NextResponse.json({ error: "Site not found" }, { status: 404 });
  }

  // Build the full check‑in URL using the site's slug and the actual origin
  const checkinUrl = `${request.nextUrl.origin}/checkin/${site.slug}`;

  try {
    const svg = await QRCode.toString(checkinUrl, {
      type: "svg",
      width: 300,
      margin: 2,
      color: {
        dark: "#0ea5e9",
        light: "#ffffff",
      },
    });

    return new NextResponse(svg, {
      headers: { "Content-Type": "image/svg+xml" },
    });
  } catch (error) {
    console.error("QR code generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 }
    );
  }
}