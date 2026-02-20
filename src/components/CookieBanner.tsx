'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookies-accepted')
    if (!accepted) setShow(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookies-accepted', 'true')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-stone-900 border border-stone-700 rounded-xl p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-stone-300 text-sm">
            🍪 Vi bruger cookies for at give dig den bedste oplevelse på vores hjemmeside. 
            Ved at fortsætte accepterer du vores brug af cookies.{' '}
            <a href="/privatliv" className="text-amber-500 hover:underline">Læs mere</a>
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={accept}
            className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-6 py-2 rounded-lg transition text-sm"
          >
            Accepter
          </button>
          <button
            onClick={accept}
            className="text-stone-400 hover:text-stone-200 px-4 py-2 rounded-lg transition text-sm"
          >
            Afvis
          </button>
        </div>
      </div>
    </div>
  )
}
