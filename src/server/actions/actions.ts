"use server";

import { getData } from "@/lib/tmdbApi";
import type {
  countryList,
  languagesList,
  watchProviderRegions,
} from "@/server/actions/types";

/**
 * Get the list of countries used in the TMDB API
 * @returns - List of countries from the TMDB API or an error if the request fails
 */
export async function getCountries() {
  try {
    const results = await getData<countryList>(
      "/configuration/countries?language=en-US",
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getCountries:", {
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(`Failed to get countries: ${results.message}`);
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getCountries:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching countries. Please try again later.",
    );
  }
}

/**
 * Returns a list of languages used in the TMDB API.
 * @returns - List of languages from the TMDB API or an error if the request fails
 */
export async function getLanguages() {
  try {
    const results = await getData<languagesList>(`/configuration/languages`);

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getLanguages:", {
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(`Failed to get languages: ${results.message}`);
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getLanguages:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching languages. Please try again later.",
    );
  }
}

/**
 * Get the list of the countries we have watch provider (OTT/streaming) data for.
 * @returns - List of watch provider regions from the TMDB API or an error if the request fails
 */
export async function getWatchProviderRegions() {
  try {
    const results = await getData<watchProviderRegions>(
      `/watch/providers/regions?language=en-US`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getWatchProviderRegions:", {
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(
        `Failed to get watch provider regions: ${results.message}`,
      );
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getWatchProviderRegions:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching watch provider regions. Please try again later.",
    );
  }
}
