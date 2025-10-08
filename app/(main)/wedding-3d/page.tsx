'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Wedding3DPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isOpened, setIsOpened] = useState(true);
  const [isDoorOpening, setIsDoorOpening] = useState(false);
  const [buttonOpacity, setButtonOpacity] = useState(1);
  const [isScaleAnimating, setIsScaleAnimating] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScrollY(prev => Math.max(0, Math.min(prev + e.deltaY * 0.1, 100)));
    };

    // Touch event handling for mobile devices
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

  const handleOpenInvitation = () => {
    setButtonOpacity(0);
    setTimeout(() => {
      setIsDoorOpening(true);
    },100);
    setTimeout(() => {
      setIsScaleAnimating(true);
    }, 1000);
    setTimeout(() => {
      setIsOpened(true);
      setTimeout(() => {
        setIsOpenMenu(false);
      }, 1000);
      setIsOpenMenu(true);
    }, 3000);
  };

  // Scale animation class
  const scaleClasses = isScaleAnimating
    ? 'scale-[50] transition-transform duration-[3000ms] ease-in'
    : 'lg:scale-120';

  // Animasi untuk pintu terbuka dengan conditional classes
  const leftDoorClasses = isDoorOpening
    ? 'rotate-y-65 origin-left transition-transform duration-2000'
    : '';

  const rightDoorClasses = isDoorOpening
    ? 'rotate-y-65 origin-right transition-transform duration-2000'
    : '';

  if (!isOpened) {
    return (
      <div className={`w-full h-[100vh] bg-white flex items-center justify-center ${scaleClasses}`}>
        <div className='absolute flex w-[800px] h-[700px]'>
          <Image
            src="/images/wedding/frame/outside-door.png"
            alt="Background"
            fill
            className="object-cover scale-92 z-3"
            priority
          />
          <div className='absolute -bottom-0 -left-10 z-4 w-[500px] h-[500px]'>
            <Image
              src="/images/wedding/frame/gueses.png"
              alt="Gueses"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className='absolute -bottom-0 -right-10 z-4 w-[500px] h-[500px]'>
            <Image
              src="/images/wedding/frame/gueses.png"
              alt="Gueses"
              fill
              className="object-cover scale-x-[-1]"
              priority
            />
          </div>
          <div className='flex w-full h-full'>
            <div className={`absolute left-42 top-29 h-[550px] w-[300px] ${leftDoorClasses}`}>
              <Image
                src="/images/wedding/frame/door.png"
                alt="Frame Top"
                fill
                className="object-contain scale-120 z-2"
              />
            </div>
            <div className={`absolute right-42 top-29 h-[550px] w-[300px] ${rightDoorClasses}`}>
              <Image
                src="/images/wedding/frame/door.png"
                alt="Frame Top"
                fill
                className="object-contain scale-x-[-1.2] scale-120 z-2"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleOpenInvitation}
          className="absolute z-5 mt-40 w-[200px] h-[50px] bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full font-bold text-lg text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none border-2 border-yellow-300 hover:border-yellow-200 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-yellow-300 before:to-yellow-500 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 overflow-hidden group"
          style={{
            opacity: buttonOpacity,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          <span className="relative z-10 drop-shadow-md">Buka Undangan</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:animate-ping"></div>
        </button>
      </div>
    );
  }

  const door1Transform = `scale(${1.5 + scrollY * 0.1}) translateY(-${scrollY * 3}px)`;
  const door2Transform = `scale(${1 + scrollY * 0.05}) translateY(-${scrollY * 2}px)`;
  const door3Transform = `scale(${0.75 + scrollY * 0.025}) translateY(-${scrollY * 0.2}px)`;

  return (
    <div className={`h-screen bg-white overflow-hidden fixed inset-0 transition-all duration-2000 ease-in-out scale-100`}>
      <div className="fixed inset-0 flex items-center justify-center">
        <div
          className="absolute w-full h-full z-3"
          style={{
            transform: door1Transform,
          }}
        >
          <Image
            src="/images/wedding/frame/decoration-walk.png"
            alt="decoration-walk"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="absolute w-full h-full z-2" 
          style={{ transform: door2Transform }}>
          <div className="absolute w-full h-full z-2 -bottom-10 ">
            <Image
              src="/images/wedding/frame/decoration-walk.png"
              alt="decoration-walk"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute w-1/3 h-1/3 z-2 left-0 bottom-48">
            <Image
              src="/images/wedding/frame/table-flower.png"
              alt="table-flower"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute w-1/3 h-1/3 z-2 -right-10 bottom-48">
            <Image
              src="/images/wedding/frame/table-flower.png"
              alt="table-flower"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <div
          className="absolute w-full h-full z-1 -bottom-15 "
          style={{
            transform: door3Transform,
          }}
        >
          <Image
            src="/images/wedding/frame/decoration-walk.png"
            alt="decoration-walk"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}