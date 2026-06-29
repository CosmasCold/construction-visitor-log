// app/signup/page.tsx
import type { Metadata } from "next";
import SignupClient from "./SignupClient";

export const metadata: Metadata = {
  title: "Start Free Trial – SiteSafe",
  description:
    "Start your 14‑day free trial of SiteSafe. No credit card required, no sales calls.",
};

export default function SignupPage({
  searchParams,
}: {
  searchParams: { region?: string };
}) {
  return <SignupClient region={searchParams.region} />;
}