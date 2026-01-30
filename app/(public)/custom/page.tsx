import { Metadata } from 'next'
import { CustomTripWizard } from '@/components/public/custom/custom-trip-wizard'

export const metadata: Metadata = {
  title: 'Тусгай аялал төлөвлөх | Mongolia Travel',
  description: 'Өөрийн хүссэн аяллыг захиалаарай. Бид таны сонирхол, хугацаа, төсөвт тохирсон онцгой аялал зохион байгуулж өгнө.',
}

export default function CustomTripPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Header */}
      <section className="bg-secondary/30 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Тусгай аялал
            </span>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Мөрөөдлийн аяллаа төлөвлөөрэй
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Өөрийн сонирхол, хугацаа, төсөвт тохирсон аяллыг бид таньд зохион байгуулж өгнө. 
              Доорх маягтыг бөглөж, бидэнтэй холбогдоорой.
            </p>
          </div>
        </div>
      </section>

      {/* Wizard */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <CustomTripWizard />
        </div>
      </section>
    </div>
  )
}
