import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

import { db } from '@/lib/firebase';
const SESSION_KEY = 'wedding_session';
const generateRandomId = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit number
};

// Get or create session ID with guest name
const getSessionId = (guestName: string): string => {
  if (typeof window === 'undefined') {return 'server-session';}
  
  // Create URL-friendly slug from guest name
  const guestSlug = guestName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  // Try to get existing session from localStorage
  const storedSession = localStorage.getItem(SESSION_KEY);
  if (storedSession) {
    try {
      const session = JSON.parse(storedSession);
      if (session.id && session.guest === guestSlug) {
        return session.id;
      }
    } catch {
      console.warn('Invalid session data, creating new session');
    }
  }
  
  // Create new session
  const newSession = {
    id: `${generateRandomId()}-${guestSlug}`,
    guest: guestSlug,
    created: new Date().toISOString()
  };
  
  localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
  return newSession.id;
};

const getGuestName = (name: string | null | undefined): string => {
  if (name) {return name;}
  
  // Try to get from URL parameter
  if (typeof window !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('to') || 'Tamu Undangan';
  }
  
  return 'Tamu Undangan';
};

export const trackEvent = async (eventType: string, guestName: string | null = null, valueView: number, data: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined') {return;}

  const resolvedGuestName = getGuestName(guestName);

  const sessionId = getSessionId(resolvedGuestName);
  
  const eventData = {
    eventType,
    guestName: resolvedGuestName,
    valueView: valueView,
    sessionId,
    pageUrl: window.location.pathname,
    userAgent: navigator.userAgent,
    screenWidth: window.screen.width,
    timestamp: serverTimestamp(),
    entryTime: new Date().toISOString(),
    ...data
  };

  try {
    await setDoc(doc(collection(db, 'tracking')), eventData);
    // console.log('Event tracked successfully:', eventData);
  } catch (error) {
    console.error('Error saving to Firestore:', error);
  }
};