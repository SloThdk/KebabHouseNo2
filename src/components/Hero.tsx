import Link from '@/components/AppLink'
import Image from 'next/image'
import { MapPin, Clock, Phone, Star } from 'lucide-react'
import { menuData } from '@/lib/menuData'

export default function Hero() {
  const { business } = menuData

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center">
      <Image src="/images/group_1800.jpg" alt="" fill className="object-cover opacity-10 pointer-events-none" priority />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 text-amber-500 px-4 py-2 rounded-full mb-6">
            <Star size={16} fill="currentColor" />
            <span className="text-sm font-semibold">{business.reviews} anmeldelser</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6">
            Velkommen til
            <span className="block text-amber-500 mt-2">Kebab House no.2</span>
          </h1>

          <p className="text-base sm:text-xl text-stone-300 mb-8 max-w-2xl mx-auto">
            Autentisk smag og kvalitet siden åbningen. Vi serverer de bedste pizzaer,
            kebab og grilretter i Nørre Nebel med friske råvarer hver dag.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="#menu"
              className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-4 px-8 rounded-full transition transform hover:scale-105"
            >
              Se Menu
            </Link>
            <a
              href={`tel:${business.phone}`}
              className="bg-stone-800 hover:bg-stone-700 text-white font-bold py-4 px-8 rounded-full transition transform hover:scale-105 flex items-center justify-center"
            >
              <Phone size={20} className="mr-2" />
              Ring Nu
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-stone-800/50 backdrop-blur rounded-lg p-4 border border-stone-700">
              <MapPin className="text-amber-500 mx-auto mb-2" size={24} />
              <p className="text-stone-300 font-semibold">Adresse</p>
              <p className="text-stone-400 text-sm">{business.address.split(',')[0]}</p>
            </div>

            <div className="bg-stone-800/50 backdrop-blur rounded-lg p-4 border border-stone-700">
              <Clock className="text-amber-500 mx-auto mb-2" size={24} />
              <p className="text-stone-300 font-semibold">Åbningstider</p>
              <p className="text-stone-400 text-sm">{business.hours}</p>
            </div>

            <div className="bg-stone-800/50 backdrop-blur rounded-lg p-4 border border-stone-700">
              <Phone className="text-amber-500 mx-auto mb-2" size={24} />
              <p className="text-stone-300 font-semibold">Bestil Nu</p>
              <p className="text-stone-400 text-sm">{business.phone}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-amber-500 font-semibold">Afhentning</span>
            <div className="w-2 h-2 bg-stone-600 rounded-full"></div>
            <span className="text-stone-400">22 kategorier</span>
            <div className="w-2 h-2 bg-stone-600 rounded-full"></div>
            <span className="text-stone-400">150+ retter</span>
          </div>
        </div>
      </div>
    </section>
  )
}