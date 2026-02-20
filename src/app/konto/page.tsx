'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'

export default function Konto() {
  const [step, setStep] = useState<'phone' | 'pin' | 'loggedIn'>('phone')
  const [phone, setPhone] = useState('')
  const [pin, setPin] = useState('')

  return (
    <>
      <div className="min-h-screen bg-stone-950 flex items-center justify-center py-12">
        <div className="container mx-auto px-4 max-w-xl">
          {step === 'phone' && (
            <div className="text-center">
              <h1 className="text-3xl font-bold text-amber-500 mb-3">Din konto</h1>
              <p className="text-stone-400 mb-8 text-lg">Log venligst ind med dit mobilnummer</p>
              <div className="bg-stone-900 rounded-xl p-10">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Indtast mobilnummer"
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg px-6 py-5 text-white placeholder-stone-500 outline-none focus:border-amber-500 transition text-center text-xl"
                />
                <button
                  onClick={() => phone.length >= 8 && setStep('pin')}
                  className="w-full mt-5 bg-amber-600 hover:bg-amber-500 disabled:bg-stone-700 disabled:text-stone-500 text-white font-semibold py-4 rounded-lg transition text-lg"
                  disabled={phone.length < 8}
                >
                  Log ind
                </button>
              </div>
            </div>
          )}

          {step === 'pin' && (
            <div className="text-center">
              <h1 className="text-3xl font-bold text-amber-500 mb-3">Din konto</h1>
              <p className="text-stone-400 mb-8 text-lg">Indtast din pinkode</p>
              <div className="bg-stone-900 rounded-xl p-10">
                <p className="text-stone-400 mb-5 text-center">
                  Vi har sendt en pinkode til <span className="text-white font-medium">{phone}</span>
                </p>
                <input
                  type="text"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Indtast pinkode"
                  maxLength={6}
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg px-6 py-5 text-white placeholder-stone-500 outline-none focus:border-amber-500 transition text-center text-3xl tracking-[0.5em]"
                />
                <button
                  onClick={() => setStep('loggedIn')}
                  className="w-full mt-5 bg-amber-600 hover:bg-amber-500 disabled:bg-stone-700 disabled:text-stone-500 text-white font-semibold py-4 rounded-lg transition text-lg"
                  disabled={pin.length < 4}
                >
                  Bekræft
                </button>
                <button
                  onClick={() => { setStep('phone'); setPin('') }}
                  className="w-full mt-3 text-stone-500 hover:text-stone-300 py-2 transition"
                >
                  ← Brug et andet nummer
                </button>
              </div>
            </div>
          )}

          {step === 'loggedIn' && (
            <div>
              <h1 className="text-2xl font-bold text-amber-500 mb-2">Din konto</h1>
              <p className="text-stone-400 mb-6">Du er logget ind som <span className="text-white">{phone}</span></p>

              <div className="flex flex-wrap gap-3 mb-8">
                <a href="#" className="text-amber-500 hover:text-amber-400 text-sm transition">» Profil</a>
                <a href="#" className="text-amber-500 hover:text-amber-400 text-sm transition">» Skift pinkode</a>
                <button onClick={() => { setStep('phone'); setPhone(''); setPin('') }} className="text-amber-500 hover:text-amber-400 text-sm transition">» Log ud</button>
              </div>

              <div className="bg-stone-900 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Favorit bestillinger</h2>
                <p className="text-stone-500 text-sm mb-3">Side 1 af 0</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-stone-700">
                        <th className="text-left py-2 text-stone-400 font-medium">Navn</th>
                        <th className="text-left py-2 text-stone-400 font-medium">Sidst bestilt</th>
                        <th className="text-left py-2 text-stone-400 font-medium">Betaling</th>
                        <th className="text-left py-2 text-stone-400 font-medium">Vis</th>
                        <th className="text-left py-2 text-stone-400 font-medium">Bestil</th>
                        <th className="text-left py-2 text-stone-400 font-medium">Slet</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={6} className="py-4 text-stone-500 italic">Ingen...</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
