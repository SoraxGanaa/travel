'use client'

import { useEffect, useRef, useState } from 'react'
import { Tent, Mountain, Users, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: Mountain,
    title: 'Үзэсгэлэнт байгаль',
    description: 'Говийн цөлөөс эхлээд Хөвсгөл нуур хүртэл дэлхийн хамгийн гайхамшигт байгалийн үзэгдлүүд.',
    image: 'https://images.unsplash.com/photo-1569330667576-d3a1c08e1dc0?w=600&h=400&fit=crop',
  },
  {
    icon: Tent,
    title: 'Нүүдэлчдийн соёл',
    description: 'Мянган жилийн түүхтэй нүүдэлчдийн амьдралын хэв маяг, уламжлалт зан заншил.',
    image: 'https://images.unsplash.com/photo-1596395463831-2f53e797d361?w=600&h=400&fit=crop',
  },
  {
    icon: Users,
    title: 'Зочломтгой ард түмэн',
    description: 'Монголчуудын дулаахан хүлээн авалт, жинхэнэ зочломтгой уламжлал.',
    image: 'https://images.unsplash.com/photo-1587502537147-2ba64a62e4e6?w=600&h=400&fit=crop',
  },
  {
    icon: Sun,
    title: 'Дөрвөн улирал',
    description: 'Улирал бүр өөрийн гэсэн онцлогтой, жилийн турш аялах боломжтой.',
    image: 'https://images.unsplash.com/photo-1602858789614-72e3a4698e48?w=600&h=400&fit=crop',
  },
]

export function WhyMongolia() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Яагаад Монгол гэж?
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Дэлхийн хамгийн сүүлчийн жинхэнэ зэрлэг газар
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Монгол орон бол хүн төрөлхтний эртний соёл иргэншил, гайхалтай байгалийн 
            үзэсгэлэн хослон оршдог дэлхийн цөөн хэдэн газрын нэг юм.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '1.5M+', label: 'км² талбай' },
            { value: '3M', label: 'хүн ам' },
            { value: '30+', label: 'үндэстэн ястан' },
            { value: '4000+', label: 'түүхэн жил' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ 
  feature, 
  index 
}: { 
  feature: typeof features[number]
  index: number 
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const Icon = feature.icon

  return (
    <div
      ref={ref}
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Content */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-xl text-foreground mb-2">
            {feature.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Image */}
        <div className="relative w-full md:w-48 lg:w-56 h-48 md:h-auto">
          <img
            src={feature.image || "/placeholder.svg"}
            alt={feature.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-card via-card/50 to-transparent" />
        </div>
      </div>
    </div>
  )
}
