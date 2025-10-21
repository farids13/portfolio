import React from 'react';

import { useScrollAnimations, FadeType } from '../_utils/scrollAnimations';

interface QuranSectionProps {
  scrollY: number;
  start: number;
  end: number;
}

export default function QuranSection({ scrollY, start, end }: QuranSectionProps) {
  const {
    createBackdropStyles,
    createContainerStyles
  } = useScrollAnimations({
    scrollY,
    start: start,
    end: end,
    fadeType: FadeType.BOTH,
    fadeInSpeed: 5, 
    fadeOutSpeed: 5 
  });
  return (
    <div
      id='quran-section'
      className="fixed inset-0 z-53 flex items-center justify-center p-15 pointer-events-none bg-white/10 backdrop-blur-sm"
      style={createBackdropStyles()}
    >
      <div className="relative w-full max-w-2xl min-w-[300px] transition-all ease-out duration-300"
        style={createContainerStyles()}
      >
        <div className="relative bg-white/60 backdrop-blur-lg rounded-2xl p-8 md:p-12 text-center space-y-6 shadow-2xl border border-white/30">
          <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-white/20 to-amber-100/30"></div>
          </div>

          <div className="relative z-10">
            <h2 className="font-amiri text-2xl md:text-5xl text-amber-800 text-center leading-loose  tracking-wide">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </h2>
            <div className='h-px w-48 mb-6 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-4' />
            <h3 className="text-xl md:text-3xl font-arabic text-amber-800 leading-loose mb-6">
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
            </h3>
            <p className="text-xs md:text-sm text-amber-800/90 italic mb-6">
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri,
              agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.
              Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
            </p>
            <p className="text-[12px] italic text-amber-700/90 ">
              QS. Ar-Rum : 21
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
