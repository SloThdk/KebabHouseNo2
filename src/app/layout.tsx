import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'
import Navigation from '@/components/Navigation'
import CookieBanner from '@/components/CookieBanner'
import BackToTop from '@/components/BackToTop'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kebab House no.2 - Nørre Nebel',
  description: 'Autentisk mad med de bedste råvarer. Pizza, kebab, burger og meget mere.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da">
      <body className={`${inter.className} bg-stone-950`}>
        <CartProvider>
          <Navigation />
          <main>
            {children}
          </main>
          <BackToTop />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  )
}