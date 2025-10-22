import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface DoorSectionProps {
  onOpenComplete: () => void;
  onPlayMusic?: () => void;
}

// Daftar semua aset yang perlu dimuat
const ASSETS_TO_LOAD = [
  // 3D Textures dari WeddingScene
  { url: '/images/wedding/frame/vector-stage.webp', size: 177 },
  { url: '/images/wedding/frame/sofa.webp', size: 58 },
  { url: '/images/wedding/couple_image.webp', size: 92 },
  { url: '/images/wedding/frame/outside-door.webp', size: 170 },
  { url: '/images/wedding/frame/table-flower.webp', size: 45 },
  // Images dari komponen lain
  { url: '/images/wedding/frame/cloud.webp', size: 85 },
  { url: '/images/wedding/frame/logo/jago.webp', size: 20 },
  { url: '/images/wedding/frame/logo/sea-bank.webp', size: 20 },
  // Musik
  { url: '/music/Nyoman Paul, Andi Rianto – The Way You Look At Me (Official Music Video).mp3', size: 10180 },
];

const TOTAL_SIZE_KB = ASSETS_TO_LOAD.reduce((sum, asset) => sum + asset.size, 0);

export default function DoorSection({ onOpenComplete, onPlayMusic }: DoorSectionProps) {
  const [isDoorOpening, setIsDoorOpening] = useState(false);
  const [isScaleAnimating, setIsScaleAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [currentAsset, setCurrentAsset] = useState('');
  const [downloadedKB, setDownloadedKB] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const playSoundEffect = (soundFile: string) => {
    const audio = new Audio(`/effect/${soundFile}`);
    audio.volume = 0.3; // Set volume to 30% untuk tidak terlalu keras
    audio.play().catch(error => {
      console.warn(`Could not play sound effect ${soundFile}:`, error);
    });
  };

  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    let totalDownloaded = 0;

    const loadAsset = (asset: { url: string; size: number }): Promise<void> => {
      return new Promise((resolve) => {
        const isImage = asset.url.match(/\.(webp|png|jpg|jpeg)$/i);
        const isAudio = asset.url.match(/\.(mp3|wav|ogg)$/i);

        if (isImage) {
          const img = new window.Image();
          img.onload = () => {
            if (isMounted) {
              loadedCount++;
              totalDownloaded += asset.size;
              setLoadedAssets(loadedCount);
              setProgress((loadedCount / ASSETS_TO_LOAD.length) * 100);
              setDownloadedKB(totalDownloaded);
              setCurrentAsset(asset.url.split('/').pop() || '');
            }
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load image: ${asset.url}`);
            if (isMounted) {
              loadedCount++;
              totalDownloaded += asset.size;
              setLoadedAssets(loadedCount);
              setProgress((loadedCount / ASSETS_TO_LOAD.length) * 100);
              setDownloadedKB(totalDownloaded);
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
              totalDownloaded += asset.size;
              setLoadedAssets(loadedCount);
              setProgress((loadedCount / ASSETS_TO_LOAD.length) * 100);
              setDownloadedKB(totalDownloaded);
              setCurrentAsset(asset.url.split('/').pop() || '');
            }
            resolve();
          };
          audio.onerror = () => {
            console.warn(`Failed to load audio: ${asset.url}`);
            if (isMounted) {
              loadedCount++;
              totalDownloaded += asset.size;
              setLoadedAssets(loadedCount);
              setProgress((loadedCount / ASSETS_TO_LOAD.length) * 100);
              setDownloadedKB(totalDownloaded);
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
                totalDownloaded += asset.size;
                setLoadedAssets(loadedCount);
                setProgress((loadedCount / ASSETS_TO_LOAD.length) * 100);
                setDownloadedKB(totalDownloaded);
                setCurrentAsset(asset.url.split('/').pop() || '');
              }
              resolve();
            })
            .catch(() => {
              console.warn(`Failed to load asset: ${asset.url}`);
              if (isMounted) {
                loadedCount++;
                totalDownloaded += asset.size;
                setLoadedAssets(loadedCount);
                setProgress((loadedCount / ASSETS_TO_LOAD.length) * 100);
                setDownloadedKB(totalDownloaded);
              }
              resolve();
            });
        }
      });
    };

    const loadAllAssets = async () => {
      // Load assets sequentially untuk tracking yang lebih akurat
      for (const asset of ASSETS_TO_LOAD) {
        await loadAsset(asset);
      }

      // Jika loading selesai, tunjukkan tombol Open Invitation
      if (loadedCount >= ASSETS_TO_LOAD.length && isMounted) {
        setIsLoading(false);
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
    
    // Play initial sound effect
    playSoundEffect('woosh.mp3');
    
    setTimeout(() => {
      setIsDoorOpening(true);
      // Play door opening sound
      playSoundEffect('door-open.mp3');
    }, 200);
    setTimeout(() => {
      setIsScaleAnimating(true);
    }, 2000);
    setTimeout(() => {
      onOpenComplete();
    }, 5000);
  };

  // Single loading button with progress overlay
  const renderLoadingButton = () => (
    <div className="absolute z-5 mt-40 w-[300px]">
      <button
        disabled={progress < 100}
        onClick={progress >= 100 ? handleOpenInvitation : undefined}
        className={`relative w-full h-[50px] rounded-full font-bold text-lg text-white shadow-lg hover:shadow-xl transform transition-all duration-300 border-2 overflow-hidden group ${
          progress >= 100
            ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 border-yellow-300 hover:border-yellow-200 hover:scale-105 cursor-pointer'
            : 'bg-gradient-to-r from-amber-400 to-amber-600 border-amber-300 cursor-not-allowed'
        }`}
      >
        {/* Progress bar overlay during loading */}
        {progress < 100 && (
          <div className="absolute inset-0 bg-amber-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Button text */}
        <span className={`relative z-10 drop-shadow-md ${progress < 100 ? 'animate-pulse text-amber-800 text-sm' : 'animate-pulse text-white'}`}>
          {progress >= 100 ? 'Buka Undangan' : `Loading... ${downloadedKB} KB / ${TOTAL_SIZE_KB} KB`}
        </span>

        {/* Progress percentage during loading */}
        {isLoading && (
          <div className="absolute top-1/2 right-3 text-xs font-medium text-amber-800 z-20">
            <span className="text-[6px]">{currentAsset}</span> <span className="text-[6px]">{loadedAssets}/{ASSETS_TO_LOAD.length}</span>
          </div>
        )}

        {/* Hover effects for completed state */}
        {progress >= 100 && (
          <>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </>
        )}
      </button>
    </div>
  );

  return (
    <div className={`w-full h-[100vh] bg-white flex items-center justify-center ${scaleClasses}`}>
      <div className='absolute flex w-[800px] h-[700px]'>
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
            className="object-cover"
            priority
          />
        </div>
        <div className='absolute -bottom-0 -right-10 z-4 w-[500px] h-[500px]'>
          <Image
            src="/images/wedding/frame/gueses.webp"
            alt="Gueses"
            fill
            className="object-cover scale-x-[-1]"
            priority
          />
        </div>
        <div className='flex w-full h-full'>
          <div className={`absolute left-42 top-29 h-[550px] w-[300px] ${leftDoorClasses}`}>
            <Image
              src="/images/wedding/frame/door.webp"
              alt="Left Door"
              fill
              className="object-contain scale-120 z-2"
            />
          </div>
          <div className={`absolute right-42 top-29 h-[550px] w-[300px] ${rightDoorClasses}`}>
            <Image
              src="/images/wedding/frame/door.webp"
              alt="Right Door"
              fill
              className="object-contain scale-x-[-1.2] scale-120 z-2"
            />
          </div>
        </div>
      </div>

      {/* Single loading button */}
      {showButton && renderLoadingButton()}
    </div>
  );
}
