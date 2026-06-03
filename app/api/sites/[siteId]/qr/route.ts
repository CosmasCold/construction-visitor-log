// app/api/sites/[siteId]/qr/route.ts
import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params;

  // Construct the check‑in URL for this site
  const checkinUrl = `${request.headers.get("origin")}/checkin/${siteId}`;

  try {
    const svg = await QRCode.toString(checkinUrl, {
      type: "svg",
      width: 300,
      margin: 2,
      color: {
        dark: "#0ea5e9",   // sky‑500 – matches your brand
        light: "#ffffff",
      },
    });
    return new NextResponse(svg, {
      headers: { "Content-Type": "image/svg+xml" },
    });
  } catch (error) {
    console.error("QR code generation error:", error);
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 });
  }
}