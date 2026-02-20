'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type CartItem = {
  id: string
  name: string
  price: number
  priceLabel: string
  quantity: number
  category: string
  varenr?: string
  extras?: Array<{ name: string; price: number }>
  removedIncluded?: string[]
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  updateItemExtras: (id: string, extras: Array<{ name: string; price: number }>, removedIncluded: string[]) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items, mounted])

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      // Create a unique key based on item properties including extras
      const newItemKey = JSON.stringify({
        name: newItem.name,
        category: newItem.category,
        priceLabel: newItem.priceLabel,
        extras: newItem.extras?.map(e => e.name).sort(),
        removedIncluded: newItem.removedIncluded?.sort()
      })

      const existing = prev.find(item => {
        const itemKey = JSON.stringify({
          name: item.name,
          category: item.category,
          priceLabel: item.priceLabel,
          extras: item.extras?.map(e => e.name).sort(),
          removedIncluded: item.removedIncluded?.sort()
        })
        return itemKey === newItemKey
      })

      if (existing) {
        return prev.map(item => {
          const itemKey = JSON.stringify({
            name: item.name,
            category: item.category,
            priceLabel: item.priceLabel,
            extras: item.extras?.map(e => e.name).sort(),
            removedIncluded: item.removedIncluded?.sort()
          })
          return itemKey === newItemKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        })
      }
      return [...prev, { ...newItem, quantity: 1 }]
    })
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const updateItemExtras = (id: string, extras: Array<{ name: string; price: number }>, removedIncluded: string[]) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, extras: extras.length > 0 ? extras : undefined, removedIncluded: removedIncluded.length > 0 ? removedIncluded : undefined } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      let itemTotal = item.price * item.quantity;

      // Add extras prices if they exist
      if (item.extras && item.extras.length > 0) {
        const extrasTotal = item.extras.reduce((sum, extra) => sum + (extra.price || 0), 0);
        itemTotal += extrasTotal * item.quantity;
      }

      return total + itemTotal;
    }, 0)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateItemExtras,
        clearCart,
        getTotalPrice,
        getTotalItems
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}