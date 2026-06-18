import type { Metadata } from "next";
import SettingsClient from "./SettingsClient";

export const metadata: Metadata = {
  title: "Settings – SiteSafe",
  description: "Update your company name and payment information.",
};

export default function SettingsPage() {
  return <SettingsClient />;
}