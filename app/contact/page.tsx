import { cookies } from "next/headers";
import ContactClient from "./ContactClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <ContactClient locale={locale} />;
}