import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getContacts, deleteContact } from "@/app/actions/form-actions"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ContactList } from "@/components/admin/contact-list"

export default async function ContactsPage() {
  // Server-side authentication check
  const cookieStore = cookies()
  const authCookie = cookieStore.get("admin-auth")

  if (!authCookie || authCookie.value !== "true") {
    redirect("/admin/login")
  }

  const { success, contacts, error } = await getContacts()

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
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-custom-deep-blue">Contact Form Submissions</h2>
          <Link href="/admin/dashboard">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {!success ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-md">
            <p>Error loading contacts: {error}</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-custom-text text-lg">No contact form submissions yet.</p>
          </div>
        ) : (
          <ContactList contacts={contacts} deleteContact={deleteContact} />
        )}
      </main>

      <footer className="bg-custom-dark text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} BalancePro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
