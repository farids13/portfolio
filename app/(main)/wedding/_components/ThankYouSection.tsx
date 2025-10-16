import React from 'react';

interface ThankYouSectionProps {
  scrollY: number;
  start: number;
}

const ANIMATION_DURATION = 300;

export default function ThankYouSection({ scrollY, start }: ThankYouSectionProps) {
  const SCROLL_START = start ?? 0;
  const FADE_IN_DURATION = 5;

  const getFadeInOpacity = (startOffset = 0) => {
    const startPos = SCROLL_START + startOffset;

    if (scrollY <= startPos) return 0;
    if (scrollY >= startPos + FADE_IN_DURATION) return 1;

    const progress = (scrollY - startPos) / FADE_IN_DURATION;

    return progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
  };

  const transform = {
    opacity: getFadeInOpacity(),
  };

  return (
    <div
      id='scene-thankyou'
      className='fixed inset-0 z-52 flex flex-col items-center justify-end p-5 pb-20 pointer-events-none'
      style={{
        opacity: transform.opacity,
        transition: `opacity ${ANIMATION_DURATION}ms`
      }}
    >
      <div className='transform transition-all'>
        <h3 className='text-5xl sm:text-6xl md:text-7xl min-w-[250px]  text-center bg-gradient-to-r from-white/60 via-amber-50/60 to-white/60 rounded-2xl p-2 shadow-lg text-amber-800/90 font-allura'>Terima Kasih</h3>
      </div>

      <div className=' w-full h-[25vh] mt-10 lg:mt-15 z-10' />

      <div
        className='transform transition-all shadow bg-gradient-to-r from-white/80 via-amber-50/95 to-white/80 rounded-2xl  text-amber-800 items-center justify-center p-4 inline-flex flex-col'
      >
        <p className='text-[12px] leading-relaxed text-center min-w-[300px] max-w-md'>
          Atas kehadiran dan doa restunya, kami mengucapkan terima kasih yang sebesar-besarnya.
          Semoga Allah SWT membalas segala kebaikan Bapak/Ibu sekalian dengan yang lebih baik.
        </p>
        <p className='text-[10px] font-medium italic mt-2'>
          Wassalamu'alaikum Warahmatullahi Wabarakatuh
        </p>
        <p className='text-3xl font-medium mt-2 font-allura text-amber-800'>
          Farid & Dilla
        </p>
        <p className='text-[10px]'>
          Beserta Keluarga
        </p>
      </div>
    </div>
  );
}
