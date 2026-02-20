'use client';

import { Business } from '@/types/menu';

interface ContactProps {
  business: Business;
}

export default function Contact({ business }: ContactProps) {
  const daysOfWeek = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];

  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
            Kontakt & Lokation
          </h2>
          <p className="text-stone-400 text-lg">
            Find os eller kontakt os direkte
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="bg-stone-800/50 rounded-xl p-6 border border-stone-700">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">Find Os</h3>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2265.893!2d8.3289!3d55.6315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464a34f0c0c0c0c0%3A0x0!2sBredgade%2059%2C%206830%20N%C3%B8rre%20Nebel!5e0!3m2!1sen!2sdk!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
            <p className="mt-4 text-stone-300">
              <span className="text-orange-400 font-semibold">Adresse:</span> {business.address}
            </p>
          </div>

          {/* Contact Info & Hours */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="bg-stone-800/50 rounded-xl p-6 border border-stone-700">
              <h3 className="text-2xl font-bold text-orange-400 mb-4">Kontakt Information</h3>

              <div className="space-y-4">
                <a
                  href={`tel:${business.phone}`}
                  className="flex items-center gap-3 text-stone-300 hover:text-orange-400 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-lg">{business.phone}</span>
                </a>

                <a
                  href={`mailto:${business.email}`}
                  className="flex items-center gap-3 text-stone-300 hover:text-orange-400 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-lg">{business.email}</span>
                </a>

                <div className="flex items-center gap-3 text-stone-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-lg">CVR: {business.cvr}</span>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-stone-800/50 rounded-xl p-6 border border-stone-700">
              <h3 className="text-2xl font-bold text-orange-400 mb-4">Åbningstider</h3>

              <div className="space-y-2">
                {daysOfWeek.map(day => (
                  <div key={day} className="flex justify-between py-2 border-b border-stone-700">
                    <span className="text-stone-300">{day}</span>
                    <span className="text-orange-400 font-semibold">12:00 - 21:00</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                {business.pickup && (
                  <span className="px-3 py-1 bg-green-900/30 border border-green-500/50 rounded-full text-green-400 text-sm">
                    ✓ Afhentning
                  </span>
                )}
                {!business.delivery && (
                  <span className="px-3 py-1 bg-red-900/30 border border-red-500/50 rounded-full text-red-400 text-sm">
                    ✗ Levering
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* App Downloads & Smiley Report */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href={business.appStore}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stone-800/50 rounded-xl p-4 border border-stone-700 hover:border-orange-500/50 transition-all flex items-center gap-3"
          >
            <svg className="w-8 h-8 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div>
              <p className="text-xs text-stone-400">Download på</p>
              <p className="text-orange-400 font-semibold">App Store</p>
            </div>
          </a>

          <a
            href={business.googlePlay}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stone-800/50 rounded-xl p-4 border border-stone-700 hover:border-orange-500/50 transition-all flex items-center gap-3"
          >
            <svg className="w-8 h-8 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35l7.51 7.5L3.84 21.65c-.5-.25-.84-.76-.84-1.35M16.81 15.16l-4.33-2.5 3.03-3.03 4.58 2.64c.72.41.72 1.08 0 1.49l-3.28 1.9M6.05 2.3c.09-.03.19-.05.29-.05.33 0 .65.11.91.29l10.56 6.1-3.03 3.03L6.05 2.3z"/>
            </svg>
            <div>
              <p className="text-xs text-stone-400">Få det på</p>
              <p className="text-orange-400 font-semibold">Google Play</p>
            </div>
          </a>

          <a
            href={business.smiley}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stone-800/50 rounded-xl p-4 border border-stone-700 hover:border-orange-500/50 transition-all flex items-center gap-3"
          >
            <span className="text-3xl">😊</span>
            <div>
              <p className="text-xs text-stone-400">Se vores</p>
              <p className="text-orange-400 font-semibold">Smiley Rapport</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}