"use client";

import dynamic from 'next/dynamic';

const WeddingScene = dynamic(
  () => import('@/app/(main)/wedding/WeddingScene'),
  { ssr: false }
);

export default function Wedding() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <WeddingScene />
      </div>
    </div>
  );
}
