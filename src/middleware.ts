import { NextResponse, NextRequest } from "next/server";
import { getSession } from "./app/actions/action";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "./lib/authentication";
export async function middleware(request: NextRequest) {
  // If the user is authenticated, continue as normal
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const path = request.nextUrl.pathname;

  const isAuthPath = path === "/login" || path === "/register";

  if (session.isLoggedIn && isAuthPath)
    return NextResponse.redirect(new URL("/", request.url));
  if (session.isLoggedIn) return NextResponse.next();

  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/dashboard", "/issues", "/login", "/register"],
};
