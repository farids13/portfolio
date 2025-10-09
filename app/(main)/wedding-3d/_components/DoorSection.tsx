import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface DoorSectionProps {
  onOpenComplete: () => void;
}

export default function DoorSection({ onOpenComplete }: DoorSectionProps) {
  const [isDoorOpening, setIsDoorOpening] = useState(false);
  const [buttonOpacity, setButtonOpacity] = useState(1);
  const [isScaleAnimating, setIsScaleAnimating] = useState(false);

  const scaleClasses = isScaleAnimating
    ? 'scale-[50] transition-transform duration-[3000ms] ease-in'
    : 'lg:scale-120';

  const leftDoorClasses = isDoorOpening
    ? 'rotate-y-65 origin-left transition-transform duration-2000'
    : '';

  const rightDoorClasses = isDoorOpening
    ? 'rotate-y-65 origin-right transition-transform duration-2000'
    : '';

  const handleOpenInvitation = () => {
    setButtonOpacity(0);
    setTimeout(() => {
      setIsDoorOpening(true);
    }, 100);
    setTimeout(() => {
      setIsScaleAnimating(true);
    }, 1000);
    setTimeout(() => {
      onOpenComplete();
    }, 3000);
  };
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
              alt="Left Door"
              fill
              className="object-contain scale-120 z-2"
            />
          </div>
          <div className={`absolute right-42 top-29 h-[550px] w-[300px] ${rightDoorClasses}`}>
            <Image
              src="/images/wedding/frame/door.png"
              alt="Right Door"
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
