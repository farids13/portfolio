"use client";
import dynamic from 'next/dynamic';
import styles from './wedding.module.css';

const WeddingScene = dynamic(
  () => import('@/app/(main)/wedding/WeddingScene'),
  { ssr: false }
);

export default function Wedding() {
  return (
    <div className={`w-full h-full ${styles.weddingScroll}`}>
        <WeddingScene />
    </div>
  );
}
