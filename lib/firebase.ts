import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';
import { initializeApp, getApps } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getFirestore } from 'firebase/firestore';
import { getPerformance } from 'firebase/performance';

import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';


declare global {
  interface Window {
    FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean | string;
  }
}

// Add gtag to Window interface
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
} as const;

let firebaseApp: FirebaseApp;
let db: Firestore;
let analytics: unknown;

const initializeServices = async () => {
  if (typeof window === 'undefined') {return;}

  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp);

    // Initialize Analytics if measurementId is available
    if (process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) {
      const analyticsSupported = await isAnalyticsSupported();
      if (analyticsSupported) {
        analytics = getAnalytics(firebaseApp);
      }
    }

    // Initialize Performance Monitoring
    if (process.env.NODE_ENV === 'production') {
      getPerformance(firebaseApp);
    }

    // Initialize App Check in production
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      try {
        // This token should be replaced with your reCAPTCHA v3 site key
        const appCheckToken = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
        
        if (appCheckToken) {
          initializeAppCheck(firebaseApp, {
            provider: new ReCaptchaV3Provider(appCheckToken),
            isTokenAutoRefreshEnabled: true
          });
        }
      } catch (error) {
        console.error('Failed to initialize App Check', error);
      }
    }
  }
};

// Initialize services when in browser
if (typeof window !== 'undefined') {
  initializeServices().catch(console.error);
}

export { firebaseApp, db, analytics };

export const initializeFirebase = async () => {
  if (typeof window === 'undefined') {return { firebaseApp, db };}
  
  await initializeServices();
  return { firebaseApp, db };
};
