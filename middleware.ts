import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export function middleware(request: NextRequest): NextResponse {
    const randomUUID = uuidv4();
    const isDeviceId = request.cookies.get("deviceId");
    const response = NextResponse.next();
    const url = request.nextUrl;

    response.headers.set("random-uuid", randomUUID);

    if(!isDeviceId){
        response.headers.set("Set-Cookie", `deviceId=${randomUUID}; ${process.env.COOKIE_OPTIONS}`);
        console.log(randomUUID);
    }

    if(!url.searchParams.has("lang")){
        url.searchParams.set("lang", "en");
        return NextResponse.redirect(url);
    }

    return response;
    
}

export const config = {
    matcher: ['/', '/:path*']
};

