import { cookies } from "next/headers";
import PricingClient from "./PricingClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <PricingClient locale={locale} />;
}