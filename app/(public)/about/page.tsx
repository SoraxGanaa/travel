import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Globe, Heart, Shield, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Монголын тухай | Mongolia Travel',
  description: 'Монгол орны үзэсгэлэнт байгаль, түүх, соёл, нүүдэлчдийн амьдралын тухай.',
}

const values = [
  {
    icon: Heart,
    title: 'Жинхэнэ туршлага',
    description: 'Бид жинхэнэ Монголыг танд харуулна. Туристуудад зориулсан хуурамч биш, жинхэнэ нүүдэлчдийн амьдрал.',
  },
  {
    icon: Shield,
    title: 'Аюулгүй байдал',
    description: 'Таны аюулгүй байдал бидний хамгийн чухал зорилт. Мэргэжлийн хөтөч, найдвартай тээвэр.',
  },
  {
    icon: Globe,
    title: 'Тогтвортой аялал',
    description: 'Байгаль орчныг хамгаалах, орон нутгийн иргэдийг дэмжих тогтвортой аялалыг баримтална.',
  },
  {
    icon: Users,
    title: 'Орон нутгийн нийгэмлэг',
    description: 'Бид орон нутгийн малчид, гэр бүлүүдтэй хамтран ажилладаг. Таны төлбөрийн хэсэг тэдэнд очно.',
  },
]

export default function AboutPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1596395463831-2f53e797d361?w=1920&q=80"
            alt="Mongolia landscape"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              Монгол орон - Тэнгэрийн хөх улс
            </h1>
            <p className="mt-6 text-xl text-primary-foreground/80 leading-relaxed">
              Дэлхийн хамгийн сийрэг хүн амтай орон. Хязгааргүй тал нутаг, 
              эртний нүүдэлчдийн соёл, гайхалтай байгалийн үзэсгэлэн.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Бидний түүх
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-foreground">
                Монголыг дэлхийд таниулах
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Mongolia Travel нь 2010 онд байгуулагдсан бөгөөд Монгол орны 
                  үзэсгэлэнт байгаль, түүх соёлыг дэлхийн аялагчдад таниулах 
                  зорилготой ажиллаж байна.
                </p>
                <p>
                  Бид жинхэнэ Монголыг харуулахыг эрмэлздэг. Туристуудад зориулсан 
                  хуурамч биш, бодит нүүдэлчдийн амьдрал, соёл, уламжлалыг та 
                  биднээр дамжуулан мэдрэх боломжтой.
                </p>
                <p>
                  Манай баг нь Монгол орныг дотор нь мэддэг, туршлагатай хөтчүүд, 
                  аялалын мэргэжилтнүүдээс бүрдэнэ. Бид таны аяллыг онцгой, 
                  санамсаргүй дурсамж болгоно.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1587502537147-2ba64a62e4e6?w=800"
                alt="Nomadic family"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-6 shadow-lg border border-border">
                <div className="text-4xl font-bold text-primary">15+</div>
                <div className="text-muted-foreground">жилийн туршлага</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Бидний үнэт зүйлс
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-foreground">
              Яагаад биднийг сонгох вэ?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mongolia Facts */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Сонирхолтой мэдээлэл
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-foreground">
              Монгол орны тухай
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Тал нутаг',
                description: 'Монгол орны 80% нь тал нутаг бөгөөд дэлхийн хамгийн том хувилаа өвс бүхий нутаг юм.',
                image: 'https://images.unsplash.com/photo-1569330667576-d3a1c08e1dc0?w=600',
              },
              {
                title: 'Нүүдэлчдийн соёл',
                description: 'Монголчуудын 30% орчим нь өнөөг хүртэл нүүдлийн амьдралаар амьдарч байна.',
                image: 'https://images.unsplash.com/photo-1596395463831-2f53e797d361?w=600',
              },
              {
                title: 'Говь цөл',
                description: 'Азийн хамгийн том цөл бөгөөд динозаврын олон чухал олдвор энд илэрсэн.',
                image: 'https://images.unsplash.com/photo-1602858789614-72e3a4698e48?w=600',
              },
            ].map((fact) => (
              <div key={fact.title} className="group">
                <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                  <img
                    src={fact.image || "/placeholder.svg"}
                    alt={fact.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {fact.title}
                </h3>
                <p className="text-muted-foreground">
                  {fact.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
            Монголыг нээн илрүүлэх бэлэн үү?
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Бидэнтэй хамт онцгой аялал хийж, амьдралынхаа хамгийн сайхан дурсамжийг бүтээгээрэй.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
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
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              <Link href="/contact">Холбоо барих</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
