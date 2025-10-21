'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { HiOutlineDocumentDuplicate, HiCheckCircle } from 'react-icons/hi2';

import { useScrollAnimations, FadeType } from '../_utils/scrollAnimations';

interface DigitalWalletProps {
  scrollY: number;
  start: number;
  end: number;
}

const BANK_ACCOUNTS = [
  {
    id: 1,
    bankName: 'Bank Jago',
    logo: '/images/wedding/frame/logo/jago.webp',
    accountNumber: '508983399942',
    accountName: 'A.n Farid Satria'
  },
  {
    id: 2,
    bankName: 'Sea Bank',
    logo: '/images/wedding/frame/logo/sea-bank.webp',
    accountNumber: '901478480258',
    accountName: 'A.n Asri Dilla Wahyuni'
  }
] as const;

const DigitalWallet: React.FC<DigitalWalletProps> = ({ scrollY, start, end }) => {
  const [showToast, setShowToast] = useState(false);
  const { createBackdropStyles, createContainerStyles} = useScrollAnimations({
    scrollY,
    start: start,
    end: end,
    fadeType: FadeType.BOTH,
    fadeInSpeed: 5,
    fadeOutSpeed: 5,
    fadeOutBuffer: 2,
  });


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const toastNotification = showToast && (
    <>
    <div className="fixed inset-0 flex items-center justify-center z-100 pointer-events-none">
      <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-out">
        <HiCheckCircle className="h-6 w-6 text-white" />
        <span>Nomor rekening berhasil disalin!</span>
      </div>
    </div>
     <style jsx global>{`
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(-20px); }
        10% { opacity: 1; transform: translateY(0); }
        90% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
      }
      .animate-fade-in-out {
        animation: fadeInOut 2s ease-in-out forwards;
      }
    `}</style>
    </>
  );

  return (
    <>
      {toastNotification}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-10 pointer-events-none transition-opacity duration-300 bg-white/10 backdrop-blur-[1px]"
        style={createBackdropStyles()}
      >
        <div className="relative w-full max-w-md min-w-[300px]" style={createContainerStyles()}>
          <div className="relative bg-gradient-to-br from-amber-50/90 to-white/80 rounded-2xl  border-amber-200/50 shadow-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-t from-amber-100/90 to-amber-200/90" />

            <div className="relative z-10 p-6 md:p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold md:text-4xl text-amber-900/90 font-widest font-allura mb-3">
                  Amplop Digital
                </h3>
                <div className='h-0.5 w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto' />
              </div>

              <div className="bg-white/80 rounded-xl p-1 shadow-lg border-2 border-amber-100/70 mb-2">
                <div className="w-full space-y-2">
                  {BANK_ACCOUNTS.map((bank) => (
                    <div key={bank.id} className="bg-amber-50 p-2 rounded-lg border border-amber-100">
                      <div className="flex items-center justify-center mb-3">
                        <div className="bg-white p-1 rounded-lg shadow-sm">
                          <Image
                            src={bank.logo}
                            alt={bank.bankName}
                            width={100}
                            height={50}
                            className="h-15 w-auto object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between bg-white p-1 rounded-lg border border-amber-200">
                        <p className="font-mono pl-2 font-bold text-amber-900">
                          {bank.accountNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}
                        </p>
                        <button
                          onClick={() => copyToClipboard(bank.accountNumber)}
                          className="p-1 text-amber-600 pointer-events-auto shadow-xl transition-color border rounded-lg"
                          title="Salin nomor rekening"
                        >
                          <HiOutlineDocumentDuplicate className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="text-sm text-amber-700 mt-2 text-center font-sans">{bank.accountName}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <p className="text-[10px] xs:text-[11px] sm:text-sm  text-amber-700/80 italic p-2">
                  "Terima kasih atas doa dan restunya. Semoga Allah membalas kebaikan Anda dengan berlipat ganda."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigitalWallet;