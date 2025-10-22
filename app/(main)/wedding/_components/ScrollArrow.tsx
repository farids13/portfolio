'use client';

import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface ScrollArrowProps {
  onClick: () => void;
  className?: string;
}

export default function ScrollArrow({ onClick, className = '' }: ScrollArrowProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-lg transition-all duration-300 ${
        isHovered ? 'scale-110' : 'scale-100'
      } ${className}`}
      aria-label="Scroll down"
    >
      <FaChevronDown 
        className="w-8 h-8 text-amber-600 animate-bounce" 
      />
    </button>
  );
}
