import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

interface LogPayload {
  level: 'error' | 'warn' | 'info' | 'debug';
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

export async function POST(request: NextRequest) {
  try {
    const payload: LogPayload = await request.json();
    
    // Validate payload
    if (!payload.level || !payload.message || !payload.timestamp) {
      return NextResponse.json(
        { error: 'Invalid log payload' },
        { status: 400 }
      );
    }

    // Create logs directory if it doesn't exist
    const logsDir = join(process.cwd(), 'logs');
    if (!existsSync(logsDir)) {
      await mkdir(logsDir, { recursive: true });
    }

    // Determine log file based on level
    const logFile = payload.level === 'error' 
      ? join(logsDir, 'error.log')
      : join(logsDir, 'combined.log');

    // Format log entry
    const logEntry = JSON.stringify({
      ...payload,
      serverTimestamp: new Date().toISOString()
    }) + '\n';

    // Append to log file
    await writeFile(logFile, logEntry, { flag: 'a' });

    // In development, also log to console
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(`[${payload.level.toUpperCase()}] ${payload.message}`, payload);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Failed to write log:', error);
    return NextResponse.json(
      { error: 'Failed to write log' },
      { status: 500 }
    );
  }
}
