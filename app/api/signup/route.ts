// app/api/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
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

    const existingCompany = await prisma.company.findUnique({ where: { email } });
    if (existingCompany) {
      return NextResponse.json({ error: "A company with that email already exists." }, { status: 409 });
    }

    const safeName = companyName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const companySlug = safeName + "-" + Math.random().toString(36).substring(2, 6);
    const siteSlug = safeName + "-default-" + Math.random().toString(36).substring(2, 6);

    const passwordHash = await bcrypt.hash(password, 12);
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
            verified: false, // will be verified via email
          },
        },
      },
    });

    // Generate verification token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

    await prisma.verificationToken.create({
      data: { email, token, expiresAt },
    });

    // Send verification email
    const verifyUrl = `${request.headers.get("origin")}/api/auth/verify-email?token=${token}`;
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "SiteSafe", email: "noreply@sitesafe.app" },
        to: [{ email }],
        subject: "Verify your email address",
        htmlContent: `<p>Click the link below to verify your email and activate your SiteSafe account:</p>
          <p><a href="${verifyUrl}">Verify Email</a></p>
          <p>This link expires in 24 hours.</p>`,
      }),
    }).catch((err) => console.error("Verification email failed:", err));

    return NextResponse.json({
      success: true,
      message: "Verification email sent. Please check your inbox.",
      companySlug: company.slug,
      email,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Signup failed.";
    console.error("Signup error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}