'use client';

import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { FaChevronUp, FaChevronDown, FaQuestion, FaTimes, FaHome } from 'react-icons/fa';

type ScrollControlsProps = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  scrollSpeed?: number; // 1-10, default 5
};

export default function ScrollControls({ containerRef, scrollSpeed = 5 }: ScrollControlsProps) {
  const [showNav, setShowNav] = useState(false);
  const [currentScroll, setCurrentScroll] = useState(0);
  const isScrolling = useRef(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close nav when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setShowNav(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Memoize section positions to prevent unnecessary re-renders
  const sectionPositions = useMemo(() => [
    0,   // 0-5% (midpoint)
    10,    // 5-15% (midpoint)
    18.5,  // 15-22% (midpoint)
    26,    // 22-30% (midpoint)
    36,    // 31-41% (midpoint)
    44,  // 42-51% (midpoint)
    62.5,  // 54-71% (midpoint)
    74.5,  // 69-80% (midpoint)
    83.5,  // 79-88% (midpoint)
    90,    // 88-96% (midpoint)
    100   // 94-101% (midpoint)
  ], []);

  // Calculate scroll step based on current position
  const calculateScrollStep = useCallback((direction: 'up' | 'down') => {
    if (!containerRef.current) {
      return 0;
    }
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const maxScroll = scrollHeight - clientHeight;
    const currentPercent = (scrollTop / maxScroll) * 100;
    
    // Find the closest section position
    const currentIndex = sectionPositions.findIndex((pos) => currentPercent < pos) || 1;
    
    if (direction === 'down') {
      const nextPos = sectionPositions[currentIndex] || 100;
      return ((nextPos - currentPercent) / 100) * scrollHeight;
    } 
    
    const prevPos = sectionPositions[currentIndex - 1] || 0;
    return ((currentPercent - prevPos) / 100) * scrollHeight;
  }, [containerRef, sectionPositions]);

  // Update scroll position on scroll
  const handleScroll = useCallback(() => {
    if (!containerRef.current) {
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setCurrentScroll(scrollPercent);
  }, [containerRef]);

  // Add scroll event listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, handleScroll]);

  const scrollBy = useCallback((amount: number) => {
    if (!containerRef.current || isScrolling.current) {
      return;
    }
    
    isScrolling.current = true;
    const start = containerRef.current.scrollTop;
    const startTime = performance.now();
    const duration = 1000 - (scrollSpeed * 80); // Faster with higher scrollSpeed

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smoother easing function
      const ease = (t: number) => {
        if (t < 0.5) {return 2 * t * t;}
        t--;
        return 1 - 2 * t * t;
      };
      
      if (containerRef.current) {
        containerRef.current.scrollTop = start + amount * ease(progress);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        isScrolling.current = false;
      }
    };

    requestAnimationFrame(animateScroll);
  }, [containerRef, scrollSpeed]);

  const handleScrollClick = useCallback((direction: 'up' | 'down') => {
    const step = calculateScrollStep(direction);
    const amount = direction === 'down' ? step : -step;
    scrollBy(amount);
  }, [scrollBy, calculateScrollStep]);

  const isAtBottom = currentScroll >= 95;
  const isAtTop = currentScroll <= 5;

  return (
    <div ref={navRef} className="fixed right-2 sm:right-6 lg:right-8 bottom-4 scale-80 xs:scale-85 sm:scale-90 z-50 flex flex-col items-end gap-3">
      <div 
        className={`flex flex-col gap-10 transition-all duration-300 origin-bottom ${
          showNav 
            ? 'opacity-100 -translate-y-10' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {showNav && (
        <button
          type="button"
          onClick={() => handleScrollClick('up')}
          className={`p-3 rounded-full bg-amber-600/90 text-white shadow-lg hover:bg-amber-700 transition-all transform pointer-events-auto ${
            isAtTop ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
          }`}
          disabled={isAtTop}
          aria-label="Ke atas"
        >
          {isAtBottom ? <FaHome size={20} /> : <FaChevronUp size={20} />}
        </button>
        )}
        {showNav && ( 
        <button
          type="button"
          onClick={() => handleScrollClick('down')}
          className="p-3 rounded-full bg-amber-600/90 text-white shadow-lg hover:bg-amber-700 transition-all transform hover:scale-110 pointer-events-auto"
          aria-label="Ke bawah"
        >
          <FaChevronDown size={20} />
        </button>
        )}
      </div>
      
      <button
        onClick={() => setShowNav(!showNav)}
        className="p-3 rounded-full bg-amber-600/90 text-white shadow-lg transition-all duration-300 transform hover:scale-110 pointer-events-auto"
        aria-label={showNav ? 'Tutup menu' : 'Bantuan navigasi'}
      >
        <div className={`transition-transform duration-300 ${showNav ? 'rotate-180' : 'rotate-0'}`}>
          {showNav ? <FaTimes size={20} /> : <FaQuestion size={20} />}
        </div>
      </button>
    </div>
  );
}
