import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getPerformance } from 'firebase/performance';

import { firebaseConfig } from './firebase';

import Logger from '@/app/(main)/_utils/logger';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
let analytics: unknown;

const initializeServices = async () => {
  if (typeof window === 'undefined') {return;}

  if (await isAnalyticsSupported()) {
    analytics = getAnalytics(app);
  }

  if (process.env.NODE_ENV === 'production') {
    getPerformance(app);
  }

  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
    try {
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
        isTokenAutoRefreshEnabled: true
      });
    } catch (error) {
      Logger.error('Failed to initialize App Check', error);
    }
  }
};

// Track errors
const trackError = (error: Error, context: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined') {return;}

  Logger.error('Application Error', error, undefined, context);
};

// Track events
type EventName = 'page_view' | 'button_click' | 'form_submit' | 'error_occurred';

const trackEvent = (eventName: EventName, params: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined') {return;}
  
  if (process.env.NODE_ENV !== 'production') {
    Logger.info(`[Event] ${eventName}:`, params);
  }

  if (process.env.NODE_ENV === 'production' && analytics) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  }
};

export { initializeServices, trackError, trackEvent };
