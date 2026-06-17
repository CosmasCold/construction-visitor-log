// app/audit/page.tsx
import type { Metadata } from "next";
import AuditClient from "./AuditClient";

export const metadata: Metadata = {
  title: "Free Visitor Log Self‑Audit – Score Your Log in 60 Seconds | SiteSafe",
  description:
    "Take our free visitor log self‑audit to see if your current sign‑in process would survive a safety inspection. 10 questions, no sign‑up required.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/audit",
  },
};

export default function AuditPage() {
  return <AuditClient />;
}