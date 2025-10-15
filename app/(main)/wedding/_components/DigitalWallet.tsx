'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HiOutlineDocumentDuplicate, HiCheckCircle } from 'react-icons/hi2';

interface DigitalWalletProps {
  scrollY: number;
  start: number;
  end: number;
}

const BANK_ACCOUNTS = [
  {
    id: 1,
    bankName: 'Bank Jago',
    logo: '/images/wedding/frame/logo/jago.png',
    accountNumber: '508983399942',
    accountName: 'A.n Farid Satria'
  },
  {
    id: 2,
    bankName: 'Sea Bank',
    logo: '/images/wedding/frame/logo/sea-bank.png',
    accountNumber: '901478480258',
    accountName: 'A.n Asri Dilla Wahyuni'
  }
] as const;

const DigitalWallet: React.FC<DigitalWalletProps> = ({ scrollY, start, end }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const getProgress = () => {
    if (scrollY < start) return 0;
    if (scrollY > end) return 1;
    return (scrollY - start) / (end - start);
  };

  const progress = getProgress();
  const isActive = progress > 0 && progress < 1;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  useEffect(() => {
    setIsVisible(isActive);
  }, [isActive]);

  if (!isVisible) return null;

  const opacity = progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - (progress - 0.9) * 10) : 1;

  return (
    <>
      {showToast && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-out">
            <HiCheckCircle className="h-6 w-6 text-white" />
            <span>Nomor rekening berhasil disalin!</span>
          </div>
        </div>
      )}
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
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none transition-opacity duration-300 bg-white/10 backdrop-blur-[1px]"
        style={{ opacity }}
      >
        <div className="relative w-full max-w-md min-w-[300px]">
          <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl border-2 border-amber-200 shadow-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-t from-amber-400 to-amber-600"/>

            <div className="relative z-10 p-6 md:p-8">
              <div className="text-center mb-6">
                <h3 className="text-4xl md:text-5xl font-bold text-amber-900 font-allura mb-3">
                  Amplop Digital
                </h3>
                <div className='h-0.5 w-48 mb-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-4' />
              </div>

              <div className="bg-white rounded-xl p-2 shadow-lg border-2 border-amber-100 mb-6">
                <div className="w-full space-y-4">
                  {BANK_ACCOUNTS.map((bank) => (
                    <div key={bank.id} className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                      <div className="flex items-center justify-center mb-3">
                        <div className="bg-white p-1 rounded-lg shadow-sm">
                          <Image
                            src={bank.logo}
                            alt={bank.bankName}
                            width={100}
                            height={50}
                            className="h-12 w-auto object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-amber-200">
                        <p className="font-mono pl-2 font-bold text-amber-900">
                          {bank.accountNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}
                        </p>
                        <button
                          onClick={() => copyToClipboard(bank.accountNumber)}
                          className="p-1 text-amber-600 pointer-events-auto shadow-black transition-color border rounded-lg"
                          title="Salin nomor rekening"
                        >
                          <HiOutlineDocumentDuplicate className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="text-md text-amber-700 mt-1 text-center">{bank.accountName}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-amber-700/80 italic p-6">
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