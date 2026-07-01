import { cookies } from "next/headers";
import IntegrationsClient from "./IntegrationsClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <IntegrationsClient locale={locale} />;
}