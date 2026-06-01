// app/api/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, companyName, password } = await request.json();

    if (!email || !companyName || !password) {
      return NextResponse.json(
        { error: "Email, company name, and password are required." },
        { status: 400 }
      );
    }

    if (!email.includes("@") || !email.includes(".")) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    // Check if company already exists
    const existingCompany = await prisma.company.findUnique({ where: { email } });
    if (existingCompany) {
      return NextResponse.json({ error: "A company with that email already exists." }, { status: 409 });
    }

    // Generate sanitized slugs
    const safeName = companyName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const companySlug = safeName + "-" + Math.random().toString(36).substring(2, 6);
    const siteSlug = safeName + "-default-" + Math.random().toString(36).substring(2, 6);

    const passwordHash = await bcrypt.hash(password, 12);

    // Set trial expiration 14 days from now
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 14);

    const company = await prisma.company.create({
      data: {
        name: companyName,
        slug: companySlug,
        email,
        trialEndsAt,
        sites: {
          create: {
            slug: siteSlug,
            name: "Default Site",
            address: "",
          },
        },
        users: {
          create: {
            email,
            passwordHash,
            role: "company_owner",
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      companySlug: company.slug,
      email,
      // Return password so the client can auto‑login (never store in plaintext)
      password,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Signup failed.";
    console.error("Signup error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}