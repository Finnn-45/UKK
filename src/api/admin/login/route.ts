import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || user.password !== password) {
    return NextResponse.json({ message: 'Email atau password salah' }, { status: 401 })
  }

  const token = crypto.randomBytes(32).toString('hex')

  return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email } })
}