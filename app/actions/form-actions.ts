"use server"

import { z } from "zod"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import { logFormSubmission } from "@/lib/email"

// Define the schema for contact form validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

// Define the schema for demo booking form validation
const demoBookingSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  age: z.string().min(1, { message: "Age is required" }),
  weight: z.string().min(1, { message: "Weight is required" }),
  height: z.string().min(1, { message: "Height is required" }),
  fattyLiver: z.string().optional(),
  diabetes: z.string().optional(),
  bloodPressure: z.string().optional(),
  jointPain: z.string().optional(),
  exerciseHistory: z.string().optional(),
  fitnessGoal: z.string().optional(),
})

// Define the schema for popup form validation
const popupFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
})

export async function submitContactForm(formData: FormData) {
  try {
    // Extract form data
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      createdAt: new Date(),
    }

    // Validate form data
    const validatedData = contactFormSchema.parse(data)

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("balancePro")

    // Insert data into the contacts collection
    const result = await db.collection("contacts").insertOne(validatedData)

    // Log the submission
    logFormSubmission(validatedData, "contact form")

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)

    if (error instanceof z.ZodError) {
      // Return validation errors
      return {
        success: false,
        message: "Please check your form inputs.",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}

export async function submitDemoBooking(formData: FormData) {
  try {
    // Extract form data
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      age: formData.get("age") as string,
      weight: formData.get("weight") as string,
      height: formData.get("height") as string,
      fattyLiver: formData.get("fatty-liver") as string,
      diabetes: formData.get("diabetes") as string,
      bloodPressure: formData.get("blood-pressure") as string,
      jointPain: formData.get("joint-pain") as string,
      exerciseHistory: formData.get("exercise-history") as string,
      fitnessGoal: formData.get("fitness-goal") as string,
      createdAt: new Date(),
    }

    // Validate form data
    const validatedData = demoBookingSchema.parse(data)

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("balancePro")

    // Insert data into the demoBookings collection
    const result = await db.collection("demoBookings").insertOne(validatedData)

    // Log the submission
    logFormSubmission(validatedData, "demo booking")

    return {
      success: true,
      message: "Thank you for booking a demo! We'll contact you shortly to confirm your appointment.",
    }
  } catch (error) {
    console.error("Error submitting demo booking:", error)

    if (error instanceof z.ZodError) {
      // Return validation errors
      return {
        success: false,
        message: "Please check your form inputs.",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}

export async function submitPopupForm(formData: FormData) {
  try {
    // Extract form data
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      createdAt: new Date(),
    }

    // Validate form data
    const validatedData = popupFormSchema.parse(data)

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("balancePro")

    // Insert data into the leads collection
    const result = await db.collection("leads").insertOne(validatedData)

    // Log the submission
    logFormSubmission(validatedData, "popup form")

    return {
      success: true,
      message: "Thank you! We'll contact you shortly for a free consultation.",
    }
  } catch (error) {
    console.error("Error submitting popup form:", error)

    if (error instanceof z.ZodError) {
      // Return validation errors
      return {
        success: false,
        message: "Please check your form inputs.",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}

// Admin actions
export async function getContacts() {
  try {
    const client = await clientPromise
    const db = client.db("balancePro")

    const contacts = await db.collection("contacts").find({}).sort({ createdAt: -1 }).toArray()

    return { success: true, contacts: JSON.parse(JSON.stringify(contacts)) }
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return { success: false, error: "Failed to fetch contacts" }
  }
}

export async function getDemoBookings() {
  try {
    const client = await clientPromise
    const db = client.db("balancePro")

    const bookings = await db.collection("demoBookings").find({}).sort({ createdAt: -1 }).toArray()

    return { success: true, bookings: JSON.parse(JSON.stringify(bookings)) }
  } catch (error) {
    console.error("Error fetching demo bookings:", error)
    return { success: false, error: "Failed to fetch demo bookings" }
  }
}

export async function getLeads() {
  try {
    const client = await clientPromise
    const db = client.db("balancePro")

    const leads = await db.collection("leads").find({}).sort({ createdAt: -1 }).toArray()

    return { success: true, leads: JSON.parse(JSON.stringify(leads)) }
  } catch (error) {
    console.error("Error fetching leads:", error)
    return { success: false, error: "Failed to fetch leads" }
  }
}

export async function deleteContact(id: string) {
  try {
    const client = await clientPromise
    const db = client.db("balancePro")

    await db.collection("contacts").deleteOne({ _id: new ObjectId(id) })

    return { success: true, message: "Contact deleted successfully" }
  } catch (error) {
    console.error("Error deleting contact:", error)
    return { success: false, error: "Failed to delete contact" }
  }
}

export async function deleteDemoBooking(id: string) {
  try {
    const client = await clientPromise
    const db = client.db("balancePro")

    await db.collection("demoBookings").deleteOne({ _id: new ObjectId(id) })

    return { success: true, message: "Demo booking deleted successfully" }
  } catch (error) {
    console.error("Error deleting demo booking:", error)
    return { success: false, error: "Failed to delete demo booking" }
  }
}

export async function deleteLead(id: string) {
  try {
    const client = await clientPromise
    const db = client.db("balancePro")

    await db.collection("leads").deleteOne({ _id: new ObjectId(id) })

    return { success: true, message: "Lead deleted successfully" }
  } catch (error) {
    console.error("Error deleting lead:", error)
    return { success: false, error: "Failed to delete lead" }
  }
}
