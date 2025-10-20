import fs from 'fs';
import path from 'path';

import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';


// Log error endpoint to handle client-side error logging
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { level, message, error, context, timestamp, url, userAgent } = body;

    // Create logs directory if it doesn't exist
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    // Log to file
    const logEntry = {
      timestamp: timestamp || new Date().toISOString(),
      level,
      message,
      error,
      context,
      url,
      userAgent,
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    };

    // Append to error log file
    const logFile = path.join(logsDir, 'client-errors.log');
    fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');

    // For now, we'll just log it and return success
    // In production, you might want to send to external services like Sentry, etc.

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Failed to log error:', error);
    return NextResponse.json(
      { error: 'Failed to log error' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ status: 'ok' }, { status: 200 });
}
