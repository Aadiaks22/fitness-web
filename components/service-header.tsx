import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export function ServiceHeader() {
  return (
    <div id="top" className="bg-custom-dark text-white py-3">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-white">
            BALANCE<span className="text-primary">PRO</span>
          </span>
        </Link>
        <Link href="/" className="text-white hover:text-primary transition-colors flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
