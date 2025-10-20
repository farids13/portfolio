import Image from "next/image";
import React from "react";

interface SkillCardProps {
  image?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  useSpotlight?: boolean;
  children?: React.ReactNode;
}

export default function SkillCard({
  image,
  alt,
  width = 80,
  height = 80,
  className = "",
  useSpotlight = true,
  children,
}: SkillCardProps) {
  return (
    <div
      className={`group relative bg-[#1d2237] rounded-lg shadow-md p-4 sm:p-6 flex flex-col gap-4 items-center justify-center w-40 h-56 sm:w-50 sm:h-70 hover:scale-105 transition-transform duration-200 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-30 rounded-lg"
          style={{
            padding: "2px",
            background:
              "linear-gradient(140deg, white, rgba(255,255,255,0.3), transparent)",
          }}
        >
          <div className="h-full w-full bg-[#1d2237] rounded-lg" />
        </div>
      </div>
      {useSpotlight && <div className="absolute w-20 h-20 sm:w-30 sm:h-30 bg-white opacity-0 group-hover:opacity-35 rounded-full blur-2xl pointer-events-none transition-opacity duration-200" />}
      {image && alt && (
        <Image
          src={image}
          alt={alt}
          width={width}
          height={height}
          className="object-contain z-10"
          style={{ width: "auto", height: "auto" }}
        />
      )}
      <p className="text-white font-bold text-2xl text-center relative font-dosis max-h-0 opacity-0 group-hover:max-h-10 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-in-out" style={{fontFamily: 'var(--font-dosis)'}}>{alt}</p>
      {children}
    </div>
  );
}
