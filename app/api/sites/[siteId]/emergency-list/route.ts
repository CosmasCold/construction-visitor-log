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

  const activeVisitors = await prisma.visitorLog.findMany({
    where: { siteId, signedOutAt: null },
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

  // Download photos and convert to base64 data URIs
  const visitorsWithPhotos = await Promise.all(
    activeVisitors.map(async (v) => {
      let photoBase64: string | null = null;
      if (v.photoUrl) {
        try {
          const resp = await fetch(v.photoUrl);
          if (resp.ok) {
            const buffer = await resp.arrayBuffer();
            const contentType = resp.headers.get("content-type") || "image/jpeg";
            const base64 = Buffer.from(buffer).toString("base64");
            photoBase64 = `data:${contentType};base64,${base64}`;
          }
        } catch {
          photoBase64 = null;
        }
      }
      return { ...v, photoBase64 };
    })
  );

  const jsPDF = (await import("jspdf")).default;
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const now = new Date().toLocaleString();

  doc.setFontSize(14);
  doc.text("Emergency Evacuation List", 14, 20);
  doc.setFontSize(10);
  doc.text(`Site: ${site.name}`, 14, 28);
  doc.text(`Generated: ${now}`, 14, 34);
  doc.text(`Total on site: ${visitorsWithPhotos.length}`, 14, 40);

  const headers = ["Photo", "Name", "Company", "Host", "Signed In", "Phone"];
  const rows = visitorsWithPhotos.map((v) => [
    "", // placeholder, will be replaced by photo in didDrawCell
    v.fullName,
    v.company,
    v.hostName || "—",
    new Date(v.signedInAt).toLocaleString(),
    v.phone || "—",
  ]);

  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 48,
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [15, 23, 42] },
    didDrawCell: (data) => {
      // Only draw photo in the first column (index 0) and only for data rows (not header)
      if (data.column.index === 0 && data.row.index >= 0) {
        const visitor = visitorsWithPhotos[data.row.index];
        if (visitor?.photoBase64) {
          const x = data.cell.x + 1;
          const y = data.cell.y + 1;
          const size = data.cell.height - 2;
          try {
            doc.addImage(visitor.photoBase64, "JPEG", x, y, size, size, undefined, "FAST");
          } catch {
            // If image can't be rendered, do nothing
          }
        }
      }
    },
  });

  const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="emergency-list-${site.name.replace(/\s+/g, "-")}-${Date.now()}.pdf"`,
    },
  });
}