'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowLeft, Plus, Check, Search, X } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { menuData } from '@/lib/menuData'
import ExtrasModal from './ExtrasModal'
import { hasExtras, ExtraItem } from '@/lib/extras'

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const [extrasModalItem, setExtrasModalItem] = useState<{item: any, category: string, priceIndex: number} | null>(null)
  const { addItem } = useCart()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (selectedCategory !== null) {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [selectedCategory])

  const normalize = (s: string) =>
    s.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/ø/g, 'o').replace(/å/g, 'a').replace(/æ/g, 'ae')
      .replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ä/g, 'a')
      .replace(/½/g, '1/2')

  const handleAddToCart = (category: string, item: any, priceIndex: number = 0) => {
    const varenr = (item as any).varenr || ''
    if (hasExtras(varenr)) {
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
        category,
        varenr: (item as any).varenr || '',
        extras,
        removedIncluded,
      })
      setAddedItems(prev => new Set(prev).add(`${category}-${(item as any).varenr || item.name}-${priceIndex}`))
      setTimeout(() => {
        setAddedItems(prev => {
          const next = new Set(prev)
          next.delete(`${category}-${(item as any).varenr || item.name}-${priceIndex}`)
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

  const categories = Object.keys(menuData.menu)

  // Search mode: show matching items across all categories
  const isSearching = searchQuery.length > 0
  const searchResults = isSearching
    ? categories.flatMap(cat =>
        menuData.menu[cat as keyof typeof menuData.menu]
          .filter(item =>
            normalize(item.name).includes(normalize(searchQuery)) ||
            normalize(item.desc).includes(normalize(searchQuery)) ||
            normalize(cat).includes(normalize(searchQuery))
          )
          .map(item => ({ item, category: cat }))
      )
    : []

  // Category detail view
  const categoryItems = selectedCategory
    ? menuData.menu[selectedCategory as keyof typeof menuData.menu]
    : []
  const categoryImage = selectedCategory
    ? menuData.categoryImages[selectedCategory as keyof typeof menuData.categoryImages]
    : null

  return (
    <section id="menu" ref={sectionRef} className="py-16 bg-stone-950">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-4">Vores Menu</h2>
          <p className="text-stone-400 mb-8">Autentisk mad med de bedste råvarer</p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input
              type="text"
              placeholder="Søg i menuen..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setSelectedCategory(null) }}
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-stone-800 text-white placeholder-stone-400 border border-stone-700 focus:border-amber-500 focus:outline-none transition"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white">
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* SEARCH RESULTS */}
        {isSearching && (
          <div className="space-y-3">
            {searchResults.length === 0 ? (
              <p className="text-center text-stone-400 py-12">Ingen resultater for &ldquo;{searchQuery}&rdquo;</p>
            ) : (
              searchResults.map(({ item, category }, index) => (
                <div key={`${category}-${item.name}-${index}`} className="bg-stone-800 rounded-xl p-4 border border-stone-700">
                  <p className="text-xs text-amber-500/70 font-medium mb-1 uppercase tracking-wide">{category}</p>
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base font-semibold text-white">{item.name}</h4>
                      {item.desc && <p className="text-stone-400 text-sm mt-1">{item.desc}</p>}
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      {item.prices.map((price, priceIndex) => (
                        <div key={priceIndex} className="flex items-center gap-2">
                          <span className="text-amber-500 font-bold text-sm whitespace-nowrap">{price}</span>
                          <button
                            onClick={() => handleAddToCart(category, item, priceIndex)}
                            className={`${addedItems.has(`${category}-${(item as any).varenr || item.name}-${priceIndex}`) ? 'bg-green-500 scale-125' : 'bg-amber-500 hover:bg-amber-600 hover:scale-110'} text-stone-900 p-1.5 rounded-full transition-all duration-300`}
                          >
                            {addedItems.has(`${category}-${(item as any).varenr || item.name}-${priceIndex}`) ? <Check size={15} /> : <Plus size={15} />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* CATEGORY GRID */}
        {!isSearching && !selectedCategory && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {categories.map((category) => {
              const items = menuData.menu[category as keyof typeof menuData.menu]
              const img = menuData.categoryImages[category as keyof typeof menuData.categoryImages]
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-800 shadow-lg hover:shadow-amber-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-left border border-stone-700/50 hover:border-amber-500/40"
                >
                  {img ? (
                    <Image
                      src={`/images/${img}`}
                      alt={category}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-700 to-stone-800" />
                  )}
                  {/* dark gradient overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <h3 className="text-white font-bold text-sm sm:text-base leading-tight line-clamp-2">{category}</h3>
                    <p className="text-amber-400 text-xs sm:text-sm mt-0.5 font-medium">{items.length} retter</p>
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* CATEGORY DETAIL VIEW */}
        {!isSearching && selectedCategory && (
          <div>
            {/* Back button + banner */}
            <div className="mb-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition mb-4 group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Alle kategorier</span>
              </button>

              {/* Category banner */}
              <div className="relative h-36 sm:h-48 rounded-2xl overflow-hidden">
                {categoryImage ? (
                  <Image src={`/images/${categoryImage}`} alt={selectedCategory} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-r from-stone-800 to-stone-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
                <div className="absolute bottom-0 left-0 p-5 sm:p-8">
                  <h3 className="text-2xl sm:text-4xl font-bold text-white leading-tight">{selectedCategory}</h3>
                  <p className="text-amber-400 font-medium mt-1">{categoryItems.length} retter</p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {categoryItems.map((item, index) => (
                <div
                  key={`${selectedCategory}-${item.name}-${index}`}
                  className="bg-stone-800 rounded-xl p-4 sm:p-5 border border-stone-700/50 hover:border-stone-600 transition"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base sm:text-lg font-semibold text-white leading-tight">{item.name}</h4>
                      {(item as any).varenr && (
                        <span className="text-xs text-stone-500 mt-0.5 block">{(item as any).varenr}</span>
                      )}
                      {item.desc && (
                        <p className="text-stone-400 text-sm mt-2 leading-relaxed">{item.desc}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      {item.prices.map((price, priceIndex) => (
                        <div key={priceIndex} className="flex items-center gap-2">
                          <span className="text-amber-500 font-bold text-sm sm:text-base whitespace-nowrap">{price}</span>
                          <button
                            onClick={() => handleAddToCart(selectedCategory, item, priceIndex)}
                            className={`${addedItems.has(`${selectedCategory}-${(item as any).varenr || item.name}-${priceIndex}`) ? 'bg-green-500 scale-125' : 'bg-amber-500 hover:bg-amber-600 hover:scale-110'} text-stone-900 p-2 rounded-full transition-all duration-300 cursor-pointer`}
                            aria-label={`Tilføj ${item.name} til kurv`}
                          >
                            {addedItems.has(`${selectedCategory}-${(item as any).varenr || item.name}-${priceIndex}`) ? <Check size={16} /> : <Plus size={16} />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
