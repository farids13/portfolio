"use client"
import React from 'react';
import { useI18n } from '@/hooks/useI18n';

interface ButtonContactProps {
  onClick?: () => void;
  className?: string;
}

const ButtonContact: React.FC<ButtonContactProps> = ({ onClick, className = '' }) => {
  const {t} = useI18n();
  return (
    <button
      className={`flex items-center border border-white rounded-full px-5 py-2 bg-transparent text-white relative group transition-all hover:border-lime-300 ${className}`}
      style={{ borderColor: "#fff" }}
      onClick={onClick}
    >
      <span className="mr-4">{t('CONTACT')}</span>
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-lime-200 group-hover:bg-lime-300 transition-colors">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0a1022]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.7698 7.7688L13.2228 12.0551C12.5025 12.6116 11.4973 12.6116 10.777 12.0551L5.22998 7.7688" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </span>
    </button>
  );
};

export default ButtonContact;