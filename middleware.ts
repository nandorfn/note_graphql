import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./app/utils/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  
  if (!token) {
    return NextResponse.rewrite(new URL("/login", req.url));
  }
  
  const verifiedToken = token && (await verifyAuth(token));
  const protectedPaths = [
    "/",
  ];

  if (!verifiedToken) {
    if (protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (verifiedToken) {
    if (req.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}
export const config = {
  matcher: [
    "/",
    "/login",
  ]
};