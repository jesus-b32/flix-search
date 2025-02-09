import { type Metadata } from "next";

// client and server Components
import SearchResultCards from "@/components/SearchResultCards";
import PaginationComponent from "@/components/client/Pagination";
import FilterSort from "@/components/client/FilterSort";

// Server Actions
import {
  discoverMovies,
  getMovieProviders,
  getGenreMovies,
} from "@/server/actions/movies/actions";
import {
  getLanguages,
  getWatchProviderRegions,
} from "@/server/actions/actions";

export const metadata: Metadata = {
  title: "Discover Movies",
};

export default async function DiscoverMoviePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  /**
   * Convert searchParams to URLSearchParams
   * Remove undefined values, convert arrays to comma-separated strings, and append to URLSearchParams.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
   */
  const params = new URLSearchParams(
    Object.entries(searchParams).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc.append(key, Array.isArray(value) ? value.join(",") : value);
      }
      return acc;
    }, new URLSearchParams()),
  );

  const movies = await discoverMovies(params.toString());
  const genres = await getGenreMovies();
  const languages = await getLanguages();
  const watchProviderRegions = await getWatchProviderRegions();
  const watchProviders = await getMovieProviders(
    params.get("watch_region") ?? "US",
  );

  if (movies instanceof Error) {
    throw new Error(`Failed to fetch movie data in discover page`);
  }
  if (genres instanceof Error) {
    throw new Error(`Failed to fetch genre data for movies discover page`);
  }
  if (languages instanceof Error) {
    throw new Error(`Failed to fetch language data for movies discover page`);
  }
  if (watchProviderRegions instanceof Error) {
    throw new Error(
      `Failed to fetch watch provider region data for movies discover page`,
    );
  }
  if (watchProviders instanceof Error) {
    throw new Error(`Failed to fetch watch provider data movies discover page`);
  }

  const totalPages = movies.total_pages > 500 ? 500 : movies.total_pages;

  // Add "All Languages" option to the top of languages list
  languages.unshift({
    iso_639_1: "all",
    name: "All Languages",
    english_name: "All Languages",
  });

  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="my-5 text-4xl font-bold">Discover Movies</h1>
      <div className="flex w-full flex-col gap-y-6 md:items-center lg:w-11/12 lg:flex-row lg:items-start lg:gap-x-4">
        <div className="h-fit w-full items-start md:w-10/12 lg:w-60">
          <FilterSort
            genreList={genres}
            languageList={languages}
            watchProviderRegionList={watchProviderRegions}
            watchProviderList={watchProviders}
            mediaType="movie"
          />
        </div>

        <div className="mb-5 flex w-full flex-col items-center gap-y-6 lg:w-3/4">
          {movies.results.length > 0 ? (
            movies.results.map((movie) => (
              <SearchResultCards key={movie.id} cinema={movie} />
            ))
          ) : (
            <h2 className="text-2xl font-bold">
              No movies found that match your selected filter options.
            </h2>
          )}
        </div>
      </div>
      {/* max page value is 500 according to TMDB */}
      <PaginationComponent totalPages={totalPages} className="mb-5" />
    </div>
  );
}
