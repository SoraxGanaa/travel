import { Metadata } from 'next'
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react'
import { ContactForm } from '@/components/public/contact/contact-form'

export const metadata: Metadata = {
  title: 'Холбоо барих | Mongolia Travel',
  description: 'Бидэнтэй холбогдоорой. Аялалын талаар асуух зүйл байвал бид тантай ярилцахад бэлэн.',
}

const contactInfo = [
  {
    icon: Phone,
    title: 'Утас',
    value: '+976 11 234 567',
    href: 'tel:+97611234567',
    description: 'Даваа - Баасан, 09:00 - 18:00',
  },
  {
    icon: Mail,
    title: 'И-мэйл',
    value: 'info@mongolia.travel',
    href: 'mailto:info@mongolia.travel',
    description: '24 цагийн дотор хариулна',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: '+976 99 123 456',
    href: 'https://wa.me/97699123456',
    description: 'Шууд чат',
  },
  {
    icon: MapPin,
    title: 'Хаяг',
    value: 'Улаанбаатар хот',
    href: 'https://maps.google.com',
    description: 'Сүхбаатар дүүрэг, 1-р хороо',
  },
]

export default function ContactPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Header */}
      <section className="bg-secondary/30 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Холбоо барих
            </span>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Бидэнтэй холбогдоорой
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Аялалын талаар асуух зүйл байвал бид тантай ярилцахад бэлэн. 
              Доорх хэлбэрүүдээр бидэнтэй холбогдох боломжтой.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Холбогдох мэдээлэл
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const Icon = info.icon
                  return (
                    <a
                      key={info.title}
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {info.title}
                        </div>
                        <div className="text-foreground">{info.value}</div>
                        <div className="text-sm text-muted-foreground">
                          {info.description}
                        </div>
                      </div>
                    </a>
                  )
                })}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Байршил
                </h2>
                <div className="aspect-[4/3] rounded-xl bg-muted flex items-center justify-center border border-border overflow-hidden">
                  <div className="text-center text-muted-foreground p-4">
                    <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Улаанбаатар хот, Сүхбаатар дүүрэг</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Мессеж илгээх
                </h2>
                <p className="text-muted-foreground mb-6">
                  Доорх маягтыг бөглөж, бидэнтэй холбогдоорой. Бид 24 цагийн дотор хариулах болно.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
