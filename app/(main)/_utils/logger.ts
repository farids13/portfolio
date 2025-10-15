// Simple logger utility
class Logger {
  static error(message: string, error?: any) {
    // In production, you might want to send this to an error tracking service
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[ERROR] ${message}`, error || '');
    }
  }

  static info(message: string, data?: any) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[INFO] ${message}`, data || '');
    }
  }

  static debug(message: string, data?: any) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, data || '');
    }
  }
}

export default Logger;
