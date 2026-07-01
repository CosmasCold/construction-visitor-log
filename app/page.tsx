import { cookies } from "next/headers";
import LandingClient from "./LandingClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <LandingClient locale={locale} />;
}