// import { useSearchParams } from "next/navigation";
import { searchMovies } from "@/server/actions/movies/actions";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const searchTerm = searchParams.search ?? "";
  const movies = await searchMovies(searchTerm);

  return (
    <>
      {movies.results.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </>
  );
}
