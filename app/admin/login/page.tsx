"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function AdminLogin() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData(event.currentTarget)

      // Use the API route instead of direct function call
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        // The API route will handle redirection
        window.location.href = "/admin/dashboard"
      } else {
        setError("Authentication failed")
      }
    } catch (error) {
      setError("An unexpected error occurred")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-off-white">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-custom-deep-blue">
            BALANCE<span className="text-primary">PRO</span> Admin
          </h1>
          <p className="text-custom-text mt-2">Sign in to access the admin dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-md bg-red-50 text-red-700 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-custom-deep-blue">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-3 py-2 border border-custom-pale-blue rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your username"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-custom-deep-blue">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-custom-pale-blue rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-custom-deep-blue text-white font-bold py-3 rounded-md transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  )
}
