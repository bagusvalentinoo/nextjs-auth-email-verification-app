import { betterFetch } from '@better-fetch/fetch'
import type { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

const guestRoutes = ['/login', '/register', '/forgot-password']

const protectedRoutes = ['/dashboard', '/settings']

type Session = typeof auth.$Infer.Session

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname
  const isRouteProtected = protectedRoutes.some(route =>
    currentPath.startsWith(route)
  )
  const isRouteGuest = guestRoutes.some(route => currentPath.startsWith(route))
  const { data: session } = await betterFetch<Session>(
    '/api/auth/get-session',
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get('cookie') || ''
      }
    }
  )

  if (isRouteProtected && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isRouteGuest && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
