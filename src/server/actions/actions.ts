"use server";

import { getData } from "./tmdapi";
import type { countries } from "./types";

/**
 * Get the list of countries used in the TMDB API
 * @returns - List of countries from the TMDB API
 */
export async function getCountries() {
  const results = await getData<countries>(
    "/configuration/countries?language=en-US",
  );

  return results;
}