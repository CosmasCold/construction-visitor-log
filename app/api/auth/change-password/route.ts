// app/api/auth/change-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendPasswordChangeEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    return NextResponse.json(
      {
        error: "Password must be at least 8 characters and include one uppercase letter, one lowercase letter, and one number.",
      },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user || !user.passwordHash) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) {
    return NextResponse.json(
      { error: "Current password is incorrect" },
      { status: 400 }
    );
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { email: session.user.email },
    data: { passwordHash },
  });

  // ── Localized notification email ───────────────────────────────
  const resetUrl = `${process.env.NEXTAUTH_URL}/forgot-password`;
  const locale: "en" | "pt" = "en"; // Or derive from user/company if stored

  await sendPasswordChangeEmail(session.user.email, resetUrl, locale);

  return NextResponse.json({ success: true });
}