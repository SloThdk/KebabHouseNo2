'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { MenuItem } from '@/types/menu';
import { ExtraItem, ItemExtrasData, getItemExtras } from '@/lib/itemExtras';

interface ExtrasModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem;
  selectedPrice: string;
  onConfirm: (extras: ExtraItem[], removedIncluded: string[]) => void;
  initialExtras?: Array<{ name: string; price: number }>;
  initialRemovedIncluded?: string[];
}

export default function ExtrasModal({
  isOpen,
  onClose,
  item,
  selectedPrice,
  onConfirm,
  initialExtras,
  initialRemovedIncluded,
}: ExtrasModalProps) {
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());
  const [removedIncluded, setRemovedIncluded] = useState<Set<string>>(new Set());
  const [totalPrice, setTotalPrice] = useState(0);

  // Get per-item extras data using varenr
  const itemData: ItemExtrasData = getItemExtras(item.varenr || '');
  const includedToppings = itemData?.included || [];
  const availableExtras = itemData?.extras || [];

  // Reset state when item changes, or pre-populate from initial values
  useEffect(() => {
    if (initialExtras && initialExtras.length > 0) {
      setSelectedExtras(new Set(initialExtras.map(e => e.name)));
    } else {
      setSelectedExtras(new Set());
    }
    if (initialRemovedIncluded && initialRemovedIncluded.length > 0) {
      setRemovedIncluded(new Set(initialRemovedIncluded));
    } else {
      setRemovedIncluded(new Set());
    }
  }, [item.name]);

  useEffect(() => {
    // Extract the last number before "kr." — handles "Familie 40x40 185,00 kr." correctly
    const priceMatch = selectedPrice.match(/([\d]+[.,]\d{2})\s*kr/);
    const basePrice = priceMatch ? parseFloat(priceMatch[1].replace(',', '.')) : 0;
    const extrasPrice = availableExtras
      .filter(extra => selectedExtras.has(extra.name))
      .reduce((sum, extra) => sum + (extra.price || 0), 0);
    setTotalPrice(basePrice + extrasPrice);
  }, [selectedExtras, selectedPrice, availableExtras]);

  const handleExtraToggle = (extraName: string) => {
    setSelectedExtras(prev => {
      const newSet = new Set(prev);
      if (newSet.has(extraName)) newSet.delete(extraName);
      else newSet.add(extraName);
      return newSet;
    });
  };

  const handleIncludedToggle = (includedName: string) => {
    setRemovedIncluded(prev => {
      const newSet = new Set(prev);
      if (newSet.has(includedName)) newSet.delete(includedName);
      else newSet.add(includedName);
      return newSet;
    });
  };

  const handleConfirm = () => {
    const selectedExtraItems = availableExtras.filter(extra =>
      selectedExtras.has(extra.name)
    );
    onConfirm(selectedExtraItems, Array.from(removedIncluded));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative bg-stone-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-stone-800 px-4 sm:px-6 py-4 border-b border-stone-700 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-xl font-bold text-orange-400 leading-tight">{item.name}</h2>
              <span className="text-xs sm:text-sm bg-stone-700 text-stone-300 px-2 py-0.5 rounded shrink-0">
                {selectedPrice.replace(/[\d]+[.,]\d{2}\s*kr\.?/, '').replace(/\.$/, '').trim() || 'Standard'}
              </span>
            </div>
            {item.desc && <p className="text-stone-400 text-sm mt-1 leading-relaxed">{item.desc}</p>}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-700 rounded-lg transition">
            <X size={24} className="text-stone-400" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          {/* Included toppings */}
          {includedToppings.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-stone-200 mb-3">
                Allerede inkluderet tilbehør:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {includedToppings.map((topping) => (
                  <label key={topping} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-stone-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!removedIncluded.has(topping)}
                      onChange={() => handleIncludedToggle(topping)}
                      className="w-4 h-4 text-blue-500 bg-stone-700 border-stone-600 rounded focus:ring-blue-500 accent-blue-500"
                    />
                    <span className="text-stone-300 text-sm">{topping}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Extra toppings */}
          {availableExtras.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-stone-200 mb-3">
                Ekstra tilbehør:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availableExtras.map((extra) => (
                  <label key={extra.name} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-stone-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedExtras.has(extra.name)}
                      onChange={() => handleExtraToggle(extra.name)}
                      className="w-4 h-4 text-orange-500 bg-stone-700 border-stone-600 rounded focus:ring-orange-500 accent-orange-500"
                    />
                    <span className="text-stone-300 text-sm">
                      {extra.name}
                      {extra.price > 0 && (
                        <span className="text-orange-400 ml-1">{extra.price},-</span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-800 px-6 py-5 border-t border-stone-700 space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-stone-400 text-sm uppercase tracking-wider">Samlet pris</span>
            <span className="text-lg font-bold text-orange-400">{totalPrice.toFixed(0)},- kr.</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleConfirm}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition shadow-lg"
            >
              Læg i kurv
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-stone-700 hover:bg-stone-600 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Annuller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
