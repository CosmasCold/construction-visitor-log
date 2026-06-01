// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(request: Request) {
  try {
    const { email, companyName } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Find the company
    const company = await prisma.company.findUnique({ where: { email } });
    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // Ensure a Stripe customer exists
    let customerId = company.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({ email, name: company.name });
      customerId = customer.id;
      await prisma.company.update({
        where: { id: company.id },
        data: { stripeCustomerId: customerId },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${request.headers.get("origin")}/settings?subscribed=true`,
      cancel_url: `${request.headers.get("origin")}/settings`,
      metadata: {
        companyId: company.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to start checkout.";
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}