import type { Metadata } from "next";
import { cookies } from "next/headers";
import CompareClient from "./CompareClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  const title = isPT
    ? "SiteSafe vs Envoy vs SwipedOn vs Registro em Papel — Comparativo (2026)"
    : "SiteSafe vs Envoy vs SwipedOn vs Paper Logs — Comparison (2026)";
  
  const description = isPT
    ? "Veja como a SiteSafe se compara ao Envoy, SwipedOn e registros em papel. Comparativo funcionalidade por funcionalidade com preço transparente — R$249/mês para 20 locais."
    : "See how SiteSafe compares to Envoy, SwipedOn, and paper logs. Feature-by-feature comparison with transparent pricing — $49/mo for 20 sites.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://sitesafe.thesift.space/compare",
    },
  };
}

export default async function ComparePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <CompareClient locale={locale} />;
}