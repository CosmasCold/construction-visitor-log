import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Same complexity as signup
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    return NextResponse.json(
      {
        error:
          "Password must be at least 8 characters and include one uppercase letter, one lowercase letter, and one number.",
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

  // Send notification email
  const emailPayload = {
    sender: { name: "SiteSafe", email: "hello@sitesafe.thesift.space" },
    to: [{ email: session.user.email }],
    subject: "Your SiteSafe password was changed",
    htmlContent: `
      <p>Your SiteSafe password was just changed.</p>
      <p>If you made this change, no further action is required.</p>
      <p>If you did <strong>not</strong> change your password, please reset it immediately:</p>
      <p><a href="https://sitesafe.thesift.space/forgot-password">Reset password</a></p>
    `,
  };

  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailPayload),
  });

  return NextResponse.json({ success: true });
}