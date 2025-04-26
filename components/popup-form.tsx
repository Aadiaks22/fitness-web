"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { submitPopupForm } from "@/app/actions/form-actions"

export function PopupForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState<{
    success?: boolean
    message?: string
  } | null>(null)
  const [hasClosedManually, setHasClosedManually] = useState(false)

  // Check if the popup has been shown before in this session
  useEffect(() => {
    const hasShownPopup = sessionStorage.getItem("hasShownPopup")
    if (!hasShownPopup && !hasClosedManually) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        sessionStorage.setItem("hasShownPopup", "true")
      }, 5000) // Show popup after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [hasClosedManually])

  const handleClose = () => {
    setIsOpen(false)
    setHasClosedManually(true)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await submitPopupForm(formData)

      setFormState(result)

      if (result.success) {
        // Close the popup after successful submission after 2 seconds
        setTimeout(() => {
          setIsOpen(false)
        }, 2000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormState({
        success: false,
        message: "Something went wrong. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6 animate-scaleIn">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close popup"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-custom-deep-blue">Get a Free Consultation</h2>
          <p className="text-custom-text mt-2">
            Leave your details and we'll contact you for a free fitness consultation.
          </p>
        </div>

        {formState?.success ? (
          <div className="text-center py-6 animate-fadeIn">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-100">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-custom-deep-blue mb-2">Thank You!</h3>
            <p className="text-custom-text">{formState.message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="popup-name">Name</Label>
              <Input
                id="popup-name"
                name="name"
                placeholder="Your name"
                required
                className="border-custom-pale-blue focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="popup-email">Email</Label>
              <Input
                id="popup-email"
                name="email"
                type="email"
                placeholder="Your email"
                required
                className="border-custom-pale-blue focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="popup-phone">Phone Number</Label>
              <Input
                id="popup-phone"
                name="phone"
                type="tel"
                placeholder="Your phone number"
                required
                className="border-custom-pale-blue focus:border-primary focus:ring-primary"
              />
            </div>

            {formState?.success === false && (
              <div className="text-red-500 text-sm animate-fadeIn">{formState.message}</div>
            )}

            <div className="flex justify-between pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="w-[48%] border-custom-pale-blue hover:bg-custom-off-white"
              >
                No, thanks
              </Button>
              <Button
                type="submit"
                className="w-[48%] bg-primary hover:bg-custom-deep-blue text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Get Started"
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
