'use client';

import React from 'react';

import DownloadCVButton from './DownloadCVButton';

interface ExperienceCardProps {
  years: number;
  className?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ years, className = '' }) => {
  return (
    <div className={`relative bg-[#151d33] w-full h-auto rounded-lg p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 items-center justify-center ${className}`}>
      <div className='relative flex flex-col gap-4 sm:gap-6 items-center justify-center mb-6 sm:mb-10 py-6 sm:py-10 group'>
        <div className='absolute w-20 h-20 sm:w-30 sm:h-30 rounded-full bg-white opacity-30 blur-2xl pointer-events-none group-hover:opacity-50 transition-opacity duration-200 z-10'/>
        <h2 className="text-8xl sm:text-9xl font-bold flex items-center justify-center font-dosis text-white">{years}</h2>
        <h2 className="text-4xl sm:text-5xl text-center w-full font-bold text-white mb-2 sm:mb-4">Years of <br className="sm:hidden"/> Experience <br className="hidden sm:block"/>Working</h2>
      </div>
      <DownloadCVButton className='px-10'/>
    </div>
  );
};

export default ExperienceCard;
