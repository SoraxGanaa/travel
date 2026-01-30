'use client'

import React from "react"

import { useState } from 'react'
import { X, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Tour } from '@/lib/db'
import { submitTourInterest } from '@/app/actions/leads'
import { toast } from 'sonner'

interface InterestModalProps {
  tour: Tour
  isOpen: boolean
  onClose: () => void
}

export function InterestModal({ tour, isOpen, onClose }: InterestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const message = formData.get('message') as string

    // Validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ email: 'Зөв и-мэйл хаяг оруулна уу' })
      setIsSubmitting(false)
      return
    }

    try {
      const result = await submitTourInterest({
        tourId: tour.id,
        tourName: tour.title,
        userEmail: email,
        name: name || undefined,
        phone: phone || undefined,
        message: message || undefined,
      })

      if (result.success) {
        toast.success('Таны хүсэлтийг хүлээн авлаа! Бид тантай удахгүй холбогдоно.')
        onClose()
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Сонирхож байна</DialogTitle>
        </DialogHeader>

        <div className="mb-4 p-4 rounded-lg bg-secondary/50">
          <div className="text-sm text-muted-foreground">Сонгосон аялал</div>
          <div className="font-medium text-foreground">{tour.title}</div>
          <div className="text-sm text-primary mt-1">
            ${tour.priceFrom}-с эхлэн / {tour.durationDays} өдөр
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">
              И-мэйл хаяг <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              required
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Нэр</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Таны нэр"
            />
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
            <Label htmlFor="message">Нэмэлт мэдээлэл</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Таны асуулт, хүсэлт..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
              disabled={isSubmitting}
            >
              Болих
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Илгээж байна...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Илгээх
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
