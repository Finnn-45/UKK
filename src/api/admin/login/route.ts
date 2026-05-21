import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyPassword } from '@/lib/passwordUtils'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email dan password harus diisi' },
        { status: 400 }
      )
    }

    console.log('[LOGIN] Attempt with email:', email)

    // Query dengan select minimal untuk performance
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
        role: true,
        email: true,
        name: true
      }
    })

    if (!user) {
      console.log('[LOGIN] User not found for email:', email)
      return NextResponse.json(
        { message: 'Email atau password salah' },
        { status: 401 }
      )
    }

    console.log('[LOGIN] User found:', user.email, 'Role:', user.role)

    // Verify password dengan optimized timeout
    const validPassword = await verifyPassword(password, user.password)
    console.log('[LOGIN] Password valid:', validPassword)

    if (!validPassword) {
      console.log('[LOGIN] Invalid password for:', email)
      return NextResponse.json(
        { message: 'Email atau password salah' },
        { status: 401 }
      )
    }

    // Check role
    if (user.role !== 'ADMIN') {
      console.log('[LOGIN] Non-admin user tried to login:', email, 'Role:', user.role)
      return NextResponse.json(
        { message: 'Akun Anda bukan admin' },
        { status: 403 }
      )
    }

    // Create JWT dengan role dari database
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '24h'
      }
    )

    console.log('[LOGIN] Token created for:', email)

    const response = NextResponse.json(
      {
        message: 'Login berhasil',
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name
        }
      },
      { status: 200 }
    )

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 86400 // 24 hours
    })

    console.log('[LOGIN] Success for:', email)
    return response
  } catch (error) {
    console.error('[LOGIN] Error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat login', error: String(error) },
      { status: 500 }
    )
  }
}