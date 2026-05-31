// prisma/fix-subscription.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import Stripe from "stripe";

const connectionString = process.env.POSTGRES_URL_NON_POOLING!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

async function main() {
  const email = "test4@example.com";   // <-- CHANGE THIS
  const company = await prisma.company.findUnique({
    where: { email },
    include: { subscription: true },
  });

  if (!company) {
    console.log(`❌ Company with email ${email} not found.`);
    return;
  }

  // 1. Ensure a Plan exists
  let plan = await prisma.plan.findFirst();
  if (!plan) {
    plan = await prisma.plan.create({
      data: {
        name: "Pro Monthly",
        stripePriceId: process.env.STRIPE_PRICE_ID || "price_placeholder",
        maxSites: 10,
        features: ["unlimited_visitors", "export_csv_excel"],
      },
    });
    console.log("✅ Created default Plan");
  }

  // 2. Create Stripe customer if needed
  let customerId = company.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({ email });
    customerId = customer.id;
    await prisma.company.update({
      where: { id: company.id },
      data: { stripeCustomerId: customerId },
    });
    console.log(`✅ Created Stripe customer: ${customerId}`);
  }

  // 3. Create subscription if needed
  const priceId = process.env.STRIPE_PRICE_ID!;
  if (!company.subscription) {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      trial_period_days: 14,
    });

    // Access current_period_end dynamically to avoid SDK type mismatch
    const subData = subscription as unknown as Record<string, unknown>;
    const currentPeriodEnd = subData.current_period_end
      ? new Date((subData.current_period_end as number) * 1000)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await prisma.subscription.create({
      data: {
        companyId: company.id,
        planId: plan.id,
        stripeSubId: subscription.id,
        status: subscription.status,
        currentPeriodEnd,
      },
    });
    console.log(`✅ Created subscription: ${subscription.id}`);
  } else if (company.subscription.status !== "active") {
    try {
      const stripeSub = await stripe.subscriptions.retrieve(
        company.subscription.stripeSubId!
      );

      await prisma.subscription.update({
        where: { id: company.subscription.id },
        data: { status: stripeSub.status },
      });
      console.log(`✅ Updated subscription status to ${stripeSub.status}`);
    } catch (error) {
      console.warn("Could not update subscription:", error);
    }
  }

  console.log("Done. Billing portal should now work.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());