import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  const isAdminRoute =
    pathname.startsWith("/admin/panel") ||
    pathname.startsWith("/admin/pending-races") ||
    pathname.startsWith("/admin/user-management")

  const isBucketList = pathname.startsWith("/bucketlist")

  if (isAdminRoute || isBucketList) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/admin/panel/:path*",
    "/admin/pending-races/:path*",
    "/admin/user-management/:path*",
    "/bucketlist/:path*",
  ],
}
