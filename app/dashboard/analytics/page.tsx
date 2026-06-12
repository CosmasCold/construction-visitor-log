// app/dashboard/analytics/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AnalyticsChart from "@/components/AnalyticsChart";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ slug: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { slug } = await searchParams;
  if (!slug) redirect("/dashboard");

  // Fetch company sites for the filter dropdown
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      company: {
        include: {
          sites: {
            select: { id: true, name: true },
            orderBy: { name: "asc" },
          },
        },
      },
    },
  });

  const sites = user?.company?.sites ?? [];

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          href={`/dashboard?slug=${slug}`}
          className="text-sky-400 hover:text-sky-300 text-sm inline-flex items-center gap-1 transition-colors duration-150"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
          Analytics
        </h1>
        <AnalyticsChart sites={sites} />
      </div>
    </div>
  );
}