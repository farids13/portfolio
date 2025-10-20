"use client";
import React, { useEffect, useState } from 'react';
import '../../style/Starfield.css';

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  opacity: number;
  animationDelay: number;
}

const Starfield: React.FC<{ count?: number }> = ({ count = 100 }) => {
  const [stars, setStars] = useState<Star[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const newStars: Star[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.5,
      animationDelay: Math.random() * 5,
    }));
    setStars(newStars);
  }, [count]);

  if (!isMounted) {
    return <div className="starfield" />;
  }

  return (
    <div className="starfield">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Starfield;
