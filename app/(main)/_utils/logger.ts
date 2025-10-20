type LogLevel = 'error' | 'warn' | 'info' | 'debug';

interface LogPayload {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
  context?: Record<string, unknown>;
  url?: string;
  userAgent?: string;
}

class Logger {
  private static async sendToAPI(payload: LogPayload): Promise<void> {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      // Use sendBeacon for reliability (works even when page is closing)
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon('/api/logs', blob);
    } catch {
      // Fallback to fetch if sendBeacon fails
      try {
        await fetch('/api/logs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        });
      } catch {
        // Silent fail - don't break app if logging fails
      }
    }
  }

  private static createPayload(
    level: LogLevel,
    message: string,
    data?: unknown,
    error?: unknown,
    context?: Record<string, unknown>
  ): LogPayload {
    const payload: LogPayload = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
      context
    };

    if (typeof window !== 'undefined') {
      payload.url = window.location.href;
      payload.userAgent = window.navigator.userAgent;
    }

    if (error instanceof Error) {
      payload.error = {
        name: error.name,
        message: error.message,
        stack: error.stack
      };
    }

    return payload;
  }

  static error(message: string, error?: unknown, _p0?: string, context?: Record<string, unknown>): void {
    const payload = this.createPayload('error', message, undefined, error, context);
    
    // In development, also log to console for debugging
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[ERROR] ${message}`, { error, context });
    }

    // Send to API endpoint
    this.sendToAPI(payload);
  }

  static warn(message: string, data?: unknown): void {
    const payload = this.createPayload('warn', message, data);
    
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[WARN] ${message}`, data);
    }

    this.sendToAPI(payload);
  }

  static info(message: string, data?: unknown): void {
    const payload = this.createPayload('info', message, data);
    
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.info(`[INFO] ${message}`, data);
    }

    this.sendToAPI(payload);
  }

  static debug(message: string, data?: unknown): void {
    // Debug logs only in development
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.debug(`[DEBUG] ${message}`, data);
    }
  }
}

export default Logger;
