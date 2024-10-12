import { getMovieDetails } from "@/server/actions/movies/actions";
import DetailCard from "@/components/DetailCard";

export default async function MovieDetails({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const movieId = Number(params.id);
  const movie = await getMovieDetails(movieId);

  if (movie instanceof Error) {
    throw new Error(`Failed to fetch data: ${movie}`);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <DetailCard details={movie} />
    </div>
  );
}
