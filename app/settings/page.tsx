import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/admin/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      company: {
        include: {
          subscription: {
            include: { plan: true },
          },
        },
      },
    },
  });

  if (!user?.company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">No company found.</p>
      </div>
    );
  }

  const company = user.company;
  const subscription = company.subscription;
  const plan = subscription?.plan;

  return (
    <SettingsClient
      companyName={company.name}
      companyEmail={company.email}
      companySlug={company.slug}
      subscriptionStatus={subscription?.status || "inactive"}
      planName={plan?.name || "Free"}
      currentPeriodEnd={subscription?.currentPeriodEnd?.toISOString() ?? null}
      hasStripeCustomer={!!company.stripeCustomerId}
      hasSubscription={!!subscription}
      isTrialing={subscription?.status === "trialing"}
      apiKey={company.apiKeyHash ? "••••••••" : null}
      slackWebhookUrl={company.slackWebhookUrl}
    />
  );
}