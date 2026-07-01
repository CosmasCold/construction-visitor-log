import { cookies } from "next/headers";
import SlackIntegrationClient from "./SlackIntegrationClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <SlackIntegrationClient locale={locale} />;
}