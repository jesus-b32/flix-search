"use server";

import { getData } from "../tmdapi";
import type { movieDetails, movieSearchResult } from "./types";
import type { streamingProviderList, genresList } from "../types";

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
  } catch {
    throw new Error(`Failed to fetch data`);
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
export async function getMovieProviders(watchRegion = "") {
  const results = await getData<streamingProviderList>(
    `/watch/providers/movie?language=en-US&watch_region=${watchRegion}`,
  );

  return results;
}

/**
 * Allows user to filter and sort the list of movies.
 * Returns a list of movies that match the user's sorting and filtering options.
 */
export async function discoverMovies(queryParams: string) {
  const results = await getData<movieSearchResult>(
    `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&${queryParams}`,
  );

  return results;
}

/**
 * Returns a list of genres used in the TMDB API for movies.
 */
export async function getGenreMovies() {
  const results = await getData<genresList>(`/genre/movie/list?language=en`);

  return results;
}
