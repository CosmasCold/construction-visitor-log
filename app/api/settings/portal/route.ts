// app/api/settings/portal/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      company: { include: { subscription: true } },
    },
  });

  if (!user || !user.company) {
    return NextResponse.json({ error: "No company found" }, { status: 404 });
  }

  const company = user.company;

  // Determine the Stripe customer ID – we might need to fetch it
  let customerId = company.stripeCustomerId;
  if (!customerId && company.subscription?.stripeSubId) {
    // Retrieve the subscription to get the customer
    const sub = await stripe.subscriptions.retrieve(company.subscription.stripeSubId);
    customerId = sub.customer as string;
    // Save it for future
    await prisma.company.update({
      where: { id: company.id },
      data: { stripeCustomerId: customerId },
    });
  }

  if (!customerId) {
    return NextResponse.json({ error: "No billing information available" }, { status: 400 });
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/settings`,
  });

  return NextResponse.json({ url: portalSession.url });
}