"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function JoinNowDialog() {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 text-lg">
          JOIN NOW
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Join GetFit24×7</DialogTitle>
          <DialogDescription className="text-center">
            Fill out the form below to start your fitness journey today.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="membership">Membership Type</Label>
            <select id="membership" className="w-full px-3 py-2 border border-gray-300 rounded-md" required>
              <option value="">Select Membership</option>
              <option value="basic">Basic Membership</option>
              <option value="premium">Premium Membership</option>
              <option value="elite">Elite Membership</option>
            </select>
          </div>
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
            Submit Application
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
