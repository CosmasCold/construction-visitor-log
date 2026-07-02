// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email, password, region, locale } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const baseSlug = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "-");
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.company.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const result = await prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          name: email.split("@")[0],
          slug,
          email,
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        },
      });

      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          name: null,
          verified: false,
          role: "company_owner",
          companyId: company.id,
        },
      });

      return { company, user };
    });

    // ── Localized welcome email ─────────────────────────────────────
    const userLocale: "en" | "pt" = locale === "pt" ? "pt" : "en";
    const dashboardUrl = `${process.env.NEXTAUTH_URL}/dashboard`;

    await sendWelcomeEmail(email, dashboardUrl, userLocale);

    // Record the welcome email in the sequence
    await prisma.company.update({
      where: { id: result.company.id },
      data: { trialEmailSequence: { push: "welcome" } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}