// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodedToken } from "@/utils/jwt";
import { authKey } from "./constants/storageKey";
import { USER_TYPE } from "./constants/type";

export async function middleware(req: NextRequest) {
  console.log("Middleware triggered for:", req.nextUrl.pathname);

  // Get the token from cookies
  const authToken = req.cookies.get(`${authKey}`)?.value; // Ensure 'authKey' matches the key used in storeUserInfo---> You will get this from "constants/storageKey.ts"
  console.log("Auth token from cookies:", authToken);

  let userInfo = null;

  if (authToken) {
    try {
      userInfo = decodedToken(authToken);
      console.log("Decoded user info:", userInfo);
    } catch (error) {
      console.error("Token decoding failed:", error);
    }
  } else {
    console.warn("No auth token found in cookies");
  }

  if (req.nextUrl.pathname.startsWith("/parent")) {
    if (!userInfo || userInfo.type !== USER_TYPE.PARENT) {
      console.log("Redirecting to homepage from /parent route");
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else if (req.nextUrl.pathname.startsWith("/student")) {
    if (!userInfo || userInfo.type !== USER_TYPE.STUDENT) {
      console.log("Redirecting to homepage from /student route");
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else if (req.nextUrl.pathname.startsWith("/instructor")) {
    if (!userInfo || userInfo.type !== USER_TYPE.INSTRUCTOR) {
      console.log("Redirecting to homepage from /student route");
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  console.log("Allowing access to:", req.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/parent/:path*", "/student/:path*", "/instructor/:path*"],
};
