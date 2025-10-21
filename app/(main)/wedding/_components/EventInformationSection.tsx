import React from 'react';
import { FaMapMarkerAlt, FaGlassCheers, FaMapMarkedAlt, FaCalendarPlus } from 'react-icons/fa';
import { MdHandshake } from 'react-icons/md';

import { buildGoogleCalendarUrl } from '../_utils/googleCalendar';
import { useScrollAnimations, FadeType } from '../_utils/scrollAnimations';

interface EventInformationProps {
    scrollY: number;
    start: number;
    end: number;
}

interface EventCardProps {
    id: string;
    title: string;
    coupleNames: string;
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

const EventCard: React.FC<EventCardProps> = ({
    id,
    title,
    coupleNames,
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
    <div id={id} className="relative bg-white/70 min-w-[350px] w-[70vw] max-w-lg backdrop-blur-md rounded-xl p-4 md:p-6 text-center shadow-lg border border-yellow-100 transform transition-all duration-300">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-bl from-amber-400/90 to-amber-500/90 rounded-full flex items-center justify-center text-white shadow-xl">
            {React.cloneElement(icon as React.ReactElement)}
        </div>

        <div className="flex flex-col items-center mb-4 pt-2 text-amber-800">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-allura tracking-[8px] uppercase font-bold text-amber-800 mb-2">{title}</h3>
            <div className="flex items-center gap-2 justify-center w-full rounded-lg relative overflow-hidden">
                <div className="w-1/3 max-w-[100px] h-1/2 border-t-2 border-b-2 p-1 border-amber-300/80">
                    <h2 className="text-center text-md sm:text-lg uppercase tracking-wide lg:text-xl">{day}</h2>
                </div>
                <div className="relative z-10 text-center font-sans">
                    <div className="text-sm sm:text-md lg:text-lg uppercase tracking-widest text-amber-600 mt-1">{month}</div>
                    <div className="text-4xl font-bold text-amber-600 leading-none">{date}</div>
                    <div className="text-md sm:text-md lg:text-lg text-amber-600 tracking-[5px]">{year}</div>
                </div>
                <div className="w-1/3 max-w-[100px] h-1/2 border-t-2 border-b-2 p-1 border-amber-300/80">
                    <h2 className="text-center text-md sm:text-lg lg:text-lg uppercase tracking-wide">{time}</h2>
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center items-start text-left text-sm">
            <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-amber-500 mt-1 flex-shrink-0" />
                <div className=' w-full'>
                    <p className="text-amber-800 font-medium text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px]">{location}</p>
                    <p className="text-amber-700 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]">{address}</p>
                </div>
            </div>
            <div className="flex gap-2 w-full mt-3 justify-center items-center">
                <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto inline-flex items-center justify-center w-1/2 max-w-[200px] px-4 py-2 border-2 border-amber-300 text-amber-700 rounded-md shadow-lg shadow-black/10 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-medium hover:bg-amber-50 transition-colors"
                >
                    <FaMapMarkedAlt className="mr-2" />
                    Buka di Maps
                </a>
                <a
                    href={buildGoogleCalendarUrl({
                        title,
                        coupleNames,
                        year,
                        month,
                        date,
                        time,
                        location,
                        address
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto inline-flex items-center justify-center w-1/2 max-w-[200px] px-4 py-2 border-2 border-amber-300 text-amber-700 rounded-md shadow-lg shadow-black/10 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-medium hover:bg-amber-50 transition-colors"
                >
                    <FaCalendarPlus className="mr-2" />
                    Ingatkan Saya
                </a>
            </div>
        </div>
    </div>
);

const EventInformationSection: React.FC<EventInformationProps> = ({ scrollY, start, end }) => {
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
        <div id='event-information-section' className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm pointer-events-none"
            style={createBackdropStyles()}
        >
            <div className="relative w-full max-w-4xl px-4 " style={createContainerStyles()}>
                <div className="relative z-10 gap-8 flex flex-col items-center ">
                    <EventCard
                        id="event-1"
                        title="Akad"
                        coupleNames="Farid & Dilla"
                        date="06"
                        day="Sabtu"
                        month="Desember"
                        year="2025"
                        time="08.00 WIB"
                        location="Masjid Jami Al-Falah"
                        address="Jl. Embong Miring Ds. Burneh Kec. Burneh Kab. Bangkalan "
                        icon={<MdHandshake />}
                        mapsLink="https://maps.app.goo.gl/ebQnNQv6gfk2Dovf8"
                    />

                    <EventCard
                        id="event-2"
                        title="Resepsi"
                        coupleNames="Farid & Dilla"
                        date="14"
                        day="Minggu"
                        month="Desember"
                        year="2025"
                        time="10.00 WIB"
                        location="Kediaman Mempelai Wanita"
                        address="Desa Menganti, Gang Dukuhan 8 RT 13 RW 05 Kec. Menganti Kab. Gresik "
                        icon={<FaGlassCheers />}
                        mapsLink="https://maps.app.goo.gl/czxtgFUFymmmZ1js7"
                    />
                </div>
            </div>
        </div>
    );
};

export default EventInformationSection;
