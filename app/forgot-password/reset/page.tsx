import { cookies } from "next/headers";
import ResetPasswordClient from "./ResetPasswordClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <ResetPasswordClient locale={locale} />;
}