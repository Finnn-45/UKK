import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email dan password harus diisi' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        name: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Email atau password salah' },
        { status: 401 }
      )
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return NextResponse.json(
        { message: 'Email atau password salah' },
        { status: 401 }
      )
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Akun Anda tidak memiliki akses admin' },
        { status: 403 }
      )
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '24h'
      }
    )

    const response = NextResponse.json(
      {
        message: 'Login berhasil',
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        }
      },
      { status: 200 }
    )

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 86400,
    })

    return response
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat login' },
      { status: 500 }
    )
  }
}
