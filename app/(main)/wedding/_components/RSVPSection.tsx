'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { saveRSVP } from '../_utils/rsvpService';

import Logger from '@/app/(main)/_utils/logger';

interface RSVPSectionProps {
  scrollY: number;
  start: number;
  end: number;
}

const ANIMATION_DURATION = 300;

const RSVPSection: React.FC<RSVPSectionProps> = ({ scrollY, start, end }) => {
  const SCROLL_START = start ?? 0;
  const SCROLL_END = end ?? 10;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const searchParams = useSearchParams();

  useEffect(() => {
    const guestName = searchParams.get('to');
    if (guestName) {
      setName(guestName);
    }
  }, [searchParams]);
  

  const getFadeOutOpacity = (startOffset = 0) => {
    const start = SCROLL_START + startOffset;
    const end = SCROLL_END + startOffset;

    if (scrollY <= start) {return 0;}
    if (scrollY >= end) {return 0;}
    
    const progress = (scrollY - start) / (end - start);
    const smoothStep = (t: number) => t * t * (3 - 2 * t);
    
    if (progress <= 0.2) {return smoothStep(progress / 0.2);}
    if (progress >= 0.8) {return smoothStep((1 - progress) / 0.2);}
    return 1;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption || !name.trim()) {return;}
    
    // Ensure the selectedOption is a valid RSVPStatus
    const status = selectedOption as 'hadir' | 'tidak-hadir' | 'belum-tau';
    
    try {
      const result = await saveRSVP({
        name: name.trim(),
        guestCount,
        status,
      });
      
      if (result.success) {
        Logger.info('RSVP berhasil disimpan', { name, status });
        setIsSubmitted(true);
      } else {
        Logger.error('Gagal menyimpan RSVP', result.error);
        // Show error message to user
        alert(result.error || 'Gagal menyimpan RSVP. Silakan coba lagi.');
      }
    } catch (error) {
      Logger.error('Error saat menyimpan RSVP', error);
      alert('Terjadi kesalahan. Silakan coba lagi nanti.');
    }
  };

  const transform = {
    opacity: getFadeOutOpacity()
  };

  const rsvpOptions = [
    { 
      id: 'hadir', 
      label: 'Hadir', 
      emoji: '✓',
      selectedBg: 'bg-green-100',
      selectedBorder: 'border-green-400',
      selectedText: 'text-green-800'
    },
    { 
      id: 'tidak-hadir', 
      label: 'Tidak Hadir', 
      emoji: '✕',
      selectedBg: 'bg-red-100',
      selectedBorder: 'border-red-400',
      selectedText: 'text-red-800'
    },
    { 
      id: 'belum-tau', 
      label: 'Belum Tahu', 
      emoji: '?',
      selectedBg: 'bg-amber-100',
      selectedBorder: 'border-amber-400',
      selectedText: 'text-amber-800'
    },
  ];

  if (isSubmitted) {
    return (
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-5 pb-25 duration-300 transition-all pointer-events-none"
        style={{
          opacity: transform.opacity,
          transition: `opacity ${ANIMATION_DURATION}ms`
        }}
      >
        <div
          className="relative w-full max-w-md transform ease-out"
        >
          {/* Card dengan efek kertas elegan */}
          <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-white/90 to-amber-50/80 backdrop-blur-sm shadow-lg overflow-hidden border border-amber-100/50'>
            <div className='absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(180,83,9,0.05)_25%,rgba(180,83,9,0.05)_26%,transparent_27%,transparent_74%,rgba(180,83,9,0.05)_75%,rgba(180,83,9,0.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(180,83,9,0.05)_25%,rgba(180,83,9,0.05)_26%,transparent_27%,transparent_74%,rgba(180,83,9,0.05)_75%,rgba(180,83,9,0.05)_76%,transparent_77%,transparent)] bg-[length:30px_30px] opacity-20'></div>
          </div>
          
          <div className="relative z-10 p-8 text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-2xl font-bold text-amber-900 mb-3">Terima Kasih!</h3>
            <p className="text-amber-800/90 mb-8">Konfirmasi kehadiran Anda telah kami terima.</p>
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setSelectedOption(null);
                setName('');
                setGuestCount(1);
              }}
              className="px-6 py-2.5 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors text-sm font-medium shadow-md hover:shadow-amber-200/50 pointer-events-auto"
            >
              Kembali ke Form
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center px-8 font-sans"
      style={{
        pointerEvents: 'none',
        opacity: transform.opacity,
        transition: `opacity ${ANIMATION_DURATION}ms`
      }}
    >
      <div className="relative w-full max-w-md transform ease-out">
        {/* Card dengan efek kertas elegan */}
        <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-white/90 to-amber-50/80 backdrop-blur-sm shadow-lg overflow-hidden border border-amber-100/50'>
          <div className='absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(180,83,9,0.05)_25%,rgba(180,83,9,0.05)_26%,transparent_27%,transparent_74%,rgba(180,83,9,0.05)_75%,rgba(180,83,9,0.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(180,83,9,0.05)_25%,rgba(180,83,9,0.05)_26%,transparent_27%,transparent_74%,rgba(180,83,9,0.05)_75%,rgba(180,83,9,0.05)_76%,transparent_77%,transparent)] bg-[length:30px_30px] opacity-20'></div>
        </div>
        
        <div className="relative z-10 p-8">
          {/* Header dengan garis dekoratif */}
          <div className='text-center mb-8'>
            <h3 className="text-4xl font-bold text-amber-900 tracking-[5px] font-allura">RSVP</h3>
             <div className='h-px w-48 mb-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-4' />
            <p className="text-xs text-amber-700/80 mt-2 tracking-widest font-sans">KONFIRMASI KEHADIRAN</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-amber-800/90 mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pointer-events-auto w-full px-4 py-2 rounded-lg border bg-white/90 border-amber-200 focus:ring-2 focus:ring-amber-300 focus:border-amber-300 text-amber-900 placeholder-amber-600/50"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-amber-800/90 mb-1">Jumlah Tamu</label>
              <div className="relative">
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value))}
                  className="pointer-events-auto w-full px-4 py-2 rounded-lg border bg-white/90 border-amber-200 focus:ring-2 focus:ring-amber-300 focus:border-amber-300 text-amber-900 appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Orang' : 'Orang'}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className='pointer-events-auto'>
              <p className="block text-sm font-medium text-amber-800/90 mb-2">Konfirmasi Kehadiran</p>
              <div className="grid grid-cols-3 gap-3">
                {rsvpOptions.map((option) => {
                  const isSelected = selectedOption === option.label;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedOption(option.label)}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-colors ${
                        isSelected 
                          ? `${option.selectedBg} ${option.selectedBorder} ${option.selectedText}`
                          : 'border-amber-200 text-amber-700 hover:bg-amber-50'
                      }`}
                    >
                      <span className={`text-xl mb-1 ${isSelected ? 'scale-110' : ''} `}>
                        {option.emoji}
                      </span>
                      <span className="text-sm">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!selectedOption}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                !selectedOption
                  ? 'bg-amber-200/80 cursor-not-allowed text-amber-700/80'
                  : selectedOption === 'Tidak Hadir'
                  ? 'bg-red-500/80 hover:bg-red-600'
                  : 'bg-amber-500/80 hover:bg-amber-600'
              }`}
            >
              Konfirmasi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RSVPSection;