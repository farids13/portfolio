'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { FaRegHeart, FaHeart, FaRegCommentDots, FaChevronUp } from 'react-icons/fa';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Logger from '@/app/(main)/_utils/logger';

interface Comment {
    id: string;
    name: string;
    message: string;
    createdAt: any;
    isApproved: boolean;
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

    // Fetch comments from Firestore with real-time updates
    useEffect(() => {
        let isMounted = true;

        const fetchComments = async () => {
            try {
                setLoading(true);

                console.log('Setting up Firestore listener...');
                
                // First, try to get a direct reference to the collection
                const commentsRef = collection(db, 'comments');
                console.log('Collection reference created:', commentsRef);

                // Create the query
                const q = query(commentsRef, orderBy('createdAt', 'desc'));
                console.log('Query created:', q);

                // Set up the snapshot listener
                const unsubscribe = onSnapshot(
                    q,
                    (querySnapshot) => {
                        if (!isMounted) return;
                        console.log('Snapshot received. Number of docs:', querySnapshot.size);

                        try {
                            if (querySnapshot.empty) {
                                console.log('No documents found in the comments collection');
                                setComments([]);
                                return;
                            }

                            const commentsData: Comment[] = [];
                            querySnapshot.forEach((doc) => {
                                try {
                                    const data = doc.data();
                                    console.log('Processing document:', doc.id, 'Data:', data);
                                    
                                    // Log the type of createdAt
                                    console.log('createdAt type:', typeof data.createdAt, 'value:', data.createdAt);
                                    
                                    const comment = {
                                        id: doc.id,
                                        name: data.name || 'Anonymous',
                                        message: data.message || '',
                                        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : 
                                                 (data.createdAt ? new Date(data.createdAt) : new Date()),
                                        isApproved: data.isApproved === undefined ? true : data.isApproved
                                    };
                                    
                                    console.log('Processed comment:', comment);
                                    commentsData.push(comment);
                                } catch (docError) {
                                    console.error(`Error processing document ${doc.id}:`, docError);
                                }
                            });

                            console.log('All processed comments:', commentsData);
                            
                            // Show all comments where isApproved is not explicitly set to false
                            const approvedComments = commentsData.filter(comment => {
                                const isApproved = comment.isApproved !== false; // true if undefined or true
                                console.log(`Comment ${comment.id} - isApproved: ${isApproved} (original: ${comment.isApproved})`);
                                return isApproved;
                            });
                            
                            console.log('Approved comments:', approvedComments);
                            console.log('Total comments:', commentsData.length, 'Approved:', approvedComments.length);
                            
                            setComments(approvedComments);

                            if (isInitialLoad) {
                                setIsInitialLoad(false);
                            }
                        } catch (error) {
                            console.error('Error processing comments:', error);
                            Logger.error('Error processing comments:', error);
                        } finally {
                            if (isMounted) {
                                setLoading(false);
                            }
                        }
                    },
                    (error) => {
                        console.error('Firestore error:', error);
                        console.error('Error code:', error.code);
                        console.error('Error message:', error.message);
                        Logger.error('Error fetching comments:', error);
                        if (isMounted) setLoading(false);
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
                if (isMounted) setLoading(false);
            }
        };

        fetchComments();

        return () => {
            isMounted = false;
        };
    }, [isInitialLoad]);

    // Debug log when comments change
    useEffect(() => {
        console.log('Comments updated:', comments);
    }, [comments]);

    // Debug log when loading state changes
    useEffect(() => {
        console.log('Loading state changed:', loading);
    }, [loading]);

    const formatDate = (timestamp: any) => {
        // Handle both Firestore Timestamp and Date objects
        const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);

        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        // Format time as HH:MM
        const timeStr = date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        // Relative time for recent posts
        if (diffInSeconds < 60) return (
            <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span>Baru saja • {timeStr}</span>
            </span>
        );

        if (diffInSeconds < 3600) return (
            <span>{Math.floor(diffInSeconds / 60)} menit lalu • {timeStr}</span>
        );

        if (diffInSeconds < 86400) return (
            <span>{Math.floor(diffInSeconds / 3600)} jam lalu • {timeStr}</span>
        );

        // For today/yesterday
        const isToday = now.toDateString() === date.toDateString();
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const isYesterday = yesterday.toDateString() === date.toDateString();

        if (isToday) return <span>Hari ini • {timeStr}</span>;
        if (isYesterday) return <span>Kemarin • {timeStr}</span>;

        // For older dates
        return (
            <span>
                {date.toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                })} • {timeStr}
            </span>
        );
    };

    const getProgress = () => {
        if (scrollY < start) return 0;
        if (scrollY > end) return 1;
        return (scrollY - start) / (end - start);
    };

    const progress = getProgress();
    const ANIMATION_DURATION = 500;

    const currentPage = useMemo(() => {
        return progress < 0.1 ? 0 : progress > 0.9 ? 1 : Math.floor(progress * 2);
    }, [progress]);

    // Paper-like background effect component
    const PaperBackground = () => (
        <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-white/90 to-amber-50/80 backdrop-blur-sm shadow-lg overflow-hidden border border-amber-100/50'>
            <div className='absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(180,83,9,0.05)_25%,rgba(180,83,9,0.05)_26%,transparent_27%,transparent_74%,rgba(180,83,9,0.05)_75%,rgba(180,83,9,0.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(180,83,9,0.05)_25%,rgba(180,83,9,0.05)_26%,transparent_27%,transparent_74%,rgba(180,83,9,0.05)_75%,rgba(180,83,9,0.05)_76%,transparent_77%,transparent)] bg-[length:30px_30px] opacity-20'></div>
        </div>
    );

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="text-amber-800">Memuat ucapan...</div>
            </div>
        );
    }

    if (comments.length === 0) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-5 pointer-events-none">
                <div className="relative w-full max-w-md">
                    <PaperBackground />
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
            className="fixed inset-0 z-50 flex items-center justify-center p-5"
            style={{
                opacity: progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - (progress - 0.9) * 10) : 1,
                transition: `opacity ${ANIMATION_DURATION}ms`,
                pointerEvents: 'none' as const,
            }}
        >
            <div className="relative w-full max-w-md">
                <PaperBackground />

                <div className="relative z-10 p-8">
                    <div className='text-center mb-6'>
                        <h3 className="text-4xl font-bold text-amber-900 tracking-wider font-allura">Ucapan & Doa</h3>
                        <div className='h-px w-48 mb-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-4' />
                        <p className="text-xs text-amber-700/80 mt-2 tracking-widest font-sans">UCAPAN TAMU</p>
                    </div>

                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 -mr-2 comments-container">
                        {loading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto"></div>
                                <p className="text-sm text-amber-600 mt-2">Memuat komentar...</p>
                            </div>
                        ) : comments.length === 0 ? (
                            <p className="text-center text-amber-700/70 py-8">Belum ada komentar. Jadilah yang pertama mengucapkan!</p>
                        ) : (
                            comments.map((comment) => {
                                // Get first letter of each word in the name
                                const initials = comment.name
                                    .split(' ')
                                    .map(word => word[0])
                                    .join('')
                                    .toUpperCase()
                                    .substring(0, 2);

                                return (
                                    <div key={comment.id} className="p-3 sm:p-4 bg-white/70 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-all duration-200">
                                        <div className="flex items-start gap-2 sm:gap-3">
                                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-medium text-sm sm:text-base">
                                                {initials}
                                            </div>
                                            <div className="flex-1 min-w-0 overflow-hidden">
                                                <div className="flex items-center gap-2 w-full">
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
                                                        <style jsx global>{`
                                                        @keyframes scrollText {
                                                            0% { transform: translateX(0); }
                                                            10% { transform: translateX(0); }
                                                            90% { transform: translateX(calc(-100% + 100%)); }
                                                            100% { transform: translateX(0); }
                                                        }
                                                        .marquee-container {
                                                            overflow: hidden;
                                                            white-space: nowrap;
                                                            width: 100%;
                                                        }
                                                    `}</style>
                                                    </div>
                                                    <span className="text-xs text-amber-500 whitespace-nowrap flex-shrink-0">
                                                        {formatDate(comment.createdAt)}
                                                    </span>
                                                </div>
                                                <p className="text-xs sm:text-sm text-amber-800/90 mt-1 break-words">
                                                    {comment.message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}