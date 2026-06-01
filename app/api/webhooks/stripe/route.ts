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

  // ---- subscription lifecycle events ----
  if (
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    // Find the company by Stripe customer ID
    const company = await prisma.company.findFirst({
      where: { stripeCustomerId: customerId },
    });

    if (company) {
      // Access current_period_end dynamically to avoid SDK type mismatch
      const subData = subscription as unknown as Record<string, unknown>;
      const currentPeriodEnd = subData.current_period_end
        ? new Date((subData.current_period_end as number) * 1000)
        : null;

      await prisma.subscription.updateMany({
        where: { companyId: company.id, stripeSubId: subscription.id },
        data: {
          status: subscription.status,
          currentPeriodEnd,
        },
      });
    }
  }

  // ---- checkout completed (new subscription) ----
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { companyName, email, companySlug, siteSlug, passwordHash } =
      session.metadata || {};

    if (!companyName || !email) {
      return NextResponse.json({ received: true });
    }

    let company = await prisma.company.findUnique({ where: { email } });
    if (!company) {
      const safeName = companyName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const newCompanySlug =
        companySlug && companySlug.length > 0
          ? companySlug
          : safeName + "-" + Math.random().toString(36).substring(2, 6);

      const newSiteSlug =
        siteSlug && siteSlug.length > 0
          ? siteSlug
          : safeName + "-default-" + Math.random().toString(36).substring(2, 6);

      company = await prisma.company.create({
        data: {
          name: companyName,
          slug: newCompanySlug,
          email,
          stripeCustomerId: (session.customer as string) || null,
          sites: {
            create: {
              slug: newSiteSlug,
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
    } else if (session.customer) {
      await prisma.company.update({
        where: { id: company.id },
        data: { stripeCustomerId: session.customer as string },
      });
    }

    const plan = await prisma.plan.findFirst();
    if (plan && session.subscription) {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      const subData = subscription as unknown as Record<string, unknown>;
      const currentPeriodEnd = subData.current_period_end
        ? new Date((subData.current_period_end as number) * 1000)
        : null;

      await prisma.subscription.upsert({
        where: { companyId: company.id },
        update: {
          planId: plan.id,
          stripeSubId: subscription.id,
          status: subscription.status,
          currentPeriodEnd,
        },
        create: {
          companyId: company.id,
          planId: plan.id,
          stripeSubId: subscription.id,
          status: subscription.status,
          currentPeriodEnd,
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}