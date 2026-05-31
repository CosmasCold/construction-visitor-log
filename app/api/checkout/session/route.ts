// app/api/checkout/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid" && session.payment_status !== "no_payment_required") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
    }

    const { companyName, email, companySlug, siteSlug, passwordHash, passwordPlain } =
      session.metadata || {};

    if (!companyName || !email || !companySlug || !siteSlug) {
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    // Create the company if not already created (webhook may have already created it)
    let company = await prisma.company.findUnique({ where: { email } });
    if (!company) {
      // Use the password hash from metadata (hashed earlier) to create the user
      const finalPasswordHash = passwordHash || ""; // fallback if webhook didn't have it
      company = await prisma.company.create({
        data: {
          name: companyName,
          slug: companySlug,
          email,
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
              passwordHash: finalPasswordHash,
              role: "company_owner",
            },
          },
        },
      });
    } else {
      // If the company already exists (created by webhook), ensure the user has the correct password hash
      // The webhook might have stored an empty hash; update it with the real hash from metadata.
      if (passwordHash) {
        await prisma.user.update({
          where: { email },
          data: { passwordHash },
        });
      }
    }

    // Return company slug and the plain password so the success page can auto‑login
    return NextResponse.json({
      companySlug: company.slug,
      email,
      passwordPlain: passwordPlain || "",   // will be empty if not present (shouldn't happen)
    });
  } catch (error) {
    console.error("Failed to retrieve session", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}