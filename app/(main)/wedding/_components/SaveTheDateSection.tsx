import React from 'react';
import { FaHeart } from 'react-icons/fa';

import { FadeType, useScrollAnimations } from '../_utils/scrollAnimations';

interface SaveTheDateProps {
    scrollY: number;
    start: number;
    end: number;
}

const SaveTheDateSection: React.FC<SaveTheDateProps> = ({ scrollY, start, end }) => {
    const {
        createBackdropStyles,
        createContainerStyles
    } = useScrollAnimations({
        scrollY,
        start: start,
        end: end,
        fadeType: FadeType.BOTH,
        fadeInSpeed: 5,
        fadeOutSpeed: 5,
        fadeOutBuffer: 2,
    });
    return (
        <div
            id='save-the-date-section'
            className="fixed inset-0 z-52 flex items-center justify-center p-4 pointer-events-none bg-white/10 backdrop-blur-sm"
            style={createBackdropStyles()}
        >
            <div className="relative w-full max-w-3xl min-w-[350px] p-8" style={createContainerStyles()}>
                <div className="relative bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-10 text-center shadow-xl border border-amber-100">
                    <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-30">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-white/20 to-amber-100/30"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex flex-row gap-1 mb-2 justify-center items-baseline-last font-allura text-5xl  md:text-7xl  text-amber-800">
                            <h3 className=''>Save</h3>
                            <h6 className='text-2xl ml-2'>The</h6>
                            <h3 className=''>Date</h3>
                        </div>
                        <div className='h-px w-28 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-2'/>


                        {/* Calendar */}
                        <div className=" rounded-lg max-w-xs mx-auto">
                            <div className="text-center font-sans text-xl text-amber-800 mb-3">Desember</div>
                            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                {['M', 'S', 'S', 'R', 'K', 'J', 'S'].map((day, index) => (
                                    <div key={day + index} className="text-amber-600 font-medium py-1">{day}</div>
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
                                                <div className="absolute -top-0.5 right-0">
                                                    <FaHeart className="text-amber-500/80 text-[10px]" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="text-left text-xs text-amber-600 mt-2">
                                <p>06 Desember 2025 : Acara Akad Nikah</p>
                                <p>14 Desember 2025 : Acara Resepsi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaveTheDateSection;
