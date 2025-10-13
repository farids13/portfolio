'use client';

import React, { useState } from 'react';

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
  
  const getProgress = (startOffset = 0, reverse = false) => {
    const start = SCROLL_START + startOffset;
    const end = SCROLL_END + startOffset;
    const progress = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);
    return reverse ? 1 - progress : progress;
  };

  const getFadeOutOpacity = (startOffset = 0) => {
    const start = SCROLL_START + startOffset;
    const end = SCROLL_END + startOffset;

    if (scrollY <= start) return 0;
    if (scrollY >= end) return 0;
    
    const progress = (scrollY - start) / (end - start);
    const smoothStep = (t: number) => t * t * (3 - 2 * t);
    
    if (progress <= 0.2) return smoothStep(progress / 0.2);
    if (progress >= 0.8) return smoothStep((1 - progress) / 0.2);
    return 1;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption && name.trim()) {
      console.log('RSVP submitted:', { name, guestCount, status: selectedOption });
      setIsSubmitted(true);
    }
  };

  const transform = {
    opacity: getFadeOutOpacity(),
    backdropFilter: `blur(${getFadeOutOpacity() * 10}px)`,
    WebkitBackdropFilter: `blur(${getFadeOutOpacity() * 10}px)`,
    contentTransform: {
      translateY: 50 * (1 - getProgress()),
      scale: 0.9 + (0.1 * getProgress())
    }
  };

  const rsvpOptions = [
    { id: 'coming', label: 'Hadir', emoji: '✅' },
    { id: 'not-coming', label: 'Tidak Bisa Hadir', emoji: '❌' },
    { id: 'maybe', label: 'Masih Ragu', emoji: '❓' },
  ];

  if (isSubmitted) {
    return (
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-5 pb-25"
        style={{
          opacity: transform.opacity,
          backdropFilter: transform.backdropFilter,
          WebkitBackdropFilter: transform.WebkitBackdropFilter,
          transition: `opacity ${ANIMATION_DURATION}ms, backdrop-filter ${ANIMATION_DURATION}ms, -webkit-backdrop-filter ${ANIMATION_DURATION}ms`
        }}
      >
        <div
          className="relative w-full max-w-md transform ease-out"
          style={{
            transform: `translateY(${transform.contentTransform.translateY}px) scale(${transform.contentTransform.scale})`,
            transition: `transform ${ANIMATION_DURATION}ms`
          }}
        >
          <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl border-3 border-white/30 shadow-3xl overflow-hidden'>
            <div className='absolute inset-0 opacity-100'>
              <div className='absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-white/20 to-green-100/30 animate-gradient-xy'></div>
              <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-emerald-200/10 mix-blend-overlay'></div>
            </div>
          </div>
          
          <div className="relative z-10 p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-emerald-900 font-serif mb-2">Terima Kasih!</h3>
            <p className="text-emerald-800/80 mb-6">Konfirmasi kehadiran Anda telah kami terima.</p>
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setSelectedOption(null);
                setName('');
                setGuestCount(1);
              }}
              className="px-6 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors text-sm font-medium"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-5 pb-25"
      style={{
        pointerEvents: 'none',
        opacity: transform.opacity,
        backdropFilter: transform.backdropFilter,
        WebkitBackdropFilter: transform.WebkitBackdropFilter,
        transition: `opacity ${ANIMATION_DURATION}ms, backdrop-filter ${ANIMATION_DURATION}ms, -webkit-backdrop-filter ${ANIMATION_DURATION}ms`
      }}
    >
      <div
        className="relative w-full max-w-md transform ease-out"
        style={{
          transform: `translateY(${transform.contentTransform.translateY}px) scale(${transform.contentTransform.scale})`,
          transition: `transform ${ANIMATION_DURATION}ms`
        }}
      >
        <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl border-3 border-white/30 shadow-3xl overflow-hidden'>
          <div className='absolute inset-0 opacity-100'>
            <div className='absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-white/20 to-green-100/30 animate-gradient-xy'></div>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-emerald-200/10 mix-blend-overlay'></div>
          </div>
        </div>
        
        <div className="relative z-10 p-8">
          <h3 className="text-2xl font-bold text-center mb-6 text-emerald-900 font-serif">Konfirmasi Kehadiran</h3>
          <p className="text-sm text-center text-emerald-800/80 mb-6">
            Mohon konfirmasi kehadiran Anda untuk acara pernikahan kami.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-emerald-800/80 mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-emerald-200 bg-white/50 focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 outline-none transition"
                placeholder="Nama Anda"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-emerald-800/80 mb-1">Jumlah Tamu</label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-emerald-200 bg-white/50 focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 outline-none transition"
              >
                {[1, 2, 3, 4, 5, 'Lebih dari 5'].map((num) => (
                  <option key={num} value={typeof num === 'number' ? num : 6}>
                    {num} {typeof num === 'number' && num > 1 ? 'orang' : 'orang'}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <p className="block text-sm font-medium text-emerald-800/80 mb-3">Konfirmasi Kehadiran</p>
              <div className="grid gap-3">
                {rsvpOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedOption(option.id)}
                    className={`flex items-center space-x-3 w-full p-4 rounded-xl border-2 transition-all ${
                      selectedOption === option.id 
                        ? 'border-emerald-400 bg-emerald-50/50' 
                        : 'border-emerald-100 hover:border-emerald-200 bg-white/50'
                    }`}
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="font-medium text-emerald-900">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!selectedOption || !name.trim()}
              className={`w-full py-3 px-6 rounded-full font-medium text-white transition-colors ${
                selectedOption && name.trim() 
                  ? 'bg-emerald-500 hover:bg-emerald-600' 
                  : 'bg-emerald-300 cursor-not-allowed'
              }`}
            >
              Konfirmasi
            </button>
          </form>
          
          <p className="text-xs text-center mt-6 text-emerald-700/70">
            Terima kasih atas konfirmasi kehadirannya. Kami tunggu kehadiran Anda!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RSVPSection;