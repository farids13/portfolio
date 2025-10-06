"use client";

import React, { useRef, useState } from "react";
import SkillCard from "@/components/ui/SkillCard";
import ExperienceCard from "@/components/main/ExperienceCard";

interface Skill {
  id: number;
  image: string;
  alt: string;
}

interface SkillGridCarouselProps {
  skills: Skill[];
}

const SkillGridCarousel: React.FC<SkillGridCarouselProps> = ({ skills }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [hovered, setHovered] = useState(false);

  const checkScroll = () => {
    const grid = gridRef.current;
    if (!grid) return;
    setShowLeft(grid.scrollLeft > 0);
    setShowRight(grid.scrollLeft + grid.clientWidth < grid.scrollWidth - 1);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    checkScroll();
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };

  const rows = 2;
  const cols = Math.ceil(skills.length / rows);

  const rowSkills = Array.from({ length: rows }).map((_, rowIdx) =>
    skills.filter((_, idx) => Math.floor(idx / cols) === rowIdx)
  );

  return (
    <div
      className="overflow-x-auto scrollbar-hide max-w-full h-full px-2 py-2 sm:px-2 sm:py-2 relative"
      ref={gridRef}
      onScroll={checkScroll}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hovered && showLeft && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center bg-black/30 rounded-full p-1 cursor-pointer">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      )}
      {hovered && showRight && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center bg-black/30 rounded-full p-1 cursor-pointer">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      )}
      <div className="flex gap-3 sm:gap-2 min-h-[300px]">
        <div className="flex flex-col gap-3 sm:gap-2 min-h-[280px]">
          {rowSkills.map((row, rowIdx) => (
            <div key={rowIdx} className="flex gap-3 sm:gap-2">
              {row.map((skill, colIdx) => (
                <SkillCard
                  key={skill.id}
                  image={skill.image}
                  alt={skill.alt}
                  className="group"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillGridCarousel; 