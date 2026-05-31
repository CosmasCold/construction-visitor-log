// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(request: Request) {
  const { email, companyName } = await request.json();

  // Pre‑generate slugs so they can be used for instant redirect after payment
  const companySlug =
    companyName.toLowerCase().replace(/\s+/g, "-") +
    "-" +
    Math.random().toString(36).substring(2, 6);

  const siteSlug =
    companyName.toLowerCase().replace(/\s+/g, "-") +
    "-default-" +
    Math.random().toString(36).substring(2, 6);

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
      companySlug,          // <-- NEW
      siteSlug,             // <-- NEW (so we can also create the default site if needed)
    },
  });

  return NextResponse.json({ url: session.url });
}