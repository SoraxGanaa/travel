'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, Users, Mountain, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Tour } from '@/lib/db'
import { cn } from '@/lib/utils'

interface TourHeroProps {
  tour: Tour
}

const styleLabels: Record<string, string> = {
  Adventure: 'Адал явдал',
  Culture: 'Соёл',
  Nature: 'Байгаль',
  Luxury: 'Тансаг',
}

const difficultyLabels: Record<string, string> = {
  Easy: 'Хөнгөн',
  Medium: 'Дунд',
  Hard: 'Хүнд',
}

const seasonLabels: Record<string, string> = {
  Spring: 'Хавар',
  Summer: 'Зун',
  Autumn: 'Намар',
  Winter: 'Өвөл',
}

export function TourHero({ tour }: TourHeroProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const images = [tour.coverImage, ...tour.galleryImages]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <section className="relative">
      {/* Image Gallery */}
      <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        {images.map((image, index) => (
          <div
            key={image}
            className={cn(
              'absolute inset-0 transition-opacity duration-500',
              index === currentImage ? 'opacity-100' : 'opacity-0'
            )}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${tour.title} - ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentImage(index)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    index === currentImage
                      ? 'w-8 bg-primary'
                      : 'bg-background/50 hover:bg-background/80'
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative -mt-32 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl shadow-xl p-6 lg:p-8 border border-border">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tour.style.map((s) => (
                <Badge key={s} variant="secondary">
                  {styleLabels[s]}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              {tour.title}
            </h1>

            {/* Description */}
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
              {tour.shortDescription}
            </p>

            {/* Key Facts */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Хугацаа</div>
                  <div className="font-semibold text-foreground">{tour.durationDays} өдөр</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Улирал</div>
                  <div className="font-semibold text-foreground">{seasonLabels[tour.season]}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mountain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Хүндрэл</div>
                  <div className="font-semibold text-foreground">{difficultyLabels[tour.difficulty]}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Бүлгийн хэмжээ</div>
                  <div className="font-semibold text-foreground">{tour.groupSize} хүн</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
