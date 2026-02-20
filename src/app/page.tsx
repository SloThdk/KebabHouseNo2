import Hero from '@/components/Hero'
import MenuSection from '@/components/MenuSection'
import AboutSection from '@/components/AboutSection'
import Reviews from '@/components/Reviews'
import AppDownload from '@/components/AppDownload'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <MenuSection />
      <Reviews />
      <AppDownload />
      <ContactSection />
      <Footer />
    </>
  )
}