'use client'

import { useState } from 'react'
import { Heart, Share2, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Tour } from '@/lib/db'
import { InterestModal } from '@/components/public/tours/interest-modal'
import { toast } from 'sonner'

interface TourBookingPanelProps {
  tour: Tour
}

export function TourBookingPanel({ tour }: TourBookingPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tour.title,
          text: tour.shortDescription,
          url: window.location.href,
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Холбоос хуулагдлаа')
    }
  }

  return (
    <>
      {/* Desktop Panel */}
      <div className="hidden lg:block sticky top-24">
        <Card className="border-border shadow-lg">
          <CardContent className="p-6">
            {/* Price */}
            <div className="mb-6">
              <div className="text-sm text-muted-foreground">Үнэ эхлэх</div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">${tour.priceFrom}</span>
                <span className="text-muted-foreground">/ хүн</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              size="lg"
              className="w-full h-12 text-base"
              onClick={() => setIsModalOpen(true)}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Сонирхож байна
            </Button>

            {/* Secondary Actions */}
            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={handleShare}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Хуваалцах
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Асуух зүйл байвал бидэнтэй холбогдоорой
              </p>
              <div className="space-y-2 text-sm">
                <a 
                  href="tel:+97611234567" 
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <span className="font-medium">Утас:</span>
                  <span>+976 11 234 567</span>
                </a>
                <a 
                  href="mailto:info@mongolia.travel" 
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <span className="font-medium">И-мэйл:</span>
                  <span>info@mongolia.travel</span>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Bottom Sheet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
          <div>
            <div className="text-sm text-muted-foreground">Үнэ эхлэх</div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">${tour.priceFrom}</span>
              <span className="text-sm text-muted-foreground">/ хүн</span>
            </div>
          </div>
          <Button
            size="lg"
            className="h-12 px-6"
            onClick={() => setIsModalOpen(true)}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Сонирхож байна
          </Button>
        </div>
      </div>

      {/* Interest Modal */}
      <InterestModal
        tour={tour}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
