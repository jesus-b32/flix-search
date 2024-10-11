/**
 * This file contains all the necessary
 * types for all TMDB tv API calls
 * being used in the project
 * @see https://developers.themoviedb.org/3
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

//object type for streaming options like rent, buy, etc
type WatchProviderDetail = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
};

// object type for each country in watch provider endpoint
type WatchProviderCountry = {
  link: string;
  flatrate: WatchProviderDetail[];
  free: WatchProviderDetail[];
  ads: WatchProviderDetail[];
  rent: WatchProviderDetail[];
  buy: WatchProviderDetail[];
};

/**
 * list of watch provider countries
 * @see https://developer.themoviedb.org/reference/configuration-countries
 */
type watchProviders = {
  AD: WatchProviderCountry;
  AE: WatchProviderCountry;
  AF: WatchProviderCountry;
  AG: WatchProviderCountry;
  AI: WatchProviderCountry;
  AL: WatchProviderCountry;
  AM: WatchProviderCountry;
  AN: WatchProviderCountry;
  AO: WatchProviderCountry;
  AQ: WatchProviderCountry;
  AR: WatchProviderCountry;
  AS: WatchProviderCountry;
  AT: WatchProviderCountry;
  AU: WatchProviderCountry;
  AW: WatchProviderCountry;
  AZ: WatchProviderCountry;
  BA: WatchProviderCountry;
  BB: WatchProviderCountry;
  BD: WatchProviderCountry;
  BE: WatchProviderCountry;
  BF: WatchProviderCountry;
  BG: WatchProviderCountry;
  BH: WatchProviderCountry;
  BI: WatchProviderCountry;
  BJ: WatchProviderCountry;
  BM: WatchProviderCountry;
  BN: WatchProviderCountry;
  BO: WatchProviderCountry;
  BR: WatchProviderCountry;
  BS: WatchProviderCountry;
  BT: WatchProviderCountry;
  BU: WatchProviderCountry;
  BV: WatchProviderCountry;
  BW: WatchProviderCountry;
  BY: WatchProviderCountry;
  BZ: WatchProviderCountry;
  CA: WatchProviderCountry;
  CC: WatchProviderCountry;
  CD: WatchProviderCountry;
  CF: WatchProviderCountry;
  CG: WatchProviderCountry;
  CH: WatchProviderCountry;
  CI: WatchProviderCountry;
  CK: WatchProviderCountry;
  CL: WatchProviderCountry;
  CM: WatchProviderCountry;
  CN: WatchProviderCountry;
  CO: WatchProviderCountry;
  CR: WatchProviderCountry;
  CS: WatchProviderCountry;
  CU: WatchProviderCountry;
  CV: WatchProviderCountry;
  CX: WatchProviderCountry;
  CY: WatchProviderCountry;
  CZ: WatchProviderCountry;
  DE: WatchProviderCountry;
  DJ: WatchProviderCountry;
  DK: WatchProviderCountry;
  DM: WatchProviderCountry;
  DO: WatchProviderCountry;
  DZ: WatchProviderCountry;
  EC: WatchProviderCountry;
  EE: WatchProviderCountry;
  EG: WatchProviderCountry;
  EH: WatchProviderCountry;
  ER: WatchProviderCountry;
  ES: WatchProviderCountry;
  ET: WatchProviderCountry;
  FI: WatchProviderCountry;
  FJ: WatchProviderCountry;
  FK: WatchProviderCountry;
  FM: WatchProviderCountry;
  FO: WatchProviderCountry;
  FR: WatchProviderCountry;
  GA: WatchProviderCountry;
  GB: WatchProviderCountry;
  GD: WatchProviderCountry;
  GE: WatchProviderCountry;
  GF: WatchProviderCountry;
  GG: WatchProviderCountry;
  GH: WatchProviderCountry;
  GI: WatchProviderCountry;
  GL: WatchProviderCountry;
  GM: WatchProviderCountry;
  GN: WatchProviderCountry;
  GP: WatchProviderCountry;
  GQ: WatchProviderCountry;
  GR: WatchProviderCountry;
  GS: WatchProviderCountry;
  GT: WatchProviderCountry;
  GU: WatchProviderCountry;
  GW: WatchProviderCountry;
  GY: WatchProviderCountry;
  HK: WatchProviderCountry;
  HM: WatchProviderCountry;
  HN: WatchProviderCountry;
  HR: WatchProviderCountry;
  HT: WatchProviderCountry;
  HU: WatchProviderCountry;
  ID: WatchProviderCountry;
  IE: WatchProviderCountry;
  IL: WatchProviderCountry;
  IN: WatchProviderCountry;
  IO: WatchProviderCountry;
  IQ: WatchProviderCountry;
  IR: WatchProviderCountry;
  IS: WatchProviderCountry;
  IT: WatchProviderCountry;
  JM: WatchProviderCountry;
  JO: WatchProviderCountry;
  JP: WatchProviderCountry;
  KE: WatchProviderCountry;
  KG: WatchProviderCountry;
  KH: WatchProviderCountry;
  KI: WatchProviderCountry;
  KM: WatchProviderCountry;
  KN: WatchProviderCountry;
  KP: WatchProviderCountry;
  KR: WatchProviderCountry;
  KW: WatchProviderCountry;
  KY: WatchProviderCountry;
  KZ: WatchProviderCountry;
  LA: WatchProviderCountry;
  LB: WatchProviderCountry;
  LC: WatchProviderCountry;
  LI: WatchProviderCountry;
  LK: WatchProviderCountry;
  LR: WatchProviderCountry;
  LS: WatchProviderCountry;
  LT: WatchProviderCountry;
  LU: WatchProviderCountry;
  LV: WatchProviderCountry;
  LY: WatchProviderCountry;
  MA: WatchProviderCountry;
  MC: WatchProviderCountry;
  MD: WatchProviderCountry;
  ME: WatchProviderCountry;
  MG: WatchProviderCountry;
  MH: WatchProviderCountry;
  MK: WatchProviderCountry;
  ML: WatchProviderCountry;
  MM: WatchProviderCountry;
  MN: WatchProviderCountry;
  MO: WatchProviderCountry;
  MP: WatchProviderCountry;
  MQ: WatchProviderCountry;
  MR: WatchProviderCountry;
  MS: WatchProviderCountry;
  MT: WatchProviderCountry;
  MU: WatchProviderCountry;
  MV: WatchProviderCountry;
  MX: WatchProviderCountry;
  MY: WatchProviderCountry;
  MZ: WatchProviderCountry;
  NA: WatchProviderCountry;
  NC: WatchProviderCountry;
  NE: WatchProviderCountry;
  NF: WatchProviderCountry;
  NG: WatchProviderCountry;
  NI: WatchProviderCountry;
  NL: WatchProviderCountry;
  NO: WatchProviderCountry;
  NP: WatchProviderCountry;
  NR: WatchProviderCountry;
  NU: WatchProviderCountry;
  NZ: WatchProviderCountry;
  OM: WatchProviderCountry;
  PA: WatchProviderCountry;
  PE: WatchProviderCountry;
  PF: WatchProviderCountry;
  PG: WatchProviderCountry;
  PH: WatchProviderCountry;
  PK: WatchProviderCountry;
  PL: WatchProviderCountry;
  PM: WatchProviderCountry;
  PN: WatchProviderCountry;
  PR: WatchProviderCountry;
  PS: WatchProviderCountry;
  PT: WatchProviderCountry;
  PW: WatchProviderCountry;
  PY: WatchProviderCountry;
  QA: WatchProviderCountry;
  RO: WatchProviderCountry;
  RS: WatchProviderCountry;
  RU: WatchProviderCountry;
  RW: WatchProviderCountry;
  SA: WatchProviderCountry;
  SB: WatchProviderCountry;
  SC: WatchProviderCountry;
  SD: WatchProviderCountry;
  SE: WatchProviderCountry;
  SG: WatchProviderCountry;
  SH: WatchProviderCountry;
  SI: WatchProviderCountry;
  SJ: WatchProviderCountry;
  SK: WatchProviderCountry;
  SL: WatchProviderCountry;
  SM: WatchProviderCountry;
  SN: WatchProviderCountry;
  SO: WatchProviderCountry;
  SR: WatchProviderCountry;
  SS: WatchProviderCountry;
  ST: WatchProviderCountry;
  SU: WatchProviderCountry;
  SV: WatchProviderCountry;
  SZ: WatchProviderCountry;
  TC: WatchProviderCountry;
  TD: WatchProviderCountry;
  TF: WatchProviderCountry;
  TG: WatchProviderCountry;
  TH: WatchProviderCountry;
  TJ: WatchProviderCountry;
  TK: WatchProviderCountry;
  TL: WatchProviderCountry;
  TM: WatchProviderCountry;
  TN: WatchProviderCountry;
  TO: WatchProviderCountry;
  TP: WatchProviderCountry;
  TR: WatchProviderCountry;
  TT: WatchProviderCountry;
  TV: WatchProviderCountry;
  TW: WatchProviderCountry;
  TZ: WatchProviderCountry;
  UA: WatchProviderCountry;
  UG: WatchProviderCountry;
  UM: WatchProviderCountry;
  US: WatchProviderCountry;
  UY: WatchProviderCountry;
  UZ: WatchProviderCountry;
  VA: WatchProviderCountry;
  VC: WatchProviderCountry;
  VE: WatchProviderCountry;
  VG: WatchProviderCountry;
  VI: WatchProviderCountry;
  VN: WatchProviderCountry;
  VU: WatchProviderCountry;
  WF: WatchProviderCountry;
  WS: WatchProviderCountry;
  XC: WatchProviderCountry;
  XG: WatchProviderCountry;
  XI: WatchProviderCountry;
  XK: WatchProviderCountry;
  YE: WatchProviderCountry;
  YT: WatchProviderCountry;
  YU: WatchProviderCountry;
  ZA: WatchProviderCountry;
  ZM: WatchProviderCountry;
  ZW: WatchProviderCountry;
};

type recommendations = {
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
    results?: watchProviders;
  };
  recommendations: recommendations;
};

/**
 * type for list of the watch provider data we have available for tv shows
 * see https://developer.themoviedb.org/reference/watch-provider-tv-list
 */
export type tvProviders = {
  results: {
    // need to add a display_priorities field?
    display_priority: number;
    logo_path: string;
    provider_id: number;
    provider_name: string;
  }[];
};
