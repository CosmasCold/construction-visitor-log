import { cookies } from "next/headers";
import DocsClient from "./DocsClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <DocsClient locale={locale} />;
}