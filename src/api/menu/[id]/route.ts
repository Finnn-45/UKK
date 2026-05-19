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

// GET: Ambil menu by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const menu = await prisma.menu.findUnique({
      where: { id: parseInt(params.id) }
    })

    if (!menu) {
      return NextResponse.json(
        { error: 'Menu tidak ditemukan' },
        { status: 404 }
      )
    }

    return NextResponse.json(menu)
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal ambil menu' },
      { status: 500 }
    )
  }
}

// PUT: Update menu (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const rating = body.rating ? parseFloat(body.rating) : undefined
    if (rating !== undefined && (isNaN(rating) || rating < 0 || rating > 5)) {
      return NextResponse.json(
        { error: 'Rating harus 0-5' },
        { status: 400 }
      )
    }

    const updatedMenu = await prisma.menu.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        description: body.description,
        price: price,
        image: body.image,
        category: body.category,
        ...(rating !== undefined && { rating }),
        color: body.color,
      },
    })

    return NextResponse.json(updatedMenu)
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal update menu' },
      { status: 500 }
    )
  }
}

// DELETE: Hapus menu (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const isAdmin = await checkAdmin(req)
  
  if (!isAdmin) {
    return NextResponse.json(
      { error: 'Unauthorized - Admin only' },
      { status: 401 }
    )
  }

  try {
    const menu = await prisma.menu.findUnique({
      where: { id: parseInt(params.id) }
    })

    if (!menu) {
      return NextResponse.json(
        { error: 'Menu tidak ditemukan' },
        { status: 404 }
      )
    }

    await prisma.menu.delete({
      where: { id: parseInt(params.id) }
    })

    return NextResponse.json({ message: 'Menu berhasil dihapus' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal hapus menu' },
      { status: 500 }
    )
  }
}
