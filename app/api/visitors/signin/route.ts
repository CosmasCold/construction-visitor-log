import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { fullName, company, phone, email, hostName, safetyAcknowledged } = await request.json()

    if (!fullName || !company) {
      return NextResponse.json({ error: 'Full name and company are required' }, { status: 400 })
    }

    const visitor = await prisma.visitorLog.create({
      data: {
        fullName,
        company,
        phone: phone || null,
        email: email || null,
        hostName: hostName || null,
        safetyAcknowledged,
      },
    })

    return NextResponse.json(visitor, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to sign in' }, { status: 500 })
  }
}