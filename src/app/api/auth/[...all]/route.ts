// Next.js
import { auth } from "@/auth";
import { toNextJsHandler } from "better-auth/next-js";

/**
 * The route for the authentication API.
 *
 * @returns the authentication API route
 */
export const { GET, POST } = toNextJsHandler(auth);
