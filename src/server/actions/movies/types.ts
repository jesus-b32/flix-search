/**
 * This file contains all the necessary
 * types for all TMDB movie API calls
 * being used in the project
 * @see https://developers.themoviedb.org/3
 */

import type { watchProviders } from "../types";

/**
 * type for list of movie search results
 * @see https://developer.themoviedb.org/reference/search-movie
 */
export type movieSearchResult = {
  page: number;
  results: {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    vote_average: number;
    poster_path: string;
    backdrop_path: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    original_language: string;
    vote_count: number;
    adult: boolean;
    video: boolean;
  }[];
  total_pages: number;
  total_results: number;
};

/**
 * type for list of movie recommendations. This is appended to response of movie details API endpoint
 * @see https://developer.themoviedb.org/reference/movie-recommendations
 */
export type MovieRecommendations = {
  page: number;
  results: {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    original_language: string;
    original_title: string;
    backdrop_path: string;
    media_type: string;
    adult: boolean;
    genre_ids: number[];
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
  }[];
  total_pages: number;
  total_results: number;
};

/**
 * type for movie details
 * @see https://developer.themoviedb.org/reference/movie-details
 */
export type movieDetails = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  popularity: number;
  release_date: string;
  original_language: string;
  vote_count: number;
  adult: boolean;
  video: boolean;
  belongs_to_collection: string;
  budget: number;
  homepage: string;
  imdb_id: string;
  revenue: number;
  runtime: number;
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
    english_name: string;
    iso_3166_1: string;
    name: string;
  }[];
  "watch/providers": {
    results: watchProviders; // make it optional?
  };
  recommendations: MovieRecommendations;
};
