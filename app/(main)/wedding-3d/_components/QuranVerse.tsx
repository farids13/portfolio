import React from 'react';

interface QuranVerseProps {
  scrollY: number;
}

const ANIMATION_DURATION = 500;
const SCROLL_START = 10;
const SCROLL_END = 20;

export default function QuranVerse({ scrollY }: QuranVerseProps) {
  const getProgress = () => {
    if (scrollY < SCROLL_START) return 0;
    if (scrollY > SCROLL_END) return 1;
    return (scrollY - SCROLL_START) / (SCROLL_END - SCROLL_START);
  };

  const progress = getProgress();
  const isVisible = scrollY >= SCROLL_START && scrollY <= SCROLL_END;

  const containerStyle = {
    opacity: progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - (progress - 0.9) * 10) : 1,
    transform: `translateY(${(1 - progress) * 20}px)`,
    transition: `opacity ${ANIMATION_DURATION}ms, transform ${ANIMATION_DURATION}ms`,
    pointerEvents: 'none' as const,
  };

  if (!isVisible && progress === 0) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-5 pointer-events-none"
      style={containerStyle}
    >
      <div className="relative w-full max-w-2xl">
        <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl p-8 md:p-12 text-center space-y-6 shadow-2xl border border-white/30">
          <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-white/20 to-amber-100/30"></div>
          </div>
          
          <div className="relative z-10">
            <div className="font-amiri text-4xl md:text-5xl text-amber-800 text-center leading-tight mb-6 tracking-wide">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <div className="w-24 h-0.5 bg-amber-300/70 mx-auto mb-8 rounded-full"></div>
            <div className="text-2xl md:text-3xl font-arabic text-amber-900 leading-loose mb-6">
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
            </div>
            <div className="text-sm md:text-base text-amber-800/80 italic mb-6">
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, 
              agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. 
              Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
            </div>
            <div className="text-sm font-medium text-amber-700">
              QS. Ar-Rum (30) : 21
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
