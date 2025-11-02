import { useState, useRef, useEffect } from 'react';
import { IoMdMusicalNote } from 'react-icons/io';

interface MusicPlayerProps {
  className?: string;
  playMusicNow?: boolean;
  onMusicStarted?: () => void;
}

export default function MusicPlayer({
  className = "",
  playMusicNow = false,
  onMusicStarted
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasUserRequestedPlay = useRef(false);
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

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.7;
    }
  }, [playlist]);

  useEffect(() => {
    if (playMusicNow && !hasUserRequestedPlay.current && audioRef.current && !isLoading && playlist.length > 0) {
      hasUserRequestedPlay.current = true;

      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          onMusicStarted?.();
        })
        .catch((error) => {
          console.warn('Could not play music:', error.message);
          hasUserRequestedPlay.current = false; // Reset jika gagal
        });
    }
  }, [playMusicNow, isLoading, playlist.length, onMusicStarted]);

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

      const handleCanPlay = () => {
        setIsLoading(false);
      };

      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('canplaythrough', handleCanPlay);
      return () => {
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('canplaythrough', handleCanPlay);
      };
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
    <div className={`fixed bottom-4 left-4 z-[9999] ${className}`}>
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
                    className={`w-2 h-2 text-amber-700 transition-transform duration-300 eas ${isPlaying ? 'animate-spin' : ''}`} 
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
