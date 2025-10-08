'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Wedding3DPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScrollY(prev => Math.max(0, prev + e.deltaY * 0.1)); // Manual control scroll
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const door1Transform = `scale(${1.5 + scrollY * 0.1}) translateY(-${scrollY * 3}px)`;
  const door2Transform = `scale(${1 + scrollY * 0.05}) translateY(-${scrollY * 2}px)`;
  const door3Transform = `scale(${0.75 + scrollY * 0.025}) translateY(-${scrollY * 1}px)`;

  return (
    <div className="h-screen bg-dark overflow-hidden fixed inset-0">
      <div className="fixed inset-0 flex items-center justify-center">
        <div
          className="absolute w-full h-full border border-red-500 z-3"
          style={{
            transform: door1Transform,
          }}
        >
          <Image
            src="/images/wedding/frame/Door Wedding.png"
            alt="Door Wedding"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="absolute w-full h-full z-2" style={{ transform: door2Transform }}>
          <div className="absolute w-full h-full z-2 -bottom-10 ">
            <Image
              src="/images/wedding/frame/Door Wedding.png"
              alt="Door Wedding"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute w-1/3 h-1/3 z-2 left-0 bottom-30">
            <Image
              src="/images/wedding/frame/table-flower.png"
              alt="Door Wedding"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute w-1/3 h-1/3 z-2 -right-10 bottom-30">
            <Image
              src="/images/wedding/frame/table-flower.png"
              alt="Door Wedding"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <div
          className="absolute w-full h-full z-1 -bottom-15"
          style={{
            transform: door3Transform,
          }}
        >
          <Image
            src="/images/wedding/frame/Door Wedding.png"
            alt="Door Wedding"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}