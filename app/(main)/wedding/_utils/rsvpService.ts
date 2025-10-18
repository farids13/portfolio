import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import Logger from '@/app/(main)/_utils/logger';
import { db } from '@/lib/firebase';

type RSVPStatus = 'hadir' | 'tidak-hadir' | 'belum-tau';

interface RSVPData {
  name: string;
  guestCount: number;
  status: RSVPStatus;
  submittedAt?: unknown;
  ipAddress?: string;
  userAgent?: string;
}

const COLLECTION_NAME = 'wedding_rsvps';

// Get client IP address (client-side only)
const getClientIP = async (): Promise<string> => {
  try {
    if (typeof window === 'undefined') {return '';}
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || '';
  } catch (error) {
    Logger.error('Could not get IP address', error);
    return '';
  }
};

/**
 * Save RSVP to Firestore
 */
export const saveRSVP = async (data: Omit<RSVPData, 'submittedAt' | 'ipAddress' | 'userAgent'>) => {
  try {
    const ipAddress = await getClientIP();
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';

    const rsvpData: RSVPData = {
      ...data,
      submittedAt: serverTimestamp(),
      ipAddress,
      userAgent
    };

    await addDoc(collection(db, COLLECTION_NAME), rsvpData);
    
    return { 
      success: true
    };
  } catch (error) {
    console.error('Error saving RSVP:', error);
    return { 
      success: false, 
      error: 'Gagal menyimpan data ke server'
    };
  }
};
