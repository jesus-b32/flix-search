"use server";

import { getData } from "../tmdapi";
import type { movieDetails, movieSearchResult, movieProviders } from "./types";

/**
 * Search for movies by their original, translated and alternative titles.
 * @param searchTerm - The search term
 * @param page - The page number of the results
 * @returns - The search results from the TMDB API or an error if the request fails
 */
export async function searchMovies(searchTerm: string, page = 1) {
  try {
    const results = await getData<movieSearchResult>(
      `/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=${page}`,
    );

    if (results instanceof Error) {
      return results;
    }

    return results;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error}`);
  }
}

/**
 * Get the top level details of a movie by ID along with the recommendations and watch providers information
 * @param movieId - The id of the movie
 * @returns - The movie details from the TMDB API or an error if the request fails
 */
export async function getMovieDetails(movieId: number) {
  const results = await getData<movieDetails>(
    `/movie/${movieId}?append_to_response=watch%2Fproviders,recommendations&language=en-US`,
  );
  return results;
}

/**
 * Get the list of streaming providers we have for movies.
 * Returns a list of the watch provider (OTT/streaming) data we have available for movies.
 * @returns
 */
export async function getMovieProviders() {
  const results = await getData<movieProviders>(
    `/watch/providers/movie?language=en-US`,
  );

  return results;
}
