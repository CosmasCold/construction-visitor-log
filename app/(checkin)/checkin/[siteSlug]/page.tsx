// app/(checkin)/checkin/[siteSlug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CheckinClient from "./CheckinClient";

export default async function CheckinPage({
  params,
  searchParams,
}: {
  params: Promise<{ siteSlug: string }>;
  searchParams: Promise<{ locale?: string }>;
}) {
  const { siteSlug } = await params;
  const { locale } = await searchParams;

  const site = await prisma.site.findUnique({
    where: { slug: siteSlug },
    select: {
      id: true,
      name: true,
      safetyBriefingText: true,
      questions: true,
    },
  });

  if (!site) notFound();

  return (
    <CheckinClient
      siteId={site.id}
      siteName={site.name}
      safetyBriefing={site.safetyBriefingText}
      questions={site.questions || []}
      locale={locale === "pt" ? "pt" : "en"}
    />
  );
}