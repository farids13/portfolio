import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

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
    console.log("New device ID generated:", randomUUID);
  }

  return response;
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
};
