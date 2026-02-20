'use client';

import { useState, useEffect, useRef } from 'react';
import { MenuData } from '@/types/menu';
import MenuItem from './MenuItem';
import CategoryNav from './CategoryNav';
import Image from 'next/image';

interface MenuProps {
  menuData: MenuData;
}

export default function Menu({ menuData }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const categories = Object.keys(menuData.menu);

  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(categories[0]);
      setExpandedCategories(new Set([categories[0]]));
    }
  }, []);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);

    // Expand/collapse category
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });

    // Scroll to category
    const element = categoryRefs.current[category];
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentCategory = activeCategory;

      for (const category of categories) {
        const element = categoryRefs.current[category];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentCategory = category;
            break;
          }
        }
      }

      if (currentCategory !== activeCategory) {
        setActiveCategory(currentCategory);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategory, categories]);

  return (
    <section id="menu" className="relative min-h-screen py-16">
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />

      <div className="max-w-7xl mx-auto px-4 lg:pl-48">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
            Vores Menu
          </h2>
          <p className="text-stone-400 text-lg">
            Udforsk vores store udvalg af lækre retter
          </p>
        </div>

        <div className="space-y-8">
          {categories.map((category) => {
            const items = menuData.menu[category];
            const isExpanded = expandedCategories.has(category);
            const categoryImage = menuData.categoryImages[category];

            return (
              <div
                key={category}
                ref={el => {categoryRefs.current[category] = el}}
                className="bg-stone-800/30 rounded-xl overflow-hidden border border-stone-700/50 hover:border-orange-500/30 transition-all"
              >
                <button
                  onClick={() => handleCategoryClick(category)}
                  className="w-full flex items-center justify-between p-6 hover:bg-stone-800/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    {categoryImage && (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={`/images/${categoryImage}`}
                          alt={category}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="text-left">
                      <h3 className="text-2xl font-bold text-orange-400 group-hover:text-orange-300">
                        {category}
                      </h3>
                      <p className="text-stone-400 text-sm">
                        {items.length} retter
                      </p>
                    </div>
                  </div>

                  <svg
                    className={`w-6 h-6 text-orange-400 transform transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div className={`overflow-hidden transition-all duration-500 ${
                  isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item, index) => (
                      <MenuItem
                        key={`${category}-${item.name}-${index}`}
                        item={item}
                        category={category}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}