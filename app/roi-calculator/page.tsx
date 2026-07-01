import { cookies } from "next/headers";
import RoiCalculatorClient from "./RoiCalculatorClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <RoiCalculatorClient locale={locale} />;
}