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
  // Input validation
  if (!searchTerm || typeof searchTerm !== "string") {
    return new Error("Search term is required and must be a non-empty string");
  }

  if (typeof page !== "number" || page < 1 || !Number.isInteger(page)) {
    return new Error("Page must be a positive integer");
  }

  try {
    // Encode search term to handle special characters and spaces
    const encodedSearchTerm = encodeURIComponent(searchTerm.trim());
    const results = await getData<movieSearchResult>(
      `/search/movie?query=${encodedSearchTerm}&include_adult=false&language=en-US&page=${page}`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in searchMovies:", {
        searchTerm: searchTerm.trim(),
        page,
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(`Failed to search movies: ${results.message}`);
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in searchMovies:", {
      searchTerm: searchTerm.trim(),
      page,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while searching for movies. Please try again later.",
    );
  }
}

/**
 * Get the top level details of a movie by ID along with the recommendations and watch providers information
 * @param movieId - The id of the movie
 * @returns - The movie details from the TMDB API or an error if the request fails
 */
export async function getMovieDetails(movieId: number) {
  // Input validation
  if (
    typeof movieId !== "number" ||
    movieId <= 0 ||
    !Number.isInteger(movieId)
  ) {
    return new Error("Movie ID must be a positive integer");
  }

  try {
    const results = await getData<movieDetails>(
      `/movie/${movieId}?append_to_response=watch%2Fproviders,recommendations&language=en-US`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getMovieDetails:", {
        movieId,
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(`Failed to get movie details: ${results.message}`);
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getMovieDetails:", {
      movieId,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching movie details. Please try again later.",
    );
  }
}

/**
 * Get the list of streaming providers we have for movies.
 * Returns a list of the watch provider (OTT/streaming) data we have available for movies.
 * @param watchRegion - The region code for watch providers (optional)
 * @returns - The streaming providers list or an error if the request fails
 */
export async function getMovieProviders(watchRegion = "") {
  // Input validation
  if (typeof watchRegion !== "string") {
    return new Error("Watch region must be a string");
  }

  try {
    const results = await getData<streamingProviderList>(
      `/watch/providers/movie?language=en-US&watch_region=${watchRegion}`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getMovieProviders:", {
        watchRegion,
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(`Failed to get movie providers: ${results.message}`);
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getMovieProviders:", {
      watchRegion,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching movie providers. Please try again later.",
    );
  }
}

/**
 * Allows user to filter and sort the list of movies.
 * Returns a list of movies that match the user's sorting and filtering options.
 * @param queryParams - The query parameters for filtering and sorting
 * @returns - The discovered movies or an error if the request fails
 */
export async function discoverMovies(queryParams: string) {
  // Input validation
  if (typeof queryParams !== "string") {
    return new Error("Query parameters must be a string");
  }

  try {
    const results = await getData<movieSearchResult>(
      `/discover/movie?include_adult=false&include_video=false&language=en-US&${queryParams}`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in discoverMovies:", {
        queryParams,
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(`Failed to discover movies: ${results.message}`);
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in discoverMovies:", {
      queryParams,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while discovering movies. Please try again later.",
    );
  }
}

/**
 * Returns a list of genres used in the TMDB API for movies.
 * @returns - The list of movie genres or an error if the request fails
 */
export async function getGenreMovies() {
  try {
    const results = await getData<genresList>(`/genre/movie/list?language=en`);

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getGenreMovies:", {
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(`Failed to get movie genres: ${results.message}`);
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getGenreMovies:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching movie genres. Please try again later.",
    );
  }
}

/**
 * Returns a list of movies that are currently playing in theaters.
 * @returns - The list of now playing movies or an error if the request fails
 */
export async function getNowPlayingMovies() {
  try {
    const results = await getData<movieSearchResult>(
      `/movie/now_playing?language=en-US&page=1`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getNowPlayingMovies:", {
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(`Failed to get now playing movies: ${results.message}`);
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getNowPlayingMovies:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching now playing movies. Please try again later.",
    );
  }
}

/**
 * Returns a list of movies that are coming soon to theaters.
 * @returns - The list of upcoming movies or an error if the request fails
 */
export async function getComingSoonMovies() {
  try {
    const results = await getData<movieSearchResult>(
      `/movie/upcoming?language=en-US&page=1`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getComingSoonMovies:", {
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(`Failed to get upcoming movies: ${results.message}`);
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getComingSoonMovies:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching upcoming movies. Please try again later.",
    );
  }
}

/**
 * Returns a list of movies that are popular.
 * @returns - The list of popular movies or an error if the request fails
 */
export async function getPopularMovies() {
  try {
    const results = await getData<movieSearchResult>(
      `/movie/popular?language=en-US&page=1`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getPopularMovies:", {
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(`Failed to get popular movies: ${results.message}`);
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getPopularMovies:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching popular movies. Please try again later.",
    );
  }
}

/**
 * Returns a list of movies that are top rated.
 * @returns - The list of top rated movies or an error if the request fails
 */
export async function getTopRatedMovies() {
  try {
    const results = await getData<movieSearchResult>(
      `/movie/top_rated?language=en-US&page=1`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getTopRatedMovies:", {
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(`Failed to get top rated movies: ${results.message}`);
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getTopRatedMovies:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching top rated movies. Please try again later.",
    );
  }
}

/**
 * Returns a list of movies that are trending on TMDB this week.
 * @returns - The list of trending movies this week or an error if the request fails
 */
export async function getTrendingMoviesWeek() {
  try {
    const results = await getData<movieSearchResult>(
      `/trending/movie/week?language=en-US`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getTrendingMoviesWeek:", {
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(
        `Failed to get trending movies this week: ${results.message}`,
      );
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getTrendingMoviesWeek:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching trending movies this week. Please try again later.",
    );
  }
}

/**
 * Returns a list of movies that are trending on TMDB this day.
 * @returns - The list of trending movies today or an error if the request fails
 */
export async function getTrendingMoviesToday() {
  try {
    const results = await getData<movieSearchResult>(
      `/trending/movie/day?language=en-US`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getTrendingMoviesToday:", {
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(
        `Failed to get trending movies today: ${results.message}`,
      );
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getTrendingMoviesToday:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching trending movies today. Please try again later.",
    );
  }
}
