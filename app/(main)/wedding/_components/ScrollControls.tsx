'use client';

import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

type ScrollControlsProps = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  scrollSpeed?: number; // 1-10, default 5
};

export default function ScrollControls({ containerRef, scrollSpeed = 5 }: ScrollControlsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentScroll, setCurrentScroll] = useState(0);
  const isScrolling = useRef(false);

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
    89,    // 88-96% (midpoint)
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
    // Convert scrollSpeed (1-10) to duration (1000ms to 200ms)
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

  // Check if buttons should be visible
  const showUpButton = currentScroll > 5; // Don't show at very top
  const showDownButton = currentScroll < 95; // Don't show at very bottom

  return (
    <div 
      className={`fixed pointer-events-auto right-2 bottom-1/4 z-50 flex flex-col space-y-3 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-70 hover:opacity-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showUpButton && (
        <button
          type="button"
          onClick={() => handleScrollClick('up')}
          className="p-2 rounded-full bg-amber-600 text-white/80 shadow-lg hover:bg-amber-700 transition-colors"
          aria-label="Scroll up"
        >
          <FaChevronUp size={20} />
        </button>
      )}
      {showDownButton && (
        <button
          type="button"
          onClick={() => handleScrollClick('down')}
          className="p-2 rounded-full bg-amber-600 text-white/80 shadow-lg hover:bg-amber-700 transition-colors"
          aria-label="Scroll down"
        >
          <FaChevronDown size={20} />
        </button>
      )}
    </div>
  );
}
