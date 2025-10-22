import { useState, useRef, useEffect } from 'react';
import { IoMdMusicalNote } from 'react-icons/io';

interface MusicPlayerProps {
  className?: string;
  loadingComplete?: boolean;
  userInteracted?: boolean;
  playMusicNow?: boolean;
}

export default function MusicPlayer({
  className = "",
  loadingComplete = false,
  userInteracted: userInteractedProp = false,
  playMusicNow = false
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const autoplayAttemptedRef = useRef(false);
  // Initialize playlist dan preload audio
  useEffect(() => {
    const musicFiles = [
      'Nyoman Paul, Andi Rianto – The Way You Look At Me (Official Music Video).mp3'
    ];

    if (musicFiles.length > 0) {
      setPlaylist(musicFiles);
      
      // Preload audio
      if (audioRef.current) {
        audioRef.current.src = `/music/${musicFiles[0]}`;
        audioRef.current.load();
      }
    }
  }, []);

  // Set audio ready state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    audio.addEventListener('canplaythrough', handleCanPlay);
    return () => audio.removeEventListener('canplaythrough', handleCanPlay);
  }, []);

  // Autoplay saat loading complete DAN user sudah interact di LoadingScreen
  useEffect(() => {
    if (!loadingComplete || !userInteractedProp || autoplayAttemptedRef.current || isLoading) {
      return;
    }

    if (audioRef.current && playlist.length > 0) {
      autoplayAttemptedRef.current = true;
      
      // Delay untuk memastikan audio ready
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.warn('⚠️ Autoplay prevented by browser:', error.message);
              console.warn('💡 Click anywhere to start music manually');
              setIsPlaying(false);
            });
        }
      }, 200);
    }
  }, [loadingComplete, userInteractedProp, isLoading, playlist.length]);

  // Play music ketika tombol diklik
  useEffect(() => {
    if (playMusicNow && audioRef.current && !isLoading && playlist.length > 0 && !isPlaying) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          console.log('🎵 Music started via button click!');
        })
        .catch((error) => {
          console.warn('⚠️ Could not play music:', error.message);
        });
    }
  }, [playMusicNow, isLoading, playlist.length, isPlaying]);

  // Fallback: autoplay dengan user interaction jika loadingComplete gagal
  useEffect(() => {
    if (userInteractedProp || autoplayAttemptedRef.current) {
      return;
    }

    const attemptAutoplay = () => {
      if (audioRef.current && !isLoading && playlist.length > 0 && !autoplayAttemptedRef.current) {
        autoplayAttemptedRef.current = true;
        
        setTimeout(() => {
          audioRef.current?.play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.warn('⚠️ Autoplay prevented by browser:', error.message);
              setIsPlaying(false);
            });
        }, 100);
      }
    };

    // Listen untuk user interaction pertama sebagai fallback
    const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, attemptAutoplay, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, attemptAutoplay);
      });
    };
  }, [isLoading, playlist.length, userInteractedProp]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.warn('Play was prevented:', error);
        });
      }
    }
  };



  useEffect(() => {
    const audio = audioRef.current;
    if (audio && playlist.length > 0) {
      const handleEnded = () => {
        const nextIndex = (currentTrackIndex + 1) % playlist.length;
        setCurrentTrackIndex(nextIndex);
        audio.src = `/music/${playlist[nextIndex]}`;
        audio.play().catch((error) => {
          console.warn('Auto-next play was prevented:', error);
        });
      };

      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  }, [currentTrackIndex, playlist]);

  if (playlist.length === 0 && !isLoading) {
    return (
      <div className={`fixed bottom-4 right-4 z-[9999] ${className}`}>
        <div className="w-16 h-16 bg-gray-800 rounded-lg shadow-lg flex items-center justify-center">
          <span className="text-white text-xs">No Music</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-[9999] ${className}`}>
      <audio
        ref={audioRef}
        preload="auto"
      />

      <button
        onClick={togglePlayPause}
        className="relative w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50"
        disabled={isLoading}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full">
          <div className="absolute inset-1 border border-amber-800/30 rounded-full">
            <div className="absolute inset-0.5 border border-amber-700/20 rounded-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-inner">
                  <IoMdMusicalNote 
                    className={`w-2 h-2 text-amber-700 transition-transform duration-300 ${isPlaying ? 'animate-spin' : ''}`} 
                    style={{ animationDuration: '3s' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-amber-800 bg-opacity-75 rounded-full">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </button>
    </div>
  );
}
