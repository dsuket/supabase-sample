import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 認証が必要なパスの定義
  const protectedPaths = ['/dashboard', '/profile']
  const authPaths = ['/auth/login', '/auth/signup']

  const isProtectedPath = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))
  const isAuthPath = authPaths.some(path => req.nextUrl.pathname.startsWith(path))

  // 未認証ユーザーが保護されたページにアクセスしようとした場合
  if (isProtectedPath && !user) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  // 認証済みユーザーが認証ページにアクセスしようとした場合
  if (isAuthPath && user) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/auth/:path*']
}