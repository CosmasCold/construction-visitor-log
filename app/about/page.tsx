import { cookies } from "next/headers";
import AboutClient from "./AboutClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <AboutClient locale={locale} />;
}