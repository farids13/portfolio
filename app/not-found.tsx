"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Starfield from "@/components/main/StartField";

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-base relative overflow-hidden flex flex-col">
      <Starfield />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-primary/15 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex flex-col flex-grow px-4">
        {/* Main 404 Content */}
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-8 max-w-2xl mx-auto w-full">
            {/* 3D 404 Text - Modern Flat Design */}
            <div className="relative">
              <h1 className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold leading-none select-none">
                <span className="inline-block transform-gpu transition-all duration-300 hover:scale-105">
                  <span
                    className="relative inline-block"
                    style={{
                      background: 'linear-gradient(135deg, #d9f99d 0%, #87be74 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 8px 16px rgba(217, 249, 157, 0.25))',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      fontFamily: 'var(--font-dosis)',
                    }}
                  >
                    404
                  </span>
                </span>
              </h1>

              {/* Subtle glow effect */}
              <div
                className="absolute inset-0 text-primary/30 pointer-events-none blur-xl scale-110 animate-pulse"
              >
                <h1 className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold leading-none">
                  404
                </h1>
              </div>
            </div>

            {/* Error message */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Oops! Halaman Tidak Ditemukan
              </h2>
            </div>

            {/* Action buttons */}
            <div className="flex justify-center items-center pt-8">
              <button
                onClick={() => router.push('/')}
                className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-base transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
              >
                <span className="relative z-10">Beranda</span>
                <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Floating elements for visual interest */}
        <div className="absolute top-1/4 left-4 w-2 h-2 bg-primary rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-1/3 right-8 w-3 h-3 bg-primary/60 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-8 w-2 h-2 bg-primary/80 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-1/3 right-4 w-4 h-4 bg-primary/40 rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-primary/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-col items-center">
            <div className="text-primary font-bold text-xs">
              © {new Date().getFullYear()} Copyright by Satria
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
