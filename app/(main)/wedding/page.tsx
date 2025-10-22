"use client";
import dynamic from 'next/dynamic';
import { useState } from 'react';

import DoorSection from './_components/DoorSection';

const WeddingScene = dynamic(
  () => import('@/app/(main)/wedding/WeddingScene'),
  { ssr: false }
);

export default function Wedding() {
  const [showDoor, setShowDoor] = useState(true);
  const [showScene, setShowScene] = useState(false);
  const [playMusicNow, setPlayMusicNow] = useState(false);

  const handlePlayMusic = () => {
    setPlayMusicNow(true);
  };

  const handleMusicStarted = () => {
    setPlayMusicNow(false);
  };

  const handleDoorComplete = () => {
    setShowDoor(false);
    setTimeout(() => {
      setShowScene(true);
    }, 200);
  };

  return (
    <>
      {showDoor && (
        <DoorSection onOpenComplete={handleDoorComplete} onPlayMusic={handlePlayMusic} />
      )}
      <div 
        className={`w-full h-full ${showScene ? 'animate-fade-in-wedding' : 'opacity-0'}`}
        style={{ 
          display: showDoor ? 'none' : 'block'
        }}
      >
        <WeddingScene 
          playMusicNow={playMusicNow}
          onMusicStarted={handleMusicStarted}
        />
      </div>
      <style jsx>{`
        @keyframes fade-in-wedding {
          0% {
            opacity: 0;
            background-color: rgba(255, 255, 255, 1);
            transform: scale(1.05) rotate(-1deg);
            filter: brightness(1.5) blur(1px);
          }
          25% {
            opacity: 0.3;
            background-color: rgba(255, 255, 255, 0.9);
            transform: scale(1.02) rotate(-0.5deg);
            filter: brightness(1.4) blur(0.5px);
          }
          50% {
            opacity: 0.6;
            background-color: rgba(255, 255, 255, 0.7);
            transform: scale(1.01) rotate(-0.2deg);
            filter: brightness(1.3) blur(0.2px);
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
          animation: fade-in-wedding 2s ease-in-out forwards;
        }
      `}</style>
    </>
  );
}
