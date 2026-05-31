// prisma/backfill-customers.ts
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
  const companies = await prisma.company.findMany({
    where: { stripeCustomerId: null },
    include: { subscription: true },
  });

  for (const company of companies) {
    let customerId: string | null = null;

    // Try to get it from the subscription
    if (company.subscription?.stripeSubId) {
      try {
        const sub = await stripe.subscriptions.retrieve(
          company.subscription.stripeSubId
        );
        customerId = sub.customer as string;
      } catch (error) {
        console.warn(`Could not retrieve subscription for ${company.email}`);
      }
    }

    if (customerId) {
      await prisma.company.update({
        where: { id: company.id },
        data: { stripeCustomerId: customerId },
      });
      console.log(`Updated ${company.name} with customer ID ${customerId}`);
    }
  }

  console.log("Backfill complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());