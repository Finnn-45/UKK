import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// PUT: Update menu
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params // ⚠️ Wajib await params di Next.js 14+
    const body = await req.json()
    
    const updatedMenu = await prisma.menu.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        description: body.description,
        price: parseInt(body.price),
        image: body.image,
        category: body.category,
        rating: parseFloat(body.rating),
        color: body.color,
      },
    })
    return NextResponse.json(updatedMenu)
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ error: 'Gagal update menu' }, { status: 500 })
  }
}

// DELETE: Hapus menu
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params // ⚠️ Wajib await params di Next.js 14+
    
    await prisma.menu.delete({
      where: { id: parseInt(id) }
    })
    return NextResponse.json({ message: 'Menu dihapus' })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Gagal hapus menu' }, { status: 500 })
  }
}