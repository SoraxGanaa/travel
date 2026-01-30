'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const heroImages = [
  'https://images.unsplash.com/photo-1569330667576-d3a1c08e1dc0?w=1920&q=80',
  'https://images.unsplash.com/photo-1602858789614-72e3a4698e48?w=1920&q=80',
  'https://images.unsplash.com/photo-1596395463831-2f53e797d361?w=1920&q=80',
]

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            index === currentImage ? 'opacity-100' : 'opacity-0'
          )}
        >
          <img
            src={image || "/placeholder.svg"}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div 
          className={cn(
            'transition-all duration-1000 delay-300',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/20">
            Монгол орны онцгой аялалууд
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight text-balance">
            Experience Mongolia
            <br />
            <span className="text-primary-foreground/90">Beyond the Map</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed text-pretty">
            Тал нутгийн хязгааргүй орон зай, Говийн цөлийн нууцлаг үзэсгэлэн, 
            нүүдэлчдийн эртний соёл. Таны мөрөөдлийн аялал эндээс эхэлнэ.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-base px-8 h-12"
            >
              <Link href="/tours">
                Аяллуудыг үзэх
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 h-12 bg-transparent"
            >
              <Link href="/custom">
                <Play className="mr-2 h-5 w-5" />
                Тусгай аялал төлөвлөх
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className={cn(
            'absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <div className="flex flex-col items-center gap-2 text-primary-foreground/60">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-primary-foreground/60 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentImage(index)}
            className={cn(
              'w-12 h-1 rounded-full transition-all',
              index === currentImage 
                ? 'bg-primary-foreground' 
                : 'bg-primary-foreground/30 hover:bg-primary-foreground/50'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
