import Link from 'next/link'
import { Clock, MapPin, Star, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Tour } from '@/lib/db'
import { cn } from '@/lib/utils'

interface ToursGridProps {
  tours: Tour[]
}

const styleLabels: Record<string, string> = {
  Adventure: 'Адал явдал',
  Culture: 'Соёл',
  Nature: 'Байгаль',
  Luxury: 'Тансаг',
}

const styleColors: Record<string, string> = {
  Adventure: 'bg-chart-4/10 text-chart-4 border-chart-4/20',
  Culture: 'bg-chart-1/10 text-chart-1 border-chart-1/20',
  Nature: 'bg-chart-2/10 text-chart-2 border-chart-2/20',
  Luxury: 'bg-chart-3/10 text-chart-3 border-chart-3/20',
}

const difficultyLabels: Record<string, string> = {
  Easy: 'Хөнгөн',
  Medium: 'Дунд',
  Hard: 'Хүнд',
}

export function ToursGrid({ tours }: ToursGridProps) {
  if (tours.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
          <MapPin className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Аялал олдсонгүй
        </h3>
        <p className="text-muted-foreground">
          Өөр шүүлтүүр ашиглан дахин хайна уу
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour, index) => (
        <TourCard key={tour.id} tour={tour} index={index} />
      ))}
    </div>
  )
}

function TourCard({ tour, index }: { tour: Tour; index: number }) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group animate-fade-in-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <Card className="h-full overflow-hidden border-border/50 bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={tour.coverImage || "/placeholder.svg"}
            alt={tour.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

          {/* Price Badge */}
          <div className="absolute top-4 right-4 glass rounded-full px-3 py-1.5">
            <span className="text-sm font-bold text-foreground">${tour.priceFrom}</span>
            <span className="text-xs text-muted-foreground ml-0.5">-с</span>
          </div>

          {/* Difficulty Badge */}
          <div className="absolute top-4 left-4">
            <Badge
              variant="secondary"
              className={cn(
                'text-xs',
                tour.difficulty === 'Easy' && 'bg-chart-1/80 text-primary-foreground',
                tour.difficulty === 'Medium' && 'bg-chart-3/80 text-foreground',
                tour.difficulty === 'Hard' && 'bg-chart-4/80 text-primary-foreground'
              )}
            >
              {difficultyLabels[tour.difficulty]}
            </Badge>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-primary-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">4.9</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Users className="h-4 w-4" />
              <span>{tour.groupSize}</span>
            </div>
          </div>
        </div>

        <CardContent className="p-5">
          {/* Style Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tour.style.map((s) => (
              <Badge
                key={s}
                variant="outline"
                className={cn('text-xs font-medium', styleColors[s])}
              >
                {styleLabels[s]}
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

          {/* Highlights */}
          <div className="mt-3 flex flex-wrap gap-1">
            {tour.highlights.slice(0, 3).map((highlight) => (
              <span
                key={highlight}
                className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded"
              >
                {highlight}
              </span>
            ))}
            {tour.highlights.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{tour.highlights.length - 3}
              </span>
            )}
          </div>

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
