import type { Metadata } from "next";
import { cookies } from "next/headers";
import RoiCalculatorClient from "./RoiCalculatorClient";

export const metadata: Metadata = {
  title: "Paper Visitor Log Cost Calculator — SiteSafe",
  description:
    "Calculate the hidden cost of paper visitor logs. Compare labor time, audit prep, and annual savings with SiteSafe's flat pricing.",
};

export default async function RoiCalculatorPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <RoiCalculatorClient locale={locale} />;
}