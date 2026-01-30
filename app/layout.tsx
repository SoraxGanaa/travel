import React from "react"
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const _inter = Inter({ subsets: ['latin', 'cyrillic'] })
const _playfair = Playfair_Display({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Mongolia Travel | Монголоор аялах',
  description: 'Монгол орны үзэсгэлэнт байгаль, нүүдэлчдийн соёлыг судлах онцгой аялалууд. Premium Mongolia tours featuring the Gobi Desert, Khuvsgul Lake, and nomadic culture experiences.',
  generator: 'v0.app',
  keywords: ['Mongolia travel', 'Gobi Desert tours', 'Nomadic culture', 'Adventure travel', 'Монгол аялал'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="mn">
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  )
}
