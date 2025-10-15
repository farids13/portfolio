import { initializeApp } from 'firebase/app';
import { getPerformance } from 'firebase/performance';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebase';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
let analytics: any;
let performance: any;

const initializeServices = async () => {
  if (typeof window === 'undefined') return;

  // Initialize Analytics if supported
  if (await isAnalyticsSupported()) {
    analytics = getAnalytics(app);
  }

  // Initialize Performance Monitoring in production
  if (process.env.NODE_ENV === 'production') {
    performance = getPerformance(app);
  }

  // Initialize App Check in production
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
    try {
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
        isTokenAutoRefreshEnabled: true
      });
    } catch (error) {
      console.error('Failed to initialize App Check', error);
    }
  }
};

// Track errors
const trackError = (error: Error, context: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;
  
  // Log to console in development
  if (process.env.NODE_ENV !== 'production') {
    console.error('Error:', error, 'Context:', context);
  }

  // In production, this would send to your error tracking service
  if (process.env.NODE_ENV === 'production') {
    // You can implement your error tracking logic here
    // For example, sending to your own error tracking endpoint
    // or using a third-party service
    
    // Example: Sending to a hypothetical error tracking endpoint
    if (typeof window !== 'undefined' && window.navigator.onLine) {
      navigator.sendBeacon('/api/log-error', JSON.stringify({
        error: error.toString(),
        stack: error.stack,
        context,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: window.navigator.userAgent,
      }));
    }
  }
};

// Track events
type EventName = 'page_view' | 'button_click' | 'form_submit' | 'error_occurred';

const trackEvent = (eventName: EventName, params: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;
  
  // Log to console in development
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Event] ${eventName}:`, params);
  }

  // In production, this would send to your analytics service
  if (process.env.NODE_ENV === 'production' && analytics) {
    // You can implement your analytics tracking logic here
    // For example, using Google Analytics 4 with gtag
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  }
};

export { initializeServices, trackError, trackEvent };
