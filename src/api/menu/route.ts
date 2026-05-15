import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET: Ambil semua menu
export async function GET() {
  const menus = await prisma.menu.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(menus)
}

// POST: Tambah menu baru
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const newMenu = await prisma.menu.create({
      data: {
        title: body.title,
        description: body.description,
        price: parseInt(body.price), // Convert ke Int sesuai schema
        image: body.image,
        category: body.category,
        rating: parseFloat(body.rating), // Convert ke Float
        color: body.color,
      },
    })
    return NextResponse.json(newMenu)
  } catch (error) {
    return NextResponse.json({ error: 'Gagal tambah menu' }, { status: 500 })
  }
}