import { cookies } from "next/headers";
import FAQClient from "./FAQClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <FAQClient locale={locale} />;
}