import type { Metadata } from "next";
import { cookies } from "next/headers";
import ChecklistClient from "./ChecklistClient";

export const metadata: Metadata = {
  title: "Visitor Log Audit Checklist — SiteSafe",
  description:
    "10 things an inspector looks for in your visitor log. Download the free PDF checklist.",
};

export default async function ChecklistPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <ChecklistClient locale={locale} />;
}