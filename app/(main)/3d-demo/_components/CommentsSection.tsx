import React, { useState, useMemo, useEffect } from 'react';
import { FaRegComment, FaRegHeart, FaHeart, FaPaperPlane } from 'react-icons/fa';

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
    stay?: number; // Percentage where the section should stay fully visible
}

const ANIMATION_DURATION = 300;
const COMMENTS_PER_PAGE = 5;

export default function CommentsSection({ scrollY, start, end, stay = start + (end - start) * 0.3 }: CommentsSectionProps) {
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
        },
        {
            id: '3',
            name: 'Ahmad Budi',
            message: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fi khair',
            timestamp: '3 hours ago',
            likes: 8,
            isLiked: false
        },
        {
            id: '4',
            name: 'Siti Nurhaliza',
            message: 'Selamat menempuh hidup baru! Semoga langgeng sampai akhir hayat',
            timestamp: '5 hours ago',
            likes: 12,
            isLiked: true
        },
        {
            id: '5',
            name: 'Budi Santoso',
            message: 'Semoga pernikahannya berkah dan penuh kebahagiaan',
            timestamp: '1 day ago',
            likes: 2,
            isLiked: false
        },
        {
            id: '6',
            name: 'Rina Amelia',
            message: 'Selamat ya! Semoga menjadi keluarga yang harmonis dan sakinah',
            timestamp: '2 days ago',
            likes: 7,
            isLiked: false
        },
        {
            id: '7',
            name: 'Dewi Lestari',
            message: 'Semoga pernikahannya langgeng dan penuh berkah',
            timestamp: '2 days ago',
            likes: 4,
            isLiked: false
        },
        {
            id: '8',
            name: 'Agus Setiawan',
            message: 'Selamat menempuh hidup baru, semoga menjadi keluarga yang sakinah mawaddah warahmah',
            timestamp: '3 days ago',
            likes: 6,
            isLiked: true
        },
        {
            id: '9',
            name: 'Maya Sari',
            message: 'Semoga pernikahannya langgeng dan penuh kebahagiaan',
            timestamp: '3 days ago',
            likes: 3,
            isLiked: false
        },
        {
            id: '10',
            name: 'Rudi Hartono',
            message: 'Selamat atas pernikahannya, semoga menjadi keluarga yang sakinah mawaddah warahmah',
            timestamp: '4 days ago',
            likes: 9,
            isLiked: false
        }
    ]);

    const [newComment, setNewComment] = useState('');
    const [commenterName, setCommenterName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);

    // Calculate if comments section is active based on scroll position
    const isActive = useMemo(() => scrollY >= start && scrollY <= end, [scrollY, start, end]);

    // Handle scroll events
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget;
        const atTop = element.scrollTop === 0;
        const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 5;
        
        if (atTop !== isAtTop) setIsAtTop(atTop);
        if (atBottom !== isAtBottom) setIsAtBottom(atBottom);

        // Load more comments if needed
        if (atBottom && currentPage < Math.ceil(comments.length / COMMENTS_PER_PAGE)) {
            setCurrentPage(prev => prev + 1);
        }
    };

    // Handle wheel events for smooth scrolling between sections
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (!isActive) {
            e.stopPropagation();
            return;
        }

        const element = e.currentTarget;
        const atTop = element.scrollTop === 0;
        const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 5;
        
        // If at boundaries, allow window to scroll
        if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
            e.stopPropagation();
            e.preventDefault();
            
            window.scrollBy({
                top: e.deltaY,
                behavior: 'auto'
            });
        }
    };

    // Reset scroll position when leaving active range
    useEffect(() => {
        const container = document.getElementById('scene-comments');
        if (container && (scrollY < start || scrollY > end)) {
            container.scrollTo({ top: 0, behavior: 'smooth' });
            setIsAtTop(true);
            setIsAtBottom(false);
        }
    }, [scrollY, start, end]);

    // Calculate transform and styles
    const { opacity, pointerEvents } = useMemo(() => {
        let progress = 0;
        let opacity = 0;
        
        // Calculate opacity based on scroll position
        if (scrollY < start) {
            progress = 0;
            opacity = 0;
        } else if (scrollY >= start && scrollY < stay) {
            progress = (scrollY - start) / (stay - start);
            opacity = progress;
        } else if (scrollY >= stay && scrollY <= end) {
            progress = (scrollY - stay) / (end - stay);
            opacity = 1 - progress;
        } else {
            progress = 1;
            opacity = 0;
        }

        // Enable pointer events only when active and not at boundaries
        const shouldEnablePointerEvents = isActive && !isAtBottom && !isAtTop;
        
        return {
            opacity,
            pointerEvents: shouldEnablePointerEvents ? 'auto' as const : 'none' as const,
            backdropFilter: `blur(${progress * 5}px)`,
            WebkitBackdropFilter: `blur(${progress * 5}px)`
        };
    }, [scrollY, start, stay, end, isActive, isAtBottom, isAtTop]);

    // Handle like action
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

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !commenterName.trim()) return;

        const newCommentObj: Comment = {
            id: Date.now().toString(),
            name: commenterName,
            message: newComment,
            timestamp: 'Baru saja',
            likes: 0,
            isLiked: false
        };

        setComments([newCommentObj, ...comments]);
        setNewComment('');
        setCommenterName('');
        
        // Scroll to top after adding new comment
        const container = document.getElementById('scene-comments');
        if (container) {
            container.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Calculate container styles
    const containerStyle = useMemo(() => ({
        opacity,
        pointerEvents,
        backdropFilter: `blur(10px)`,
        WebkitBackdropFilter: `blur(10px)`,
        padding: '2rem 0',
        transition: `opacity ${ANIMATION_DURATION}ms ease-in-out, backdrop-filter ${ANIMATION_DURATION}ms ease-in-out, -webkit-backdrop-filter ${ANIMATION_DURATION}ms ease-in-out, pointer-events 0s ${!isActive ? '0.1s' : '0s'}`
    }), [opacity, pointerEvents, isActive]);

    return (
        <div
            id="scene-comments"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            style={containerStyle}
            onScroll={handleScroll}
            onWheel={handleWheel}
        >
            <div className="w-full max-w-2xl mx-auto my-4">
                <div className="relative rounded-2xl bg-white/60 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden">
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Ucapan & Doa</h3>
                        
                        {/* Comments List */}
                        <div className="h-[60vh] overflow-y-auto pr-2 -mr-2 space-y-4">
                            {comments
                                .slice(0, currentPage * COMMENTS_PER_PAGE)
                                .map((comment) => (
                                    <div key={comment.id} className="p-4 bg-white/70 rounded-lg shadow-sm">
                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 flex items-center justify-center text-pink-600 font-bold">
                                                {comment.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-medium text-gray-900">{comment.name}</h4>
                                                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                                </div>
                                                <p className="mt-1 text-gray-700">{comment.message}</p>
                                                <div className="flex items-center mt-2 space-x-4">
                                                    <button 
                                                        onClick={() => handleLike(comment.id)}
                                                        className="flex items-center space-x-1 text-sm text-gray-500 hover:text-pink-500"
                                                    >
                                                        {comment.isLiked ? (
                                                            <FaHeart className="text-pink-500" />
                                                        ) : (
                                                            <FaRegHeart />
                                                        )}
                                                        <span>{comment.likes}</span>
                                                    </button>
                                                    <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500">
                                                        <FaRegComment />
                                                        <span>Balas</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        
                        {/* Comment Form */}
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <div>
                                    <input
                                        type="text"
                                        value={commenterName}
                                        onChange={(e) => setCommenterName(e.target.value)}
                                        placeholder="Nama Anda"
                                        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Tulis ucapan..."
                                        className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                    >
                                        <FaPaperPlane className="inline-block w-4 h-4 mr-1" />
                                        Kirim
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
