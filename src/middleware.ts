import { auth } from "@/server/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log("ROUTE: ", req.nextUrl.pathname);
  console.log("IS LOGGED IN: ", isLoggedIn);
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
