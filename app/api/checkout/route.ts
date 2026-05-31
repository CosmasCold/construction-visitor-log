import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(request: Request) {
  const { email, companyName } = await request.json();

  // Create a Stripe Checkout Session for a subscription (price ID from your Stripe product)
  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    client_reference_id: companyName,  // we'll use this to create company after payment
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!, // your price ID (e.g., monthly $29)
        quantity: 1,
      },
    ],
    success_url: `${request.headers.get("origin")}/signup/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${request.headers.get("origin")}/signup`,
    metadata: {
      companyName,   // to be used in webhook
      email,
    },
  });

  return NextResponse.json({ url: session.url });
}