'use client';

import React from 'react';

interface DigitalWalletProps {
  scrollY: number;
  start: number;
  end: number;
}

const ANIMATION_DURATION = 300;

const DigitalWallet: React.FC<DigitalWalletProps> = ({ scrollY, start, end }) => {
  const SCROLL_START = start ?? 60;
  const SCROLL_END = end ?? 70;
  
  const getProgress = () => {
    if (scrollY < SCROLL_START) return 0;
    if (scrollY > SCROLL_END) return 1;
    return (scrollY - SCROLL_START) / (SCROLL_END - SCROLL_START);
  };

  const getFadeOutOpacity = () => {
    const start = SCROLL_START;
    const end = SCROLL_END;

    if (scrollY <= start) return 0;
    if (scrollY >= end) return 0;
    
    const progress = (scrollY - start) / (end - start);
    const smoothStep = (t: number) => t * t * (3 - 2 * t);
    
    if (progress <= 0.2) return smoothStep(progress / 0.2);
    if (progress >= 0.8) return smoothStep((1 - progress) / 0.2);
    return 1;
  };

  const opacity = getFadeOutOpacity();
  const progress = getProgress();

  const paymentMethods = [
    {
      name: 'Bank Transfer',
      bank: 'Bank BCA',
      accountNumber: '1234 5678 9012',
      accountName: 'Farid & Siti Wedding',
      icon: '🏦'
    },
  ];

  return (
    <div 
      className="fixed z-50 flex items-center justify-center p-4"
      style={{ opacity, transition: `opacity ${ANIMATION_DURATION}ms`,}}
    >
        <div className="relative rounded-2xl bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl border-3 border-white/30 shadow-3xl">
          <div className="absolute inset-0 opacity-100">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-white/20 to-amber-100/30 animate-gradient-xy"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-amber-200/10 mix-blend-overlay"></div>
          </div>
          
          <div className="relative z-10 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-amber-900 font-serif">Kirim Hadiah</h3>
            <p className="text-sm text-center text-amber-800/80 mb-6">
              Terima kasih atas doa dan restunya. Bagi yang ingin memberikan bantuan, berikut informasi rekening kami:
            </p>
            
            <div className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div 
                  key={index}
                  className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-amber-100/50 shadow-sm"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <h4 className="font-medium text-amber-900">{method.name}</h4>
                      <p className="text-xs text-amber-800/70">{method.bank}</p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-800/70">No. Rekening:</span>
                      <span className="font-medium text-amber-900">{method.accountNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-800/70">Atas Nama:</span>
                      <span className="font-medium text-amber-900">{method.accountName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-xs text-center mt-6 text-amber-700/70">
              Terima kasih atas doa dan restunya. Semoga Allah membalas kebaikan Anda.
            </p>
          </div>
        </div>
      </div>
  );
};

export default DigitalWallet;
