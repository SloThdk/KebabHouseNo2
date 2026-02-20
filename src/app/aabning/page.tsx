import { Clock, MapPin, Phone, Mail, Navigation } from 'lucide-react'
import Footer from '@/components/Footer'

const days = [
  { day: 'Mandag', open: '12:00 - 21:00', delivery: 'Ingen udbringning' },
  { day: 'Tirsdag', open: '12:00 - 21:00', delivery: 'Ingen udbringning' },
  { day: 'Onsdag', open: '12:00 - 21:00', delivery: 'Ingen udbringning' },
  { day: 'Torsdag', open: '12:00 - 21:00', delivery: 'Ingen udbringning' },
  { day: 'Fredag', open: '12:00 - 21:00', delivery: 'Ingen udbringning' },
  { day: 'Lørdag', open: '12:00 - 21:00', delivery: 'Ingen udbringning' },
  { day: 'Søndag', open: '12:00 - 21:00', delivery: 'Ingen udbringning' },
]

export default function Aabning() {
  return (
    <>
      <div className="bg-stone-950 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-3xl font-bold text-amber-500 mb-8">Åbningstider</h1>

          {/* Hours Cards */}
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {/* Afhentning */}
            <div className="bg-stone-900 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="text-green-500" size={22} />
                <h2 className="text-xl font-semibold text-white">Afhentning</h2>
              </div>
              <div className="bg-green-900/20 border border-green-800/30 rounded-lg px-4 py-2 mb-4 text-green-400 text-sm font-medium">
                ✓ Vi har åbent nu
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stone-700">
                    <th className="text-left py-2 text-stone-400 font-medium text-sm">Ugedag</th>
                    <th className="text-right py-2 text-stone-400 font-medium text-sm">Åbningstid</th>
                  </tr>
                </thead>
                <tbody>
                  {days.map(({ day, open }) => (
                    <tr key={day} className="border-b border-stone-800/50">
                      <td className="py-2.5 text-stone-200">{day}</td>
                      <td className="py-2.5 text-right text-green-400 font-medium">{open}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Udbringning */}
            <div className="bg-stone-900 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="text-red-500" size={22} />
                <h2 className="text-xl font-semibold text-white">Udbringning</h2>
              </div>
              <div className="bg-red-900/20 border border-red-800/30 rounded-lg px-4 py-2 mb-4 text-red-400 text-sm font-medium">
                ✗ Vi kan ikke bringe ud nu
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stone-700">
                    <th className="text-left py-2 text-stone-400 font-medium text-sm">Ugedag</th>
                    <th className="text-right py-2 text-stone-400 font-medium text-sm">Tidsrum</th>
                  </tr>
                </thead>
                <tbody>
                  {days.map(({ day, delivery }) => (
                    <tr key={day} className="border-b border-stone-800/50">
                      <td className="py-2.5 text-stone-200">{day}</td>
                      <td className="py-2.5 text-right text-red-400">{delivery}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contact Strip */}
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <a
              href="tel:75287535"
              className="flex items-center gap-4 bg-stone-900 hover:bg-stone-800 transition-colors rounded-xl p-5 group"
            >
              <div className="w-11 h-11 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">
                <Phone className="text-amber-500" size={20} />
              </div>
              <div>
                <p className="text-stone-400 text-xs mb-0.5">Ring til os</p>
                <p className="text-white font-semibold">75 28 75 35</p>
              </div>
            </a>

            <a
              href="mailto:kebab.houseno2@gmail.com"
              className="flex items-center gap-4 bg-stone-900 hover:bg-stone-800 transition-colors rounded-xl p-5 group"
            >
              <div className="w-11 h-11 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">
                <Mail className="text-amber-500" size={20} />
              </div>
              <div>
                <p className="text-stone-400 text-xs mb-0.5">Send en mail</p>
                <p className="text-white font-semibold text-sm">kebab.houseno2@gmail.com</p>
              </div>
            </a>

            <a
              href="https://www.google.dk/maps/place/Bredgade+59,+N%C3%B8rre+Nebel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-stone-900 hover:bg-stone-800 transition-colors rounded-xl p-5 group"
            >
              <div className="w-11 h-11 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">
                <Navigation className="text-amber-500" size={20} />
              </div>
              <div>
                <p className="text-stone-400 text-xs mb-0.5">Find os</p>
                <p className="text-white font-semibold">Bredgade 59, 6830 Nørre Nebel</p>
              </div>
            </a>
          </div>

          {/* Google Maps Embed */}
          <div className="rounded-xl overflow-hidden border border-stone-800 mb-12">
            <iframe
              src="https://maps.google.com/maps?q=Bredgade+59,+6830+N%C3%B8rre+Nebel&output=embed&z=15"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kebab House no.2 på Google Maps"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
