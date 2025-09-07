import { env } from "@/env";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = env.TMDB_API_KEY;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};

/**
 * Makes a GET request to the TMDB API
 * @param path The path to query from base url, must be a valid TMDB API endpoint
 * @returns The JSON response from the API, or an Error if the request fails
 */
export async function getData<T>(path: string): Promise<T | Error> {
  // Input validation
  if (!path || typeof path !== "string" || path.trim().length === 0) {
    return new Error("Path is required and must be a non-empty string");
  }

  // Ensure path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  try {
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${baseUrl}${normalizedPath}`, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

      try {
        // Try to parse error response from TMDB API
        const errorData = (await response.json()) as {
          status_message?: string;
          message?: string;
        };
        if (errorData?.status_message) {
          errorMessage = `TMDB API Error: ${errorData.status_message}`;
        } else if (errorData?.message) {
          errorMessage = `API Error: ${errorData.message}`;
        }
      } catch (jsonError) {
        // If we can't parse the error response, use the status text
        console.warn("Failed to parse error response:", jsonError);
      }

      // Log API errors for debugging
      console.error("TMDB API error:", {
        path: normalizedPath,
        status: response.status,
        statusText: response.statusText,
        errorMessage,
        timestamp: new Date().toISOString(),
      });

      return new Error(errorMessage);
    }

    // Parse successful response
    try {
      const data = (await response.json()) as T;
      return data;
    } catch (jsonError) {
      // Log JSON parsing errors
      console.error("JSON parsing error:", {
        path: normalizedPath,
        error:
          jsonError instanceof Error ? jsonError.message : "Unknown JSON error",
        timestamp: new Date().toISOString(),
      });

      return new Error("Failed to parse response data from TMDB API");
    }
  } catch (error) {
    // Handle different types of errors
    let errorMessage = "An unexpected error occurred while fetching data";

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        errorMessage = "Request timed out. Please try again later.";
      } else if (error.message.includes("fetch")) {
        errorMessage =
          "Network error. Please check your connection and try again.";
      } else {
        errorMessage = error.message;
      }
    }

    // Log unexpected errors for debugging
    console.error("Unexpected error in getData:", {
      path: normalizedPath,
      error: error instanceof Error ? error.message : "Unknown error",
      errorType: error instanceof Error ? error.constructor.name : typeof error,
      timestamp: new Date().toISOString(),
    });

    return new Error(errorMessage);
  }
}
