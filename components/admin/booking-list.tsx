"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, User, Phone, Mail, Calendar } from "lucide-react"

interface Booking {
  _id: string
  name: string
  email: string
  phone: string
  age: string
  weight: string
  height: string
  fattyLiver: string
  diabetes: string
  bloodPressure: string
  jointPain: string
  exerciseHistory: string
  fitnessGoal: string
  createdAt: string
}

interface BookingListProps {
  bookings: Booking[]
  deleteBooking: (id: string) => Promise<{ success: boolean; message?: string; error?: string }>
}

export function BookingList({ bookings, deleteBooking }: BookingListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      setIsDeleting(id)
      setDeleteError(null)

      try {
        const result = await deleteBooking(id)
        if (result.success) {
          // Remove the booking from the UI
          window.location.reload()
        } else {
          setDeleteError(result.error || "Failed to delete booking")
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

      {bookings.map((booking) => (
        <div key={booking._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div
            className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
            onClick={() => toggleExpand(booking._id)}
          >
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <User className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-bold text-custom-deep-blue">{booking.name}</h3>
              </div>
              <div className="flex items-center mb-2">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <p className="text-custom-text">{booking.email}</p>
              </div>
              <div className="flex items-center mb-2">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <p className="text-custom-text">{booking.phone}</p>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <p className="text-sm text-custom-text">{new Date(booking.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(booking._id)
                }}
                disabled={isDeleting === booking._id}
              >
                {isDeleting === booking._id ? (
                  <span className="animate-pulse">Deleting...</span>
                ) : (
                  <Trash2 className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {expandedId === booking._id && (
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-bold text-custom-deep-blue mb-2">Personal Information</h4>
                  <p className="text-custom-text">Age: {booking.age}</p>
                  <p className="text-custom-text">Weight: {booking.weight} kg</p>
                  <p className="text-custom-text">Height: {booking.height} cm</p>
                </div>
                <div>
                  <h4 className="font-bold text-custom-deep-blue mb-2">Health Information</h4>
                  <p className="text-custom-text">Fatty Liver: {booking.fattyLiver}</p>
                  <p className="text-custom-text">Diabetes: {booking.diabetes}</p>
                  <p className="text-custom-text">Blood Pressure: {booking.bloodPressure}</p>
                  <p className="text-custom-text">Joint Pain: {booking.jointPain || "None specified"}</p>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="font-bold text-custom-deep-blue mb-2">Exercise History</h4>
                <p className="text-custom-text">{booking.exerciseHistory}</p>
              </div>
              <div>
                <h4 className="font-bold text-custom-deep-blue mb-2">Fitness Goal</h4>
                <p className="text-custom-text whitespace-pre-wrap">{booking.fitnessGoal || "None specified"}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
