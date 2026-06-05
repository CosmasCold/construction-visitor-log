import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const record = await prisma.verificationToken.findUnique({ where: { token } });
  if (!record || record.expiresAt < new Date()) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid-token", req.url));
  }

  // Mark user as verified
  await prisma.user.update({
    where: { email: record.email },
    data: { verified: true },
  });

  // Delete the token
  await prisma.verificationToken.delete({ where: { id: record.id } });

  // Redirect to login with success
  return NextResponse.redirect(new URL("/admin/login?verified=true", req.url));
}