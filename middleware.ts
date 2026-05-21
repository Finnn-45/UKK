import { NextRequest, NextResponse } from 'next/server'

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

function base64UrlToUint8Array(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padding = normalized.length % 4
  const padded = padding === 0 ? normalized : normalized + '='.repeat(4 - padding)
  const raw = atob(padded)
  const output = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; ++i) {
    output[i] = raw.charCodeAt(i)
  }
  return output
}

async function verifyJwt(token: string, secret: string) {
  const [header, payload, signature] = token.split('.')
  if (!header || !payload || !signature) return null

  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  )

  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    base64UrlToUint8Array(signature),
    encoder.encode(`${header}.${payload}`)
  )

  if (!valid) return null

  const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
  return JSON.parse(decodedPayload)
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname.replace(/\/$/, '') || '/'

  const token = req.cookies.get('token')?.value

  // Jangan jadikan next-auth session-token sebagai pengganti cookie JWT admin.
  // Admin login memakai cookie 'token' (JWT) untuk akses /admin.
  // Cookie next-auth untuk customer tidak boleh dipakai untuk otorisasi admin.

  const isAdminRoute = pathname.startsWith('/admin')
  const isAdminLoginPage = pathname === '/admin/login'
  const isUserLoginPage = pathname === '/login'

  const authToken = token

  if ((isAdminLoginPage || isUserLoginPage) && authToken) {
    try {
      const secret = process.env.JWT_SECRET ?? ''
      const decoded = await verifyJwt(authToken, secret)
      if (decoded && decoded.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', req.url))
      }
    } catch {
      // ignore and allow login page
    }
  }

  if (isAdminRoute && !isAdminLoginPage) {
    if (!authToken) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    try {
      const secret = process.env.JWT_SECRET ?? ''
      const decoded = await verifyJwt(authToken, secret)
      if (!decoded || decoded.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }
    } catch {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  const isProtectedUserRoute =
    pathname === '/checkout' ||
    pathname.startsWith('/checkout/') ||
    pathname === '/orders' ||
    pathname.startsWith('/orders/')

  if (isProtectedUserRoute && !authToken) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}
