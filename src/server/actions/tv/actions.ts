"use server";

import { getData } from "@/lib/tmdbApi";
import type { tvDetails, tvSearchResult } from "@/server/actions/tv/types";
import type { streamingProviderList, genresList } from "@/server/actions/types";

/**
 * Search for tv shows by their original, translated and alternative titles.
 * @param searchTerm - The search term
 * @param page - The page number of the results
 * @returns - The search results from the TMDB API or an error if the request fails
 */
export async function searchTvShows(searchTerm: string, page = 1) {
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
    const results = await getData<tvSearchResult>(
      `/search/tv?query=${encodedSearchTerm}&include_adult=false&language=en-US&page=${page}`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in searchTvShows:", {
        searchTerm: searchTerm.trim(),
        page,
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(`Failed to search TV shows: ${results.message}`);
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in searchTvShows:", {
      searchTerm: searchTerm.trim(),
      page,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while searching for TV shows. Please try again later.",
    );
  }
}

/**
 * Get the top level details of a series by ID along with the recommendations and watch providers information
 * @param seriesId - The id of the tv series
 * @returns - The series details from the TMDB API or an error if the request fails
 */
export async function getTvShowDetails(seriesId: number) {
  // Input validation
  if (
    typeof seriesId !== "number" ||
    seriesId <= 0 ||
    !Number.isInteger(seriesId)
  ) {
    return new Error("Series ID must be a positive integer");
  }

  try {
    const results = await getData<tvDetails>(
      `/tv/${seriesId}?append_to_response=watch%2Fproviders,recommendations,external_ids&language=en-US`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getTvShowDetails:", {
        seriesId,
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(`Failed to get TV show details: ${results.message}`);
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getTvShowDetails:", {
      seriesId,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching TV show details. Please try again later.",
    );
  }
}

/**
 * Get the list of streaming providers we have for tv series.
 * Returns a list of the watch provider (OTT/streaming) data we have available for tv series.
 * @param watchRegion - The region code for watch providers (optional)
 * @returns - The streaming providers list or an error if the request fails
 */
export async function getTvShowProviders(watchRegion = "") {
  // Input validation
  if (typeof watchRegion !== "string") {
    return new Error("Watch region must be a string");
  }

  try {
    const results = await getData<streamingProviderList>(
      `/watch/providers/tv?language=en-US&watch_region=${watchRegion}`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getTvShowProviders:", {
        watchRegion,
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(`Failed to get TV show providers: ${results.message}`);
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getTvShowProviders:", {
      watchRegion,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching TV show providers. Please try again later.",
    );
  }
}

/**
 * Allows user to filter and sort the list of tv show.
 * Returns a list of tv shows that match the user's sorting and filtering options.
 * @param queryParams - The query parameters for filtering and sorting
 * @returns - The discovered TV shows or an error if the request fails
 */
export async function discoverTvShow(queryParams: string) {
  // Input validation
  if (typeof queryParams !== "string") {
    return new Error("Query parameters must be a string");
  }

  try {
    const results = await getData<tvSearchResult>(
      `/discover/tv?include_adult=false&include_video=false&language=en-US&${queryParams}`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in discoverTvShow:", {
        queryParams,
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(`Failed to discover TV shows: ${results.message}`);
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in discoverTvShow:", {
      queryParams,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while discovering TV shows. Please try again later.",
    );
  }
}

/**
 * Returns a list of genres used in the TMDB API for tv shows.
 * @returns - The list of TV show genres or an error if the request fails
 */
export async function getGenreTvShows() {
  try {
    const results = await getData<genresList>(`/genre/tv/list?language=en`);

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getGenreTvShows:", {
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(`Failed to get TV show genres: ${results.message}`);
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getGenreTvShows:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching TV show genres. Please try again later.",
    );
  }
}

/**
 * Returns a list of tv shows that are currently airing today.
 * @returns - The list of TV shows airing today or an error if the request fails
 */
export async function getAiringTodayTvShows() {
  try {
    const results = await getData<tvSearchResult>(
      `/tv/airing_today?language=en-US&page=1`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getAiringTodayTvShows:", {
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(
        `Failed to get TV shows airing today: ${results.message}`,
      );
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getAiringTodayTvShows:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching TV shows airing today. Please try again later.",
    );
  }
}

/**
 * Returns a list of tv shows that are coming soon, in the next 7 days.
 * @returns - The list of upcoming TV shows or an error if the request fails
 */
export async function getComingSoonTvShows() {
  try {
    const results = await getData<tvSearchResult>(
      `/tv/on_the_air?language=en-US&page=1`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getComingSoonTvShows:", {
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(`Failed to get upcoming TV shows: ${results.message}`);
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getComingSoonTvShows:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching upcoming TV shows. Please try again later.",
    );
  }
}

/**
 * Returns a list of tv shows that are popular.
 * @returns - The list of popular TV shows or an error if the request fails
 */
export async function getPopularTvShows() {
  try {
    const results = await getData<tvSearchResult>(
      `/tv/popular?language=en-US&page=1`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getPopularTvShows:", {
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(`Failed to get popular TV shows: ${results.message}`);
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getPopularTvShows:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching popular TV shows. Please try again later.",
    );
  }
}

/**
 * Returns a list of tv shows that are top rated.
 * @returns - The list of top rated TV shows or an error if the request fails
 */
export async function getTopRatedTvShows() {
  try {
    const results = await getData<tvSearchResult>(
      `/tv/top_rated?language=en-US&page=1`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getTopRatedTvShows:", {
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(`Failed to get top rated TV shows: ${results.message}`);
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getTopRatedTvShows:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching top rated TV shows. Please try again later.",
    );
  }
}

/**
 * Returns a list of tv shows that are trending on TMDB this week.
 * @returns - The list of trending TV shows this week or an error if the request fails
 */
export async function getTrendingTvShowsWeek() {
  try {
    const results = await getData<tvSearchResult>(
      `/trending/tv/week?language=en-US`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getTrendingTvShowsWeek:", {
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(
        `Failed to get trending TV shows this week: ${results.message}`,
      );
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getTrendingTvShowsWeek:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching trending TV shows this week. Please try again later.",
    );
  }
}

/**
 * Returns a list of tv shows that are trending on TMDB this day.
 * @returns - The list of trending TV shows today or an error if the request fails
 */
export async function getTrendingTvShowsToday() {
  try {
    const results = await getData<tvSearchResult>(
      `/trending/tv/day?language=en-US`,
    );

    if (results instanceof Error) {
      // Log the specific error for debugging
      console.error("TMDB API error in getTrendingTvShowsToday:", {
        error: results.message,
        timestamp: new Date().toISOString(),
      });
      return new Error(
        `Failed to get trending TV shows today: ${results.message}`,
      );
    }

    return results;
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Unexpected error in getTrendingTvShowsToday:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching trending TV shows today. Please try again later.",
    );
  }
}
