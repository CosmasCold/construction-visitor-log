import type { Metadata } from "next";
import { cookies } from "next/headers";
import GoogleSheetsClient from "./GoogleSheetsClient";

export const metadata: Metadata = {
  title: "Google Sheets Integration – SiteSafe",
  description: "Automatically sync SiteSafe visitor data to a Google Sheet using Apps Script.",
};

export default async function GoogleSheetsIntegrationPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <GoogleSheetsClient locale={locale} />;
}