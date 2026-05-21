import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json(
    { message: 'Logout berhasil' },
    { status: 200 }
  )

  // Pastikan cookie admin benar-benar terhapus.
  // Karena middleware pakai cookie bernama `token` untuk akses /admin.
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
    maxAge: 0,
  })

  response.cookies.delete('token')


  return response
}

