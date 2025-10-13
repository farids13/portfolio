import React from 'react';

interface WelcomeSectionProps {
  scrollY: number;
  start: number;
  end: number;
}

const ANIMATION_DURATION = 300;


export default function WelcomeSection({ scrollY, start, end }: WelcomeSectionProps) {

  let SCROLL_START = start ?? 0;
  let SCROLL_END = end ?? 10;
  
  const getProgress = (startOffset = 0, reverse = false) => {
    const start = SCROLL_START + startOffset;
    const end = SCROLL_END + startOffset;
    const progress = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);
    return reverse ? 1 - progress : progress;
  };

  const getFadeOutOpacity = (startOffset = 0) => {
    const start = SCROLL_START + startOffset;
    const end = SCROLL_END + startOffset;

    if (scrollY <= start) return 1;
    if (scrollY >= end) return 0;

    return 1 - ((scrollY - start) / (end - start));
  };

  const transform = {
    opacity: getFadeOutOpacity(),
    backdropFilter: `blur(${getFadeOutOpacity() * 10}px)`,
    WebkitBackdropFilter: `blur(${getFadeOutOpacity() * 10}px)`,

    contentTransform: {
      translateY: 50 * (1 - getProgress()),
      scale: 0.9 + (0.1 * getProgress())
    },

    welcomeSection: {
      opacity: getFadeOutOpacity(0.5),
      translateY: 0
    },

    weddingInfo: {
      opacity: getFadeOutOpacity(1),
      translateY: 0
    },

    guestSection: {
      opacity: getFadeOutOpacity(1.5),
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
      id='scene-welcome'
      className={`fixed inset-0 z-52 flex items-center justify-center p-5 pb-25 pointer-events-none`}
      style={{
        opacity: transform.opacity,
        backdropFilter: transform.backdropFilter,
        WebkitBackdropFilter: transform.WebkitBackdropFilter,
        transition: `opacity ${ANIMATION_DURATION}ms, backdrop-filter ${ANIMATION_DURATION}ms, -webkit-backdrop-filter ${ANIMATION_DURATION}ms`
      }}
    >
      <div
        className={`relative w-full max-w-2xl transform ease-out`}
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
          <div className='absolute inset-0 overflow-hidden'>
          </div>
        </div>

        <div className='relative z-10 p-8 md:p-12 text-center space-y-4'>
          <div
            className='transform transition-all'
            style={{
              opacity: transform.welcomeSection.opacity,
              transform: `translateY(${transform.welcomeSection.translateY}px)`,
              transition: `opacity ${ANIMATION_DURATION}ms, transform ${ANIMATION_DURATION}ms`
            }}
          >
            <h3 className='text-xl md:text-3xl font-light tracking-widest text-amber-700/90'>WELCOME</h3>
            <div className='h-px w-34 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-4'></div>
          </div>

          <div className='transform transition-all' style={{
            opacity: transform.weddingInfo.opacity,
            transform: `translateY(${transform.weddingInfo.translateY}px)`,
            transition: `opacity ${ANIMATION_DURATION}ms, transform ${ANIMATION_DURATION}ms`,
            transitionDelay: '100ms'
          }}
          >
            <h3 className='text-sm mb-4 md:text-base font-serif italic text-gray-600'>Invitation Wedding Of</h3>
            <div className='flex flex-col items-center space-y-2'>
              <h1 className='text-6xl font-allura font-medium text-amber-800/90'>Farid</h1>
              <span className='text-7xl font-allura text-amber-800/90'>&</span>
              <h1 className='text-6xl font-allura font-medium text-amber-800/90'>Dilla</h1>
            </div>
            <div className='h-px w-36 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto my-4'></div>
            <h3 className='text-sm md:text-base font-serif text-gray-700/90'>14 Desember 2025</h3>
          </div>

          <div
            className='mt-8 pt-6 border-t border-2 rounded-2xl bg-white/50 border-amber-100/50 transform transition-all'
            style={{
              opacity: transform.guestSection.opacity,
              transform: `translateY(${transform.guestSection.translateY}px)`,
              transition: `opacity ${ANIMATION_DURATION}ms, transform ${ANIMATION_DURATION}ms`,
              transitionDelay: '200ms'
            }}
          >
            <p className='text-sm text-gray-600 mb-1'>Kepada Yth.</p>
            <p className='text-sm font-light text-gray-600/90 mb-4'>Bapak/Ibu/Saudara/i</p>
            <div className='relative inline-block group'>
              <p className='text-2xl mb-10 font-light text-amber-800/90 px-6 py-2 '>
                Farid Satria
              </p>
              <div className='absolute inset-0 rounded-full border-2 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'></div>
            </div>
          </div>
        </div>

        <div
          className='absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 rounded-sm border-amber-400/80 transition-all duration-500'
          style={{ opacity: transform.corners.topLeft.opacity }}
        ></div>
        <div
          className='absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 rounded-sm border-amber-400/80 transition-all duration-500'
          style={{ opacity: transform.corners.topRight.opacity }}
        ></div>
        <div
          className='absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 rounded-sm border-amber-400/80 transition-all duration-500'
          style={{ opacity: transform.corners.bottomLeft.opacity }}
        ></div>
        <div
          className='absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 rounded-sm border-amber-400/80 transition-all duration-500'
          style={{ opacity: transform.corners.bottomRight.opacity }}
        ></div>
      </div>
    </div>
  );
}
