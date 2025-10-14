import React from 'react';
import { FaCalendar, FaCalendarPlus } from 'react-icons/fa';

interface SaveTheDateProps {
    scrollY: number;
    start: number;
    end: number;
}

const SaveTheDateSection: React.FC<SaveTheDateProps> = ({ scrollY, start, end }) => {
    const ANIMATION_DURATION = 500;

    const getProgress = () => {
        if (scrollY < start) return 0;
        if (scrollY > end) return 1;
        return (scrollY - start) / (end - start);
    };

    const progress = getProgress();
    const isVisible = scrollY >= start && scrollY <= end;

    if (!isVisible && progress === 0) return null;

    return (
        <div
            id='save-the-date-section'
            className="fixed inset-0 z-52 flex items-center justify-center p-4 pointer-events-none bg-white/10 backdrop-blur-sm"
            style={{
                opacity: progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - (progress - 0.9) * 10) : 1,
                transition: `opacity ${ANIMATION_DURATION}ms, transform ${ANIMATION_DURATION}ms`,
                pointerEvents: 'none' as const,
            }}
        >
            <div className="relative w-full max-w-3xl transition-all ease-out duration-300"
                style={{ transform: `translateY(${(2 - progress) * 20}px)` }}>
                <div className="relative bg-white/70 backdrop-blur-md rounded-2xl p-8 md:p-10 text-center shadow-xl border border-amber-100">
                    <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-30">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-white/20 to-amber-100/30"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex gap-2 justify-center items-baseline-last font-allura text-6xl md:text-7xl mb-5 text-amber-800">
                            <h2 className=''>Save</h2>
                            <h6 className='text-2xl ml-2'>The</h6>
                            <h2 className=''>Date</h2>
                        </div>
                        

                        {/* Calendar */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 mb-6 max-w-xs mx-auto">
                            <div className="text-center font-bold text-xl text-amber-800 mb-3">Desember</div>
                            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                {['M', 'S', 'S', 'R', 'K', 'J', 'S'].map((day) => (
                                    <div key={day} className="text-amber-600 font-medium py-1">{day}</div>
                                ))}
                                {Array.from({ length: 1 }).map((_, i) => (
                                    <div key={`empty-${i}`} className="h-8"></div>
                                ))}
                                {Array.from({ length: 31 }).map((_, i) => {
                                    const date = i + 1;
                                    const isEventDay = date === 6 || date === 14;
                                    return (
                                        <div
                                            key={date}
                                            className={`relative h-8 w-8 flex items-center justify-center mx-auto rounded-full ${isEventDay
                                                ? 'bg-amber-100 border-2 border-amber-400 font-bold text-amber-800'
                                                : 'text-amber-700'
                                                }`}
                                        >
                                            {date}
                                            {isEventDay && (
                                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaveTheDateSection;
