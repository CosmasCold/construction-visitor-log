// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(request: Request) {
  try {
    const { email, region } = await request.json(); // ← Add region from body
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const company = await prisma.company.findUnique({ where: { email } });
    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // Detect Brazil if region not explicitly passed
    const isBrazil = region === "br" || 
                     request.headers.get("cf-ipcountry") === "BR" ||
                     request.headers.get("x-vercel-ip-country") === "BR";

    // Select correct price ID
    const priceId = isBrazil 
      ? process.env.STRIPE_PRICE_ID_BRL! 
      : process.env.STRIPE_PRICE_ID!;

    // If the company already has an active subscription, redirect to portal
    if (company.stripeCustomerId) {
      const existingSubs = await stripe.subscriptions.list({
        customer: company.stripeCustomerId,
        status: "all",
        limit: 1,
      });

      if (existingSubs.data.length > 0) {
        const status = existingSubs.data[0].status;
        if (status === "active" || status === "trialing" || status === "past_due") {
          return NextResponse.json(
            {
              error:
                "You already have an active subscription. Please use 'Manage Billing' to make changes.",
            },
            { status: 409 }
          );
        }
      }
    }

    // Create or retrieve customer
    let customerId = company.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({ email, name: company.name });
      customerId = customer.id;
      await prisma.company.update({
        where: { id: company.id },
        data: { stripeCustomerId: customerId },
      });
    }

    const isFounder = email === process.env.FOUNDER_EMAIL;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      customer: customerId,
      mode: "subscription",
      payment_method_types: isBrazil 
        ? ["card", "boleto"]  // ← Add Boleto for Brazil
        : ["card"],
      line_items: [
        {
          price: priceId, // ← Use dynamic price ID
          quantity: 1,
        },
      ],
      success_url: `${request.headers.get("origin")}/settings?subscribed=true`,
      cancel_url: `${request.headers.get("origin")}/settings`,
      metadata: {
        companyId: company.id,
        region: isBrazil ? "brl" : "usd", // ← Store region
      },
    };

    if (isFounder && process.env.STRIPE_TEST_COUPON_ID) {
      sessionParams.discounts = [{ coupon: process.env.STRIPE_TEST_COUPON_ID }];
    } else {
      sessionParams.allow_promotion_codes = true;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to start checkout.";
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}