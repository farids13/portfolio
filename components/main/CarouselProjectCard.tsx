// components/HoverCarousel.tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const items = [
  {
    title: 'Plumbing Company',
    image: '/images/hero.png', // ganti dengan path gambar kamu
  },
  {
    title: 'Drink Product',
    image: '/images/carousel-electrical-engginering.png',
  },
  {
    title: 'Architecture',
    image: '/images/building.jpg',
  },
];

export default function HoverCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <div className="flex items-center justify-between w-full gap-4 mt-10">
      {items.map((item, index) => (
        <div
          key={index}
          className={clsx(
            'relative flex-shrink-0 h-[400px] overflow-hidden transition-all duration-300 rounded-2xl cursor-pointer',
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
            className="object-cover transition-all duration-300"
          />
          <div className="absolute bottom-4 left-4 text-white text-xl font-semibold drop-shadow-lg">
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
}
