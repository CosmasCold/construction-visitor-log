import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: Request) {
  const { email, locale } = await request.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ message: "If that email exists, a reset link has been sent." });
  }
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60);
  await prisma.passwordReset.create({ data: { email, token, expiresAt } });
  const resetUrl = `${request.headers.get("origin")}/forgot-password/reset?token=${token}`;
  const userLocale: "en" | "pt" = locale === "pt" ? "pt" : "en";
  try {
    await sendPasswordResetEmail(email, resetUrl, userLocale);
  } catch (error) {
    console.error("Email send failed:", error);
    console.log("Reset URL:", resetUrl);
  }
  return NextResponse.json({ message: "If that email exists, a reset link has been sent." });
}