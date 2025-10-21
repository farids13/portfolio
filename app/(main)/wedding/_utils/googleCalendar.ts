/**
 * Utility functions for calendar operations
 */

/**
 * Builds a Google Calendar URL for event invitations
 * @param params - Event parameters
 * @returns Google Calendar URL string
 */
export function buildGoogleCalendarUrl({
    title, coupleNames, year, month, date, time, location, address, durationHours = 2
}: {
    title: string;
    coupleNames: string;
    year: string;
    month: string;
    date: string;
    time: string;
    location: string;
    address: string;
    durationHours?: number;
}) {
    const monthMap: { [key: string]: string } = {
        'januari': '01', 'january': '01',
        'februari': '02', 'february': '02',
        'maret': '03', 'march': '03',
        'april': '04',
        'mei': '05', 'may': '05',
        'juni': '06', 'june': '06',
        'juli': '07', 'july': '07',
        'agustus': '08', 'august': '08',
        'september': '09',
        'oktober': '10', 'october': '10',
        'november': '11',
        'desember': '12', 'december': '12'
    };

    const monthNum = monthMap[month.toLowerCase()] || month.padStart(2, '0');

    // Improved time parsing with better regex and validation
    const timeMatch = time.match(/(\d{1,2})[:.]?(\d{2})?\s*(AM|PM|WIB|WITA|WIT)?/i);
    if (!timeMatch) {
        console.warn(`Invalid time format: ${time}. Using default 00:00`);
        return '#';
    }

    let hours = parseInt(timeMatch[1], 10) || 0;
    const minutes = parseInt(timeMatch[2], 10) || 0;

    // Handle 12-hour format
    if (timeMatch[3]) {
        const meridiem = timeMatch[3].toUpperCase();
        if (meridiem === 'PM' && hours !== 12) {
            hours += 12;
        } else if (meridiem === 'AM' && hours === 12) {
            hours = 0;
        }
    }

    // Validate hours and minutes
    hours = Math.max(0, Math.min(23, hours));
    const validMinutes = Math.max(0, Math.min(59, minutes));

    const startTotalMin = hours * 60 + validMinutes;
    const endTotalMin = startTotalMin + (durationHours || 2) * 60;

    const endHours = Math.floor(endTotalMin / 60) % 24;
    const endMinutes = endTotalMin % 60;

    const startDateTime = `${year}${monthNum}${date.padStart(2, '0')}T${hours.toString().padStart(2, '0')}${validMinutes.toString().padStart(2, '0')}00`;
    const endDateTime = `${year}${monthNum}${date.padStart(2, '0')}T${endHours.toString().padStart(2, '0')}${endMinutes.toString().padStart(2, '0')}00`;

    const text = encodeURIComponent(`${title} ${coupleNames}`);
    const details = encodeURIComponent(`Acara: ${title}\nLokasi: ${location} - ${address}`);
    const locationParam = encodeURIComponent(`${location}, ${address}`);

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${startDateTime}/${endDateTime}&ctz=Asia/Jakarta&details=${details}&location=${locationParam}`;
}
