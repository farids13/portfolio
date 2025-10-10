"use client";

import dynamic from 'next/dynamic';

const CubeScene = dynamic(
  () => import('@/app/(main)/3d-demo/_components/CubeScene'),
  { ssr: false }
);

export default function DDemoPage() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <CubeScene />
      </div>
    </div>
  );
}
