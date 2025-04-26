import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { isAuthenticatedFromCookie } from "@/lib/auth"

export function middleware(request: NextRequest) {
  // Check if the request is for an admin page
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login") &&
    request.nextUrl.pathname !== "/api/auth/login"
  ) {
    // Check if the user is authenticated
    const authCookie = request.cookies.get("admin-auth")

    if (!isAuthenticatedFromCookie(authCookie?.value)) {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

// Only run middleware on admin routes
export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*"],
}
