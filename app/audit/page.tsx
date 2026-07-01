import { cookies } from "next/headers";
import AuditClient from "./AuditClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <AuditClient locale={locale} />;
}