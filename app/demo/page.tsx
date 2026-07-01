import type { Metadata } from "next";
import { cookies } from "next/headers";
import DemoClient from "./DemoClient";

export const metadata: Metadata = {
  title: "Live Demo – SiteSafe",
  description:
    "Try SiteSafe without signing up. See the real-time dashboard, visitor logs, and check-in flow.",
};

export default async function DemoPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <DemoClient locale={locale} />;
}