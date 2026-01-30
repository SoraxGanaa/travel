import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function CTASection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Mongolia travel"
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight">
              Мөрөөдлийн аялалаа
              <br />
              эхлүүлэх цаг болсон
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-lg">
              Бидэнтэй хамт Монгол орны үзэсгэлэнт байгаль, нүүдэлчдийн соёлыг
              нээн илрүүлээрэй. Таны хүсэл сонирхолд тохирсон аялалыг бид
              төлөвлөж өгнө.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <Link href="/custom">
                  Тусгай аялал төлөвлөх
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

          {/* Right Content - Contact Info */}
          <div className="lg:pl-12">
            <div className="glass rounded-2xl p-8 space-y-6">
              <h3 className="text-xl font-semibold text-foreground">
                Шууд холбогдох
              </h3>
              <div className="space-y-4">
                <a
                  href="tel:+97611234567"
                  className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Утасны дугаар
                    </div>
                    <div className="font-medium">+976 11 234 567</div>
                  </div>
                </a>
                <a
                  href="mailto:info@mongolia.travel"
                  className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      И-мэйл хаяг
                    </div>
                    <div className="font-medium">info@mongolia.travel</div>
                  </div>
                </a>
              </div>
              <p className="text-sm text-muted-foreground pt-4 border-t border-border">
                Даваа - Баасан: 09:00 - 18:00
                <br />
                Бямба: 10:00 - 15:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
