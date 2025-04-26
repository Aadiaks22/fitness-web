"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Mail, User, Calendar } from "lucide-react"

interface Contact {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}

interface ContactListProps {
  contacts: Contact[]
  deleteContact: (id: string) => Promise<{ success: boolean; message?: string; error?: string }>
}

export function ContactList({ contacts, deleteContact }: ContactListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      setIsDeleting(id)
      setDeleteError(null)

      try {
        const result = await deleteContact(id)
        if (result.success) {
          // Remove the contact from the UI
          window.location.reload()
        } else {
          setDeleteError(result.error || "Failed to delete contact")
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

      {contacts.map((contact) => (
        <div key={contact._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div
            className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
            onClick={() => toggleExpand(contact._id)}
          >
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <User className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-bold text-custom-deep-blue">{contact.name}</h3>
              </div>
              <div className="flex items-center mb-2">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <p className="text-custom-text">{contact.email}</p>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <p className="text-sm text-custom-text">{new Date(contact.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(contact._id)
                }}
                disabled={isDeleting === contact._id}
              >
                {isDeleting === contact._id ? (
                  <span className="animate-pulse">Deleting...</span>
                ) : (
                  <Trash2 className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {expandedId === contact._id && (
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="mb-4">
                <h4 className="font-bold text-custom-deep-blue mb-2">Subject</h4>
                <p className="text-custom-text">{contact.subject}</p>
              </div>
              <div>
                <h4 className="font-bold text-custom-deep-blue mb-2">Message</h4>
                <p className="text-custom-text whitespace-pre-wrap">{contact.message}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
