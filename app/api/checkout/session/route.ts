// app/api/checkout/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

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

    if (
      session.payment_status !== "paid" &&
      session.payment_status !== "no_payment_required"
    ) {
      return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
    }

    const { companyName, email, companySlug, siteSlug, passwordHash, passwordPlain } =
      session.metadata || {};

    if (!companyName || !email || !companySlug || !siteSlug) {
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    // Create the company if not already created (webhook may have created it)
    let company = await prisma.company.findUnique({ where: { email } });
    if (!company) {
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
              passwordHash: passwordHash || "",
              role: "company_owner",
            },
          },
        },
      });
    } else {
      // Update password hash if the webhook created the user with an empty hash
      if (passwordHash) {
        await prisma.user.update({
          where: { email },
          data: { passwordHash },
        });
      }
    }

    return NextResponse.json({
      companySlug: company.slug,
      email,
      passwordPlain: passwordPlain || "",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error.";
    console.error("Failed to retrieve session:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}