import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const active = await prisma.visitorLog.findMany({
      where: { signedOutAt: null },
      orderBy: { signedInAt: 'desc' },
      select: {
        id: true,
        fullName: true,
        company: true,
        signedInAt: true,
      },
    })
    return NextResponse.json(active, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch active visitors' }, { status: 500 })
  }
}