"use client"
import React from 'react';

interface ButtonContactProps {
  onClick?: () => void;
  className?: string;
}

const ButtonContact: React.FC<ButtonContactProps> = ({ onClick, className = '' }) => {
  return (
    <button
      className={`flex items-center border border-white rounded-full px-5 py-2 bg-transparent text-white relative group transition-all hover:border-lime-300 ${className}`}
      style={{ borderColor: "#fff" }}
      onClick={onClick}
    >
      <span className="mr-4">CONTACT</span>
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-lime-200 group-hover:bg-lime-300 transition-colors">
      </span>
    </button>
  );
};

export default ButtonContact;