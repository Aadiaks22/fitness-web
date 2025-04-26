"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { submitContactForm } from "@/app/actions/form-actions"
import { CheckCircle, AlertCircle } from "lucide-react"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formResponse, setFormResponse] = useState<{
    success?: boolean
    message?: string
    errors?: any[]
  } | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setFormResponse(null)

    try {
      const formData = new FormData(event.currentTarget)
      const response = await submitContactForm(formData)
      setFormResponse(response)

      if (response.success) {
        // Reset form on success
        ;(event.target as HTMLFormElement).reset()
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormResponse({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg card-shadow">
      <h3 className="text-xl font-bold mb-6 text-custom-deep-blue">Send Us a Message</h3>

      {formResponse && (
        <div
          className={`mb-6 p-4 rounded-md ${formResponse.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
        >
          <div className="flex items-center">
            {formResponse.success ? <CheckCircle className="h-5 w-5 mr-2" /> : <AlertCircle className="h-5 w-5 mr-2" />}
            <p>{formResponse.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-custom-deep-blue">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-3 py-2 border border-custom-pale-blue rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-custom-deep-blue">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-3 py-2 border border-custom-pale-blue rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your Email"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-custom-deep-blue">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            className="w-full px-3 py-2 border border-custom-pale-blue rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Subject"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-custom-deep-blue">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full px-3 py-2 border border-custom-pale-blue rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Your Message"
            required
          ></textarea>
        </div>
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-custom-deep-blue text-white font-bold rounded-full transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  )
}
