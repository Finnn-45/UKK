import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'

// Middleware: Check if user is admin
async function checkAdmin(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  
  if (!token) {
    return null
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    return decoded.role === 'ADMIN'
  } catch {
    return null
  }
}

// GET: Ambil semua menu
export async function GET() {
  const menus = await prisma.menu.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(menus)
}

// POST: Tambah menu baru (admin only)
export async function POST(req: NextRequest) {
  const isAdmin = await checkAdmin(req)
  
  if (!isAdmin) {
    return NextResponse.json(
      { error: 'Unauthorized - Admin only' },
      { status: 401 }
    )
  }

  try {
    const body = await req.json()

    // Validate required fields
    if (!body.title || !body.description || !body.price || !body.category) {
      return NextResponse.json(
        { error: 'Field required: title, description, price, category' },
        { status: 400 }
      )
    }

    // Validate price is positive number
    const price = parseInt(body.price)
    if (isNaN(price) || price < 0) {
      return NextResponse.json(
        { error: 'Price harus angka positif' },
        { status: 400 }
      )
    }

    // Validate rating if provided
    const rating = body.rating ? parseFloat(body.rating) : 0
    if (isNaN(rating) || rating < 0 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating harus 0-5' },
        { status: 400 }
      )
    }

    const newMenu = await prisma.menu.create({
      data: {
        title: body.title,
        description: body.description,
        price: price,
        image: body.image || '',
        category: body.category,
        rating: rating,
        color: body.color || '#ffffff',
      },
    })
    return NextResponse.json(newMenu)
  } catch (error) {
    console.error('Error creating menu:', error)
    return NextResponse.json(
      { error: 'Gagal tambah menu' },
      { status: 500 }
    )
  }
}