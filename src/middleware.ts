import { auth } from "@/auth";
import {
  protectedRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

/**
 * Middleware checks if a user is logged in or not.
 * If the user is not logged in and tries to access protectedRoutes, it will redirect the user to the login page.
 * If the user is logged in and tries to access authRoutes, it will redirect the user to the home page.
 */
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; //"!!" turn req.auth to a boolean

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isProtectedRoute =
    protectedRoutes.includes(nextUrl.pathname) ||
    (nextUrl.pathname.startsWith("/user/") &&
      nextUrl.pathname.endsWith("/watchlist"));
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  //must be in this order when checking routes
  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && isProtectedRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});

// Don't invoke Middleware on the paths that match the regex pattern below
export const config = {
  /**
   * got the regex pattern from clerk doc
   * @ https://clerk.com/docs/references/nextjs/clerk-middleware
   */
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
