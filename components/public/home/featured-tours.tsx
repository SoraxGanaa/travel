'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, Clock, MapPin, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Tour } from '@/lib/db'
import { cn } from '@/lib/utils'

interface FeaturedToursProps {
  tours: Tour[]
}

export function FeaturedTours({ tours }: FeaturedToursProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Онцлох аяллууд
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Алдартай чиглэлүүд
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Монгол орны хамгийн үзэсгэлэнт газруудаар аялах бидний онцлох хөтөлбөрүүд
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="rounded-full"
              aria-label="Previous tours"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="rounded-full"
              aria-label="Next tours"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Tours Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} index={index} />
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/tours">
              Бүх аяллуудыг үзэх
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function TourCard({ tour, index }: { tour: Tour; index: number }) {
  const styleColors: Record<string, string> = {
    Adventure: 'bg-chart-4/10 text-chart-4 border-chart-4/20',
    Culture: 'bg-chart-1/10 text-chart-1 border-chart-1/20',
    Nature: 'bg-chart-2/10 text-chart-2 border-chart-2/20',
    Luxury: 'bg-chart-3/10 text-chart-3 border-chart-3/20',
  }

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group snap-start"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Card className="w-[320px] sm:w-[360px] flex-shrink-0 overflow-hidden border-border/50 bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={tour.coverImage || "/placeholder.svg"}
            alt={tour.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          
          {/* Price Badge */}
          <div className="absolute top-4 right-4 glass rounded-full px-3 py-1">
            <span className="text-sm font-semibold text-foreground">${tour.priceFrom}</span>
            <span className="text-xs text-muted-foreground">-с</span>
          </div>

          {/* Rating */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1 text-primary-foreground">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">4.9</span>
          </div>
        </div>

        <CardContent className="p-5">
          {/* Style Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tour.style.slice(0, 2).map((s) => (
              <Badge
                key={s}
                variant="outline"
                className={cn('text-xs font-medium', styleColors[s])}
              >
                {s === 'Adventure' && 'Адал явдал'}
                {s === 'Culture' && 'Соёл'}
                {s === 'Nature' && 'Байгаль'}
                {s === 'Luxury' && 'Тансаг'}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {tour.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {tour.shortDescription}
          </p>

          {/* Meta */}
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{tour.durationDays} өдөр</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{tour.season}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
