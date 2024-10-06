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
export async function getData<T>(path: string): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, options);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}, status ${response.status}`);
  }

  return (await response.json()) as T;
}
