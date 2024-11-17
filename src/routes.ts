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
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect users to settings page
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * A prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path for logging in
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
