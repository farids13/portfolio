import { useEffect, useState } from 'react';

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let scrollTimer: NodeJS.Timeout;

    const handleUserActivity = () => {
      // Reset timer saat ada aktivitas
      clearTimeout(timeoutId);
      setIsVisible(false);
      
      // Set timeout untuk menampilkan indikator setelah 10 detik tidak ada aktivitas
      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    };

    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
        setIsVisible(false);
      }
      
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 2000);
    };

    // Cek ukuran layar
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 800);
    };

    // Set initial state
    checkIfMobile();
    handleUserActivity();

    // Event listeners
    window.addEventListener('resize', checkIfMobile);
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(scrollTimer);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, [isScrolling]);

  if (!isVisible) {
    return null;
  }

  // Render untuk desktop (scroll)
  const renderDesktopIndicator = () => (
    <div className="flex flex-col items-center">
      <span className="text-amber-600 text-sm font-medium mb-2">Scroll</span>
      <div className="w-8 h-12 border-2 border-amber-600 rounded-full flex justify-center p-1">
        <div className="w-1 h-2 bg-amber-600 rounded-full animate-scroll-pulse" />
      </div>
    </div>
  );

  // Render untuk mobile (swipe)
  const renderMobileIndicator = () => (
    <div className="flex flex-col items-center">
      <div className="relative w-12 h-20 flex flex-col items-center">
        <div className="animate-swipe-up">
          <svg 
            viewBox="0 0 24 24" 
            className="w-10 h-10 text-amber-600"
            fill="currentColor"
          >
            <path d="M12.503 4.142l-.707-.707L13.3 1.932l.707.707zM10 1.134H9v2.833h1zm-2.86 2.3L5.637 1.933l-.707.707 1.503 1.503zm11.835 10.788a1.418 1.418 0 0 0-1.466-1.489 4.475 4.475 0 0 0-.693.064l-.042-.016A1.388 1.388 0 0 0 15.478 12a1.788 1.788 0 0 0-.587.064A1.84 1.84 0 0 0 13 11.06a2.768 2.768 0 0 0-1 .167V6.9a1.905 1.905 0 0 0-2-1.846A1.905 1.905 0 0 0 8 6.9v6.954L6.979 12.64a1.624 1.624 0 0 0-1.066-.733 1.775 1.775 0 0 0-1.264.161 1.478 1.478 0 0 0-.71.968 1.588 1.588 0 0 0 .167 1.137l2.154 4.38 3.32 4.064.773-.635-3.221-3.921-2.144-4.359a.619.619 0 0 1-.074-.446.485.485 0 0 1 .235-.322.796.796 0 0 1 .543-.051.708.708 0 0 1 .47.328L9 16.6V6.9a.908.908 0 0 1 1-.846.908.908 0 0 1 1 .846V14h1v-1.379c0-.373.336-.562 1-.562.374 0 1 .073 1 .562V14h1v-.563c0-.36.111-.47.478-.47.507 0 .522.684.522.762v1.063h1V13.76l-.005.002.005-.008v.006c.011-.005.362-.027.508-.027.129 0 .492.156.492.761.022.245 0 2.992 0 4.093a7.863 7.863 0 0 1-.463 2.657c-.16.421-.56 1.221-.56 1.221l.918.43s.272-.606.398-.925a7.32 7.32 0 0 0 .471-1.57A26.038 26.038 0 0 0 19 17.07z"></path>
          </svg>
        </div>
        <div className="w-0.5 h-8 mt-2 bg-gradient-to-b from-amber-400/30 to-transparent [mask-image:linear-gradient(to_bottom,transparent,white_1px_4px,transparent_4px)]"></div>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-8 left-4 z-50 pointer-events-none">
      {isMobile ? renderMobileIndicator() : renderDesktopIndicator()}
    </div>
  );
};

export default ScrollIndicator;
