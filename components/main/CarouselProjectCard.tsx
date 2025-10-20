// components/HoverCarousel.tsx
'use client';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useState, useRef } from 'react';

const items = [

  {
    title: 'Ano POS Mobile Apps',
    image: '/images/job-4.webp',
  },
  {
    title: 'Mercubuana Website Accounting',
    image: '/images/job-5.webp',
  },
  {
    title: 'Platform Notulensia',
    image: '/images/job-3.webp',
  },
  {
    title: 'BackEnd Ismaya+ Apps',
    image: '/images/job-2.webp',
  },
  {
    title: 'Excel Macro Kasir IR Cell',
    image: '/images/job-1.1.webp',
  },
  {
    title: 'Web Kasir IR Cell',
    image: '/images/job-1.webp',
  },
];

export default function HoverCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) {return;}
    setIsDragging(true);
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    setStartX(pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const dragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) {return;}
    e.preventDefault();
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const x = pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  return (
    <div 
      ref={containerRef}
      className="flex overflow-x-auto rounded-2xl gap-4 w-full mt-10 pb-4 select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        WebkitOverflowScrolling: 'touch',
        scrollbarGutter: 'stable',
        paddingBottom: 0
      }}
      onMouseDown={startDrag}
      onMouseMove={dragMove}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchStart={startDrag}
      onTouchMove={dragMove}
      onTouchEnd={endDrag}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={clsx(
            'relative flex-shrink-0 max-h-full h-[520px] overflow-hidden transition-all duration-300 rounded-2xl cursor-pointer',
            hoveredIndex === index
              ? 'w-[50%]'
              : hoveredIndex === 0
                ? 'w-[100px]'
                : 'w-[25%] brightness-75'
          )}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(0)}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 flex items-end">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            {/* Text container */}
            <div className="relative p-6 w-full">
              <h2 className="text-white text-2xl font-bold leading-tight drop-shadow-lg">
                {item.title}
              </h2>
              <div className="w-12 h-1 bg-lime-400 mt-2 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
