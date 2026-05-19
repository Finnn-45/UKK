import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  const raw = await req.text()

  let parsed: any
  try {
    parsed = raw ? JSON.parse(raw) : {}
  } catch (e) {
    return NextResponse.json({ message: 'Invalid JSON', raw }, { status: 400 })
  }

  const { email, password } = parsed

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return NextResponse.json(
      { message: 'Email atau password salah' },
      { status: 401 }
    )
  }

  const validPassword = await bcrypt.compare(
    password,
    user.password
  )

  if (!validPassword) {
    return NextResponse.json(
      { message: 'Email atau password salah' },
      { status: 401 }
    )
  }

  // hardcode admin
  const isAdmin = user.email === 'admin@gmail.com'

  const token = jwt.sign(
    {
      id: user.id,
      isAdmin,
      role: isAdmin ? 'ADMIN' : 'USER'
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: '10m'
    }
  )

  const response = NextResponse.json({
    message: 'Login berhasil',
    token
  })

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })

  return response
}
