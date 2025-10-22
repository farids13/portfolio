'use client';

import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart, FaChevronUp } from 'react-icons/fa';

import { useScrollAnimations, FadeType } from '../_utils/scrollAnimations';

import Logger from '@/app/(main)/_utils/logger';
import { db } from '@/lib/firebase';

interface Comment {
  id: string;
  name: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt: any;
  isApproved: boolean;
  likes: number;
}


interface CommentsSectionProps {
  scrollY: number;
  start: number;
  end: number;
}

export default function CommentsSection({ scrollY, start, end }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const { createBackdropStyles, createContainerStyles } = useScrollAnimations({
    scrollY,
    start: start,
    end: end,
    fadeType: FadeType.BOTH,
    fadeInSpeed: 5,
    fadeOutSpeed: 5,
    fadeOutBuffer: 2,
  });

  const handleLike = async (commentId: string, currentLikes: number) => {
    if (likedComments.has(commentId)) {
      return;
    }

    try {
      setLikedComments(prev => new Set([...prev, commentId]));

      const commentRef = doc(db, 'comments', commentId);
      await updateDoc(commentRef, {
        likes: (currentLikes || 0) + 1
      });
    } catch (error) {
      console.error('Error updating likes:', error);
      setLikedComments(prev => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchComments = async () => {
      try {
        setLoading(true);

        Logger.info('Setting up Firestore listener...');

        const commentsRef = collection(db, 'comments');

        const q = query(commentsRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(
          q,
          (querySnapshot) => {
            if (!isMounted) { return; }
            Logger.info('Snapshot received. Number of docs:', querySnapshot.size);

            try {
              if (querySnapshot.empty) {
                Logger.info('No documents found in the comments collection');
                setComments([]);
                return;
              }

              const commentsData: Comment[] = [];
              querySnapshot.forEach((doc) => {
                try {
                  const data = doc.data();

                  const comment: Comment = {
                    id: doc.id,
                    name: data.name || 'Anonymous',
                    message: data.message || '',
                    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() :
                      (data.createdAt ? new Date(data.createdAt) : new Date()),
                    isApproved: data.isApproved === undefined ? true : data.isApproved,
                    likes: data.likes || 0
                  };

                  commentsData.push(comment);
                } catch (docError) {
                  console.error(`Error processing document ${doc.id}:`, docError);
                }
              });

              const approvedComments = commentsData.filter(comment => {
                const isApproved = comment.isApproved !== false;
                return isApproved;
              });

              setComments(approvedComments);

              if (isInitialLoad) {
                setIsInitialLoad(false);
              }
            } catch (error) {
              Logger.error('Error processing comments:', error);
            } finally {
              if (isMounted) {
                setLoading(false);
              }
            }
          },
          (error) => {
            Logger.error('Error fetching comments:', error);
            if (isMounted) { setLoading(false); }
          }
        );

        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
        };
      } catch (error) {
        console.error('Error setting up Firestore listener:', error);
        Logger.error('Error setting up Firestore listener:', error);
        if (isMounted) { setLoading(false); }
      }
    };

    fetchComments();

    return () => {
      isMounted = false;
    };
  }, [isInitialLoad]);

  useEffect(() => {
    Logger.info('Comments updated:', comments);
  }, [comments]);
  useEffect(() => {
    Logger.info('Loading state changed:', loading);
  }, [loading]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatDate = (timestamp: any) => {
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const timeStr = date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    if (diffInSeconds < 60) {
      return (
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          <span>Baru saja • {timeStr}</span>
        </span>
      );
    }

    if (diffInSeconds < 3600) {
      return (
        <span>{Math.floor(diffInSeconds / 60)} menit lalu • {timeStr}</span>
      );
    }

    if (diffInSeconds < 86400) {
      return (
        <span>{Math.floor(diffInSeconds / 3600)} jam lalu • {timeStr}</span>
      );
    }

    const isToday = now.toDateString() === date.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = yesterday.toDateString() === date.toDateString();

    if (isToday) { return <span>Hari ini • {timeStr}</span>; }
    if (isYesterday) { return <span>Kemarin • {timeStr}</span>; }

    return (
      <span>
        {date.toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
        })} • {timeStr}
      </span>
    );
  };

  if (comments.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none" style={createContainerStyles()}>
        <div className="relative w-full max-w-md">
          <div className="relative z-10 p-8">
            <div className='text-center mb-8'>
              <h3 className="text-4xl font-bold text-amber-900 tracking-wider font-allura">Ucapan & Doa</h3>
              <div className='h-px w-48 mb-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-4' />
              <p className="text-xs text-amber-700/80 mt-2 tracking-widest font-sans">UCAPAN TAMU</p>
            </div>

            <div className="p-8 bg-white/70 rounded-xl border-2 border-amber-100 shadow-lg text-center transform hover:scale-[1.02] transition-all duration-300">
              <div className="animate-bounce-slow text-6xl mb-6">
                😊
              </div>

              <h4 className="text-xl font-medium text-amber-900 mb-2">Belum Ada Ucapan</h4>
              <p className="text-amber-800 mb-6">🎉 Jadilah yang pertama mengirimkan ucapan dan doa untuk kami! 🙏✨</p>

              <div className="animate-bounce flex flex-col items-center space-y-2">
                <span className="text-xs text-amber-600/70">👆 Scroll ke atas untuk mengisi form</span>
                <FaChevronUp
                  className="text-amber-600 animate-pulse"
                  size={20}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-white/10 backdrop-blur-sm pointer-events-none"
      style={createBackdropStyles()}
    >
      <div className="relative w-full max-w-lg min-w-[300px] inset-0 rounded-2xl bg-gradient-to-tl from-white/90 to-amber-50/40 backdrop-blur-sm shadow-xl border-2 border-amber-200/10" style={createContainerStyles()}>
        <div className="relative z-10 p-4">
          <div className='text-center mb-6'>
            <h3 className="text-4xl font-bold text-amber-900 tracking-wider font-allura">Ucapan & Doa</h3>
            <div className='h-px w-48 mb-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-4' />
            <p className="text-xs text-amber-700/80 mt-2 tracking-widest font-sans">UCAPAN TAMU</p>
          </div>

          <div className="space-y-4 flex flex-col items-start justify-center max-h-[60vh] overflow-y-auto pr-2 -mr-2 comments-container pointer-events-auto">
            {loading ? loadingComments() : comments.map(renderComment)}
          </div>
        </div>
      </div>
    </div>
  );


  function loadingComments() {
    return (
      <div className="flex items-center justify-center animate-spin h-10 w-10 border-4 border-amber-300/60 rounded-full border-t-transparent animate-spin-slow"/>
    );
  }


  function getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  function renderComment(comment: Comment) {
    const initials = getInitials(comment.name);

    return (
      <div key={comment.id} className="p-3 sm:p-4 bg-white/70 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-medium sm:text-lg">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="relative overflow-hidden flex-1 min-w-0">
                <div className="marquee-container flex items-center">
                  <h4
                    className="font-medium text-amber-900 text-sm sm:text-base whitespace-nowrap inline-block pr-2"
                    style={{
                      display: 'inline-block',
                      animation: 'none',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      const parent = el.parentElement;
                      if (parent && el.scrollWidth > parent.clientWidth) {
                        const distance = el.scrollWidth - parent.clientWidth;
                        el.style.animation = `scrollText ${3 + distance / 50}s linear infinite`;
                        el.style.willChange = 'transform';
                      }
                    }}
                    onAnimationEnd={(e) => {
                      const el = e.currentTarget;
                      el.style.willChange = 'auto';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.animation = 'none';
                      el.style.transform = 'translateX(0)';
                    }}
                  >
                    {comment.name}
                  </h4>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-amber-800/90 mb-2 break-words">
              {comment.message}
            </p>

            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-amber-500">
                {formatDate(comment.createdAt)}
              </span>
              <button
                onClick={() => handleLike(comment.id, comment.likes || 0)}
                className={`group flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-300 ${likedComments.has(comment.id)
                  ? 'bg-pink-100 text-pink-500'
                  : 'text-amber-600 hover:bg-amber-50'
                  }`}
                aria-label="Like this comment"
              >
                {likedComments.has(comment.id) ? (
                  <FaHeart className="text-pink-500 animate-scale-in" />
                ) : (
                  <FaRegHeart className="group-hover:fill-current" />
                )}
                <span className="text-xs font-medium">{comment.likes || 0}</span>
              </button>
              <style jsx global>{`
                @keyframes scaleIn {
                  0% { transform: scale(0.8); opacity: 0.5; }
                  70% { transform: scale(1.2); }
                  100% { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in {
                  animation: scaleIn 0.3s ease-out forwards;  
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    );
  }
}