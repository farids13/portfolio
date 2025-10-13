import React from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaHeart, FaRing, FaGlassCheers, FaMapMarkedAlt } from 'react-icons/fa';

interface WeddingEventProps {
    scrollY: number;
    start: number;
    end: number;
}

interface EventCardProps {
    title: string;
    date: string;
    day: string;
    month: string;
    year: string;
    time: string;
    location: string;
    address: string;
    icon: React.ReactNode;
    mapsLink?: string;
}

const ANIMATION_DURATION = 500;

const DateBox = ({ date, month, year }: { date: string; month: string; year: string }) => (
    <div className="flex items-center gap-5 justify-center w-full h-16rounded-lg relative overflow-hidden bg-white/50 backdrop-blur-sm">
        <div className="w-1/4 max-w-[100px] h-1/2 border-t-2 border-b-2 p-1 border-amber-500/80">
            <h2 className="text-center text-sm sm:text-md lg:text-lg">Minggu</h2>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-white/30"></div>
        <div className="relative z-10 text-center">
            <div className="text-sm sm:text-sm lg:text-md uppercase tracking-wider text-amber-600 mt-1">{month}</div>
            <div className="text-4xl font-bold text-amber-700 leading-none font-dosis">{date}</div>
            <div className="text-sm sm:text-sm lg:text-md text-amber-500">{year}</div>
        </div>
        <div className="w-1/4 max-w-[100px] h-1/2 border-t-2 border-b-2 p-1 border-amber-500/80">
            <h2 className="text-center text-sm sm:text-md lg:text-lg">08.00 AM</h2>
        </div>
    </div>
);


const EventCard: React.FC<EventCardProps> = ({
    title,
    date,
    day,
    month,
    year,
    time,
    location,
    address,
    icon,
    mapsLink = '#'
}) => (
    <div className="relative bg-white/90 min-w-[350px] max-w-[500px] backdrop-blur-md rounded-xl p-4 md:p-6 text-center shadow-lg border border-yellow-100 transform transition-all duration-300">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-white shadow-xl">
            {React.cloneElement(icon as React.ReactElement)}
        </div>

        <div className="flex flex-col items-center mb-4 pt-2">
            <h3 className="text-lg font-playfair font-bold text-amber-800 mb-2">{title}</h3>
            <DateBox date={date} month={month} year={year} />
        </div>

        <div className="space-y-4 text-left">
            <div className="space-y-2">
                <div className="flex items-start space-x-3">
                    <FaMapMarkerAlt className="text-amber-500 mt-1 flex-shrink-0" />
                    <div>
                        <p className="text-amber-800 font-medium">{location}</p>
                        <p className="text-amber-700 text-sm">{address}</p>
                    </div>
                </div>
                <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full mt-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                    <FaMapMarkedAlt className="mr-2" />
                    Buka di Google Maps
                </a>
            </div>
        </div>
    </div>
);

const WeddingEvent: React.FC<WeddingEventProps> = ({ scrollY, start, end }) => {
    let SCROLL_START = start ?? 20;
    let SCROLL_END = end ?? 40;
    const getProgress = () => {
        if (scrollY < SCROLL_START) return 0;
        if (scrollY > SCROLL_END) return 1;
        return (scrollY - SCROLL_START) / (SCROLL_END - SCROLL_START);
    };

    const progress = getProgress();
    const isVisible = scrollY >= SCROLL_START && scrollY <= SCROLL_END + 50;

    const containerStyle = {
        opacity: progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - (progress - 0.9) * 10) : 1,
        transform: `translateY(${(1 - progress) * 20}px)`,
        transition: `all ${ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        pointerEvents: 'none' as const,
    };

    if (!isVisible && progress === 0) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
            style={containerStyle}
        >
            <div className="relative w-full max-w-4xl px-2 sm:px-10 lg:px-20">

                <div className="relative bg-white/20 backdrop-blur-xl rounded-2xl px-2 py-6 text-center shadow-[0_0_30px_rgba(251,191,36,0.2)] border border-amber-100/20 overflow-hidden">
                    {/* Corner decorations */}
                    <div className='absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 rounded-sm border-amber-400/80 transition-all duration-500'></div>
                    <div className='absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 rounded-sm border-amber-400/80 transition-all duration-500'></div>
                    <div className='absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 rounded-sm border-amber-400/80 transition-all duration-500'></div>
                    <div className='absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 rounded-sm border-amber-400/80 transition-all duration-500'></div>
                    
                    {/* Background effects */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-100/10 rounded-full filter blur-2xl animate-pulse" style={{
                        animation: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        boxShadow: '0 0 50px rgba(251, 191, 36, 0.2)'
                    }}></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-200/10 rounded-full filter blur-2xl animate-pulse" style={{
                        animation: 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        animationDelay: '1s',
                        boxShadow: '0 0 40px rgba(251, 191, 36, 0.15)'
                    }}></div>


                    <div className="relative z-10 gap-8 flex flex-col items-center ">
                        <EventCard
                            title="Akad Nikah"
                            date="15"
                            day="Minggu"
                            month="Okt"
                            year="2023"
                            time="08.00 WIB"
                            location="Masjid Al-Barkah"
                            address="Jl. Merdeka No. 123, Jakarta Selatan"
                            icon={<FaRing />}
                            mapsLink="https://goo.gl/maps/example"
                        />

                        <EventCard
                            title="Resepsi Pernikahan"
                            date="15"
                            day="Minggu"
                            month="Okt"
                            year="2023"
                            time="11.00 - 14.00 WIB"
                            location="Grand Ballroom Hotel Mulia"
                            address="Jl. Asia Afrika No. 15, Jakarta Pusat"
                            icon={<FaGlassCheers />}
                            mapsLink="https://goo.gl/maps/example2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeddingEvent;
