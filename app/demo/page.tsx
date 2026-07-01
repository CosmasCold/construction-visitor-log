import { cookies } from "next/headers";
import DemoClient from "./DemoClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <DemoClient locale={locale} />;
}