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
 * @returns The JSON response from the API, or throws an error if the request fails
 */
export async function getData<T>(path: string): Promise<T | Error> {
  try {
    const response = await fetch(`${baseUrl}${path}`, options);

    if (!response.ok) {
      const error = (await response.json()) as Error;
      return new Error(
        `Response status: ${response.status} - ${error.name}: ${error.message}`,
      );
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    return error as Error;
  }
}
