import { type NextRequest, NextResponse } from "next/server";
import { removeCookieFromResponse } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const url = new URL("/admin/login", request.nextUrl.origin);
  const response = NextResponse.redirect(url, 302);
  return removeCookieFromResponse(response);
}
