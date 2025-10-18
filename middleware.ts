import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import type { NextRequest } from "next/server";

// Paths that should be excluded from middleware processing
const publicPaths = [
  "/_next",
  "/images",
  "/favicon.ico",
  "/api/uploadthing",
  "/fonts",
  "/assets"
];

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const randomUUID = uuidv4();
  const isDeviceId = request.cookies.get("deviceId");
  const response = NextResponse.next();

  response.headers.set("random-uuid", randomUUID);

  if (!isDeviceId) {
    response.cookies.set({
      name: "deviceId",
      value: randomUUID,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next(?:/static|/image)|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|css|js|map)$).*)',
  ],
};
