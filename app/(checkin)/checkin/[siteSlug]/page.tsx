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
  const { locale: queryLocale } = await searchParams;

  const site = await prisma.site.findUnique({
    where: { slug: siteSlug },
    select: {
      id: true,
      name: true,
      safetyBriefingText: true,
      questions: true,
      locale: true,
    },
  });

  if (!site) notFound();

  const locale: "en" | "pt" = queryLocale === "pt" ? "pt" : site.locale === "pt" ? "pt" : "en";

  return (
    <CheckinClient
      siteId={site.id}
      siteName={site.name}
      safetyBriefing={site.safetyBriefingText}
      questions={site.questions || []}
      locale={locale}
    />
  );
}