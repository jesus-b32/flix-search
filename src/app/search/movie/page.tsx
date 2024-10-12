import { searchMovies } from "@/server/actions/movies/actions";
import SearchResultCards from "@/components/SearchResultCards";
import PaginationComponent from "@/components/client/Pagination";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    search?: string;
    page?: string;
  };
}) {
  const searchTerm = searchParams.search ?? "";
  const page = searchParams.page ?? "1";
  const movies = await searchMovies(searchTerm, Number(page));

  if (movies instanceof Error) {
    throw new Error(`Failed to fetch data: ${movies}`);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="my-5 text-2xl font-bold">{`Movie Search Results for: ${searchTerm}`}</h1>
      <Button asChild className="mb-5">
        <Link href={`/search/tv/?search=${searchTerm}`}>TV Show Search</Link>
      </Button>
      <div className="mb-5 flex w-full flex-col items-center justify-center">
        {movies.results.map((movie) => (
          <SearchResultCards key={movie.id} cinema={movie} />
        ))}
      </div>
      <PaginationComponent totalPages={movies.total_pages} />
    </div>
  );
}
