'use client'

import { useState } from 'react'
import { Check, X, MapPin, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Tour } from '@/lib/db'

interface TourContentProps {
  tour: Tour
}

export function TourContent({ tour }: TourContentProps) {
  return (
    <div className="space-y-12">
      {/* Full Description */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Аялалын тухай
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {tour.fullDescription}
        </p>
      </section>

      {/* Highlights */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Онцлох газрууд
        </h2>
        <div className="flex flex-wrap gap-2">
          {tour.highlights.map((highlight) => (
            <span
              key={highlight}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
            >
              <MapPin className="h-4 w-4" />
              {highlight}
            </span>
          ))}
        </div>
      </section>

      {/* Itinerary */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Аялалын хөтөлбөр
        </h2>
        <div className="space-y-4">
          {tour.itineraryDays.map((day, index) => (
            <ItineraryDay key={day.dayTitle} day={day} index={index} />
          ))}
        </div>
      </section>

      {/* Included / Not Included */}
      <section className="grid md:grid-cols-2 gap-8">
        {/* Included */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-chart-1/10 flex items-center justify-center">
              <Check className="h-4 w-4 text-chart-1" />
            </div>
            Үнэд багтсан
          </h2>
          <ul className="space-y-3">
            {tour.included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-muted-foreground">
                <Check className="h-5 w-5 text-chart-1 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not Included */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
              <X className="h-4 w-4 text-destructive" />
            </div>
            Үнэд багтаагүй
          </h2>
          <ul className="space-y-3">
            {tour.notIncluded.map((item) => (
              <li key={item} className="flex items-start gap-3 text-muted-foreground">
                <X className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Map Placeholder */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Аялалын маршрут
        </h2>
        <div className="aspect-[16/9] rounded-xl bg-muted flex items-center justify-center border border-border overflow-hidden">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Газрын зураг удахгүй нэмэгдэнэ</p>
          </div>
        </div>
      </section>
    </div>
  )
}

function ItineraryDay({ 
  day, 
  index 
}: { 
  day: { dayTitle: string; dayDescription: string }
  index: number 
}) {
  const [isOpen, setIsOpen] = useState(index === 0)

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left bg-card hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
            {index + 1}
          </span>
          <span className="font-medium text-foreground">{day.dayTitle}</span>
        </div>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-muted-foreground transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="p-4 pt-0 pl-[4.5rem] text-muted-foreground">
          {day.dayDescription}
        </div>
      </div>
    </div>
  )
}
