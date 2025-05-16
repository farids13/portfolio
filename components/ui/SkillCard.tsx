import React from "react";
import Image from "next/image";

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
  width = 120,
  height = 120,
  className = "",
  useSpotlight = true,
  children,
}: SkillCardProps) {
  return (
    <div
      className={`group relative bg-[#1d2237] rounded-lg shadow-md p-6 flex items-center justify-center w-50 h-70 hover:scale-105 transition-transform duration-200 overflow-hidden ${className}`}
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
      {useSpotlight && <div className="absolute w-30 h-30 bg-white opacity-20 rounded-full blur-2xl pointer-events-none group-hover:opacity-35 transition-opacity duration-200" />}
      {image && alt && (
        <Image
          src={image}
          alt={alt}
          width={width}
          height={height}
          className="object-contain z-10"
        />
      )}
      {children}
    </div>
  );
}
