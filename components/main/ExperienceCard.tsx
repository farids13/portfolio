'use client';

import React from 'react';
import Button from '../ui/Button';

interface ExperienceCardProps {
  years: number;
  className?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ years, className = '' }) => {
  return (
    <div className={`relative bg-[#151d33] w-100 h-[98%] rounded-lg p-6 flex flex-col gap-6 items-center justify-center ${className}`}>
      <div className='relative flex flex-col gap-6 items-center justify-center mb-10 py-10'>
        <h2 className="group text-9xl font-bold flex items-center justify-center">
        <div className='absolute w-30 h-30 rounded-full bg-white opacity-30 blur-2xl pointer-events-none group-hover:opacity-50 transition-opacity duration-200 z-10'/>
          {years}
        </h2>
        <h2 className="text-5xl text-center w-full font-bold text-white mb-4">Years of <br/> Experience Working</h2>
      </div>
      <Button onClick={() => console.log('Download ')} className="px-10">
        DOWNLOAD MY CV
      </Button>
    </div>
  );
};

export default ExperienceCard;
