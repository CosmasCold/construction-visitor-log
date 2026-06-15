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

    // Create user and a default company in a single transaction
    const user = await prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          name: "My Company",
          email: email,
          slug: email.split("@")[0] + "-" + Math.random().toString(36).slice(2, 8),
        },
      });

      return tx.user.create({
        data: {
          email,
          passwordHash,
          verified: true,          // ✅ no email verification block
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