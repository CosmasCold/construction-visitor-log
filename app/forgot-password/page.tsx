import { cookies } from "next/headers";
import ForgotPasswordClient from "./ForgotPasswordClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <ForgotPasswordClient locale={locale} />;
}