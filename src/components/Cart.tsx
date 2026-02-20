'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cartContext';

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, totalItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalPrice = items.reduce((sum, item) => {
    const priceMatch = item.selectedPrice.match(/([\d]+[.,]\d{2})\s*kr/);
    const price = priceMatch ? parseFloat(priceMatch[1].replace(',', '.')) : 0;
    return sum + price * item.quantity;
  }, 0);

  if (totalItems === 0 && !isOpen) {
    return null;
  }

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-full p-4 shadow-2xl hover:from-orange-600 hover:to-amber-700 transition-all transform hover:scale-110 float-animation"
      >
        <div className="relative">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce-in">
              {totalItems}
            </span>
          )}
        </div>
      </button>

      {/* Cart Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-stone-900 shadow-2xl transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Din Kurv</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-stone-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-24 h-24 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-stone-400">Din kurv er tom</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-stone-800 rounded-lg p-4 border border-stone-700">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-orange-400">{item.name}</h4>
                        <p className="text-sm text-stone-400">{item.category}</p>
                        <p className="text-sm text-stone-300 mt-1">{item.selectedPrice}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-stone-700 hover:bg-stone-600 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-10 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-stone-700 hover:bg-stone-600 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-stone-700 p-4 space-y-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-orange-400">{totalPrice.toFixed(2)} kr.</span>
              </div>

              <button
                onClick={() => {
                  alert('Bestillingsfunktion kommer snart!');
                }}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all"
              >
                Gå til Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full py-2 bg-stone-700 text-stone-300 rounded-lg hover:bg-stone-600 transition-colors text-sm"
              >
                Tøm Kurv
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}