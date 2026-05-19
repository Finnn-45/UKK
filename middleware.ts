import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/checkout',
    '/checkout/:path*',
    '/orders',
    '/orders/:path*',
  ],
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname.replace(/\/$/, '') || '/'

  // support both custom `token` cookie and NextAuth session cookie
  let token = req.cookies.get('token')?.value
  const nextAuthCookie =
    req.cookies.get('__Host-next-auth.session-token')?.value ||
    req.cookies.get('__Secure-next-auth.session-token')?.value ||
    req.cookies.get('next-auth.session-token')?.value

  if (!token && nextAuthCookie) token = nextAuthCookie

  const isAdminRoute = pathname.startsWith('/admin')

  const isAdminLoginPage = pathname === '/admin/login'
  const isUserLoginPage = pathname === '/login'


  // If user already has a valid token and tries to open the login page,
  // redirect them away to prevent re-login page access.
  if ((isAdminLoginPage || isUserLoginPage) && token) {

    try {
      let decoded: any = null
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET!)
      } catch (_) {
        decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!)
      }

      if (decoded && decoded.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', req.url))
      }
    } catch (_) {
      // ignore, allow showing login page
    }
  }

  // kalau buka admin tapi belum login
  if (isAdminRoute && !isAdminLoginPage) {


    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    try {
      // try verifying with either custom JWT secret or NextAuth secret
      let decoded: any = null

      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET!)
      } catch (e) {
        // fallback to NextAuth secret
        decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!)
      }

      // if role missing or not admin, redirect
      if (!decoded || decoded.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', req.url))
      }

    } catch {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  // kalau buka checkout/order user tapi belum login - redirect ke login
  const isProtectedUserRoute = pathname === '/checkout' || pathname.startsWith('/checkout/') || pathname === '/orders' || pathname.startsWith('/orders/')
  if (isProtectedUserRoute && !token) {
    // redirect ke login user (dibuat: /login)
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}
