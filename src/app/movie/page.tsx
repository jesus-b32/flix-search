import { discoverMovies } from "@/server/actions/movies/actions";
import SearchResultCards from "@/components/SearchResultCards";
import PaginationComponent from "@/components/client/Pagination";
import Link from "next/link";
// import { Button } from "@/components/ui/button";
import FilterSort from "@/components/client/FilterSort";

export default async function DiscoverMoviePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const params = new URLSearchParams();

  // console.log("searchParams: ", searchParams);
  // console.log("URLSearchParams: ", params);

  // no search params in URL
  if (Object.keys(searchParams).length === 0) {
    // console.log("No search params");
    params.append("page", "1");
    params.append("sort_by", "popularity.desc");
  }

  // console.log("params after append: ", params);
  // console.log("New Params: ", params.toString());

  const movies = await discoverMovies(params.toString());

  if (movies instanceof Error) {
    throw new Error(`Failed to fetch data: ${movies}`);
  }

  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="my-5 text-2xl font-bold">Discover Movies</h1>
      <div className="flex w-full flex-col items-center gap-y-6 lg:w-10/12 lg:flex-row lg:items-start lg:gap-x-4">
        <div className="h-fit w-full md:w-10/12 lg:fixed lg:w-60">
          <FilterSort />
        </div>

        <div className="mb-5 flex w-full flex-col items-center gap-y-6 lg:items-end">
          {movies.results.map((movie) => (
            <SearchResultCards key={movie.id} cinema={movie} />
          ))}
        </div>
      </div>
      <PaginationComponent totalPages={movies.total_pages} />
    </div>
  );
}
