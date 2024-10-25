import { discoverMovies } from "@/server/actions/movies/actions";
import SearchResultCards from "@/components/SearchResultCards";
import PaginationComponent from "@/components/client/Pagination";
import Link from "next/link";
// import { Button } from "@/components/ui/button";
import FilterSort from "@/components/client/FilterSort";
import { languagesList } from "@/server/actions/types";
import { getGenreMovies } from "@/server/actions/movies/actions";
import { getLanguages } from "@/server/actions/actions";

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

  console.log("params: ", params.toString());
  const movies = await discoverMovies(params.toString());
  const genres = await getGenreMovies();
  const languages = await getLanguages();

  if (movies instanceof Error) {
    throw new Error(`Failed to fetch movie data: ${movies}`);
  }
  if (genres instanceof Error) {
    throw new Error(`Failed to fetch genre data: ${genres}`);
  }
  if (languages instanceof Error) {
    throw new Error(`Failed to fetch language data: ${languages}`);
  }

  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="my-5 text-2xl font-bold">Discover Movies</h1>
      <div className="flex w-full flex-col gap-y-6 md:items-center lg:w-11/12 lg:flex-row lg:items-start lg:gap-x-4">
        <div className="h-fit w-full items-start md:w-10/12 lg:w-60">
          <FilterSort genreList={genres} languageList={languages} />
        </div>

        <div className="mb-5 flex w-full flex-col items-center gap-y-6 lg:w-3/4">
          {movies.results.map((movie) => (
            <SearchResultCards key={movie.id} cinema={movie} />
          ))}
        </div>
      </div>
      <PaginationComponent totalPages={movies.total_pages} />
    </div>
  );
}

//  <div className="flex w-full flex-col items-center gap-y-6 lg:w-10/12 lg:flex-row lg:items-start lg:gap-x-4"></div>
// <div className="h-fit w-full md:w-10/12 lg:fixed lg:w-60">
//   <FilterSort />
// </div>;
