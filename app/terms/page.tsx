import { cookies } from "next/headers";
import TermsClient from "./TermsClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <TermsClient locale={locale} />;
}