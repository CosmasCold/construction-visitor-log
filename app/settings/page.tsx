// app/settings/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
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

  let planName = "Free";
  let subscriptionStatus = "inactive";

  const now = new Date();

  if (subscription) {
    planName = subscription.plan?.name || "SiteSafe Pro";
    subscriptionStatus = subscription.status;
  } else if (company.trialEndsAt && new Date(company.trialEndsAt) > now) {
    planName = "SiteSafe Pro (Trial)";
    subscriptionStatus = "trialing";
  } else if (company.trialEndsAt && new Date(company.trialEndsAt) <= now) {
    planName = "SiteSafe Pro";
    subscriptionStatus = "trial_ended";
  }

  // Read locale from cookie, fallback to company locale
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("sitesafe-locale")?.value as "en" | "pt" | undefined;
  const companyLocale = (company as { locale?: string }).locale as "en" | "pt" | undefined;
  const locale = cookieLocale || companyLocale || "en";

  return (
    <SettingsClient
      companyName={company.name}
      companyEmail={company.email}
      companySlug={company.slug}
      locale={locale}
      subscriptionStatus={subscriptionStatus}
      planName={planName}
      currentPeriodEnd={
        subscription?.currentPeriodEnd?.toISOString() ??
        (company.trialEndsAt?.toISOString() ?? null)
      }
      hasStripeCustomer={!!company.stripeCustomerId}
      hasSubscription={!!subscription}
      isTrialing={subscriptionStatus === "trialing"}
      apiKey={company.apiKeyHash ? "••••••••" : null}
      slackWebhookUrl={company.slackWebhookUrl}
    />
  );
}