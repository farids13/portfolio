import { useSearchParams } from 'next/navigation';
import React from 'react';

import ScrollIndicator from './ScrollIndicator';
import { FadeType, useScrollAnimations } from '../_utils/scrollAnimations';

interface WelcomeSectionProps {
  scrollY: number;
  start: number;
  end: number;
}



export default function WelcomeSection({ scrollY, start, end }: WelcomeSectionProps) {

  const searchParams = useSearchParams();
  const guestName = searchParams.get('to') || 'Tamu Undangan';


  const {
    createBackdropStyles,
    createContainerStyles
  } = useScrollAnimations({
    scrollY,
    start: start,
    end: end,
    fadeType: FadeType.FADE_OUT,
    fadeInSpeed: 5,
    fadeOutSpeed: 5,
    fadeInBuffer: 1,
    fadeOutBuffer: 1,
    containerTranslateY: 25,
    containerBaseScale: 1,
    containerTargetScale: 1.1,

  });

  return (
    <div
      id='welcome-section'
      className={`fixed inset-0 z-100 flex items-center justify-center p-5 pb-10 pointer-events-none`}
      style={createBackdropStyles()}
    >
      <ScrollIndicator />
      <div
        className={`relative w-full max-w-2xl transform ease-out`}
        style={createContainerStyles(25, 0.9, 1.1)}
      >
        <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl border-3 border-white/30 shadow-3xl overflow-hidden'>
          <div className='absolute inset-0 opacity-100'>
            <div className='absolute inset-0 bg-gradient-to-br from-amber-50/30 via-white/20 to-amber-100/30 animate-gradient-xy'></div>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-amber-200/10 mix-blend-overlay'></div>
          </div>
        </div>

        <div className='relative z-10 p-8 md:p-12 text-center space-y-4'>
          <h3 className='text-2xl md:text-4xl font-light tracking-widest text-amber-700/90'>WELCOME</h3>
          <div className='h-px w-48 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-4'/>
          <h3 className='text-md md:text-lg mb-4 md:text-base font-serif italic text-gray-600'>Invitation Wedding Of</h3>
          <div className='flex flex-col items-center space-y-1'>
            <h1 className='text-6xl md:text-7xl font-allura font-medium text-amber-800/90'>Farid</h1>
            <span className='text-7xl md:text-8xl font-allura text-amber-800/90'>&</span>
            <h1 className='text-6xl md:text-7xl font-allura font-medium text-amber-800/90'>Dilla</h1>
          </div>
          <div className='h-px w-48 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto my-4'/>
          <h3 className='text-md md:text-lg font-serif text-gray-700/90'>14 Desember 2025</h3>
          <div className='mt-8 pt-6 border-t border-2 rounded-2xl bg-white/80 shadow-sm shadow-amber-100/50 border-amber-100/50'>
            <p className='text-sm text-gray-800 mb-1'>Kepada Yth.</p>
            <p className='text-sm font-light text-gray-700/90 mb-4'>Bapak/Ibu/Saudara/i</p>
            <div className='relative inline-block group'>
              <p className='text-xl mb-10 font-family-sans font-light text-amber-800 px-6 py-2 '>
                {guestName}
              </p>
              <div className='absolute inset-0 rounded-full border-2 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'></div>
            </div>
          </div>
        </div>

        <div className='absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 rounded-sm border-amber-400/80 ' />
        <div className='absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 rounded-sm border-amber-400/80 ' />
        <div className='absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 rounded-sm border-amber-400/80 ' />
        <div className='absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 rounded-sm border-amber-400/80 ' />
      </div>
    </div>
  );
}
