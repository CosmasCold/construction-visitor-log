import { cookies } from "next/headers";
import AdminClient from "./AdminClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <AdminClient locale={locale} />;
}