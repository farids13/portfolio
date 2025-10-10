'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import WelcomeSection from '../3d-demo/_components/WelcomeSection';
import DoorSection from './_components/DoorSection';
import QuranVerse from '../3d-demo/_components/QuranVerse';

export default function Wedding3DPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScrollY(prev => Math.max(0, Math.min(prev + e.deltaY * 0.1, 100)));
    };

    let touchStartY = 0;
    let touchCurrentY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchCurrentY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      touchCurrentY = e.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY;
      setScrollY(prev => Math.max(0, Math.min(prev + deltaY * 0.01, 100)));
    };

    const handleTouchEnd = () => {
      touchStartY = 0;
      touchCurrentY = 0;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    console.log(scrollY);
  }, [scrollY])

  if (!isOpened) {
    return <DoorSection onOpenComplete={() => setIsOpened(true)} />;
  }
  
  const door0Transform = `scale(${2.5 + scrollY * 0.1}) translateY(-${scrollY * 15}px)`;
  const door1Transform = `scale(${1.5 + scrollY * 0.1}) translateY(-${scrollY * 10}px)`;
  const door2Transform = `scale(${1 + scrollY * 0.06}) translateY(-${scrollY * 8}px)`;
  const door3Transform = `scale(${0.8 + scrollY / 2 * 0.09}) translateY(-${scrollY * 3}px)`;
  const door4Transform = `scale(${0.8 / 4 + scrollY / 4 * 0.09 / 2}) translateY(-${scrollY * 2}px)`;
  const sofaTransform = `scale(${0.8 / 4 + scrollY / 4 * 0.09 / 2}) translateY(-${scrollY * 0}px)`;

  return (
    <div className={`h-screen bg-white overflow-hidden fixed inset-0 transition-all duration-2000 ease-in-out scale-100`}>
      <div className="fixed inset-0 flex items-end justify-center">
        <div className={`absolute w-[1000px] h-[800px] z-51`} style={{ transform: door0Transform }}>
          <Image
            src="/images/wedding/frame/decoration-walk.png"
            alt="decoration-walk"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className={`absolute w-[1000px] h-[800px] z-50 -bottom-15`} style={{ transform: door1Transform }}>
          <Image
            src="/images/wedding/frame/decoration-walk.png"
            alt="decoration-walk-1"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className={`absolute w-[1000px] h-[800px] z-49`} style={{ transform: door2Transform }}>
          <div className="absolute w-full h-full -bottom-30 ">
            <Image
              src="/images/wedding/frame/decoration-walk.png"
              alt="decoration-walk-2"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute w-1/2 h-1/2 left-0 -bottom-5">
            <Image
              src="/images/wedding/frame/table-flower.png"
              alt="table-flower"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute w-1/2 h-1/2 z-2 -right-20 -bottom-5">
            <Image
              src="/images/wedding/frame/table-flower.png"
              alt="table-flower"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <div className={`absolute w-[1000px] h-[800px] z-48 -bottom-32`} style={{ transform: door3Transform }}>
          <Image
            src="/images/wedding/frame/decoration-walk.png"
            alt="decoration-walk-3"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className={`absolute w-[1000px] h-[800px] z-47 -bottom-55`} style={{ transform: door4Transform }}>
          <Image
            src="/images/wedding/couple_image.png"
            alt="couple"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className={`absolute w-[1000px] h-[800px] z-46 -bottom-60`} style={{ transform: sofaTransform }}>
          <Image
            src="/images/wedding/frame/sofa.png"
            alt="sofa"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className={`absolute w-[1000px] h-[800px] scale-300 z-45 -bottom-40  `} style={{ transform: door4Transform }}>
          <Image
            src="/images/wedding/frame/vector-stage.png"
            alt="vector-stage"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      <WelcomeSection scrollY={scrollY} />
      <QuranVerse scrollY={scrollY} />
    </div>
    
  );
}