/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication
 * @type {string[]}
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
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * A prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path for logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
