import { type NextRequest, NextResponse } from "next/server"
import { authenticate, setCookieInResponse } from "@/lib/auth"

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const result = await authenticate(formData)

  if (result.success) {
    const response = NextResponse.redirect(new URL("/admin/dashboard", request.url))
    return setCookieInResponse(response)
  }

  // Redirect back to login with error
  return NextResponse.redirect(new URL(`/admin/login?error=${encodeURIComponent("Invalid credentials")}`, request.url))
}
