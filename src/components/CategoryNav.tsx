'use client';

import { useState, useEffect } from 'react';

interface CategoryNavProps {
  categories: string[];
  activeCategory: string;
  onCategoryClick: (category: string) => void;
}

export default function CategoryNav({ categories, activeCategory, onCategoryClick }: CategoryNavProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className={`hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 z-30 transition-all duration-300 ${
        isSticky ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="bg-stone-800/90 backdrop-blur-sm rounded-r-2xl p-4 max-h-[80vh] overflow-y-auto border-r-2 border-orange-500/50">
          <h3 className="text-orange-400 font-bold mb-4">Kategorier</h3>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category}>
                <button
                  onClick={() => onCategoryClick(category)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                    activeCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'text-stone-300 hover:bg-stone-700 hover:text-orange-400'
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Horizontal Scroll */}
      <div className="lg:hidden sticky top-0 z-30 bg-stone-900/95 backdrop-blur-sm border-b border-orange-500/30">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 p-3 min-w-max">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => onCategoryClick(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-orange-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}