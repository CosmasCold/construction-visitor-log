// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { companyName, email } = session.metadata || {};

    if (!companyName || !email) {
      return NextResponse.json({ received: true });
    }

    // Find or create the company
    let company = await prisma.company.findUnique({ where: { email } });
    if (!company) {
      const slug =
        companyName.toLowerCase().replace(/\s+/g, "-") +
        "-" +
        Math.random().toString(36).substring(2, 6);

      company = await prisma.company.create({
        data: {
          name: companyName,
          email,
          sites: {
            create: {
              slug,
              name: "Default Site",
              address: "",
            },
          },
          users: {
            create: {
              email,
              passwordHash: "", // placeholder – will be set later
              role: "company_owner",
            },
          },
        },
      });
    }

    // Attach subscription if available
    const plan = await prisma.plan.findFirst();
    if (plan && session.subscription) {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      // Dynamically access current_period_end (works with any Stripe SDK version)
      const subData = subscription as unknown as Record<string, unknown>;
      const currentPeriodEnd = subData.current_period_end as number | undefined;

      await prisma.subscription.upsert({
        where: { companyId: company.id },
        update: {
          planId: plan.id,
          stripeSubId: subscription.id,
          status: subscription.status,
          currentPeriodEnd: currentPeriodEnd
            ? new Date(currentPeriodEnd * 1000)
            : null,
        },
        create: {
          companyId: company.id,
          planId: plan.id,
          stripeSubId: subscription.id,
          status: subscription.status,
          currentPeriodEnd: currentPeriodEnd
            ? new Date(currentPeriodEnd * 1000)
            : null,
        },
      });
    }
  } // end of if checkout.session.completed

  return NextResponse.json({ received: true });
} // end of function POST