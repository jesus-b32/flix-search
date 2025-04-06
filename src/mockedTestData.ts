import type {
  countryList,
  streamingProviderList,
} from "@/server/actions/types";
import type {
  movieDetails,
  MovieRecommendations,
} from "@/server/actions/movies/types";
import type { tvDetails, TvRecommendations } from "@/server/actions/tv/types";

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
  external_ids: {
    id: 1,
    imdb_id: "tt1234567",
    freebase_mid: "tt1234567",
    freebase_id: "tt1234567",
    tvdb_id: 1234567,
    tvrage_id: 1234567,
    wikidata_id: "tt1234567",
    facebook_id: "tt1234567",
    instagram_id: "tt1234567",
    twitter_id: "tt1234567",
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

export const mockMovieRecommendations: MovieRecommendations = {
  page: 1,
  results: [
    {
      backdrop_path: "/69EFgWWPFWbRNHmQgYdSnyJ94Ge.jpg",
      id: 49521,
      title: "Man of Steel",
      original_title: "Man of Steel",
      overview:
        "A young boy learns that he has extraordinary powers and is not of this earth. As a young man, he journeys to discover where he came from and what he was sent here to do. But the hero in him must emerge if he is to save the world from annihilation and become the symbol of hope for all mankind.",
      poster_path: "/dksTL9NXc3GqPBRHYHcy1aIwjS.jpg",
      media_type: "movie",
      adult: false,
      original_language: "en",
      genre_ids: [28, 12, 878],
      popularity: 69.806,
      release_date: "2013-06-12",
      video: false,
      vote_average: 6.628,
      vote_count: 15137,
    },
    {
      backdrop_path: "/wdwcOBMkt3zmPQuEMxB3FUtMio2.jpg",
      id: 271110,
      title: "Captain America: Civil War",
      original_title: "Captain America: Civil War",
      overview:
        "Following the events of Age of Ultron, the collective governments of the world pass an act designed to regulate all superhuman activity. This polarizes opinion amongst the Avengers, causing two factions to side with Iron Man or Captain America, which causes an epic battle between former allies.",
      poster_path: "/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg",
      media_type: "movie",
      adult: false,
      original_language: "en",
      genre_ids: [12, 28, 878],
      popularity: 84.583,
      release_date: "2016-04-27",
      video: false,
      vote_average: 7.4,
      vote_count: 22731,
    },
    {
      backdrop_path: "/wAk0yKrhAmvsoMvlKs4QImhvK5X.jpg",
      id: 297761,
      title: "Suicide Squad",
      original_title: "Suicide Squad",
      overview:
        "From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government, undertaking high-risk black ops missions in exchange for commuted prison sentences.",
      poster_path: "/sk3FZgh3sRrmr8vyhaitNobMcfh.jpg",
      media_type: "movie",
      adult: false,
      original_language: "en",
      genre_ids: [28, 12, 14],
      popularity: 43.969,
      release_date: "2016-08-03",
      video: false,
      vote_average: 5.921,
      vote_count: 21134,
    },
  ],
  total_pages: 1,
  total_results: 3,
};

export const mockTvRecommendations: TvRecommendations = {
  page: 1,
  results: [
    {
      backdrop_path: "/yXggMemopUDHwPgmi6X9Wh2BQra.jpg",
      id: 12609,
      name: "Dragon Ball",
      original_name: "ドラゴンボール",
      overview:
        "Long ago in the mountains, a fighting master known as Son Gohan discovered a strange boy whom he named Son Goku. Gohan raised him and trained Goku in martial arts until he died. The young and very strong boy was on his own, but easily managed. Then one day, Goku met a teenage girl named Bulma, whose search for the mystical Dragon Balls brought her to Goku's home. Together, they set off to find all seven and to grant her wish.",
      poster_path: "/onCLyCOgszTIyyVs2XKYSkKPOPG.jpg",
      media_type: "tv",
      adult: false,
      original_language: "ja",
      genre_ids: [16, 10759, 10765],
      popularity: 35.657,
      first_air_date: "1986-02-26",
      vote_average: 8.251,
      vote_count: 3110,
      origin_country: ["JP"],
    },
    {
      backdrop_path: "/aJOlYXjxb5IvnTsO4I1tmFpC7GH.jpg",
      id: 12697,
      name: "Dragon Ball GT",
      original_name: "ドラゴンボールGT",
      overview:
        "Ten years have passed since Goku left his friends and family to hone his skills. But Goku soon finds himself helpless against the mystical power of the Dragon Balls and an accidental wish made by the devious Emperor Pilaf. The wish; that Goku once again become a child! Goku, together with Trunks, and his own granddaughter Pan, blast off into the outer reaches of space in search of the mysterious Black Star Dragon Balls. But these Dragon Balls have a fatal secret: if not collected within one year Earth will be destroyed.",
      poster_path: "/rLHhDpv6rrhuzBjNzaMRNv2fng.jpg",
      media_type: "tv",
      adult: false,
      original_language: "ja",
      genre_ids: [16, 10759, 10765],
      popularity: 13.204,
      first_air_date: "1996-02-07",
      vote_average: 7.688,
      vote_count: 1933,
      origin_country: ["JP"],
    },
    {
      backdrop_path: "/zYmMzsm6ORrt1YgVK5p5gSSvIIZ.jpg",
      id: 62715,
      name: "Dragon Ball Super",
      original_name: "ドラゴンボール超（スーパー）",
      overview:
        "With Majin Buu defeated half-a-year prior, peace returns to Earth, where Son Goku (now a radish farmer) and his friends now live peaceful lives. However, a new threat appears in the form of Beerus, the God of Destruction. Considered the most terrifying being in the entire universe, Beerus is eager to fight the legendary warrior seen in a prophecy foretold decades ago known as the Super Saiyan God. The series retells the events from the two Dragon Ball Z films, Battle of Gods and Resurrection 'F' before proceeding to an original story about the exploration of alternate universes.",
      poster_path: "/qEUrbXJ2qt4Rg84Btlx4STOhgte.jpg",
      media_type: "tv",
      adult: false,
      original_language: "ja",
      genre_ids: [16, 10759, 10765],
      popularity: 389.458,
      first_air_date: "2015-07-05",
      vote_average: 8.2,
      vote_count: 4989,
      origin_country: ["JP"],
    },
  ],
  total_pages: 1,
  total_results: 3,
};

export const mockNoRecommendations: TvRecommendations = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 3,
};
