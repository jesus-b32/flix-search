"use server";

import { getData } from "@/lib/tmdapi";
import type {
  countryList,
  languagesList,
  watchProviderRegions,
} from "@/server/actions/types";

/**
 * Get the list of countries used in the TMDB API
 * @returns - List of countries from the TMDB API
 */
export async function getCountries() {
  const results = await getData<countryList>(
    "/configuration/countries?language=en-US",
  );

  return results;
}

/**
 * Returns a list of languages used in the TMDB API.
 */
export async function getLanguages() {
  const results = await getData<languagesList>(`/configuration/languages`);

  return results;
}

/**
 * Get the list of the countries we have watch provider (OTT/streaming) data for.
 */
export async function getWatchProviderRegions() {
  const results = await getData<watchProviderRegions>(
    `/watch/providers/regions?language=en-US`,
  );

  return results;
}
