// prisma/sync-subscription.ts
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
  const email = "gabrieldentler3@gmail.com"; // ← change to your test company email
  const company = await prisma.company.findUnique({
    where: { email },
    include: { subscription: true },
  });

  if (!company) {
    console.log(`❌ Company with email ${email} not found.`);
    return;
  }

  if (!company.stripeCustomerId) {
    console.log("❌ No Stripe customer ID found.");
    return;
  }

  // Retrieve the latest subscription from Stripe
  const subscriptions = await stripe.subscriptions.list({
    customer: company.stripeCustomerId,
    limit: 1,
    status: "all",
  });

  if (subscriptions.data.length === 0) {
    console.log("❌ No Stripe subscription found for this customer.");
    return;
  }

  const sub = subscriptions.data[0];

  // Access fields dynamically to avoid SDK type issues
  const subData = sub as unknown as Record<string, unknown>;
  const currentPeriodEnd = subData.current_period_end
    ? new Date((subData.current_period_end as number) * 1000)
    : null;

  const plan = await prisma.plan.findFirst();
  if (!plan) {
    console.log("❌ No plan record found. Run seed or fix‑subscription script first.");
    return;
  }

  // Upsert the subscription record
  await prisma.subscription.upsert({
    where: { companyId: company.id },
    update: {
      planId: plan.id,
      stripeSubId: sub.id,
      status: sub.status,
      currentPeriodEnd,
    },
    create: {
      companyId: company.id,
      planId: plan.id,
      stripeSubId: sub.id,
      status: sub.status,
      currentPeriodEnd,
    },
  });

  console.log(`✅ Subscription synced: ${sub.status}`);
  console.log(`   Current period end: ${currentPeriodEnd?.toISOString()}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());