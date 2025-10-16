'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
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
    const [comments, setComments] = useState<Comment[]>([
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
        setComments(comments.map(comment =>
            comment.id === id
                ? {
                    ...comment,
                    likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                    isLiked: !comment.isLiked
                }
                : comment
        ));
    };

    const getProgress = () => {
        if (scrollY < start) return 0;
        if (scrollY > end) return 1;
        return (scrollY - start) / (end - start);
    };

    const ANIMATION_DURATION = 500;

    const currentPage = useMemo(() => {
        const progress = getProgress();
        return progress < 0.1 ? 0 : progress > 0.9 ? 1 : Math.floor(progress * 2);
    }, [getProgress]);

    const progress = getProgress();

    return (
        <div
            id="scene-comments"
            className="fixed inset-0 z-50 flex items-center justify-center p-2  overflow-y-auto"
            style={{
                opacity: progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - (progress - 0.9) * 10) : 1,
                transition: `opacity ${ANIMATION_DURATION}ms, transform ${ANIMATION_DURATION}ms`,
                pointerEvents: 'none' as const,
            }}
        >
            <div className="w-full max-w-2xl px-8">
                <div className="relative rounded-2xl bg-gradient-to-br from-white/90 to-amber-50/80 backdrop-blur-sm shadow-xl overflow-hidden border border-amber-100/50">

                    <div className="relative z-10 p-6">
                        <h3 className="text-3xl font-allura text-amber-900 text-center mb-6">Ucapan Dan Doa</h3>
                        <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8" />

                        <div className="h-[50vh] overflow-y-auto pr-2 -mr-2 space-y-4 mb-6">
                            {comments
                                .slice(0, currentPage * COMMENTS_PER_PAGE)
                                .map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="p-4 bg-white/70 rounded-xl shadow-sm border border-amber-100 transition-all duration-300 ease-in-out"
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
                                                <p className="mt-1 text-amber-800/90">{comment.message}</p>
                                                <div className="flex items-center mt-2 space-x-4">
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
                                                        <span>{comment.likes}</span>
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
        </div>
    );
}