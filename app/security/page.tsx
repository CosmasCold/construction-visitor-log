import { cookies } from "next/headers";
import SecurityClient from "./SecurityClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <SecurityClient locale={locale} />;
}