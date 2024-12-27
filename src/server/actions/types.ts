/**
 * type for list of countries using in TMDB API
 * @see https://developer.themoviedb.org/reference/configuration-countries
 */
export type countryList = {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}[];

/**
 * type for streaming option details for movies and tv shows inside rent, buy, flatrate, ads, etc
 * @see https://developer.themoviedb.org/reference/movie-watch-providers
 * @see https://developer.themoviedb.org/reference/tv-series-watch-providers
 */
type WatchProviderDetail = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
};

/**
 * type for each country object in watch provider endpoint for movies and tv shows
 * @see https://developer.themoviedb.org/reference/movie-watch-providers
 * @see https://developer.themoviedb.org/reference/tv-series-watch-providers
 */
type WatchProviderCountry = {
  link: string;
  flatrate: WatchProviderDetail[];
  free: WatchProviderDetail[];
  ads: WatchProviderDetail[];
  rent: WatchProviderDetail[];
  buy: WatchProviderDetail[];
};

/**
 * type for results object in watch provider endpoint for movies and tv shows
 * @see https://developer.themoviedb.org/reference/movie-watch-providers
 * @see https://developer.themoviedb.org/reference/tv-series-watch-providers
 */
export type watchProviders = {
  AD?: WatchProviderCountry;
  AE?: WatchProviderCountry;
  AF?: WatchProviderCountry;
  AG?: WatchProviderCountry;
  AI?: WatchProviderCountry;
  AL?: WatchProviderCountry;
  AM?: WatchProviderCountry;
  AN?: WatchProviderCountry;
  AO?: WatchProviderCountry;
  AQ?: WatchProviderCountry;
  AR?: WatchProviderCountry;
  AS?: WatchProviderCountry;
  AT?: WatchProviderCountry;
  AU?: WatchProviderCountry;
  AW?: WatchProviderCountry;
  AZ?: WatchProviderCountry;
  BA?: WatchProviderCountry;
  BB?: WatchProviderCountry;
  BD?: WatchProviderCountry;
  BE?: WatchProviderCountry;
  BF?: WatchProviderCountry;
  BG?: WatchProviderCountry;
  BH?: WatchProviderCountry;
  BI?: WatchProviderCountry;
  BJ?: WatchProviderCountry;
  BM?: WatchProviderCountry;
  BN?: WatchProviderCountry;
  BO?: WatchProviderCountry;
  BR?: WatchProviderCountry;
  BS?: WatchProviderCountry;
  BT?: WatchProviderCountry;
  BU?: WatchProviderCountry;
  BV?: WatchProviderCountry;
  BW?: WatchProviderCountry;
  BY?: WatchProviderCountry;
  BZ?: WatchProviderCountry;
  CA?: WatchProviderCountry;
  CC?: WatchProviderCountry;
  CD?: WatchProviderCountry;
  CF?: WatchProviderCountry;
  CG?: WatchProviderCountry;
  CH?: WatchProviderCountry;
  CI?: WatchProviderCountry;
  CK?: WatchProviderCountry;
  CL?: WatchProviderCountry;
  CM?: WatchProviderCountry;
  CN?: WatchProviderCountry;
  CO?: WatchProviderCountry;
  CR?: WatchProviderCountry;
  CS?: WatchProviderCountry;
  CU?: WatchProviderCountry;
  CV?: WatchProviderCountry;
  CX?: WatchProviderCountry;
  CY?: WatchProviderCountry;
  CZ?: WatchProviderCountry;
  DE?: WatchProviderCountry;
  DJ?: WatchProviderCountry;
  DK?: WatchProviderCountry;
  DM?: WatchProviderCountry;
  DO?: WatchProviderCountry;
  DZ?: WatchProviderCountry;
  EC?: WatchProviderCountry;
  EE?: WatchProviderCountry;
  EG?: WatchProviderCountry;
  EH?: WatchProviderCountry;
  ER?: WatchProviderCountry;
  ES?: WatchProviderCountry;
  ET?: WatchProviderCountry;
  FI?: WatchProviderCountry;
  FJ?: WatchProviderCountry;
  FK?: WatchProviderCountry;
  FM?: WatchProviderCountry;
  FO?: WatchProviderCountry;
  FR?: WatchProviderCountry;
  GA?: WatchProviderCountry;
  GB?: WatchProviderCountry;
  GD?: WatchProviderCountry;
  GE?: WatchProviderCountry;
  GF?: WatchProviderCountry;
  GG?: WatchProviderCountry;
  GH?: WatchProviderCountry;
  GI?: WatchProviderCountry;
  GL?: WatchProviderCountry;
  GM?: WatchProviderCountry;
  GN?: WatchProviderCountry;
  GP?: WatchProviderCountry;
  GQ?: WatchProviderCountry;
  GR?: WatchProviderCountry;
  GS?: WatchProviderCountry;
  GT?: WatchProviderCountry;
  GU?: WatchProviderCountry;
  GW?: WatchProviderCountry;
  GY?: WatchProviderCountry;
  HK?: WatchProviderCountry;
  HM?: WatchProviderCountry;
  HN?: WatchProviderCountry;
  HR?: WatchProviderCountry;
  HT?: WatchProviderCountry;
  HU?: WatchProviderCountry;
  ID?: WatchProviderCountry;
  IE?: WatchProviderCountry;
  IL?: WatchProviderCountry;
  IN?: WatchProviderCountry;
  IO?: WatchProviderCountry;
  IQ?: WatchProviderCountry;
  IR?: WatchProviderCountry;
  IS?: WatchProviderCountry;
  IT?: WatchProviderCountry;
  JM?: WatchProviderCountry;
  JO?: WatchProviderCountry;
  JP?: WatchProviderCountry;
  KE?: WatchProviderCountry;
  KG?: WatchProviderCountry;
  KH?: WatchProviderCountry;
  KI?: WatchProviderCountry;
  KM?: WatchProviderCountry;
  KN?: WatchProviderCountry;
  KP?: WatchProviderCountry;
  KR?: WatchProviderCountry;
  KW?: WatchProviderCountry;
  KY?: WatchProviderCountry;
  KZ?: WatchProviderCountry;
  LA?: WatchProviderCountry;
  LB?: WatchProviderCountry;
  LC?: WatchProviderCountry;
  LI?: WatchProviderCountry;
  LK?: WatchProviderCountry;
  LR?: WatchProviderCountry;
  LS?: WatchProviderCountry;
  LT?: WatchProviderCountry;
  LU?: WatchProviderCountry;
  LV?: WatchProviderCountry;
  LY?: WatchProviderCountry;
  MA?: WatchProviderCountry;
  MC?: WatchProviderCountry;
  MD?: WatchProviderCountry;
  ME?: WatchProviderCountry;
  MG?: WatchProviderCountry;
  MH?: WatchProviderCountry;
  MK?: WatchProviderCountry;
  ML?: WatchProviderCountry;
  MM?: WatchProviderCountry;
  MN?: WatchProviderCountry;
  MO?: WatchProviderCountry;
  MP?: WatchProviderCountry;
  MQ?: WatchProviderCountry;
  MR?: WatchProviderCountry;
  MS?: WatchProviderCountry;
  MT?: WatchProviderCountry;
  MU?: WatchProviderCountry;
  MV?: WatchProviderCountry;
  MX?: WatchProviderCountry;
  MY?: WatchProviderCountry;
  MZ?: WatchProviderCountry;
  NA?: WatchProviderCountry;
  NC?: WatchProviderCountry;
  NE?: WatchProviderCountry;
  NF?: WatchProviderCountry;
  NG?: WatchProviderCountry;
  NI?: WatchProviderCountry;
  NL?: WatchProviderCountry;
  NO?: WatchProviderCountry;
  NP?: WatchProviderCountry;
  NR?: WatchProviderCountry;
  NU?: WatchProviderCountry;
  NZ?: WatchProviderCountry;
  OM?: WatchProviderCountry;
  PA?: WatchProviderCountry;
  PE?: WatchProviderCountry;
  PF?: WatchProviderCountry;
  PG?: WatchProviderCountry;
  PH?: WatchProviderCountry;
  PK?: WatchProviderCountry;
  PL?: WatchProviderCountry;
  PM?: WatchProviderCountry;
  PN?: WatchProviderCountry;
  PR?: WatchProviderCountry;
  PS?: WatchProviderCountry;
  PT?: WatchProviderCountry;
  PW?: WatchProviderCountry;
  PY?: WatchProviderCountry;
  QA?: WatchProviderCountry;
  RO?: WatchProviderCountry;
  RS?: WatchProviderCountry;
  RU?: WatchProviderCountry;
  RW?: WatchProviderCountry;
  SA?: WatchProviderCountry;
  SB?: WatchProviderCountry;
  SC?: WatchProviderCountry;
  SD?: WatchProviderCountry;
  SE?: WatchProviderCountry;
  SG?: WatchProviderCountry;
  SH?: WatchProviderCountry;
  SI?: WatchProviderCountry;
  SJ?: WatchProviderCountry;
  SK?: WatchProviderCountry;
  SL?: WatchProviderCountry;
  SM?: WatchProviderCountry;
  SN?: WatchProviderCountry;
  SO?: WatchProviderCountry;
  SR?: WatchProviderCountry;
  SS?: WatchProviderCountry;
  ST?: WatchProviderCountry;
  SU?: WatchProviderCountry;
  SV?: WatchProviderCountry;
  SZ?: WatchProviderCountry;
  TC?: WatchProviderCountry;
  TD?: WatchProviderCountry;
  TF?: WatchProviderCountry;
  TG?: WatchProviderCountry;
  TH?: WatchProviderCountry;
  TJ?: WatchProviderCountry;
  TK?: WatchProviderCountry;
  TL?: WatchProviderCountry;
  TM?: WatchProviderCountry;
  TN?: WatchProviderCountry;
  TO?: WatchProviderCountry;
  TP?: WatchProviderCountry;
  TR?: WatchProviderCountry;
  TT?: WatchProviderCountry;
  TV?: WatchProviderCountry;
  TW?: WatchProviderCountry;
  TZ?: WatchProviderCountry;
  UA?: WatchProviderCountry;
  UG?: WatchProviderCountry;
  UM?: WatchProviderCountry;
  US?: WatchProviderCountry;
  UY?: WatchProviderCountry;
  UZ?: WatchProviderCountry;
  VA?: WatchProviderCountry;
  VC?: WatchProviderCountry;
  VE?: WatchProviderCountry;
  VG?: WatchProviderCountry;
  VI?: WatchProviderCountry;
  VN?: WatchProviderCountry;
  VU?: WatchProviderCountry;
  WF?: WatchProviderCountry;
  WS?: WatchProviderCountry;
  XC?: WatchProviderCountry;
  XG?: WatchProviderCountry;
  XI?: WatchProviderCountry;
  XK?: WatchProviderCountry;
  YE?: WatchProviderCountry;
  YT?: WatchProviderCountry;
  YU?: WatchProviderCountry;
  ZA?: WatchProviderCountry;
  ZM?: WatchProviderCountry;
  ZW?: WatchProviderCountry;
};

/**
 * type for list of the watch provider data TMDB has for movies and tv shows
 * @see https://developer.themoviedb.org/reference/watch-providers-movie-list
 * @see https://developer.themoviedb.org/reference/watch-provider-tv-list
 */
export type streamingProviderList = {
  results: {
    // need to add a display_priorities field?
    display_priority: number;
    logo_path: string;
    provider_id: number;
    provider_name: string;
  }[];
};

/**
 * type for list of genre data TMDB has for movies and tv shows
 * @see https://developer.themoviedb.org/reference/genre-movie-list
 * @see https://developer.themoviedb.org/reference/genre-tv-list
 */
export type genresList = {
  genres: {
    id: number;
    name: string;
  }[];
};

/**
 * type for list of languages used throughout TMDB
 * @see https://developer.themoviedb.org/reference/configuration-languages
 */
export type languagesList = [
  {
    iso_639_1: string;
    english_name: string;
    name: string;
  },
];

/**
 * type for list of countries using in TMDB API
 * @see https://developer.themoviedb.org/reference/watch-providers-available-regions
 */
export type watchProviderRegions = {
  results: {
    iso_3166_1: string;
    english_name: string;
    native_name: string;
  }[];
};

export type watchlist =
  | false
  | {
      userId: string;
      id: string;
      name: string;
    }
  | null
  | undefined;
