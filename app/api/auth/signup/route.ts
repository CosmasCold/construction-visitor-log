import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password || !email.includes("@") || password.length < 8) {
      return NextResponse.json(
        { error: "Valid email and password (min 8 characters) required." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Find or create the default plan (just need an id for the subscription)
    let plan = await prisma.plan.findFirst({ where: { name: "Pro" } });
    if (!plan) {
      plan = await prisma.plan.create({
        data: {
          name: "Pro",
          stripePriceId: "free_trial",
          maxSites: 999,
          features: ["all"],
        },
      });
    }

    // Create user, company, and subscription in one transaction
    const user = await prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          name: "My Company",
          email: email,
          slug:
            email.split("@")[0] +
            "-" +
            Math.random().toString(36).slice(2, 8),
        },
      });

      // 14‑day trial subscription
      await tx.subscription.create({
        data: {
          companyId: company.id,
          planId: plan!.id,
          status: "trialing",
          currentPeriodEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        },
      });

      return tx.user.create({
        data: {
          email,
          passwordHash,
          verified: true,
          role: "company_owner",
          companyId: company.id,
        },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to create account." },
      { status: 500 }
    );
  }
}