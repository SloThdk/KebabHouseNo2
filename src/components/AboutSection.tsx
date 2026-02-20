import { Award, Users, Clock, Utensils } from 'lucide-react'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-stone-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Om Kebab House no.2</h2>
            <p className="text-stone-400 max-w-2xl mx-auto">
              Vi er stolte af at servere autentisk mad med de bedste råvarer.
              Vores passion for god mad og kvalitet har gjort os til et af de mest populære spisesteder i Nørre Nebel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-2xl font-bold text-amber-500 mb-4">Vores Historie</h3>
              <p className="text-stone-300 mb-6">
                Siden vores åbning har vi været dedikeret til at levere den bedste kvalitet til vores kunder.
                Med over 1700 positive anmeldelser er vi stolte af at være en del af lokalsamfundet i Nørre Nebel.
              </p>
              <p className="text-stone-300 mb-6">
                Vores menu byder på alt fra traditionelle pizzaer og kebab til gourmet burgere og pasta.
                Alt er tilberedt med friske ingredienser og serveret med et smil.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-stone-800 rounded-lg p-4">
                  <Award className="text-amber-500 mb-2" size={32} />
                  <h4 className="font-semibold text-white">Kvalitet</h4>
                  <p className="text-sm text-stone-400">Friske råvarer hver dag</p>
                </div>
                <div className="bg-stone-800 rounded-lg p-4">
                  <Users className="text-amber-500 mb-2" size={32} />
                  <h4 className="font-semibold text-white">Service</h4>
                  <p className="text-sm text-stone-400">Venlig betjening</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-72 rounded-xl overflow-hidden">
                <Image
                  src="/restaurant1.jpg"
                  alt="Kebab House no.2 - Indvendig"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-72 rounded-xl overflow-hidden">
                <Image
                  src="/restaurant2.jpg"
                  alt="Kebab House no.2 - Spiseplads"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-stone-800 rounded-lg p-6">
              <div className="text-3xl font-bold text-amber-500 mb-2">22</div>
              <div className="text-stone-400">Kategorier</div>
            </div>
            <div className="bg-stone-800 rounded-lg p-6">
              <div className="text-3xl font-bold text-amber-500 mb-2">150+</div>
              <div className="text-stone-400">Retter</div>
            </div>
            <div className="bg-stone-800 rounded-lg p-6">
              <div className="text-3xl font-bold text-amber-500 mb-2">1732</div>
              <div className="text-stone-400">Anmeldelser</div>
            </div>
            <div className="bg-stone-800 rounded-lg p-6">
              <div className="text-3xl font-bold text-amber-500 mb-2">5.0</div>
              <div className="text-stone-400">Stjerner</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}