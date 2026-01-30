import { getTours } from '@/lib/db'
import { HeroSection } from '@/components/public/home/hero-section'
import { FeaturedTours } from '@/components/public/home/featured-tours'
import { WhyMongolia } from '@/components/public/home/why-mongolia'
import { Testimonials } from '@/components/public/home/testimonials'
import { CTASection } from '@/components/public/home/cta-section'

export default async function HomePage() {
  const tours = await getTours({ status: 'published' })

  return (
    <>
      <HeroSection />
      <FeaturedTours tours={tours.slice(0, 4)} />
      <WhyMongolia />
      <Testimonials />
      <CTASection />
    </>
  )
}
