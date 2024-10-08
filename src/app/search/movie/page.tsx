// import { useSearchParams } from "next/navigation";
import { searchMovies } from "@/server/actions/movies/actions";
import SearchResultCards from "@/components/client/SearchResultCards";
// import type { movieSearchResult } from "@/server/actions/movies/types";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const searchTerm = searchParams.search ?? "";
  const movies = await searchMovies(searchTerm);

  if (movies instanceof Error) {
    throw new Error(`Failed to fetch data: ${movies}`);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">{`Movie Search Results for: ${searchTerm}`}</h1>
      <div className="flex w-full flex-col items-center justify-center">
        {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"> */}
        {movies.results.map((movie) => (
          <SearchResultCards key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}
