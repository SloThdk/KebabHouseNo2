'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, Plus, Check } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { menuData } from '@/lib/menuData'
import ExtrasModal from './ExtrasModal'
import { hasExtras, getItemExtras, ExtraItem } from '@/lib/itemExtras'

export default function MenuSection() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const [extrasModalItem, setExtrasModalItem] = useState<{item: any, category: string, priceIndex: number} | null>(null)
  const { addItem } = useCart()

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(category)) {
        newSet.delete(category)
      } else {
        newSet.add(category)
      }
      return newSet
    })
  }

  const handleAddToCart = (category: string, item: any, priceIndex: number = 0) => {
    const varenr = (item as any).varenr || ''
    const itemHasExtras = hasExtras(varenr)
    console.log('[MenuSection] handleAddToCart', item.name, 'varenr:', varenr, 'hasExtras:', itemHasExtras)
    if (itemHasExtras) {
      setExtrasModalItem({ item, category, priceIndex })
      return
    }
    addItemDirectly(category, item, priceIndex)
  }

  const addItemDirectly = (category: string, item: any, priceIndex: number, extras?: ExtraItem[], removedIncluded?: string[]) => {
    const priceText = item.prices[priceIndex]
    const priceMatch = priceText.match(/(\d+),(\d{2})\s*kr/)
    if (priceMatch) {
      const price = parseFloat(`${priceMatch[1]}.${priceMatch[2]}`)
      const extrasTotal = extras ? extras.reduce((sum, e) => sum + (e.price || 0), 0) : 0
      const itemId = `${category}-${item.name}-${priceIndex}-${Date.now()}`
      addItem({
        id: itemId,
        name: item.name,
        price: price + extrasTotal,
        priceLabel: priceText,
        category: category,
        varenr: (item as any).varenr || '',
        extras: extras,
        removedIncluded: removedIncluded,
      })
      setAddedItems(prev => new Set(prev).add(`${category}-${item.name}-${priceIndex}`))
      setTimeout(() => {
        setAddedItems(prev => {
          const next = new Set(prev)
          next.delete(`${category}-${item.name}-${priceIndex}`)
          return next
        })
      }, 1000)
    }
  }

  const handleExtrasConfirm = (extras: ExtraItem[], removedIncluded: string[]) => {
    if (extrasModalItem) {
      addItemDirectly(
        extrasModalItem.category,
        extrasModalItem.item,
        extrasModalItem.priceIndex,
        extras.length > 0 ? extras : undefined,
        removedIncluded.length > 0 ? removedIncluded : undefined
      )
      setExtrasModalItem(null)
    }
  }

  // Normalize: strip accents + common Danish substitutions so "pitabrod" finds "PITABRØD"
  const normalize = (s: string) =>
    s.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // strip combining accents
      .replace(/ø/g, 'o').replace(/å/g, 'a').replace(/æ/g, 'ae')
      .replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ä/g, 'a')
      .replace(/½/g, '1/2')

  const categories = Object.keys(menuData.menu)
  const filteredCategories = searchQuery
    ? categories.filter(cat =>
        normalize(cat).includes(normalize(searchQuery)) ||
        menuData.menu[cat as keyof typeof menuData.menu].some(item =>
          normalize(item.name).includes(normalize(searchQuery)) ||
          normalize(item.desc).includes(normalize(searchQuery))
        )
      )
    : categories

  return (
    <section id="menu" className="py-16 bg-stone-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Vores Menu</h2>
          <p className="text-stone-400 mb-8">Autentisk mad med de bedste råvarer</p>

          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Søg i menuen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-stone-800 text-white placeholder-stone-400 border border-stone-700 focus:border-amber-500 focus:outline-none transition"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredCategories.map((category) => {
            const items = menuData.menu[category as keyof typeof menuData.menu]
            const isExpanded = expandedCategories.has(category)
            const categoryImage = menuData.categoryImages[category as keyof typeof menuData.categoryImages]

            const filteredItems = searchQuery
              ? items.filter(item =>
                  normalize(item.name).includes(normalize(searchQuery)) ||
                  normalize(item.desc).includes(normalize(searchQuery))
                )
              : items

            if (searchQuery && filteredItems.length === 0) return null

            return (
              <div key={category} className="bg-stone-800 rounded-xl overflow-hidden shadow-lg">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-stone-700 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    {categoryImage && (
                      <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={`/images/${categoryImage}`}
                          alt={category}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="text-left min-w-0">
                      <h3 className="text-base sm:text-xl font-semibold text-amber-500 leading-tight">{category}</h3>
                      <p className="text-sm text-stone-400">{filteredItems.length} retter</p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="text-amber-500" size={24} />
                  ) : (
                    <ChevronDown className="text-amber-500" size={24} />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-2 sm:px-6 pb-4">
                    <div className="grid gap-3 mt-4">
                      {filteredItems.map((item, index) => (
                        <div
                          key={`${category}-${item.name}-${index}`}
                          className="bg-stone-700 rounded-lg p-3 sm:p-4 hover:bg-stone-600 transition cursor-pointer"
                        >
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm sm:text-base font-semibold text-white leading-tight">{item.name}</h4>
                              {(item as any).varenr && (
                                <span className="text-xs text-stone-500">{(item as any).varenr}</span>
                              )}
                            </div>
                            <div className="flex flex-col items-end gap-1.5 shrink-0 max-w-[45%]">
                              {item.prices.map((price, priceIndex) => (
                                <div key={priceIndex} className="flex items-center gap-1.5 w-full justify-end">
                                  <span className="text-amber-500 font-bold text-xs sm:text-sm whitespace-nowrap">{price}</span>
                                  <button
                                    onClick={() => handleAddToCart(category, item, priceIndex)}
                                    className={`${addedItems.has(`${category}-${item.name}-${priceIndex}`) ? 'bg-green-500 scale-125' : 'bg-amber-500 hover:bg-amber-600 hover:scale-110'} text-stone-900 p-1.5 sm:p-2 rounded-full transition-all duration-300 cursor-pointer shrink-0`}
                                    aria-label={`Tilføj ${item.name} til kurv`}
                                  >
                                    {addedItems.has(`${category}-${item.name}-${priceIndex}`) ? <Check size={16} /> : <Plus size={16} />}
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                          {item.desc && (
                            <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {filteredCategories.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-stone-400">Ingen resultater fundet for "{searchQuery}"</p>
          </div>
        )}
      </div>

      {extrasModalItem && (
        <ExtrasModal
          isOpen={true}
          onClose={() => setExtrasModalItem(null)}
          item={{
            name: extrasModalItem.item.name,
            desc: extrasModalItem.item.desc,
            varenr: extrasModalItem.item.varenr || '',
            prices: extrasModalItem.item.prices,
          }}
          selectedPrice={extrasModalItem.item.prices[extrasModalItem.priceIndex]}
          onConfirm={handleExtrasConfirm}
        />
      )}
    </section>
  )
}