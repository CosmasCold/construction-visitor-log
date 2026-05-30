// app/admin/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  const logs = await prisma.visitorLog.findMany({
    orderBy: { signedInAt: "desc" },
  });

  // Serialize dates to strings so they can be passed to the client component
  const serializedLogs = logs.map((log) => ({
    ...log,
    signedInAt: log.signedInAt.toISOString(),
    signedOutAt: log.signedOutAt?.toISOString() ?? null,
  }));

  return <AdminClient logs={serializedLogs} />;
}