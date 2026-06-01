// app/api/settings/portal/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(request: Request) {
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

  // Determine the Stripe customer ID
  let customerId = company.stripeCustomerId;
  if (!customerId && company.subscription?.stripeSubId) {
    try {
      const sub = await stripe.subscriptions.retrieve(company.subscription.stripeSubId);
      customerId = sub.customer as string;
      await prisma.company.update({
        where: { id: company.id },
        data: { stripeCustomerId: customerId },
      });
    } catch (error) {
      console.error("Could not retrieve subscription:", error);
    }
  }

  if (!customerId) {
    return NextResponse.json({ error: "No billing information available" }, { status: 400 });
  }

  // Use the actual request origin (works with any custom domain)
  const origin = request.headers.get("origin") || "https://sitesafe.thesift.space";

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/settings`,
  });

  return NextResponse.json({ url: portalSession.url });
}