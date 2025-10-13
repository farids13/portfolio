import React from 'react';

interface ThankYouSectionProps {
  scrollY: number;
  start: number;
  end: number;
}

const ANIMATION_DURATION = 300;

export default function ThankYouSection({ scrollY, start, end }: ThankYouSectionProps) {
  const SCROLL_START = start ?? 0;
  const SCROLL_END = end ?? 10;
  const STAY_DURATION = (end - start) * 0.3; // 30% of the section will stay fully visible
  const STAY_START = SCROLL_START;
  const STAY_END = SCROLL_START + STAY_DURATION;
  
  const getProgress = (startOffset = 0, reverse = false) => {
    const startPos = SCROLL_START + startOffset;
    const endPos = SCROLL_END + startOffset;
    
    if (scrollY < startPos) return reverse ? 1 : 0;
    if (scrollY > endPos) return reverse ? 0 : 1;
    
    const progress = (scrollY - startPos) / (endPos - startPos);
    return reverse ? 1 - progress : progress;
  };

  const getFadeOutOpacity = (startOffset = 0) => {
    const startPos = SCROLL_START + startOffset;
    const endPos = SCROLL_END + startOffset;

    if (scrollY <= startPos) return 0;
    if (scrollY >= endPos) return 0;
    if (scrollY >= STAY_START && scrollY <= STAY_END) return 1;

    if (scrollY < STAY_START) {
      return (scrollY - startPos) / (STAY_START - startPos);
    } else {
      return 1 - ((scrollY - STAY_END) / (endPos - STAY_END));
    }
  };

  const transform = {
    opacity: getFadeOutOpacity(),
    backdropFilter: `blur(${getFadeOutOpacity() * 10}px)`,
    WebkitBackdropFilter: `blur(${getFadeOutOpacity() * 10}px)`,

    contentTransform: {
      translateY: 50 * (1 - getProgress()),
      scale: 0.9 + (0.1 * getProgress())
    },

    headerSection: {
      opacity: getFadeOutOpacity(0.5),
      translateY: 0
    },

    messageSection: {
      opacity: getFadeOutOpacity(1),
      translateY: 0
    },

    corners: {
      topLeft: { opacity: 0.8 * getFadeOutOpacity(SCROLL_START * 0.5) },
      topRight: { opacity: 0.8 * getFadeOutOpacity(SCROLL_START * 1) },
      bottomLeft: { opacity: 0.8 * getFadeOutOpacity(SCROLL_START * 1.5) },
      bottomRight: { opacity: 0.8 * getFadeOutOpacity(SCROLL_START * 2) }
    }
  };

  return (
    <div
      id='scene-thankyou'
      className='fixed inset-0 z-52 flex items-center justify-center p-5 pb-25 pointer-events-none'
      style={{
        opacity: transform.opacity,
        backdropFilter: transform.backdropFilter,
        WebkitBackdropFilter: transform.WebkitBackdropFilter,
        transition: `opacity ${ANIMATION_DURATION}ms, backdrop-filter ${ANIMATION_DURATION}ms, -webkit-backdrop-filter ${ANIMATION_DURATION}ms`
      }}
    >
      <div 
        className='relative w-full max-w-2xl transform ease-out'
        style={{
          transform: `translateY(${transform.contentTransform.translateY}px) scale(${transform.contentTransform.scale})`,
          transition: `transform ${ANIMATION_DURATION}ms`
        }}
      >
        <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl border-3 border-white/30 shadow-3xl overflow-hidden'>
          <div className='absolute inset-0 opacity-100'>
            <div className='absolute inset-0 bg-gradient-to-br from-amber-50/30 via-white/20 to-amber-100/30 animate-gradient-xy'></div>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-amber-200/10 mix-blend-overlay'></div>
          </div>
          <div className='absolute inset-0 opacity-10 mix-blend-overlay' style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          }}></div>
        </div>

        <div className='relative z-10 p-8 md:p-12 text-center space-y-6'>
          <div
            className='transform transition-all'
            style={{
              opacity: transform.headerSection.opacity,
              transform: `translateY(${transform.headerSection.translateY}px)`,
              transition: `opacity ${ANIMATION_DURATION}ms, transform ${ANIMATION_DURATION}ms`
            }}
          >
            <h3 className='text-2xl md:text-3xl font-light tracking-widest text-amber-700/90 mb-2'>TERIMA KASIH</h3>
            <div className='h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-3'></div>
          </div>

          <div 
            className='transform transition-all space-y-4'
            style={{
              opacity: transform.messageSection.opacity,
              transform: `translateY(${transform.messageSection.translateY}px)`,
              transition: `opacity ${ANIMATION_DURATION}ms, transform ${ANIMATION_DURATION}ms`,
              transitionDelay: '100ms'
            }}
          >
            <p className='text-gray-700 leading-relaxed'>
              Atas kehadiran dan doa restunya, kami mengucapkan terima kasih yang sebesar-besarnya.
              Semoga Allah SWT membalas segala kebaikan Bapak/Ibu sekalian dengan yang lebih baik.
            </p>
            <p className='text-gray-700 font-medium italic mt-6'>
              Wassalamu'alaikum Warahmatullahi Wabarakatuh
            </p>
            <p className='text-amber-700 text-lg font-medium mt-8'>
              Farid & Siti
            </p>
            <p className='text-sm text-gray-500 mt-2'>
                Beserta Keluarga
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
