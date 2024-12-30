import type {
  countryList,
  streamingProviderList,
} from "@/server/actions/types";
import type { movieDetails } from "@/server/actions/movies/types";
import type { tvDetails } from "@/server/actions/tv/types";

export const mockCountries: countryList = [
  {
    iso_3166_1: "CA",
    english_name: "Canada",
    native_name: "Canada",
  },
  {
    iso_3166_1: "US",
    english_name: "United States",
    native_name: "United States",
  },
  {
    iso_3166_1: "GB",
    english_name: "United Kingdom",
    native_name: "United Kingdom",
  },
];

export const mockMovieDetails: movieDetails = {
  id: 1,
  title: "Example Movie",
  original_title: "Example Movie",
  overview: "This is an example movie overview.",
  poster_path: "/path/to/poster.jpg",
  backdrop_path: "/path/to/backdrop.jpg",
  release_date: "2022-01-01",
  vote_average: 7.5,
  vote_count: 1000,
  genres: [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
  ],
  runtime: 120,
  spoken_languages: [
    { english_name: "English", iso_639_1: "en", name: "English" },
  ],
  popularity: 50.5,
  status: "Released",
  tagline: "This is a movie tagline.",
  adult: false,
  video: false,
  belongs_to_collection: "",
  budget: 1000000,
  homepage: "https://example.com/movie",
  imdb_id: "tt1234567",
  revenue: 10000000,
  original_language: "en",
  production_companies: [],
  production_countries: [],
  recommendations: {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1,
  },
  "watch/providers": {
    results: {
      US: {
        link: "https://example.com/movie",
        flatrate: [
          {
            logo_path: "/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
            provider_id: 9,
            provider_name: "Amazon Prime Video",
            display_priority: 2,
          },
          {
            logo_path: "/fksCUZ9QDWZMUwL2LgMtLckROUN.jpg",
            provider_id: 1899,
            provider_name: "Max",
            display_priority: 10,
          },
        ],
        rent: [
          {
            logo_path: "/8z7rC8uIDaTM91X0ZfkRf04ydj2.jpg",
            provider_id: 3,
            provider_name: "Google Play Movies",
            display_priority: 16,
          },
          {
            logo_path: "/pTnn5JwWr4p3pG8H6VrpiQo7Vs0.jpg",
            provider_id: 192,
            provider_name: "YouTube",
            display_priority: 17,
          },
        ],
        buy: [
          {
            logo_path: "/seGSXajazLMCKGB5hnRCidtjay1.jpg",
            provider_id: 10,
            provider_name: "Amazon Video",
            display_priority: 5,
          },
          {
            logo_path: "/9ghgSC0MA082EL6HLCW3GalykFD.jpg",
            provider_id: 2,
            provider_name: "Apple TV",
            display_priority: 6,
          },
        ],
      },
      GB: {
        link: "https://example.com/movie",
        flatrate: [
          {
            logo_path: "/1UrT2H9x6DuQ9ytNhsSCUFtTUwS.jpg",
            provider_id: 29,
            provider_name: "Sky Go",
            display_priority: 11,
          },
          {
            logo_path: "/6sJLsWk4TZHz1EffmTRSkaDehkh.jpg",
            provider_id: 591,
            provider_name: "Now TV Cinema",
            display_priority: 60,
          },
          {
            logo_path: "/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
            provider_id: 9,
            provider_name: "Amazon Prime Video",
            display_priority: 2,
          },
        ],
        rent: [
          {
            logo_path: "/bZvc9dXrXNly7cA0V4D9pR8yJwm.jpg",
            provider_id: 35,
            provider_name: "Rakuten TV",
            display_priority: 5,
          },
          {
            logo_path: "/6AKbY2ayaEuH4zKg2prqoVQ9iaY.jpg",
            provider_id: 130,
            provider_name: "Sky Store",
            display_priority: 17,
          },
        ],
        buy: [
          {
            logo_path: "/seGSXajazLMCKGB5hnRCidtjay1.jpg",
            provider_id: 10,
            provider_name: "Amazon Video",
            display_priority: 7,
          },
          {
            logo_path: "/pTnn5JwWr4p3pG8H6VrpiQo7Vs0.jpg",
            provider_id: 192,
            provider_name: "YouTube",
            display_priority: 22,
          },
        ],
      },
    },
  },
};

export const mockTvDetails: tvDetails = {
  id: 1,
  name: "Example TV show",
  original_name: "Example TV show",
  overview: "This is an example tv show overview.",
  poster_path: "/path/to/poster.jpg",
  backdrop_path: "/path/to/backdrop.jpg",
  first_air_date: "2022-01-01",
  vote_average: 7.5,
  vote_count: 1000,
  genres: [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
  ],
  episode_run_time: [120],
  spoken_languages: [
    { english_name: "English", iso_639_1: "en", name: "English" },
  ],
  popularity: 50.5,
  status: "Released",
  tagline: "This is a movie tagline.",
  adult: false,
  homepage: "https://example.com/movie",
  original_language: "en",
  production_companies: [],
  production_countries: [],
  origin_country: [],
  last_air_date: "2022-01-01",
  in_production: false,
  next_episode_to_air: "n/a",
  number_of_episodes: 10,
  number_of_seasons: 2,
  type: "tv",
  seasons: [],
  created_by: [],
  networks: [],
  last_episode_to_air: {
    id: 1,
    name: "Example episode",
    overview: "This is an example episode overview.",
    still_path: "/path/to/still.jpg",
    air_date: "2022-01-01",
    episode_number: 1,
    vote_average: 7.5,
    vote_count: 1000,
    production_code: "ABC123",
    season_number: 1,
    runtime: 120,
    show_id: 1,
  },
  recommendations: {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 10,
  },
  "watch/providers": {
    results: {
      US: {
        link: "https://example.com/movie",
        flatrate: [
          {
            logo_path: "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
            provider_id: 8,
            provider_name: "Netflix",
            display_priority: 0,
          },
          {
            logo_path: "/fksCUZ9QDWZMUwL2LgMtLckROUN.jpg",
            provider_id: 1899,
            provider_name: "Max",
            display_priority: 10,
          },
        ],
        buy: [
          {
            logo_path: "/seGSXajazLMCKGB5hnRCidtjay1.jpg",
            provider_id: 10,
            provider_name: "Amazon Video",
            display_priority: 5,
          },
          {
            logo_path: "/9ghgSC0MA082EL6HLCW3GalykFD.jpg",
            provider_id: 2,
            provider_name: "Apple TV",
            display_priority: 6,
          },
        ],
      },
      GB: {
        link: "https://example.com/movie",
        buy: [
          {
            logo_path: "/9ghgSC0MA082EL6HLCW3GalykFD.jpg",
            provider_id: 2,
            provider_name: "Apple TV",
            display_priority: 4,
          },
          {
            logo_path: "/seGSXajazLMCKGB5hnRCidtjay1.jpg",
            provider_id: 10,
            provider_name: "Amazon Video",
            display_priority: 7,
          },
        ],
        flatrate: [
          {
            logo_path: "/1UrT2H9x6DuQ9ytNhsSCUFtTUwS.jpg",
            provider_id: 29,
            provider_name: "Sky Go",
            display_priority: 11,
          },
        ],
      },
    },
  },
};

export const mockNoWatchProviderData: movieDetails = {
  id: 1,
  title: "Example Movie",
  original_title: "Example Movie",
  overview: "This is an example movie overview.",
  poster_path: "/path/to/poster.jpg",
  backdrop_path: "/path/to/backdrop.jpg",
  release_date: "2022-01-01",
  vote_average: 7.5,
  vote_count: 1000,
  genres: [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
  ],
  runtime: 120,
  spoken_languages: [
    { english_name: "English", iso_639_1: "en", name: "English" },
  ],
  popularity: 50.5,
  status: "Released",
  tagline: "This is a movie tagline.",
  adult: false,
  video: false,
  belongs_to_collection: "",
  budget: 1000000,
  homepage: "https://example.com/movie",
  imdb_id: "tt1234567",
  revenue: 10000000,
  original_language: "en",
  production_companies: [],
  production_countries: [],
  recommendations: {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1,
  },
  "watch/providers": {
    results: {},
  },
};

export const streamingProviders: streamingProviderList = {
  results: [
    {
      display_priority: 5,
      logo_path: "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
      provider_id: 8,
      provider_name: "Netflix",
    },
    {
      display_priority: 2,
      logo_path: "/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
      provider_id: 9,
      provider_name: "Amazon Prime Video",
    },
    {
      display_priority: 27,
      logo_path: "/97yvRBw1GzX7fXprcF80er19ot.jpg",
      provider_id: 337,
      provider_name: "Disney Plus",
    },
    {
      display_priority: 29,
      logo_path: "/fksCUZ9QDWZMUwL2LgMtLckROUN.jpg",
      provider_id: 1899,
      provider_name: "Max",
    },
  ],
};
