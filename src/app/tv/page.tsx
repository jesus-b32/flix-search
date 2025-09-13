// Next.js
import { type Metadata } from "next";

// client and server Components
import SearchResultCards from "@/components/SearchResultCards";
import PaginationComponent from "@/components/client/Pagination";
import FilterSort from "@/components/client/FilterSort";

// Server Actions
import {
  discoverTvShow,
  getTvShowProviders,
  getGenreTvShows,
} from "@/server/actions/tv/actions";
import {
  getLanguages,
  getWatchProviderRegions,
} from "@/server/actions/actions";

/**
 * The metadata for the discover tv show page.
 */
export const metadata: Metadata = {
  title: "Discover TV Shows",
};

/**
 * The discover tv show page.
 *
 * @returns the discover tv show page
 */
export default async function DiscoverTvShowPage({
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

  const tvShows = await discoverTvShow(params.toString());
  const genres = await getGenreTvShows();
  const languages = await getLanguages();
  const watchProviderRegions = await getWatchProviderRegions();
  const watchProviders = await getTvShowProviders(
    params.get("watch_region") ?? "US",
  );

  if (tvShows instanceof Error) {
    throw new Error(`Failed to fetch TV show data in discover page`);
  }
  if (genres instanceof Error) {
    throw new Error(`Failed to fetch genre data TV shows in discover page`);
  }
  if (languages instanceof Error) {
    throw new Error(`Failed to fetch language data TV shows in discover page`);
  }
  if (watchProviderRegions instanceof Error) {
    throw new Error(
      `Failed to fetch watch provider region data TV shows in discover page`,
    );
  }
  if (watchProviders instanceof Error) {
    throw new Error(
      `Failed to fetch watch provider data TV shows in discover page`,
    );
  }

  const totalPages = tvShows.total_pages > 500 ? 500 : tvShows.total_pages;

  // Add "All Languages" option to the top of languages list
  languages.unshift({
    iso_639_1: "all",
    name: "All Languages",
    english_name: "All Languages",
  });

  return (
    <div className="flex min-h-screen w-full flex-col items-center overflow-x-hidden px-4">
      <h1 className="my-5 text-4xl font-bold">Discover Shows</h1>
      <div className="flex w-full flex-col gap-y-6 md:items-center lg:w-11/12 lg:flex-row lg:items-start lg:gap-x-4">
        <div className="flex w-full justify-center md:w-full lg:w-60">
          <FilterSort
            genreList={genres}
            languageList={languages}
            watchProviderRegionList={watchProviderRegions}
            watchProviderList={watchProviders}
            mediaType="tv"
          />
        </div>

        <div className="mb-5 flex w-full flex-col items-center gap-y-6 lg:w-3/4">
          {tvShows.results.length > 0 ? (
            tvShows.results.map((tvShow) => (
              <SearchResultCards key={tvShow.id} cinema={tvShow} />
            ))
          ) : (
            <h2 className="text-2xl font-bold">
              No shows found that match your selected filter options.
            </h2>
          )}
        </div>
      </div>
      {/* max page value is 500 according to TMDB */}
      <PaginationComponent totalPages={totalPages} className="mb-5" />
    </div>
  );
}
