import type { Metadata } from "next";
import { cookies } from "next/headers";
import PressClient from "./PressClient";

export const metadata: Metadata = {
  title: "Press Kit — SiteSafe",
  description:
    "Official logos, screenshots, and brand assets for SiteSafe — the smart visitor management platform for multi-site teams.",
  openGraph: {
    title: "Press Kit — SiteSafe",
    description: "Download official brand assets and product screenshots.",
    images: ["/dash.png"],
  },
};

export default async function PressPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <PressClient locale={locale} />;
}