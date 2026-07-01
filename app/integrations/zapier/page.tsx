import { cookies } from "next/headers";
import ZapierIntegrationClient from "./ZapierIntegrationClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <ZapierIntegrationClient locale={locale} />;
}