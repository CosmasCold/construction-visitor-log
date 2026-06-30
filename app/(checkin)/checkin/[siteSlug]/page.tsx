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
      lockdownEnabled: true,  // <-- ADD THIS
    },
  });

  if (!site) notFound();

  // Lockdown screen — show BEFORE rendering the check-in form
  if (site.lockdownEnabled) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-800 mb-2">
            {site.locale === "pt" ? "Acesso Bloqueado" : "Access Denied"}
          </h1>
          <p className="text-slate-600">
            {site.locale === "pt"
              ? "Este local está em lockdown. Entrada de visitantes está temporariamente suspensa."
              : "This site is in lockdown. Visitor check-in is temporarily suspended."}
          </p>
        </div>
      </div>
    );
  }

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