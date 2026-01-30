import { Suspense } from 'react'
import { getTours } from '@/lib/db'
import { ToursGrid } from '@/components/public/tours/tours-grid'
import { ToursFilter } from '@/components/public/tours/tours-filter'
import { ToursSkeleton } from '@/components/public/tours/tours-skeleton'

interface ToursPageProps {
  searchParams: Promise<{
    season?: string
    style?: string
    search?: string
  }>
}

export default async function ToursPage({ searchParams }: ToursPageProps) {
  const params = await searchParams
  
  return (
    <div className="pt-20 lg:pt-24">
      {/* Header */}
      <section className="bg-secondary/30 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Аяллын хөтөлбөрүүд
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Монгол орны хамгийн үзэсгэлэнт газруудыг нээн илрүүлэх аяллуудаас сонгоорой
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Grid */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ToursFilter />
          
          <Suspense fallback={<ToursSkeleton />}>
            <ToursContent params={params} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}

async function ToursContent({ params }: { params: { season?: string; style?: string; search?: string } }) {
  const tours = await getTours({
    status: 'published',
    season: params.season,
    style: params.style,
    search: params.search,
  })

  return <ToursGrid tours={tours} />
}
