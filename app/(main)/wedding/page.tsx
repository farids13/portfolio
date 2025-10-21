"use client";
import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';

import LoadingScreen from './_components/LoadingScreen';
import styles from './wedding.module.css';

const WeddingScene = dynamic(
  () => import('@/app/(main)/wedding/WeddingScene'),
  { ssr: false }
);

export default function Wedding() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScene, setShowScene] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const handleUserInteraction = useCallback(() => {
    setUserInteracted(true);
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowScene(true);
      // Signal ke MusicPlayer bahwa loading complete dan ready untuk autoplay
      setTimeout(() => {
        setLoadingComplete(true);
      }, 500); // Delay untuk memastikan MusicPlayer sudah mount
    }, 200);
  };

  return (
    <>
      {isLoading && (
        <LoadingScreen 
          onLoadComplete={handleLoadComplete}
          onUserInteraction={handleUserInteraction}
        />
      )}
      <div 
        className={`w-full h-full ${styles.weddingScroll} ${showScene ? 'animate-fade-in-wedding' : 'opacity-0'}`}
        style={{ 
          display: isLoading ? 'none' : 'block'
        }}
      >
        <WeddingScene 
          loadingComplete={loadingComplete}
          userInteracted={userInteracted}
        />
      </div>
      <style jsx>{`
        @keyframes fade-in-wedding {
          0% {
            opacity: 0;
            background-color: rgba(255, 255, 255, 1);
            transform: scale(1.05) rotate(-1deg);
            filter: brightness(1.2) blur(1px);
          }
          25% {
            opacity: 0.3;
            background-color: rgba(255, 255, 255, 0.9);
            transform: scale(1.02) rotate(-0.5deg);
            filter: brightness(1.1) blur(0.5px);
          }
          50% {
            opacity: 0.6;
            background-color: rgba(255, 255, 255, 0.7);
            transform: scale(1.01) rotate(-0.2deg);
            filter: brightness(1.05) blur(0.2px);
          }
          75% {
            opacity: 0.8;
            background-color: rgba(255, 255, 255, 0.3);
            transform: scale(1.005) rotate(-0.1deg);
            filter: brightness(1.02) blur(0.1px);
          }
          100% {
            opacity: 1;
            background-color: rgba(255, 255, 255, 0);
            transform: scale(1) rotate(0deg);
            filter: brightness(1) blur(0);
          }
        }
        .animate-fade-in-wedding {
          animation: fade-in-wedding 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
    </>
  );
}
