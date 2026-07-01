import { cookies } from "next/headers";
import ChecklistClient from "./ChecklistClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <ChecklistClient locale={locale} />;
}