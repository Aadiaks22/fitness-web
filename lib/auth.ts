import type { NextResponse } from "next/server"

// Simple authentication for admin dashboard
// In a production app, you would use a more robust auth system like NextAuth.js

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // You should change this to a secure password
const COOKIE_NAME = "admin-auth"

export async function authenticate(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // We'll handle cookie setting in the route handler instead
    return { success: true }
  }

  return { success: false, error: "Invalid credentials" }
}

// This function is only used in middleware.ts
export function isAuthenticatedFromCookie(cookieValue: string | undefined) {
  return cookieValue === "true"
}

// For use in API routes
export function setCookieInResponse(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  })
  return response
}

// For use in API routes
export function removeCookieFromResponse(response: NextResponse) {
  response.cookies.delete(COOKIE_NAME)
  return response
}
