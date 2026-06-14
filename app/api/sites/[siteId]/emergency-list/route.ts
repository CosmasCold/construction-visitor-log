import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { siteId } = await params;

  // Verify the user belongs to the company that owns the site
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { company: { select: { id: true } } },
  });

  const site = await prisma.site.findUnique({
    where: { id: siteId },
    select: { companyId: true, name: true },
  });

  if (!site || !user?.company?.id || site.companyId !== user.company.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Fetch active visitors (not signed out)
  const activeVisitors = await prisma.visitorLog.findMany({
    where: {
      siteId,
      signedOutAt: null,
    },
    select: {
      fullName: true,
      company: true,
      hostName: true,
      signedInAt: true,
      phone: true,
      photoUrl: true,
    },
    orderBy: { signedInAt: "asc" },
  });

  // Generate PDF with dynamic imports (keeps function cold start light)
  const jsPDF = (await import("jspdf")).default;
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const now = new Date().toLocaleString();

  doc.setFontSize(14);
  doc.text(`Emergency Evacuation List`, 14, 20);
  doc.setFontSize(10);
  doc.text(`Site: ${site.name}`, 14, 28);
  doc.text(`Generated: ${now}`, 14, 34);
  doc.text(`Total on site: ${activeVisitors.length}`, 14, 40);

  const headers = [["Name", "Company", "Host", "Signed In", "Phone"]];
  const rows = activeVisitors.map((v) => [
    v.fullName,
    v.company,
    v.hostName || "—",
    new Date(v.signedInAt).toLocaleString(),
    v.phone || "—",
  ]);

  autoTable(doc, {
    head: headers,
    body: rows,
    startY: 48,
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [15, 23, 42] },
  });

  const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="emergency-list-${site.name.replace(/\s+/g, "-")}-${Date.now()}.pdf"`,
    },
  });
}