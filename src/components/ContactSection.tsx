import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { menuData } from '@/lib/menuData'

export default function ContactSection() {
  const { business } = menuData

  return (
    <section id="contact" className="py-16 bg-stone-950">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Kontakt Os</h2>
            <p className="text-stone-400">Vi glæder os til at høre fra dig</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-stone-800 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-amber-500 mb-6">Kontakt Information</h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-amber-500 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-white">Adresse</p>
                      <p className="text-stone-400">{business.address}</p>
                      <a
                        href={business.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-500 hover:text-amber-400 text-sm transition"
                      >
                        Vis på kort →
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="text-amber-500 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-white">Telefon</p>
                      <a href={`tel:${business.phone}`} className="text-stone-400 hover:text-amber-500 transition">
                        {business.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="text-amber-500 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-white">Email</p>
                      <a href={`mailto:${business.email}`} className="text-stone-400 hover:text-amber-500 transition">
                        {business.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="text-amber-500 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-white">Åbningstider</p>
                      <p className="text-stone-400">{business.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-stone-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-amber-500 mb-4">Bestilling</h3>
                <p className="text-stone-400 mb-4">
                  Ring til os for at bestille afhentning. Vi tilbyder hurtig og nem afhentning.
                </p>
                <a
                  href={`tel:${business.phone}`}
                  className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-3 px-6 rounded-full inline-flex items-center transition"
                >
                  <Phone size={20} className="mr-2" />
                  Ring Nu: {business.phone}
                </a>
              </div>
            </div>

            <div className="h-96 lg:h-full min-h-[400px] rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2243.695!2d8.3265!3d55.8343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464a30e5e5e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sBredgade%2059%2C%206830%20N%C3%B8rre%20Nebel!5e0!3m2!1sen!2sdk!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}