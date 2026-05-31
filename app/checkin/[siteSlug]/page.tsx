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

  const site = await prisma.site.findUnique({
    where: { slug: siteSlug },
  });

  if (!site) notFound();

  return <CheckinClient siteId={site.id} siteName={site.name} safetyBriefing={site.safetyBriefingText} />;
}