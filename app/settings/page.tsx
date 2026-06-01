// app/settings/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import SettingsClient from "./SettingsClient";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  if (!session.user?.email) redirect("/admin/login");

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

  if (!user || !user.company) redirect("/dashboard");

  const { company } = user;

  return (
    <SettingsClient
      companyName={company.name}
      companyEmail={company.email}
      companySlug={company.slug}
      subscriptionStatus={
        company.subscription?.status ??
        (company.trialEndsAt && company.trialEndsAt > new Date()
          ? "trialing"
          : "inactive")
      }
      planName={
        company.subscription?.plan?.name ??
        (company.trialEndsAt && company.trialEndsAt > new Date()
          ? "Free Trial"
          : "No Plan")
      }
      currentPeriodEnd={
        company.subscription?.currentPeriodEnd?.toISOString() ??
        company.trialEndsAt?.toISOString() ??
        null
      }
      hasStripeCustomer={!!company.stripeCustomerId}
      hasSubscription={!!company.subscription}
      isTrialing={
        !company.subscription &&
        company.trialEndsAt != null &&
        company.trialEndsAt > new Date()
      }
    />
  );
}