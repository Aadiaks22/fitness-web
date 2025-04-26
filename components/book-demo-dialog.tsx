"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, AlertCircle } from "lucide-react"
import { submitDemoBooking } from "@/app/actions/form-actions"

export function BookDemoDialog({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formResponse, setFormResponse] = useState<{
    success?: boolean
    message?: string
    errors?: any[]
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormResponse(null)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const response = await submitDemoBooking(formData)
      setFormResponse(response)

      if (response.success) {
        setSubmitted(true)
        // Reset form after 3 seconds and close dialog
        setTimeout(() => {
          setSubmitted(false)
          setOpen(false)
          setFormResponse(null)
        }, 3000)
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

  const handleButtonClick = () => {
    setOpen(true)
  }

  return (
    <>
      {children ? (
        <div onClick={handleButtonClick}>{children}</div>
      ) : (
        <Button
          id="book-demo-button"
          size="lg"
          className="bg-primary hover:bg-custom-deep-blue text-white font-bold px-8 py-6 text-lg rounded-full shadow-lg btn-glow transition-all duration-300"
          onClick={handleButtonClick}
        >
          BOOK FREE DEMO
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] bg-custom-white border-none shadow-2xl max-h-[90vh] overflow-y-auto">
          {!submitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center text-custom-deep-blue">
                  Book Your Free Demo
                </DialogTitle>
                <DialogDescription className="text-center text-custom-text">
                  Fill out the form below to schedule your free demo session at Balance Pro.
                </DialogDescription>
              </DialogHeader>

              {formResponse && !formResponse.success && (
                <div className="mb-4 p-4 rounded-md bg-red-50 text-red-700">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <p>{formResponse.message}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Personal Information */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-custom-deep-blue">
                      Full Name*
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                      className="border-custom-pale-blue focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-custom-deep-blue">
                      Email*
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="border-custom-pale-blue focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-custom-deep-blue">
                      Contact Number*
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 7355519301"
                      required
                      className="border-custom-pale-blue focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-custom-deep-blue">
                      Age*
                    </Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="30"
                      required
                      className="border-custom-pale-blue focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-custom-deep-blue">
                      Weight (kg)*
                    </Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      step="0.1"
                      placeholder="70"
                      required
                      className="border-custom-pale-blue focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-custom-deep-blue">
                      Height (cm)*
                    </Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      placeholder="175"
                      required
                      className="border-custom-pale-blue focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Health Information */}
                <div className="pt-2">
                  <h3 className="text-lg font-semibold text-custom-deep-blue mb-3">Health Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-custom-deep-blue">Fatty Liver</Label>
                      <RadioGroup name="fatty-liver" defaultValue="no" className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="fatty-liver-yes" />
                          <Label htmlFor="fatty-liver-yes" className="cursor-pointer">
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="fatty-liver-no" />
                          <Label htmlFor="fatty-liver-no" className="cursor-pointer">
                            No
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-custom-deep-blue">Diabetes</Label>
                      <RadioGroup name="diabetes" defaultValue="no" className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="diabetes-yes" />
                          <Label htmlFor="diabetes-yes" className="cursor-pointer">
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="diabetes-no" />
                          <Label htmlFor="diabetes-no" className="cursor-pointer">
                            No
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-custom-deep-blue">Blood Pressure</Label>
                      <RadioGroup name="blood-pressure" defaultValue="normal" className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="high" id="bp-high" />
                          <Label htmlFor="bp-high" className="cursor-pointer">
                            High
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="low" id="bp-low" />
                          <Label htmlFor="bp-low" className="cursor-pointer">
                            Low
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="normal" id="bp-normal" />
                          <Label htmlFor="bp-normal" className="cursor-pointer">
                            Normal
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="joint-pain" className="text-custom-deep-blue">
                        Any Joint Pain
                      </Label>
                      <Input
                        id="joint-pain"
                        name="joint-pain"
                        placeholder="Describe any joint pain you experience"
                        className="border-custom-pale-blue focus:border-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Exercise History */}
                <div className="space-y-2">
                  <Label className="text-custom-deep-blue">Exercise History</Label>
                  <RadioGroup
                    name="exercise-history"
                    defaultValue="no-exercise"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="once-week" id="exercise-once" />
                      <Label htmlFor="exercise-once" className="cursor-pointer">
                        Once in a week
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="twice-week" id="exercise-twice" />
                      <Label htmlFor="exercise-twice" className="cursor-pointer">
                        2 times in a week
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="thrice-week" id="exercise-thrice" />
                      <Label htmlFor="exercise-thrice" className="cursor-pointer">
                        3 times in a week
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="four-week" id="exercise-four" />
                      <Label htmlFor="exercise-four" className="cursor-pointer">
                        4 times in a week
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="five-week" id="exercise-five" />
                      <Label htmlFor="exercise-five" className="cursor-pointer">
                        5 times in a week
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="regular" id="exercise-regular" />
                      <Label htmlFor="exercise-regular" className="cursor-pointer">
                        Regular
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no-exercise" id="exercise-none" />
                      <Label htmlFor="exercise-none" className="cursor-pointer">
                        No exercise
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="exercise-other" />
                      <Label htmlFor="exercise-other" className="cursor-pointer">
                        Other
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Fitness Goals */}
                <div className="space-y-2">
                  <Label htmlFor="fitness-goal" className="text-custom-deep-blue">
                    Your Fitness Goal
                  </Label>
                  <Textarea
                    id="fitness-goal"
                    name="fitness-goal"
                    placeholder="Tell us about your fitness goals"
                    className="min-h-[80px] border-custom-pale-blue focus:border-primary focus:ring-primary"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-custom-deep-blue text-white font-bold py-3 rounded-full transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Book My Free Demo"}
                </Button>
              </form>
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-accent/20">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-custom-deep-blue">Thank You!</h3>
              <p className="text-custom-text">
                Your demo session has been booked. We'll contact you shortly to confirm your appointment.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
