import { notFound } from 'next/navigation'
import { getTourBySlug, getTours } from '@/lib/db'
import { TourHero } from '@/components/public/tours/tour-hero'
import { TourContent } from '@/components/public/tours/tour-content'
import { TourBookingPanel } from '@/components/public/tours/tour-booking-panel'

interface TourPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: TourPageProps) {
  const { slug } = await params
  const tour = await getTourBySlug(slug)
  
  if (!tour) {
    return { title: 'Аялал олдсонгүй' }
  }

  return {
    title: `${tour.title} | Mongolia Travel`,
    description: tour.shortDescription,
  }
}

export default async function TourPage({ params }: TourPageProps) {
  const { slug } = await params
  const tour = await getTourBySlug(slug)

  if (!tour || tour.status !== 'published') {
    notFound()
  }

  return (
    <div className="pt-16 lg:pt-20">
      <TourHero tour={tour} />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <TourContent tour={tour} />
          </div>

          {/* Booking Panel */}
          <div className="mt-8 lg:mt-0">
            <TourBookingPanel tour={tour} />
          </div>
        </div>
      </div>
    </div>
  )
}
