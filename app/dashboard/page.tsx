// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;

  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  if (!session.user?.email) redirect("/admin/login");

  // If no slug is provided, try to find the user's company
  if (!slug) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { company: { select: { slug: true } } },
    });
    if (user?.company?.slug) {
      redirect(`/dashboard?slug=${user.company.slug}`);
    }
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">No company found. Please contact support.</p>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      company: {
        include: {
          sites: {
            include: {
              visitors: {
                select: {
                  id: true,
                  fullName: true,
                  company: true,
                  signedInAt: true,
                  signedOutAt: true,
                  safetyAcknowledged: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) redirect("/admin/login");
  if (user.role === "super_admin") redirect("/admin");

  const company = user.company;
  if (!company || company.slug !== slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">Company not found or access denied.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-white">{company.name}</h1>
            <p className="text-sm text-slate-300">Site Management</p>
          </div>
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/20 backdrop-blur-sm border border-white/20"
            >
              Logout
            </button>
          </form>
        </div>

        {/* New Site Form */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Create New Site</h2>
          <form action="/api/sites" method="POST" className="space-y-4">
            <input type="hidden" name="companyId" value={company.id} />
            <input
              type="text"
              name="name"
              placeholder="Site Name"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white/70 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white/70 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <input
              type="text"
              name="slug"
              placeholder="URL Slug (e.g., downtown)"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white/70 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <button
              type="submit"
              className="bg-sky-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-sky-700 transition-colors"
            >
              Create Site
            </button>
          </form>
        </div>

        {/* Sites List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {company.sites.length === 0 ? (
            <p className="text-slate-400 col-span-2 text-center">No sites yet. Create your first site above.</p>
          ) : (
            company.sites.map((site) => (
              <a
                key={site.id}
                href={`/checkin/${encodeURIComponent(site.slug)}`}
                className="block bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-white/20 p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-slate-800">{site.name}</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Check-in: /checkin/{site.slug}
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Visitors today:{" "}
                  {
                    site.visitors.filter(
                      (v) =>
                        new Date(v.signedInAt).toDateString() ===
                        new Date().toDateString()
                    ).length
                  }
                </p>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}