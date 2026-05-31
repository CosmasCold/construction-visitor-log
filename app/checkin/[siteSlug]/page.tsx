// app/checkin/[siteSlug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CheckinClient from "./CheckinClient";

export default async function CheckinPage({
  params,
}: {
  params: Promise<{ siteSlug: string }>;
}) {
  const { siteSlug } = await params;

  let site = await prisma.site.findUnique({
    where: { slug: siteSlug },
  });

  // If not found, try sanitizing the slug as a fallback
  if (!site) {
    const cleanSlug = siteSlug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    if (cleanSlug !== siteSlug) {
      site = await prisma.site.findUnique({ where: { slug: cleanSlug } });
    }
  }

  if (!site) notFound();

  return (
    <CheckinClient
      siteId={site.id}
      siteName={site.name}
      safetyBriefing={site.safetyBriefingText}
    />
  );
}