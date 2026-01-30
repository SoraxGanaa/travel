'use client'

import React from "react"

import { useState } from 'react'
import { Loader2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { submitContactForm } from '@/app/actions/leads'
import { toast } from 'sonner'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const message = formData.get('message') as string

    // Validation
    const newErrors: Record<string, string> = {}
    if (!name) newErrors.name = 'Нэр оруулна уу'
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Зөв и-мэйл хаяг оруулна уу'
    }
    if (!message) newErrors.message = 'Мессеж оруулна уу'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    try {
      const result = await submitContactForm({
        name,
        email,
        phone: phone || undefined,
        message,
      })

      if (result.success) {
        toast.success('Таны мессежийг хүлээн авлаа! Бид удахгүй хариулах болно.')
        // Reset form
        e.currentTarget.reset()
      } else {
        toast.error(result.error || 'Алдаа гарлаа. Дахин оролдоно уу.')
      }
    } catch (error) {
      toast.error('Алдаа гарлаа. Дахин оролдоно уу.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">
            Нэр <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Таны нэр"
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            И-мэйл <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Утасны дугаар</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+976 ..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Мессеж <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Таны асуулт, санал хүсэлт..."
          rows={5}
          className={errors.message ? 'border-destructive' : ''}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message}</p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Илгээж байна...
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Илгээх
          </>
        )}
      </Button>
    </form>
  )
}
