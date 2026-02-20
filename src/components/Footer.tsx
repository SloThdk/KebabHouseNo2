import Link from '@/components/AppLink'
import { VisaLogo, VisaElectronLogo, MastercardLogo } from './PaymentLogos'
import { MapPin, Phone, Mail, Clock, Star, ExternalLink } from 'lucide-react'
import { menuData } from '@/lib/menuData'

export default function Footer() {
  const { business } = menuData
  return (
    <footer className="bg-stone-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent mb-4">
              Kebab House no.2
            </h3>
            <p className="text-stone-400 text-sm">
              Autentisk kebab og pizza siden 2021. Vi serverer kvalitetsmad med friske ingredienser hver dag.
            </p>
            {/* removed food emojis */}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-orange-400 mb-4">Hurtige Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#menu" className="text-stone-400 hover:text-orange-400 transition-colors">
                  Menu
                </a>
              </li>
              <li>
                <a href="#contact" className="text-stone-400 hover:text-orange-400 transition-colors">
                  Kontakt
                </a>
              </li>
              <li>
                <a href={business.smiley} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-orange-400 transition-colors">
                  Smiley Rapport
                </a>
              </li>
              <li>
                <a href={`tel:${business.phone}`} className="text-stone-400 hover:text-orange-400 transition-colors">
                  Bestil Nu
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-orange-400 mb-4">Kontakt</h4>
            <ul className="space-y-2 text-stone-400 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-orange-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{business.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-orange-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${business.phone}`} className="hover:text-orange-400 transition-colors">
                  {business.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-orange-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${business.email}`} className="hover:text-orange-400 transition-colors">
                  {business.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-orange-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Man-Søn: 12:00-21:00</span>
              </li>
            </ul>
          </div>

          {/* App Downloads */}
          <div>
            <h4 className="text-lg font-semibold text-orange-400 mb-4">Download App</h4>
            <div className="space-y-3">
              <a
                href={business.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-stone-800 hover:bg-stone-700 px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span className="text-sm text-stone-300">App Store</span>
              </a>
              <a
                href={business.googlePlay}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-stone-800 hover:bg-stone-700 px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35l7.51 7.5L3.84 21.65c-.5-.25-.84-.76-.84-1.35M16.81 15.16l-4.33-2.5 3.03-3.03 4.58 2.64c.72.41.72 1.08 0 1.49l-3.28 1.9M6.05 2.3c.09-.03.19-.05.29-.05.33 0 .65.11.91.29l10.56 6.1-3.03 3.03L6.05 2.3z"/>
                </svg>
                <span className="text-sm text-stone-300">Google Play</span>
              </a>
            </div>
            <p className="text-stone-500 text-xs mt-4">
              {business.reviews.toLocaleString('da-DK')} anmeldelser
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-8 pt-8 border-t border-stone-800 flex flex-wrap items-center justify-center gap-6">
          <a href="https://www.findsmiley.dk/Sider/Search.aspx?k=kebab+house+no" target="_blank" rel="noopener noreferrer">
            <img src="/smiley.gif" alt="Se kontrolrapport" className="h-12" />
          </a>
          <div className="flex items-center gap-3">
            <VisaLogo />
            <VisaElectronLogo />
            <MastercardLogo />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-stone-800 text-center text-sm text-stone-500">
          <p>© 2024 {business.name} · CVR: {business.cvr}</p>
          <p className="mt-2">
            Lavet med <span className="text-orange-400">♥</span> i Nørre Nebel
          </p>
        </div>
      </div>
    </footer>
  );
}