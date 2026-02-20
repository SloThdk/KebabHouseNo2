'use client';

import { useState } from 'react';
import { MenuItem as MenuItemType } from '@/types/menu';
import { useCart } from '@/lib/cartContext';
import ExtrasModal from './ExtrasModal';
import { ExtraItem, hasExtras as checkHasExtras } from '@/lib/itemExtras';

interface MenuItemProps {
  item: MenuItemType;
  category: string;
}

export default function MenuItem({ item, category }: MenuItemProps) {
  const [selectedPrice, setSelectedPrice] = useState(item.prices[0]);
  const [showAdded, setShowAdded] = useState(false);
  const [showExtrasModal, setShowExtrasModal] = useState(false);
  const { addToCart } = useCart();

  const itemHasExtras = checkHasExtras(item.varenr || '');

  const handleAddToCart = () => {
    if (itemHasExtras) {
      setShowExtrasModal(true);
    } else {
      const cartItem = {
        ...item,
        id: `${category}-${item.name}-${Date.now()}`,
        category,
        selectedPrice,
        quantity: 1,
      };

      addToCart(cartItem);
      setShowAdded(true);
      setTimeout(() => setShowAdded(false), 2000);
    }
  };

  const handleExtrasConfirm = (extras: ExtraItem[], removedIncluded: string[]) => {
    const cartItem = {
      ...item,
      id: `${category}-${item.name}-${Date.now()}`,
      category,
      selectedPrice,
      quantity: 1,
      extras: extras.length > 0 ? extras : undefined,
      removedIncluded: removedIncluded.length > 0 ? removedIncluded : undefined,
    };

    addToCart(cartItem);
    setShowExtrasModal(false);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  return (
    <>
      <div className="bg-stone-800/50 rounded-lg p-4 hover:bg-stone-800/70 transition-all group border border-stone-700 hover:border-orange-500/50">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-lg font-semibold text-orange-400 group-hover:text-orange-300">
            {item.name}
          </h4>
          <div className="relative">
            {showAdded && (
              <span className="absolute -top-8 right-0 text-green-400 text-sm animate-fade-in">
                Tilføjet!
              </span>
            )}
          </div>
        </div>

        <p className="text-stone-400 text-sm mb-3">{item.desc}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            {item.prices.length > 1 ? (
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="bg-stone-700 text-stone-300 rounded px-2 py-1 text-sm border border-stone-600 focus:border-orange-500 focus:outline-none"
              >
                {item.prices.map((price) => (
                  <option key={price} value={price}>
                    {price}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-orange-400 font-bold">{item.prices[0]}</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all transform hover:scale-105 text-sm font-semibold shadow-lg"
          >
            Tilføj
          </button>
        </div>
      </div>

      <ExtrasModal
        isOpen={showExtrasModal}
        onClose={() => setShowExtrasModal(false)}
        item={item}
        selectedPrice={selectedPrice}
        onConfirm={handleExtrasConfirm}
      />
    </>
  );
}