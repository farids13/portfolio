"use client";
import Image from 'next/image';
import SkillCard from '@/components/ui/SkillCard';
import Slider from 'react-slick';
import type { Settings } from 'react-slick';
import { useEffect, useMemo, useRef, useState } from 'react';

export type SkillItem = {
  id: number;
  image: string;
  alt: string;
};

interface AdditionalSkillsProps {
  items: SkillItem[];
}

export default function AdditionalSkills({ items }: AdditionalSkillsProps) {
  // Arrow visibility (auto-hide)
  const [showArrows, setShowArrows] = useState(false);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<Slider | null>(null);
  const lastWheelAt = useRef(0);
  const triggerShow = () => {
    setShowArrows(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowArrows(false), 3000);
  };

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    const now = Date.now();
    if (now - lastWheelAt.current < 200) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 5) return;
    if (delta > 0) sliderRef.current?.slickNext();
    else sliderRef.current?.slickPrev();
    lastWheelAt.current = now;
    triggerShow();
  };
  useEffect(() => () => { if (hideTimer.current) clearTimeout(hideTimer.current); }, []);

  // Custom arrow component
  const Arrow = ({ onClick, direction, disabled }: { onClick?: () => void; direction: 'prev' | 'next'; disabled?: boolean }) => (
    <button
      type="button"
      aria-label={direction === 'prev' ? 'Previous' : 'Next'}
      onClick={(e) => { e.stopPropagation(); triggerShow(); onClick?.(); }}
      className={`absolute top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center h-10 w-10 rounded-full backdrop-blur bg-white/10 border border-white/15 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-opacity duration-500 ease-out hover:bg-white/15 hover:scale-105 active:scale-95 ${
        direction === 'prev' ? 'left-0 -ml-3' : 'right-0 -mr-3'
      } ${showArrows ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-5 w-5 text-white/80"
      >
        {direction === 'prev' ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );

  const nextArrow = useMemo(() => <Arrow direction="next" />, [showArrows]);
  const prevArrow = useMemo(() => <Arrow direction="prev" />, [showArrows]);

  const settings: Settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 3,
    draggable: true,
    swipeToSlide: true,
    touchThreshold: 12,
    nextArrow,
    prevArrow,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 6, slidesToScroll: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 5, slidesToScroll: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 560, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 420, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  };

  return (
    <section id="additional-skills" className="relative z-20">
      <div className="w-full bg-[#0a1022] py-10 flex justify-center">
        <SkillCard
          className="flex flex-col gap-10 items-center justify-center w-[80%] max-w-[1250px]"
          useSpotlight={false}
        >
          <h2 className="text-4xl text-center text-lime-200 font-bold">
            ADDITIONAL SKILLS
          </h2>
          {/* Background glow */}
          <div
            className="relative w-full group"
            onMouseEnter={triggerShow}
            onMouseMove={triggerShow}
            onTouchStart={triggerShow}
            onWheel={handleWheel}
          >
            <div className="absolute w-full rounded-full bg-white blur-[40pt] opacity-20 -z-10 pointer-events-none" />

            <Slider ref={sliderRef} {...settings}>
              {items.map((item) => (
                <div key={item.id} className="px-2">
                  <div className="relative w-full max-w-[160px] aspect-square mx-auto overflow-hidden rounded-lg">
                    <Image
                      src={item.image}
                      alt={`${item.alt} logo`}
                      fill
                      sizes='(max-width:640px) 45vw, (max-width:1024px) 22vw, 160px'
                      className="p-3 object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </SkillCard>
      </div>
    </section>
  );
}
