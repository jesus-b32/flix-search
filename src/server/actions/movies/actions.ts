"use server";

import { getData } from "@/lib/tmdbApi";
import type {
  movieDetails,
  movieSearchResult,
} from "@/server/actions/movies/types";
import type { streamingProviderList, genresList } from "@/server/actions/types";

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
    `/discover/movie?include_adult=false&include_video=false&language=en-US&${queryParams}`,
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

/**
 * Returns a list of movies that are currently playing in theaters.
 */
export async function getNowPlayingMovies() {
  const results = await getData<movieSearchResult>(
    `/movie/now_playing?language=en-US&page=1`,
  );

  return results;
}

/**
 * Returns a list of movies that are coming soon to theaters.
 */
export async function getComingSoonMovies() {
  const results = await getData<movieSearchResult>(
    `/movie/upcoming?language=en-US&page=1`,
  );

  return results;
}

/**
 * Returns a list of movies that are popular.
 */
export async function getPopularMovies() {
  const results = await getData<movieSearchResult>(
    `/movie/popular?language=en-US&page=1`,
  );

  return results;
}

/**
 * Returns a list of movies that are top rated.
 */
export async function getTopRatedMovies() {
  const results = await getData<movieSearchResult>(
    `/movie/top_rated?language=en-US&page=1`,
  );

  return results;
}

/**
 * Returns a list of movies that are trending on TMDB this week.
 */
export async function getTrendingMoviesWeek() {
  const results = await getData<movieSearchResult>(
    `/trending/movie/week?language=en-US`,
  );

  return results;
}

/**
 * Returns a list of movies that are trending on TMDB this day.
 */
export async function getTrendingMoviesToday() {
  const results = await getData<movieSearchResult>(
    `/trending/movie/day?language=en-US`,
  );

  return results;
}
