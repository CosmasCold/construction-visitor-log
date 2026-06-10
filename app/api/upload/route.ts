// app/api/upload/route.ts
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { imageBase64, fileName } = await request.json();
    if (!imageBase64 || !fileName) {
      return NextResponse.json(
        { error: "Missing image data" },
        { status: 400 }
      );
    }

    // Convert base64 to buffer
    const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return NextResponse.json({ error: "Invalid image data" }, { status: 400 });
    }
    const buffer = Buffer.from(matches[2], "base64");

    // Upload to Vercel Blob
    const blob = await put(fileName, buffer, {
      access: "public",
      contentType: matches[1],
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}