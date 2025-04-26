import { type NextRequest, NextResponse } from "next/server"
import { removeCookieFromResponse } from "@/lib/auth"

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url))
  return removeCookieFromResponse(response)
}
