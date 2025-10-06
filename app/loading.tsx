export default function Loading() {
  return (
    <div className="min-h-screen bg-base flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Animated 404-style number for loading */}
        <div className="relative">
          <h1 className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-bold text-primary leading-none select-none">
            <span className="inline-block transform-gpu">
              <span
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, #d9f99d 0%, #87be74 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'var(--font-dosis)',
                }}
              >
                ...
              </span>
            </span>
          </h1>

          {/* Pulsing glow effect */}
          <div
            className="absolute inset-0 text-primary/30 pointer-events-none blur-xl scale-110 animate-pulse"
          >
            <h1 className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-bold leading-none">
              ...
            </h1>
          </div>
        </div>

        {/* Loading spinner */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Outer ring */}
            <div className="w-16 h-16 border-4 border-primary/20 rounded-full animate-spin">
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
            </div>

            {/* Inner dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <p className="text-white text-lg md:text-xl font-medium">
            Memuat halaman...
          </p>
          <p className="text-gray-400 text-sm">
            Mohon tunggu sebentar
          </p>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-primary/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-primary/10 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>
      </div>
    </div>
  );
}
