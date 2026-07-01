import { cookies } from "next/headers";
import PressClient from "./PressClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <PressClient locale={locale} />;
}