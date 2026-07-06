// app/api/upload/route.ts
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-guard";
import { checkinLimiter } from "@/lib/ratelimit";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

export async function POST(request: NextRequest) {
  // ── Rate limit: 20 uploads per IP per minute ────────────────────
  const ip = getClientIp(request);
  const { success } = await checkinLimiter.limit(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Too many uploads. Please slow down." },
      { status: 429 }
    );
  }

  // ── Auth + company isolation ────────────────────────────────────
  const { user, companyId, response } = await requireAuth(request);
  if (response) return response;
  if (!companyId) {
    return NextResponse.json({ error: "No company" }, { status: 400 });
  }

  try {
    const { imageBase64, fileName } = await request.json();
    if (!imageBase64 || !fileName) {
      return NextResponse.json(
        { error: "Missing image data" },
        { status: 400 }
      );
    }

    // Validate file type
    const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return NextResponse.json({ error: "Invalid image data" }, { status: 400 });
    }

    const contentType = matches[1];
    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, WebP allowed." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(matches[2], "base64");

    // Validate size
    if (buffer.length > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max 5MB." },
        { status: 400 }
      );
    }

    // Sanitize filename and scope to company
    const sanitized = fileName.replace(/[^a-zA-Z0-9.-]/g, "-");
    const safeFileName = `${Date.now()}-${sanitized}`;
    const blobPath = `companies/${companyId}/visitors/${safeFileName}`;

    const blob = await put(blobPath, buffer, {
      contentType,
      access: "public",
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}