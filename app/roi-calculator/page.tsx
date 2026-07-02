import type { Metadata } from "next";
import { cookies } from "next/headers";
import RoiCalculatorClient from "./RoiCalculatorClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Calculadora de ROI – SiteSafe"
      : "ROI Calculator – SiteSafe",
    description: isPT
      ? "Calcule quanto sua empresa economiza com o controle digital de visitantes vs registros em papel. Veja o retorno em minutos."
      : "Calculate how much your company saves with digital visitor management vs paper logs. See your ROI in minutes.",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <RoiCalculatorClient locale={locale} />;
}