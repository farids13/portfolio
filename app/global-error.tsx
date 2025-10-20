"use client";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html lang="id">
      <body className="bg-base text-white">
        <div className="min-h-screen bg-base relative overflow-hidden flex items-center justify-center px-4">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-48 h-48 bg-red-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-red-500/15 rounded-full blur-lg animate-pulse delay-500"></div>
          </div>

          <div className="relative z-10 text-center space-y-8 max-w-2xl mx-auto">
            {/* Critical Error icon */}
            <div className="relative">
              <h1 className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold text-red-400 leading-none select-none">
                <span className="inline-block transform-gpu transition-all duration-500 hover:scale-105">
                  <span
                    className="relative inline-block"
                    style={{
                      background: 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 8px 16px rgba(248, 113, 113, 0.25))',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      fontFamily: 'var(--font-dosis)',
                    }}
                  >
                    X
                  </span>
                </span>
              </h1>

              {/* Pulsing warning effect */}
              <div
                className="absolute inset-0 text-red-400/30 pointer-events-none blur-xl scale-110 animate-pulse"
              >
                <h1 className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold leading-none">
                  X
                </h1>
              </div>
            </div>

            {/* Critical Error message */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Aplikasi Tidak Dapat Dimuat
              </h2>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                Terjadi kesalahan yang mencegah aplikasi berjalan dengan normal.
              </p>

              {/* Technical error details */}
              {process.env.NODE_ENV === 'development' && (
                <details className="mt-4 text-left">
                  <summary className="text-red-400 cursor-pointer hover:text-red-300">
                    Detail Error Teknis
                  </summary>
                  <pre className="mt-2 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-sm text-red-300 overflow-auto max-h-40">
                    {error.message}
                    {error.stack && (
                      <>
                        {'\n\nStack Trace:'}
                        {error.stack}
                      </>
                    )}
                  </pre>
                </details>
              )}
            </div>

            {/* Critical action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 border-2 border-red-400 text-red-400 font-semibold rounded-lg hover:bg-red-400 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Refresh Halaman
              </button>
            </div>

          </div>
        </div>
      </body>
    </html>
  );
}
