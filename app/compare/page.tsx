import { cookies } from "next/headers";
import CompareClient from "./CompareClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <CompareClient locale={locale} />;
}