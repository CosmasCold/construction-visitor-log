import { cookies } from "next/headers";
import SignupClient from "./SignupClient";

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <SignupClient locale={locale} />;
}