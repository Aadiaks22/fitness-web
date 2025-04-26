import Link from "next/link"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, MessageSquare } from "lucide-react"

export default function AdminDashboard() {
  // Server-side authentication check
  const cookieStore = cookies()
  const authCookie = cookieStore.get("admin-auth")

  if (!authCookie || authCookie.value !== "true") {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-custom-dark text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            BALANCE<span className="text-primary">PRO</span> Admin
          </h1>
          <form action="/api/auth/logout" method="post">
            <Button type="submit" variant="ghost" className="text-white hover:text-primary flex items-center">
              Logout
            </Button>
          </form>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-custom-deep-blue">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/contacts">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xl font-bold">Contact Messages</CardTitle>
                <MessageSquare className="h-6 w-6 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-custom-text">View and manage contact form submissions.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/bookings">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xl font-bold">Demo Bookings</CardTitle>
                <Calendar className="h-6 w-6 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-custom-text">View and manage demo booking requests.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/leads">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xl font-bold">Popup Leads</CardTitle>
                <Users className="h-6 w-6 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-custom-text">View and manage leads from the popup form.</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>

      <footer className="bg-custom-dark text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} BalancePro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
