'use client';

import Image from 'next/image';
import React from 'react';

const styles = `
  @keyframes pulse {
    0%, 100% { 
      transform: scale(1);
      opacity: 0.7;
    }
    50% { 
      transform: scale(1.05);
      opacity: 0.9;
    }
  }
`;

// Add styles to the document head
if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
}


interface CoupleNamesProps {
    scrollY: number;
    start: number;
    end: number;
    name?: string;
    parents?: string;
    dad? : string;
    mom? : string;
    position?: {
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
    };
    size?: {
        width: string;
        height: string;
    };
    textSize?: {
        name?: string;
        parents?: string;
    };
}

const ANIMATION_DURATION = 300;

export default function CoupleNames({
    scrollY,
    start,
    end,
    name = "Farid Satria",
    parents = "Putra dari ",
    dad = "Bapak Muhammad Sholeh",
    mom = "Ibu Alm. Chuzaimah",
    position = {
        top: 'top-8',
        left: 'left-4'
    },
    size = {
        width: 'w-[360px]',
        height: 'h-[180px]'
    },
    textSize = {
        name: 'text-4xl sm:text-5xl md:text-6xl',
        parents: 'text-xs sm:text-sm md:text-base'
    }
}: CoupleNamesProps) {
    const SCROLL_START = start ?? 0;
    const SCROLL_END = end ?? 10;

    const getProgress = () => {
        if (scrollY < SCROLL_START) {return 0;}
        if (scrollY > SCROLL_END) {return 1;}
        return (scrollY - SCROLL_START) / (SCROLL_END - SCROLL_START);
    };

    const getFadeInOutOpacity = () => {
        if (scrollY <= SCROLL_START) {return 0;}
        if (scrollY >= SCROLL_END) {return 0;}

        const progress = (scrollY - SCROLL_START) / (SCROLL_END - SCROLL_START);
        const smoothStep = (t: number) => t * t * (3 - 2 * t);
        if (progress <= 0.3) {
            return smoothStep(progress / 0.3);
        }
        if (progress >= 0.7) {
            return smoothStep((1 - progress) / 0.3);
        }
        return 1;
    };

    const progress = getProgress();
    const opacity = getFadeInOutOpacity();

    // Only apply translateY, no scale
    const translateY = 10 * (1 - progress);

    // Add a subtle bounce effect at the end
    const bounce = progress > 0.9 ?
        Math.sin((progress - 0.9) * Math.PI * 5) * 5 : 0;

    const containerStyle = {
        opacity,
        transform: `translateY(${translateY + bounce}px)`,
        transition: `opacity ${ANIMATION_DURATION}ms ease-out, transform ${ANIMATION_DURATION}ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
        willChange: 'opacity, transform'
    };

    if (opacity <= 0) {return null;}

    // Build position classes
    const positionClasses = [
        position.top || '',
        position.right || '',
        position.bottom || '',
        position.left || ''
    ].filter(Boolean).join(' ');

    return (
        <div
            className={`fixed z-50 pointer-events-none ${positionClasses}`}
            style={containerStyle}
        >
            <div className="flex justify-center items-center">
                <div className="absolute inside-flex justify-center items-center w-2/3 h-2/3 blur-lg rounded-full bg-white/60 backdrop-blur-sm" />
                <div className={`relative ${size.height} ${size.width}`}>
                    <div className="relative z-10 flex flex-col justify-center items-center h-full">
                        <h2 className={`${textSize.name} font-allura text-amber-700/80 text-center px-4`}>
                            {name}
                        </h2>
                        <p className={`${textSize.parents} text-base/60 font-sans text-center px-2`}>
                            {parents} {dad ?? {dad}} {` & `}
                            <p>{mom ?? {mom}}</p>
                        </p>

                    </div>
                    <Image
                        src="/images/wedding/frame/cloud.webp"
                        alt="cloud"
                        fill
                        className="object-fill z-0"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
