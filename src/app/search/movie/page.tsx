import { type Metadata } from "next";

import { searchMovies } from "@/server/actions/movies/actions";
import SearchResultCards from "@/components/SearchResultCards";
import PaginationComponent from "@/components/client/Pagination";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  searchParams: {
    search?: string;
    page?: string;
  };
};

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  // read route searchParam
  const searchTerm = searchParams?.search ?? "";

  return {
    title: searchTerm,
  };
};

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

  const totalPages = movies.total_pages > 500 ? 500 : movies.total_pages;

  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="mb-2 mt-5 text-2xl font-bold">
        Movie Search Results for:
      </h1>
      <h2 className="mb-5 text-3xl font-bold">{searchTerm}</h2>
      <Button asChild className="mb-5">
        <Link href={`/search/tv/?search=${searchTerm}`}>TV Show Search</Link>
      </Button>
      <div className="mb-5 flex w-full flex-col items-center gap-y-6">
        {movies.results.map((movie) => (
          <SearchResultCards key={movie.id} cinema={movie} />
        ))}
      </div>
      <PaginationComponent totalPages={totalPages} className="mb-5" />
    </div>
  );
}
