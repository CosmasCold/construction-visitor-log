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
    const { companyName, email, companySlug, siteSlug } = session.metadata || {};

    if (!companyName || !email) {
      return NextResponse.json({ received: true });
    }

    // Find or create the company
    let company = await prisma.company.findUnique({ where: { email } });
    if (!company) {
      // Generate sanitized slugs if not already provided by metadata (e.g. old sessions)
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
              passwordHash: "", // placeholder – will be updated by session endpoint
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
  }

  return NextResponse.json({ received: true });
}