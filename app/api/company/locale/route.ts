import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { locale } = await req.json();
  if (!locale || (locale !== "en" && locale !== "pt")) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { company: true },
  });

  if (!user?.company) {
    return NextResponse.json({ error: "No company" }, { status: 404 });
  }

  await prisma.company.update({
    where: { id: user.company.id },
    data: { locale },
  });

  return NextResponse.json({ success: true });
}