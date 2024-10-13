/**
 * This file contains all the necessary
 * types for all TMDB movie API calls
 * being used in the project
 * @see https://developers.themoviedb.org/3
 */

import type { watchProviders } from "../types";

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

type MovieRecommendations = {
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
    results?: watchProviders;
  };
  recommendations: MovieRecommendations;
};

/**
 * type for list of the watch provider data we have available for movies
 * see https://developer.themoviedb.org/reference/watch-providers-movie-list
 */
export type movieProviders = {
  results: {
    // need to add a display_priorities field?
    display_priority: number;
    logo_path: string;
    provider_id: number;
    provider_name: string;
  }[];
};
