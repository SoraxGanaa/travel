import Link from 'next/link'
import { Mountain, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'

const footerLinks = {
  tours: [
    { href: '/tours?style=Adventure', label: 'Адал явдалт аялал' },
    { href: '/tours?style=Culture', label: 'Соёлын аялал' },
    { href: '/tours?style=Nature', label: 'Байгалийн аялал' },
    { href: '/tours?style=Luxury', label: 'Тансаг аялал' },
  ],
  company: [
    { href: '/about', label: 'Бидний тухай' },
    { href: '/contact', label: 'Холбоо барих' },
    { href: '/custom', label: 'Тусгай аялал' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 text-foreground">
                <Mountain className="h-8 w-8 text-primary" />
                <span className="font-serif text-xl font-semibold">Mongolia Travel</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Монгол орны үзэсгэлэнт байгаль, нүүдэлчдийн соёлыг танд хүргэнэ. 
                Онцгой дурсамжтай аялал бидэнтэй хамт.
              </p>
              <div className="mt-6 flex gap-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Tours Links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Аяллууд
              </h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.tours.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Компани
              </h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Холбоо барих
              </h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-5 w-5 shrink-0 text-primary" />
                  <span>Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо</span>
                </li>
                <li>
                  <a 
                    href="tel:+97611234567" 
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="h-5 w-5 shrink-0 text-primary" />
                    <span>+976 11 234 567</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:info@mongolia.travel" 
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-5 w-5 shrink-0 text-primary" />
                    <span>info@mongolia.travel</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Mongolia Travel. Бүх эрх хуулиар хамгаалагдсан.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Нууцлалын бодлого
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Үйлчилгээний нөхцөл
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
