"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Mail, User, Phone, Calendar } from "lucide-react"

interface Lead {
  _id: string
  name: string
  email: string
  phone: string
  createdAt: string
}

interface LeadsListProps {
  leads: Lead[]
  deleteLead: (id: string) => Promise<{ success: boolean; message?: string; error?: string }>
}

export function LeadsList({ leads, deleteLead }: LeadsListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      setIsDeleting(id)
      setDeleteError(null)

      try {
        const result = await deleteLead(id)
        if (result.success) {
          // Remove the lead from the UI
          window.location.reload()
        } else {
          setDeleteError(result.error || "Failed to delete lead")
        }
      } catch (error) {
        setDeleteError("An unexpected error occurred")
        console.error(error)
      } finally {
        setIsDeleting(null)
      }
    }
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="space-y-4">
      {deleteError && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
          <p>{deleteError}</p>
        </div>
      )}

      {leads.map((lead) => (
        <div key={lead._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div
            className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
            onClick={() => toggleExpand(lead._id)}
          >
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <User className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-bold text-custom-deep-blue">{lead.name}</h3>
              </div>
              <div className="flex items-center mb-2">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <p className="text-custom-text">{lead.email}</p>
              </div>
              <div className="flex items-center mb-2">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <p className="text-custom-text">{lead.phone}</p>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <p className="text-sm text-custom-text">{new Date(lead.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(lead._id)
                }}
                disabled={isDeleting === lead._id}
              >
                {isDeleting === lead._id ? (
                  <span className="animate-pulse">Deleting...</span>
                ) : (
                  <Trash2 className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
