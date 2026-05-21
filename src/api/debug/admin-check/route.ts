import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Check if admin user exists
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@catering.com' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    })

    if (!adminUser) {
      return NextResponse.json({
        status: 'error',
        message: 'Admin user tidak ditemukan di database',
        hint: 'Jalankan: npx prisma db seed'
      })
    }

    return NextResponse.json({
      status: 'ok',
      message: 'Admin user ditemukan',
      user: adminUser,
      hint: adminUser.role !== 'ADMIN' 
        ? 'PERINGATAN: User ini bukan ADMIN! Jalankan seed lagi.' 
        : 'User setup OK. Coba login dengan: admin@catering.com / admin123'
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: String(error)
    }, { status: 500 })
  }
}
