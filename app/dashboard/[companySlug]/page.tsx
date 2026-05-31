// app/dashboard/[companySlug]/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function CompanyDashboardPage({
  params,
}: {
  params: { companySlug: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  if (!session.user?.email) redirect("/admin/login");

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
  if (!company || !company.slug || company.slug !== params.companySlug) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">{company.name}</h1>
            <p className="text-sm text-slate-500">Site Management</p>
          </div>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="bg-gray-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-300">
              Logout
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-4">Create New Site</h2>
          <form action="/api/sites" method="POST" className="space-y-4">
            <input type="hidden" name="companyId" value={company.id} />
            <input type="text" name="name" placeholder="Site Name" required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm" />
            <input type="text" name="address" placeholder="Address" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm" />
            <input type="text" name="slug" placeholder="URL Slug (e.g., downtown)" required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm" />
            <button type="submit" className="bg-sky-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-sky-700">
              Create Site
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {company.sites.map((site) => (
            <a key={site.id} href={`/checkin/${site.slug}`} className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-slate-800">{site.name}</h3>
              <p className="text-sm text-slate-500 mt-1">Check-in: /checkin/{site.slug}</p>
              <p className="text-xs text-slate-400 mt-2">
                Visitors today:{" "}
                {site.visitors.filter(v => new Date(v.signedInAt).toDateString() === new Date().toDateString()).length}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}