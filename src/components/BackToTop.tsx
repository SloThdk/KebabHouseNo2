'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const current = window.scrollY;
        // Show only when: scrolled past 500px AND scrolling upward
        if (current > 500 && current < lastScrollY.current) {
          setVisible(true);
        } else if (current < 300 || current > lastScrollY.current) {
          setVisible(false);
        }
        lastScrollY.current = current;
        ticking.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Tilbage til toppen"
      className={`fixed bottom-24 right-6 z-40 bg-stone-700 hover:bg-orange-500 text-white rounded-full p-3 shadow-lg
        transition-all duration-300 hover:scale-110
        ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <ArrowUp size={20} />
    </button>
  );
}
