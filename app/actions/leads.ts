'use server'

import { createLead } from '@/lib/db'
import { sendLeadNotificationToAdmin } from '@/lib/email'

interface TourInterestData {
  tourId: string
  tourName: string
  userEmail: string
  name?: string
  phone?: string
  message?: string
}

interface CustomTripData {
  userEmail: string
  name?: string
  phone?: string
  dates?: string
  travelersCount?: number
  interests?: string[]
  budgetRange?: string
  message?: string
}

export async function submitTourInterest(data: TourInterestData): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate email
    if (!data.userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.userEmail)) {
      return { success: false, error: 'Зөв и-мэйл хаяг оруулна уу' }
    }

    // Save lead to database
    await createLead({
      source: 'tour',
      tourId: data.tourId,
      tourName: data.tourName,
      userEmail: data.userEmail,
      name: data.name,
      phone: data.phone,
      message: data.message,
    })

    // Send notification to admin
    await sendLeadNotificationToAdmin({
      source: 'tour',
      tourName: data.tourName,
      userEmail: data.userEmail,
      name: data.name,
      phone: data.phone,
      message: data.message,
    })

    return { success: true }
  } catch (error) {
    console.error('Error submitting tour interest:', error)
    return { success: false, error: 'Алдаа гарлаа. Дахин оролдоно уу.' }
  }
}

export async function submitCustomTrip(data: CustomTripData): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate email
    if (!data.userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.userEmail)) {
      return { success: false, error: 'Зөв и-мэйл хаяг оруулна уу' }
    }

    // Save lead to database
    await createLead({
      source: 'custom',
      userEmail: data.userEmail,
      name: data.name,
      phone: data.phone,
      dates: data.dates,
      travelersCount: data.travelersCount,
      interests: data.interests,
      budgetRange: data.budgetRange,
      message: data.message,
    })

    // Send notification to admin
    await sendLeadNotificationToAdmin({
      source: 'custom',
      userEmail: data.userEmail,
      name: data.name,
      phone: data.phone,
      dates: data.dates,
      travelersCount: data.travelersCount,
      interests: data.interests,
      budgetRange: data.budgetRange,
      message: data.message,
    })

    return { success: true }
  } catch (error) {
    console.error('Error submitting custom trip:', error)
    return { success: false, error: 'Алдаа гарлаа. Дахин оролдоно уу.' }
  }
}

export async function submitContactForm(data: {
  name: string
  email: string
  phone?: string
  message: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return { success: false, error: 'Зөв и-мэйл хаяг оруулна уу' }
    }
    if (!data.message) {
      return { success: false, error: 'Мессеж оруулна уу' }
    }

    // Save as lead
    await createLead({
      source: 'custom',
      userEmail: data.email,
      name: data.name,
      phone: data.phone,
      message: data.message,
    })

    // Send notification
    await sendLeadNotificationToAdmin({
      source: 'custom',
      userEmail: data.email,
      name: data.name,
      phone: data.phone,
      message: data.message,
    })

    return { success: true }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return { success: false, error: 'Алдаа гарлаа. Дахин оролдоно уу.' }
  }
}
