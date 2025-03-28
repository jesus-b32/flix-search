/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication
 */
export const publicRoutes = [
  "/",
  "/movie",
  "/tv",
  "/about",
  "/search/movie",
  "/search/tv",
  "/auth/new-verification",
];

/**
 * An array of routes that are accessible to logged in users.
 * These routes do require authentication.
 */
export const protectedRoutes = [
  "/settings/delete-account",
  "/settings/profile",
  "/settings",
  "/user",
];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to home page.
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * Should always be allowed for logged in or logged out users and not be blocked.
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in.
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
