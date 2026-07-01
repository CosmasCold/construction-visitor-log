import { cookies } from "next/headers";
import PrivacyClient from "./PrivacyClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <PrivacyClient locale={locale} />;
}