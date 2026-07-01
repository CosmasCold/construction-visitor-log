import type { Metadata } from "next";
import { cookies } from "next/headers";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About SiteSafe — Built for Multi-Site Teams, Not Enterprise Sales",
  description:
    "SiteSafe is an independent visitor management platform for mid-sized workplaces. Flat $49/mo, no sales calls, built by a small team that cares about safety and compliance.",
  openGraph: {
    title: "About SiteSafe — Why We Built It",
    description: "No investors. No sales floor. Just a team building the visitor management tool we wished existed.",
    images: ["/og-image.png"],
  },
};

export default async function AboutPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <AboutClient locale={locale} />;
}