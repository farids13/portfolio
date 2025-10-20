# Logging System

## Overview

Aplikasi ini menggunakan sistem logging profesional dengan arsitektur client-server:

- **Client-side**: Logger mengirim log ke API endpoint menggunakan `navigator.sendBeacon` atau `fetch`
- **Server-side**: API route menerima log dan menyimpannya ke file di direktori `/logs`

## Keuntungan

✅ **Browser-safe**: Tidak menggunakan modul Node.js (`fs`, `path`) di client-side  
✅ **Reliable**: Menggunakan `sendBeacon` API yang bekerja bahkan saat halaman ditutup  
✅ **Production-ready**: Log hanya dikirim ke server, tidak ada console.log di production  
✅ **Structured**: Log disimpan dalam format JSON untuk mudah di-parse  
✅ **Contextual**: Menyimpan URL, user agent, error stack, dan context tambahan  

## Penggunaan

```typescript
import Logger from '@/app/(main)/_utils/logger';

// Error logging
try {
  // some code
} catch (error) {
  Logger.error('Failed to fetch data', error, undefined, { userId: '123' });
}

// Warning
Logger.warn('Deprecated API used', { apiVersion: 'v1' });

// Info
Logger.info('User logged in', { userId: '123' });

// Debug (hanya di development)
Logger.debug('Debug info', { someData: 'value' });
```

## Log Files

Log disimpan di direktori `/logs`:

- **error.log**: Hanya error logs
- **combined.log**: Semua logs (error, warn, info)

## Format Log

```json
{
  "level": "error",
  "message": "Failed to fetch data",
  "timestamp": "2025-01-20T09:00:00.000Z",
  "error": {
    "name": "TypeError",
    "message": "Cannot read property 'data' of undefined",
    "stack": "..."
  },
  "context": { "userId": "123" },
  "url": "https://example.com/page",
  "userAgent": "Mozilla/5.0...",
  "serverTimestamp": "2025-01-20T09:00:00.100Z"
}
```

## Development vs Production

### Development
- Log dikirim ke API endpoint
- Juga ditampilkan di console untuk debugging
- Debug logs aktif

### Production
- Log hanya dikirim ke API endpoint
- Tidak ada console output
- Debug logs tidak aktif

## Monitoring

Untuk monitoring production logs, Anda bisa:

1. **Manual**: Baca file di `/logs` directory
2. **Log aggregation**: Integrasikan dengan service seperti:
   - Datadog
   - Sentry
   - LogRocket
   - CloudWatch (jika di AWS)

## API Endpoint

**POST /api/logs**

Request body:
```json
{
  "level": "error",
  "message": "Error message",
  "timestamp": "2025-01-20T09:00:00.000Z",
  "data": {},
  "error": {
    "name": "Error",
    "message": "Error details",
    "stack": "..."
  },
  "context": {},
  "url": "https://example.com",
  "userAgent": "Mozilla/5.0..."
}
```

Response:
```json
{
  "success": true
}
```
