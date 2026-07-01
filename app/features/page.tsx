import { cookies } from "next/headers";
import FeaturesClient from "./FeaturesClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <FeaturesClient locale={locale} />;
}