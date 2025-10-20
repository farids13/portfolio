'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

type Project = {
  title: string;
  image: string;
};

const projects: Project[] = [
  {
    title: 'Ano POS Mobile Apps',
    image: '/images/job-4.webp',
  },
  {
    title: 'Mercubuana Website Accounting',
    image: '/images/job-5.webp',
  },
  {
    title: 'Platform Notulensia',
    image: '/images/job-3.webp',
  },
  {
    title: 'BackEnd Ismaya+ Apps',
    image: '/images/job-2.webp',
  },
  {
    title: 'Excel Macro Kasir IR Cell',
    image: '/images/job-1.1.webp',
  },
  {
    title: 'Web Kasir IR Cell',
    image: '/images/job-1.webp',
  },
];

export default function ProjectSlide() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(true); // Set true untuk langsung tampil

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isActive) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(timer);
  }, [isActive]);


  return (
    <div className="relative w-full max-w-6xl mx-auto mt-10">
      <div className="relative w-full h-[500px] bg-black/20 rounded-xl overflow-hidden">
        <div 
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {projects.map((project, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full relative">
              <div className="relative w-full h-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority={index === currentIndex}
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <h3 className="text-white text-2xl font-bold drop-shadow-lg">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all ${
              currentIndex === index ? 'bg-lime-400 w-6' : 'bg-gray-600 w-3'
            }`}
            aria-label={`Ke slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={() => setIsActive(false)}
        className="absolute -top-10 right-0 text-gray-400 hover:text-white text-sm"
      >
        ✕ Tutup
      </button>
    </div>
  );
}
