'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'United States',
    avatar: '6.jpg',
    rating: 5,
    text: 'An absolutely life-changing experience! The Gobi Desert tour exceeded all my expectations. Our guide was incredibly knowledgeable and the hospitality was unmatched.',
    tour: 'Говийн нууц аялал',
  },
  {
    id: 2,
    name: 'Marcus Chen',
    location: 'Australia',
    avatar: '7.jpg',
    rating: 5,
    text: 'Staying with nomadic families and experiencing their way of life was incredible. The landscapes are breathtaking and the organization was perfect.',
    tour: 'Хөвсгөл нуурын аялал',
  },
  {
    id: 3,
    name: 'Emma Schmidt',
    location: 'Germany',
    avatar: '3.jpg',
    rating: 5,
    text: 'Mongolia Travel made everything seamless. From the moment we landed to our departure, every detail was taken care of. Highly recommend!',
    tour: 'Алтайн тансаг аялал',
  },
  {
    id: 4,
    name: 'James Wilson',
    location: 'United Kingdom',
    avatar: '5.jpg',
    rating: 5,
    text: 'The cultural immersion was fantastic. Learning about ancient traditions while exploring stunning natural wonders created memories that will last a lifetime.',
    tour: 'Орхоны хөндийн аялал',
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 lg:py-28 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Зочдын сэтгэгдэл
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Манай зочдын түүхүүд
          </h2>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="max-w-3xl mx-auto">
                    {/* Quote Icon */}
                    <div className="flex justify-center mb-8">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Quote className="h-8 w-8 text-primary" />
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center gap-1 mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-chart-3 text-chart-3"
                        />
                      ))}
                    </div>

                    {/* Quote Text */}
                    <blockquote className="text-xl sm:text-2xl lg:text-3xl text-foreground text-center font-serif leading-relaxed">
                      &ldquo;{testimonial.text}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="mt-8 flex flex-col items-center">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                      />
                      <div className="mt-4 text-center">
                        <div className="font-semibold text-foreground">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.location}
                        </div>
                        <div className="mt-1 text-sm text-primary">
                          {testimonial.tour}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full bg-transparent"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    index === currentIndex
                      ? 'w-8 bg-primary'
                      : 'bg-border hover:bg-muted-foreground'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full bg-transparent"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
