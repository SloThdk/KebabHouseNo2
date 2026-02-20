'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import Link from '@/components/AppLink'
import Image from 'next/image'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Pencil, CreditCard, Smartphone } from 'lucide-react'
import { menuData } from '@/lib/menuData'
import ExtrasModal from '@/components/ExtrasModal'
import Footer from '@/components/Footer'
import { hasExtras } from '@/lib/extras'
import type { ExtraItem } from '@/lib/extras'

const categoryImageMap = menuData.categoryImages as Record<string, string>
const SUNU_ORDER_URL = 'https://pizzakebabhouse.dk/?module=Sunu&page=site&do=order_basket&user_id=343'

function generateTimeSlots() {
  const now = new Date()
  const slots: string[] = []
  const currentHour = now.getHours()
  const currentMin = now.getMinutes()
  // Round up to next 15-min slot
  let startMin = Math.ceil(currentMin / 15) * 15
  let startHour = currentHour
  if (startMin >= 60) { startMin = 0; startHour++ }
  // Add 30 min prep time
  startMin += 30
  if (startMin >= 60) { startMin -= 60; startHour++ }

  for (let h = startHour; h <= 21; h++) {
    for (let m = (h === startHour ? startMin : 0); m < 60; m += 15) {
      if (h === 21 && m > 0) break
      slots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`)
    }
  }
  return slots
}

function generateDates() {
  const dates: { label: string; value: string }[] = []
  const days = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
  for (let i = 0; i < 7; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    const dd = d.getDate().toString().padStart(2, '0')
    const mm = (d.getMonth() + 1).toString().padStart(2, '0')
    const yyyy = d.getFullYear()
    const label = i === 0 ? 'I dag' : `${days[d.getDay()]} d. ${dd}-${mm}-${yyyy}`
    dates.push({ label, value: `${dd}-${mm}-${yyyy}` })
  }
  return dates
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, updateItemExtras, getTotalPrice, clearCart } = useCart()
  const total = getTotalPrice()
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [step, setStep] = useState<'cart' | 'pickup' | 'payment'>('cart')
  const [pickupDate, setPickupDate] = useState('I dag')
  const [pickupTime, setPickupTime] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobilepay'>('card')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [newsletter, setNewsletter] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const [dates, setDates] = useState<{label:string,value:string}[]>([])
  const [timeSlots, setTimeSlots] = useState<string[]>([])
  
  useEffect(() => {
    setDates(generateDates())
    setTimeSlots(generateTimeSlots())
  }, [])
  const editItem = items.find(i => i.id === editingItem)

  if (items.length === 0 && step === 'cart') {
    return (
      <>
      <div className="min-h-screen flex items-center justify-center bg-stone-950 text-white">
        <div className="text-center">
          <ShoppingBag className="mx-auto mb-4 text-stone-600" size={64} />
          <h1 className="text-2xl font-bold mb-2">Din kurv er tom</h1>
          <p className="text-stone-400 mb-6">Tilføj nogle lækre retter fra vores menu</p>
          <Link href="/#menu" className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-3 px-6 rounded-full inline-flex items-center transition">
            <ArrowLeft size={20} className="mr-2" />
            Gå til menu
          </Link>
        </div>
      </div>
      <Footer />
      </>
    )
  }

  return (
    <>
    <div className="min-h-screen bg-stone-950 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress bar */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8 px-2">
          {['Din bestilling', 'Afhentning', 'Betaling'].map((label, i) => {
            const stepIndex = ['cart', 'pickup', 'payment'].indexOf(step)
            const isActive = i <= stepIndex
            return (
              <div key={label} className="flex items-center gap-1 sm:gap-2">
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 ${isActive ? 'bg-amber-500 text-stone-900' : 'bg-stone-700 text-stone-400'}`}>
                    {i + 1}
                  </div>
                  <span className={`text-xs sm:text-sm text-center leading-tight ${isActive ? 'text-white' : 'text-stone-500'}`}>{label}</span>
                </div>
                {i < 2 && <div className={`w-6 sm:w-12 h-0.5 mx-1 shrink-0 ${i < stepIndex ? 'bg-amber-500' : 'bg-stone-700'}`} />}
              </div>
            )
          })}
        </div>

        {/* Step 1: Cart */}
        {step === 'cart' && (
          <div className="bg-stone-800 rounded-xl shadow-xl overflow-hidden">
            <div className="bg-stone-900 px-4 sm:px-6 py-4 border-b border-stone-700">
              <h1 className="text-xl sm:text-2xl font-bold text-white">Din bestilling</h1>
            </div>

            <div className="p-3 sm:p-6 space-y-3">
              {items.map((item) => {
                const catImage = categoryImageMap[item.category]
                const itemCanEdit = hasExtras(item.varenr || '')
                return (
                  <div key={item.id} className="bg-stone-700 rounded-lg p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {catImage && (
                          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0">
                            <Image src={`/images/${catImage}`} alt={item.category} fill className="object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1">
                            <h3 className="text-white font-semibold text-sm sm:text-base leading-tight">{item.name}</h3>
                            <span className="text-stone-400 text-xs shrink-0">{item.priceLabel}</span>
                          </div>
                          {item.removedIncluded && item.removedIncluded.length > 0 && (
                            <p className="text-red-400 text-xs mt-0.5">Uden: {item.removedIncluded.join(', ')}</p>
                          )}
                          {item.extras && item.extras.length > 0 && (
                            <p className="text-green-400 text-xs mt-0.5">Ekstra: {item.extras.map(e => `${e.name} (+${e.price},-)`).join(', ')}</p>
                          )}
                          <div className="flex items-center gap-3 mt-1">
                            {itemCanEdit && (
                              <button onClick={() => setEditingItem(item.id)} className="text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 hover:underline text-xs px-2 py-1 rounded transition cursor-pointer">Tilpas</button>
                            )}
                            <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10 hover:underline text-xs px-2 py-1 rounded transition cursor-pointer">Slet</button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-amber-500 font-bold text-sm whitespace-nowrap">{(item.price * item.quantity).toFixed(2).replace('.', ',')} kr.</span>
                        <div className="flex items-center bg-stone-600 rounded-lg">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-stone-500 rounded-l-lg transition">
                            <Minus size={14} className="text-stone-300" />
                          </button>
                          <span className="px-3 text-white font-semibold text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-stone-500 rounded-r-lg transition">
                            <Plus size={14} className="text-stone-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="bg-stone-900 px-4 sm:px-6 py-4 border-t border-stone-700 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-stone-400 text-sm uppercase tracking-wider">Samlet pris</span>
                <span className="text-xl font-bold text-amber-500">{total.toFixed(2).replace('.', ',')} kr.</span>
              </div>
              <button
                onClick={() => setStep('pickup')}
                className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition text-base sm:text-lg"
              >
                Fortsæt til afhentning →
              </button>
              <div className="flex justify-between">
                <Link href="/#menu" className="text-stone-400 hover:text-stone-300 text-sm transition">← Fortsæt shopping</Link>
                <button onClick={clearCart} className="text-red-400 hover:text-red-300 text-sm transition">Tøm kurv</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Pickup time */}
        {step === 'pickup' && (
          <div className="bg-stone-800 rounded-xl shadow-xl overflow-hidden">
            <div className="bg-stone-900 px-6 py-4 border-b border-stone-700">
              <h1 className="text-2xl font-bold text-amber-500">Tidspunkt for afhentning</h1>
            </div>
            <div className="p-8">
              <div className="max-w-md mx-auto space-y-6">
                <div>
                  <label className="block text-stone-400 text-sm mb-2">Dato</label>
                  <select
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-stone-700 border border-stone-600 rounded-lg px-4 py-3 text-white outline-none focus:border-amber-500 transition"
                  >
                    {dates.map(d => (
                      <option key={d.value} value={d.label}>{d.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-stone-400 text-sm mb-2">Tidspunkt</label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full bg-stone-700 border border-stone-600 rounded-lg px-4 py-3 text-white outline-none focus:border-amber-500 transition"
                  >
                    <option value="">Vælg tidspunkt</option>
                    {timeSlots.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setStep('cart')} className="flex-1 bg-stone-700 hover:bg-stone-600 text-white font-bold py-3 rounded-lg transition">
                    Tilbage
                  </button>
                  <button
                    onClick={() => pickupTime && setStep('payment')}
                    disabled={!pickupTime}
                    className="flex-1 bg-green-700 hover:bg-green-600 disabled:bg-stone-600 disabled:text-stone-400 text-white font-bold py-3 rounded-lg transition"
                  >
                    Næste
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment & Info */}
        {step === 'payment' && (
          <div className="bg-stone-800 rounded-xl shadow-xl overflow-hidden">
            <div className="bg-stone-900 px-6 py-4 border-b border-stone-700">
              <h1 className="text-2xl font-bold text-amber-500">Betaling</h1>
            </div>
            <div className="p-8">
              {/* Payment method */}
              <div className="flex gap-4 justify-center mb-8">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center gap-2 px-8 py-4 rounded-xl border-2 transition ${paymentMethod === 'card' ? 'border-amber-500 bg-stone-700' : 'border-stone-600 bg-stone-800 hover:border-stone-500'}`}
                >
                  <CreditCard size={28} className={paymentMethod === 'card' ? 'text-amber-500' : 'text-stone-400'} />
                  <span className={`font-semibold ${paymentMethod === 'card' ? 'text-white' : 'text-stone-400'}`}>Kortbetaling</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('mobilepay')}
                  className={`flex flex-col items-center gap-2 px-8 py-4 rounded-xl border-2 transition ${paymentMethod === 'mobilepay' ? 'border-blue-500 bg-stone-700' : 'border-stone-600 bg-stone-800 hover:border-stone-500'}`}
                >
                  <img src="/mobilepay.png" alt="MobilePay" className="h-10 object-contain" />
                  <span className={`font-semibold ${paymentMethod === 'mobilepay' ? 'text-white' : 'text-stone-400'}`}>MobilePay</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Personal info */}
                <div>
                  <h2 className="text-xl font-bold text-amber-500 mb-4">Dine info</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-stone-400 text-sm mb-1">Navn:</label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Dit navn"
                        className="w-full bg-stone-700 border border-stone-600 rounded-lg px-4 py-2.5 text-white placeholder-stone-500 outline-none focus:border-amber-500 transition" />
                    </div>
                    <div>
                      <label className="block text-stone-400 text-sm mb-1">E-mail:</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="din@email.dk"
                        className="w-full bg-stone-700 border border-stone-600 rounded-lg px-4 py-2.5 text-white placeholder-stone-500 outline-none focus:border-amber-500 transition" />
                    </div>
                    <div>
                      <label className="block text-stone-400 text-sm mb-1">Mobil:</label>
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Dit mobilnummer"
                        className="w-full bg-stone-700 border border-stone-600 rounded-lg px-4 py-2.5 text-white placeholder-stone-500 outline-none focus:border-amber-500 transition" />
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div>
                  <h2 className="text-xl font-bold text-amber-500 mb-4">Bemærkning</h2>
                  <textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="Evt. bemærkninger til din bestilling..."
                    rows={5}
                    className="w-full bg-stone-700 border border-stone-600 rounded-lg px-4 py-2.5 text-white placeholder-stone-500 outline-none focus:border-amber-500 transition resize-none"
                  />
                </div>
              </div>

              {/* Newsletter & Terms */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4 bg-stone-700/50 rounded-lg px-4 py-3">
                  <span className="text-stone-300 text-sm">Tilmeld nyhedsbrev:</span>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="newsletter" checked={newsletter} onChange={() => setNewsletter(true)} className="accent-amber-500" />
                    <span className="text-stone-300 text-sm">Ja</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="newsletter" checked={!newsletter} onChange={() => setNewsletter(false)} className="accent-amber-500" />
                    <span className="text-stone-300 text-sm">Nej</span>
                  </label>
                </div>

                <label className="flex items-center gap-3 bg-amber-900/20 border border-amber-800/30 rounded-lg px-4 py-3 cursor-pointer">
                  <input type="checkbox" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} className="accent-amber-500 w-4 h-4" />
                  <span className="text-stone-300 text-sm">
                    Jeg har læst og accepterer <a href="/betingelser" target="_blank" className="text-amber-500 hover:underline">betingelserne</a>
                  </span>
                </label>
              </div>

              {/* Order summary */}
              <div className="mt-6 bg-stone-900 rounded-lg p-4">
                <div className="flex justify-between text-stone-400 text-sm mb-1">
                  <span>Afhentning: {pickupDate} kl. {pickupTime}</span>
                  <span>{items.length} {items.length === 1 ? 'vare' : 'varer'}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-stone-700">
                  <span className="text-stone-400 text-sm uppercase tracking-wider">Samlet pris</span>
                  <span className="text-xl font-bold text-amber-500">{total.toFixed(2).replace('.', ',')} kr.</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep('pickup')} className="flex-1 bg-stone-700 hover:bg-stone-600 text-white font-bold py-3 rounded-lg transition">
                  Tilbage
                </button>
                <a
                  href={acceptTerms && name && phone ? SUNU_ORDER_URL : '#'}
                  onClick={(e) => {
                    if (!acceptTerms || !name || !phone) {
                      e.preventDefault()
                      alert('Udfyld venligst alle felter og accepter betingelserne')
                    }
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 text-center font-bold py-3 rounded-lg transition text-lg ${acceptTerms && name && phone ? 'bg-green-700 hover:bg-green-600 text-white' : 'bg-stone-600 text-stone-400 cursor-not-allowed'}`}
                >
                  Bekræft
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer />

    {editItem && editItem.varenr && (
      <ExtrasModal
        isOpen={true}
        onClose={() => setEditingItem(null)}
        item={{ name: editItem.name, desc: '', varenr: editItem.varenr, prices: [editItem.priceLabel] }}
        selectedPrice={editItem.priceLabel}
        onConfirm={(extras: ExtraItem[], removedIncluded: string[]) => {
          updateItemExtras(editItem.id, extras, removedIncluded)
          setEditingItem(null)
        }}
        initialExtras={editItem.extras}
        initialRemovedIncluded={editItem.removedIncluded}
      />
    )}
    </>
  )
}
