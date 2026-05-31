// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import bcrypt from "bcryptjs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(request: Request) {
  try {
    const { email, companyName } = await request.json();

    if (!email || !companyName) {
      return NextResponse.json(
        { error: "Email and company name are required" },
        { status: 400 }
      );
    }

    if (!email.includes("@") || !email.includes(".")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Generate slugs
    const companySlug =
      companyName.toLowerCase().replace(/\s+/g, "-") +
      "-" +
      Math.random().toString(36).substring(2, 6);

    const siteSlug =
      companyName.toLowerCase().replace(/\s+/g, "-") +
      "-default-" +
      Math.random().toString(36).substring(2, 6);

    // Generate a random password for the company owner
    const password = Math.random().toString(36).slice(-12);
    const passwordHash = await bcrypt.hash(password, 12);

    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${request.headers.get("origin")}/signup/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/signup`,
      metadata: {
        companyName,
        email,
        companySlug,
        siteSlug,
        passwordHash,
        passwordPlain: password,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to start checkout.";
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}