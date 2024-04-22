import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Define public paths that don't require authentication
  const publicPaths = ["/", "/signup"];

  // Check if the requested path requires authentication
  const requiresAuth = !publicPaths.includes(path);

  // Redirect unauthorized users to the home page
  if (requiresAuth && !token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Redirect authenticated users away from verify email and reset password pages
  if (token && (path === "/verifyEmail" )) {
    return NextResponse.redirect(new URL("/verifyEmail", req.nextUrl));

    
  }

  // if (token && (path === "/resetPassword" || path === "/verifyEmail")) {
  //   return NextResponse.redirect(new URL("/profile", req.nextUrl));
  // }
}

export const config = {
  // Define all paths to be matched by the middleware
  matcher: [
    "/", 
    "/signup", 
    "/profile",
    
    
  ],
};
