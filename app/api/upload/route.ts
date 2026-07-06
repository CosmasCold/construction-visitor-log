import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { requireRateLimit } from "@/lib/auth-guard";
import { checkinLimiter } from "@/lib/ratelimit";

export async function POST(request: NextRequest) {
  // Rate limit by IP
  const rateLimitResponse = await requireRateLimit(request, checkinLimiter);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, WebP allowed." },
        { status: 400 }
      );
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Max 5MB." },
        { status: 400 }
      );
    }

    // Sanitize filename
    const originalName = file.name || "upload.jpg";
    const safeName = originalName.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `visitor-${Date.now()}-${safeName}`;

    // Upload to Vercel Blob (public access for visitor photos)
    const blob = await put(fileName, file, {
      contentType: file.type,
      access: "public",
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}