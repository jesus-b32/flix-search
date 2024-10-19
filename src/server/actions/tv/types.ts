/**
 * This file contains all the necessary
 * types for all TMDB tv API calls
 * being used in the project
 * @see https://developers.themoviedb.org/3
 */

import type { watchProviders } from "../types";

/**
 * type for list of tv search results
 * @see https://developer.themoviedb.org/reference/search-tv
 */
export type tvSearchResult = {
  page: number;
  results: {
    id: number;
    name: string;
    original_name: string;
    overview: string;
    vote_average: number;
    poster_path: string;
    backdrop_path: string;
    genre_ids: number[];
    popularity: number;
    first_air_date: string;
    original_language: string;
    vote_count: number;
    adult: boolean;
    origin_country: string[];
  }[];
  total_pages: number;
  total_results: number;
};

/**
 * type for list of tv recommendations. This is appended to response of tv details API endpoint
 * @see https://developer.themoviedb.org/reference/tv-series-recommendations
 */
export type TvRecommendations = {
  page: number;
  results: {
    id: number;
    name: string;
    poster_path: string;
    overview: string;
    first_air_date: string;
    original_language: string;
    original_name: string;
    backdrop_path: string;
    media_type: string;
    adult: boolean;
    genre_ids: number[];
    popularity: number;
    vote_count: number;
    origin_country: string[];
    vote_average: number;
  }[];
  total_pages: number;
  total_results: number;
};

/**
 * type for tv show details
 * @see https://developer.themoviedb.org/reference/tv-series-details
 */
export type tvDetails = {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  popularity: number;
  first_air_date: string;
  original_language: string;
  vote_count: number;
  adult: boolean;
  homepage: string;
  status: string;
  tagline: string;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  }[];
  episode_run_time: number[];
  networks: {
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];
  last_air_date: string;
  next_episode_to_air: string;
  in_production: boolean;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  type: string;
  "watch/providers": {
    results: watchProviders;
  };
  recommendations: TvRecommendations;
};
