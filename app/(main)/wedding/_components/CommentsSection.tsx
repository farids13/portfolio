'use client';

import React, { useState, useMemo } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

interface Comment {
    id: string;
    name: string;
    message: string;
    timestamp: string;
    likes: number;
    isLiked: boolean;
}

interface CommentsSectionProps {
    scrollY: number;
    start: number;
    end: number;
}

const COMMENTS_PER_PAGE = 5;

export default function CommentsSection({ scrollY, start, end }: CommentsSectionProps) {
    const [comments] = useState<Comment[]>([
        {
            id: '1',
            name: 'John Doe',
            message: 'Selamat atas pernikahannya! Semoga bahagia selalu ❤️',
            timestamp: '2 hours ago',
            likes: 5,
            isLiked: false
        },
        {
            id: '2',
            name: 'Jane Smith',
            message: 'Semoga menjadi keluarga yang sakinah mawaddah warahmah',
            timestamp: '1 day ago',
            likes: 3,
            isLiked: true
        }
    ]);

    const handleLike = (id: string) => {
        // This is a placeholder - in a real app, you'd update the state
        console.log(`Liked comment ${id}`);
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

                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 -mr-2">
                        {comments.slice(0, (currentPage + 1) * COMMENTS_PER_PAGE).map((comment) => (
                            <div 
                                key={comment.id} 
                                className="p-4 bg-white/70 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center text-amber-700 font-medium shadow-inner">
                                        {comment.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium text-amber-900">{comment.name}</h4>
                                            <span className="text-xs text-amber-600/80">{comment.timestamp}</span>
                                        </div>
                                        <p className="mt-1 text-amber-800/90 text-sm">{comment.message}</p>
                                        <div className="flex items-center mt-2">
                                            <button
                                                onClick={() => handleLike(comment.id)}
                                                className={`flex items-center space-x-1 text-sm ${comment.isLiked 
                                                    ? 'text-amber-600' 
                                                    : 'text-amber-500/80 hover:text-amber-600'
                                                }`}
                                            >
                                                {comment.isLiked ? (
                                                    <FaHeart className="text-amber-600" />
                                                ) : (
                                                    <FaRegHeart />
                                                )}
                                                <span>{comment.likes > 0 ? comment.likes : ''}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}