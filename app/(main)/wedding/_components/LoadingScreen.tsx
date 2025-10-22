'use client';

import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

interface LoadingScreenProps {
  onLoadComplete: () => void;
  onUserInteraction?: () => void;
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

export default function LoadingScreen({ onLoadComplete, onUserInteraction }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [currentAsset, setCurrentAsset] = useState('');
  const [downloadedKB, setDownloadedKB] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    let totalDownloaded = 0;
    let audioUnlocked = false;

    // Preload actual music dan unlock autoplay sekaligus
    const unlockAudioAutoplay = () => {
      if (audioUnlocked) {
        return;
      }
      
      // Preload actual music file untuk unlock autoplay
      const musicAudio = new Audio();
      musicAudio.src = '/music/Nyoman Paul, Andi Rianto – The Way You Look At Me (Official Music Video).mp3';
      musicAudio.volume = 0.01; // Volume sangat kecil
      
      musicAudio.play()
        .then(() => {
          musicAudio.pause();
          musicAudio.currentTime = 0;
          audioUnlocked = true;
          onUserInteraction?.();
        })
        .catch(() => {
          // Browser strict, butuh user interaction
        });
    };

    // Coba unlock saat mount (beberapa browser allow)
    setTimeout(() => {
      unlockAudioAutoplay();
    }, 100);

    // Fallback: tunggu user interaction jika unlock gagal
    const handleUserInteraction = () => {
      if (!audioUnlocked) {
        unlockAudioAutoplay();
      }
    };

    const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
    });

    const loadAsset = (asset: { url: string; size: number }): Promise<void> => {
      return new Promise((resolve) => {
        const isImage = asset.url.match(/\.(webp|png|jpg|jpeg)$/i);
        const isAudio = asset.url.match(/\.(mp3|wav|ogg)$/i);

        if (isImage) {
          const img = new Image();
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
        setTimeout(() => {
          setShowButton(true);
        }, 500);
      }
    };

    loadAllAssets();

    return () => {
      isMounted = false;
      // Cleanup event listeners
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [onLoadComplete, onUserInteraction]);

  const handleOpenInvitation = () => {
    // Unlock autoplay dengan user interaction
    onUserInteraction?.();
    setIsFadingOut(true);
    setTimeout(() => {
      onLoadComplete();
    }, 300);
  };

  const formatSize = (kb: number) => {
    if (kb >= 1024) {
      return `${(kb / 1024).toFixed(2)} MB`;
    }
    return `${kb.toFixed(0)} KB`;
  };

  // Jika tombol Open Invitation muncul, jangan tampilkan progress
  if (showButton) {
    return (
      <div className={`fixed inset-0 z-[9998] flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-50 transition-all duration-500 ease-in ${isFadingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-100/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-md w-full px-6">
          {/* Wedding rings icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-xl animate-pulse" />
              <div className="relative flex items-center justify-center">
                <FaHeart className="text-6xl text-amber-600 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-allura text-amber-800 mb-2">
            Farid & Dilla
          </h1>
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6" />
          
          <p className="text-amber-700 mb-8 font-light">
            Undangan pernikahan sudah siap!
          </p>

          {/* Open Invitation Button */}
          <button
            onClick={handleOpenInvitation}
            className="relative group w-full max-w-xs mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200" />
            <div className="relative bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 rounded-lg px-8 py-4 text-white font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <span className="flex items-center justify-center gap-2">
                <FaHeart className="text-xl animate-pulse" />
                Open Invitation
              </span>
            </div>
          </button>

          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-300/50 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-300/50 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-amber-300/50 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-300/50 rounded-br-lg" />
        </div>
      </div>
    );
  }

  // Jika tombol Open Invitation muncul, jangan tampilkan progress
  if (showButton) {
    return (
      <div className={`fixed inset-0 z-[9998] flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-50 transition-all duration-500 ease-in ${isFadingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-100/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-md w-full px-6">
          {/* Wedding rings icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-xl animate-pulse" />
              <div className="relative flex items-center justify-center">
                <FaHeart className="text-6xl text-amber-600 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-allura text-amber-800 mb-2">
            Farid & Dilla
          </h1>
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6" />
          
          <p className="text-amber-700 mb-8 font-light">
            Undangan pernikahan sudah siap!
          </p>

          {/* Open Invitation Button */}
          <button
            onClick={handleOpenInvitation}
            className="relative group w-full max-w-xs mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200" />
            <div className="relative bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 rounded-lg px-8 py-4 text-white font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <span className="flex items-center justify-center gap-2">
                <FaHeart className="text-xl animate-pulse" />
                Open Invitation
              </span>
            </div>
          </button>

        </div>
      </div>
    );
  }

  // Default: tampilkan loading dengan design minimal elegan dan mobile-friendly
  return (
    <div className={`fixed inset-0 z-[9998] flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-50 transition-all duration-500 ease-in ${isFadingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Glass morphism container - positioned lower for mobile */}
      <div className="relative w-full max-w-md mx-6 mt-32 md:mt-0">
        <div className="relative rounded-2xl bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden">
          {/* Content */}
          <div className="relative z-10 p-8 md:p-10 text-center">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-allura text-amber-800 mb-2">
              Farid & Dilla
            </h1>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6" />
            
            {/* Loading text */}
            <p className="text-amber-700 mb-8 font-light text-lg">
              Preparing your invitation...
            </p>

            {/* Clickable Progress bar */}
            <div className="mb-8">
              <div 
                className="relative h-3 bg-amber-100 rounded-full overflow-hidden shadow-inner cursor-pointer hover:bg-amber-200 transition-colors"
                onClick={handleOpenInvitation}
              >
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Progress info */}
            <div className="flex justify-between items-center text-sm text-amber-700 mb-6">
              <span className="font-medium">{Math.round(progress)}%</span>
              <span className="text-xs">
                {loadedAssets} / {ASSETS_TO_LOAD.length} assets
              </span>
            </div>

            {/* Open Invitation Button */}
            <button
              onClick={handleOpenInvitation}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Open Invitation
            </button>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-400/60" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-400/60" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-amber-400/60" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-400/60" />
        </div>
      </div>
    </div>
  );
}
