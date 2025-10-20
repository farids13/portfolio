import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export function middleware(): NextResponse {
  const randomUUID = uuidv4();
  const response = NextResponse.next();

  response.cookies.set({
    name: "deviceId",
    value: randomUUID,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  });

  return response;
}

export const config = {
  matcher: [
    '/((?!_next(?:/static|/image)|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|css|js|map)$).*)',
  ],
};
