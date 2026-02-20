import Image from 'next/image'
import { Smartphone } from 'lucide-react'

export default function AppDownload() {
  return (
    <section className="py-16 bg-stone-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full mb-4">
                  <Smartphone size={16} />
                  <span className="text-sm font-semibold">SPRING KØEN OVER</span>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">
                  Hent vores app
                </h2>
                <p className="text-stone-400 mb-6">
                  Bestil nemt og hurtigt direkte fra din telefon. Download vores app og spring køen over!
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <a
                    href="https://itunes.apple.com/dk/app/id1178167723"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:scale-105"
                  >
                    <Image
                      src="/images/appstore.png"
                      alt="Hent i App Store"
                      width={150}
                      height={50}
                      className="h-12 w-auto"
                    />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=dk.stadel.kebabhouse_no_2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:scale-105"
                  >
                    <Image
                      src="/images/googleplay.png"
                      alt="Nu på Google Play"
                      width={150}
                      height={50}
                      className="h-12 w-auto"
                    />
                  </a>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-lg">
                <Image
                  src="/images/qr-code.png"
                  alt="Scan QR-kode for at downloade app"
                  width={200}
                  height={200}
                  className="w-48 h-48"
                />
                <p className="text-center text-gray-600 text-sm mt-2 font-medium">
                  Scan med din telefon
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
