import Image from 'next/image';
import React, { useState, useEffect } from 'react';

import { trackEvent } from '../_utils/tracking';

interface DoorSectionProps {
  onOpenComplete: () => void;
  onPlayMusic?: () => void;
}

// Daftar semua aset yang perlu dimuat
const ASSETS_TO_LOAD = [
  // Main wedding image
  { url: '/images/wedding/couple_image.webp', size: 92 }, // Size in KB

  // Frame assets
  { url: '/images/wedding/frame/vector-stage.webp', size: 176 },
  { url: '/images/wedding/frame/sofa.webp', size: 58 },
  { url: '/images/wedding/frame/outside-door.webp', size: 170 },
  { url: '/images/wedding/frame/table-flower.webp', size: 44 },
  { url: '/images/wedding/frame/cloud.webp', size: 85 },
  { url: '/images/wedding/frame/door.webp', size: 32 },
  { url: '/images/wedding/frame/envelope.webp', size: 2 },
  { url: '/images/wedding/frame/frame-top.webp', size: 88 },
  { url: '/images/wedding/frame/gueses.webp', size: 54 },
  { url: '/images/wedding/frame/gueses-woman.webp', size: 71 },
  { url: '/images/wedding/frame/stage.webp', size: 183 },
  { url: '/images/wedding/frame/bottom-ornamen.webp', size: 58 },
  { url: '/images/wedding/frame/decoration-walk.webp', size: 236 },
  { url: '/images/wedding/frame/top-ornamen.webp', size: 81 },
  { url: '/images/wedding/frame/vas-flower.webp', size: 58 },

  // Logo assets
  { url: '/images/wedding/frame/logo/jago.webp', size: 20 },
  { url: '/images/wedding/frame/logo/sea-bank.webp', size: 20 },

  // Audio
  {
    url: '/music/Nyoman Paul, Andi Rianto – The Way You Look At Me (Official Music Video).mp3',
    size: 10180
  },
  {
    url: '/effect/door-open.mp3',
    size: 72  // 72.41KB
  },
  {
    url: '/effect/woosh.mp3',
    size: 49  // 49.04KB
  },
];


export default function DoorSection({ onOpenComplete, onPlayMusic }: DoorSectionProps) {
  const [isDoorOpening, setIsDoorOpening] = useState(false);
  const [isScaleAnimating, setIsScaleAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(true);
  const playSoundEffect = (soundFile: string) => {
    const audio = new Audio(`/effect/${soundFile}`);
    audio.volume = 0.8;
    audio.play().catch(error => {
      console.warn(`Could not play sound effect ${soundFile}:`, error);
    });
  };

  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;

    const loadAsset = (asset: { url: string; size: number }): Promise<void> => {
      return new Promise((resolve) => {
        const isImage = asset.url.match(/\.(webp|png|jpg|jpeg)$/i);
        const isAudio = asset.url.match(/\.(mp3|wav|ogg)$/i);

        if (isImage) {
          const img = new window.Image();
          img.onload = () => {
            if (isMounted) {
              loadedCount++;
              setProgress((loadedCount / ASSETS_TO_LOAD.length) * 100);
            }
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load image: ${asset.url}`);
            if (isMounted) {
              loadedCount++;
              setProgress((loadedCount / ASSETS_TO_LOAD.length) * 100);
            }
            resolve();
          };
          img.src = asset.url;
        } else if (isAudio) {
          const audio = new Audio();
          audio.preload = 'auto';
          audio.oncanplaythrough = () => {
            if (isMounted) {
              loadedCount++;
              setProgress((loadedCount / ASSETS_TO_LOAD.length) * 100);
            }
            resolve();
          };
          audio.onerror = () => {
            console.warn(`Failed to load audio: ${asset.url}`);
            if (isMounted) {
              loadedCount++;
              setProgress((loadedCount / ASSETS_TO_LOAD.length) * 100);
            }
            resolve();
          };
          audio.src = asset.url;
        } else {
          // Fallback untuk file lain
          fetch(asset.url)
            .then(() => {
              if (isMounted) {
                loadedCount++;
                setProgress((loadedCount / ASSETS_TO_LOAD.length) * 100);
              }
              resolve();
            })
            .catch(() => {
              console.warn(`Failed to load asset: ${asset.url}`);
              if (isMounted) {
                loadedCount++;
                setProgress((loadedCount / ASSETS_TO_LOAD.length) * 100);
              }
              resolve();
            });
        }
      });
    };

    const loadAllAssets = async () => {
      for (const asset of ASSETS_TO_LOAD) {
        await loadAsset(asset);
      }
      if (loadedCount >= ASSETS_TO_LOAD.length && isMounted) {
        setTimeout(() => {
        }, 500);
      }
    };

    loadAllAssets();

    return () => {
      isMounted = false;
    };
  }, [onPlayMusic]);

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
    onPlayMusic?.();
    setShowButton(false);

    trackEvent('door-open', null, 0, {});

    setTimeout(() => {
      setIsDoorOpening(true);
      playSoundEffect('door-open.mp3');
    }, 200);
    setTimeout(() => {
      playSoundEffect('woosh.mp3');
    }, 1500);
    setTimeout(() => {
      setIsScaleAnimating(true);
    }, 2000);
    setTimeout(() => {
      onOpenComplete();
    }, 5000);
  };

  const renderLoadingButton = () => (
    <div className="absolute z-5 mt-40 w-[200px] transition-all duration-300  ">
      <button
        id='open-invitation-button'
        disabled={progress < 100}
        onClick={progress >= 100 ? handleOpenInvitation : undefined}
        className={`relative w-full h-[50px] rounded-lg font-bold shadow-lg hover:shadow-xl transform transition-all duration-300 border-2 overflow-hidden group ${progress >= 100
          ? 'bg-gradient-to-r from-amber-100/90 to-amber-200/90 border-amber-200 hover:border-amber-200 hover:scale-105 cursor-pointer'
          : 'bg-gradient-to-r from-amber-100/90 to-amber-200/90 border-amber-200 cursor-not-allowed'
          }`}
      >
        {progress < 100 && (
          <div className="absolute inset-0 bg-amber-100 rounded-lg overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-200/90 to-amber-300/90 rounded-lg transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <span className={`relative z-10 drop-shadow-md font-sans tracking-wider text-lg ${progress < 100 ? 'animate-pulse text-amber-800 text-sm' : 'animate-pulse text-amber-800 '}`}>
          {progress >= 100 ? 'Buka Undangan' : `Mohon Tunggu...`}
        </span>

      </button>
    </div>
  );

  return (
    <div
      className={`w-full h-[100vh] bg-white flex items-center justify-center ${scaleClasses}`}
      style={{
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <style jsx global>{`
        html, body {
          overflow: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
          height: 100% !important;
          width: 100% !important;
          position: fixed;
        }
      `}</style>
      <div
        className='absolute flex w-[800px] h-[700px] scale-80 xs:scale-85 sm:scale-90 md:scale-95 lg:scale-100 xl:scale-105'
        style={{
          overflow: 'hidden',
        }}
      >
        <Image
          src="/images/wedding/frame/outside-door.webp"
          alt="Background"
          fill
          className="object-cover scale-92 z-3"
          priority
        />
        <div className='absolute -bottom-0 -left-10 z-4 w-[500px] h-[500px]'>
          <Image
            src="/images/wedding/frame/gueses.webp"
            alt="Gueses"
            fill
            sizes='500px'
            className="object-cover"
            priority
          />
        </div>
        <div className='absolute -bottom-0 right-30 z-4  scale-95 w-[210px] h-[500px]'>
          <Image
            src="/images/wedding/frame/gueses-woman.webp"
            alt="Gueses"
            fill
            sizes='210px'
            className="object-cover "
            priority
          />
        </div>
        <div className='flex w-full h-full'>
          <div className={`absolute left-42 top-29 h-[550px] w-[300px] ${leftDoorClasses}`}>
            <Image
              src="/images/wedding/frame/door.webp"
              alt="Left Door"
              fill
              sizes="300px"
              className="object-contain scale-120 z-2"
            />
          </div>
          <div className={`absolute right-42 top-29 h-[550px] w-[300px] ${rightDoorClasses}`}>
            <Image
              src="/images/wedding/frame/door.webp"
              alt="Right Door"
              fill
              sizes="300px"
              className="object-contain scale-x-[-1.2] scale-120 z-2"
            />
          </div>
        </div>
      </div>

      {showButton && renderLoadingButton()}
    </div>
  );
}
