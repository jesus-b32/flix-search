"use server";

import { getData } from "../tmdapi";
import type { tvDetails, tvSearchResult } from "./types";
import type { streamingProviderList, genresList } from "../types";

/**
 * Search for tv shows by their original, translated and alternative titles.
 * @param searchTerm - The search term
 * @param page - The page number of the results
 * @returns - The search results from the TMDB API or an error if the request fails
 */
export async function searchTvShows(searchTerm: string, page = 1) {
  try {
    const results = await getData<tvSearchResult>(
      `/search/tv?query=${searchTerm}&include_adult=false&language=en-US&page=${page}`,
    );

    if (results instanceof Error) {
      return results;
    }

    return results;
  } catch {
    throw new Error(`Failed to fetch data`);
  }
}

/**
 * Get the top level details of a series by ID along with the recommendations and watch providers information
 * @param seriesId - The id of the tv series
 * @returns - The series details from the TMDB API or an error if the request fails
 */
export async function getTvShowDetails(seriesId: number) {
  const results = await getData<tvDetails>(
    `/tv/${seriesId}?append_to_response=watch%2Fproviders,recommendations&language=en-US`,
  );
  return results;
}

/**
 * Get the list of streaming providers we have for tv series.
 * Returns a list of the watch provider (OTT/streaming) data we have available for tv series.
 * @returns
 */
export async function getTvShowProviders(watchRegion = "") {
  const results = await getData<streamingProviderList>(
    `/watch/providers/tv?language=en-US&watch_region=${watchRegion}`,
  );

  return results;
}

/**
 * Allows user to filter and sort the list of tv show.
 * Returns a list of tv shows that match the user's sorting and filtering options.
 */
export async function discoverTvShow(queryParams: string) {
  const results = await getData<tvSearchResult>(
    `/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&${queryParams}`,
  );

  return results;
}

/**
 * Returns a list of genres used in the TMDB API for tv shows.
 */
export async function getGenreTvShows() {
  const results = await getData<genresList>(`/genre/tv/list?language=en`);

  return results;
}
