import { searchTvShows } from "@/server/actions/tv/actions";
import SearchResultCards from "@/components/client/SearchResultCards";
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
  const tvShows = await searchTvShows(searchTerm, Number(page));

  if (tvShows instanceof Error) {
    throw new Error(`Failed to fetch data: ${tvShows}`);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="my-5 text-2xl font-bold">{`Movie Search Results for: ${searchTerm}`}</h1>
      <Button asChild className="mb-5">
        <Link href={`/search/movie/?search=${searchTerm}`}>Movie Search</Link>
      </Button>
      <div className="mb-5 flex w-full flex-col items-center justify-center">
        {tvShows.results.map((show) => (
          <SearchResultCards key={show.id} cinema={show} />
        ))}
      </div>
      <PaginationComponent totalPages={tvShows.total_pages} />
    </div>
  );
}
