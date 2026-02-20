'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from '@/components/AppLink'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { ShoppingCart, Menu, X, Phone, Star, User } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { getTotalItems, getTotalPrice } = useCart()
  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  // Close menu on resize to desktop or scroll
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setIsOpen(false) }
    const handleScroll = () => { if (isOpen) setIsOpen(false) }
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isOpen])

  const navLinks = [
    { label: 'Forside', href: '/' },
    { label: 'Menukort', href: '/#menu' },
    { label: 'Åbningstider', href: '/aabning' },
    { label: 'Betingelser', href: '/betingelser' },
    { label: 'Privatliv', href: '/privatliv' },
    { label: 'Min konto', href: 'https://pizzakebabhouse.dk/?module=Sunu&page=customer&do=login_mobile&user_id=343' },
  ]

  return (
    <>
      {/* Top info bar — desktop only */}
      <div className="bg-stone-950 border-b border-stone-800 text-sm hidden md:block">
        <div className="container mx-auto px-4 flex items-center justify-between h-8">
          <div className="flex items-center gap-4 text-stone-400">
            <a href="tel:75287535" className="flex items-center gap-1 hover:text-amber-500 transition">
              <Phone size={13} />
              <span>75 28 75 35</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://pizzakebabhouse.dk/?module=Sunu&page=customer&do=login_mobile&user_id=343"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-amber-500 transition flex items-center gap-1"
            >
              <User size={13} />
              Log ind
            </a>
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="currentColor" />
              ))}
              <span className="text-stone-400 ml-1">(1732 bedømmelser)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky nav bar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-stone-900/95 backdrop-blur-md shadow-lg' : 'bg-stone-900'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image
                src="/logo.png"
                alt="Kebab House no.2"
                width={68}
                height={68}
                className="rounded-md"
              />
              <div className="hidden sm:block">
                <p className="text-white font-bold text-lg leading-tight">Kebab House no.2</p>
                <p className="text-amber-500/70 text-xs">Nørre Nebel</p>
              </div>
              <div className="hidden md:flex items-center gap-2 ml-4">
                <div className="bg-stone-800 border border-stone-700 rounded-lg px-3 py-1 text-center">
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider">Afhentning</div>
                  <div className="text-sm text-amber-500 font-semibold">12:00–21:00</div>
                </div>
                <div className="bg-stone-800 border border-stone-700 rounded-lg px-3 py-1 text-center">
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider">Udbringning</div>
                  <div className="text-sm text-red-500 font-semibold">Lukket</div>
                </div>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isExternal = link.href.startsWith('http')
                const Tag = isExternal ? 'a' : Link
                const extra = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}
                return (
                  <Tag
                    key={link.label}
                    href={link.href}
                    {...extra}
                    className="text-stone-300 hover:text-amber-500 hover:bg-stone-800 px-3 py-2 rounded transition text-sm font-medium uppercase tracking-wide"
                  >
                    {link.label}
                  </Tag>
                )
              })}
            </div>

            {/* Cart + burger */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="relative flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white px-2.5 py-2 rounded-lg transition"
              >
                <ShoppingCart size={18} className="shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap">
                  {totalItems > 0 ? `${totalPrice.toFixed(0)} kr.` : '0 kr.'}
                </span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden text-stone-300 hover:text-amber-500 transition p-2 rounded-lg hover:bg-stone-800"
                aria-label="Menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile dropdown — fixed, floats above content */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/40"
            onClick={() => setIsOpen(false)}
          />
          {/* Menu panel */}
          <div className="lg:hidden fixed top-16 sm:top-20 left-0 right-0 z-50 bg-stone-900 border-b border-stone-700 shadow-2xl overflow-y-auto max-h-[calc(100dvh-4rem)]">
            <div className="container mx-auto px-4 py-2 pb-8">
              {navLinks.map((link) => {
                const isExternal = link.href.startsWith('http')
                const Tag = isExternal ? 'a' : Link
                const extra = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}
                return (
                  <Tag
                    key={link.label}
                    href={link.href}
                    {...extra}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-3 py-3.5 text-stone-200 hover:text-amber-500 hover:bg-stone-800 rounded-lg transition font-medium border-b border-stone-800 last:border-0"
                  >
                    {link.label}
                  </Tag>
                )
              })}
              <div className="py-3 border-t border-stone-800 mt-1">
                <a
                  href="tel:75287535"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-amber-500 hover:text-amber-400 transition text-sm font-medium"
                >
                  <Phone size={15} />
                  75 28 75 35
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
