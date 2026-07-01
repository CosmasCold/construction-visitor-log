import { cookies } from "next/headers";
import GoogleSheetsClient from "./GoogleSheetsClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <GoogleSheetsClient locale={locale} />;
}