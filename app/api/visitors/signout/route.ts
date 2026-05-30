import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Visitor ID required' }, { status: 400 })
    }

    const updated = await prisma.visitorLog.update({
      where: { id },
      data: { signedOutAt: new Date() },
    })

    return NextResponse.json(updated, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to sign out' }, { status: 500 })
  }
}