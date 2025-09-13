// Next.js
import { type Metadata } from "next";

// Custom Components
import { getMovieDetails } from "@/server/actions/movies/actions";
import DetailCard from "@/components/detailPage/DetailCard";
import { getCountries } from "@/server/actions/actions";
import AvailabilityByProvider from "@/components/detailPage/AvailabilityByProvider";
import AvailabilityByCountry from "@/components/detailPage/AvailabilityByCountry";
import Recommendations from "@/components/detailPage/Recommendations";

// Next.js Router
import { currentUser } from "@/lib/currentUser";

// Custom Components
import AvailabilityToggle from "@/components/client/AvailabilityToggle";

/**
 * The props for the movie details page.
 */
type Props = {
  params: { id: string };
};

/**
 * The metadata for the movie details page.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = Number(params.id);

  // fetch data
  const movie = await getMovieDetails(id);
  if (movie instanceof Error) {
    throw new Error(`Failed to fetch movie data: ${movie}`);
  }

  return {
    title: movie.title,
  };
}

/**
 * The movie details page.
 *
 * @returns the movie details page
 */
export default async function MovieDetails({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams: {
    streamingProvider: string;
    watch_region: string;
  };
}) {
  const user = await currentUser();

  const movieId = Number(params.id);
  const movie = await getMovieDetails(movieId);
  const countries = await getCountries();
  const selectedStreamingProvider = searchParams.streamingProvider;
  const selectedCountry = searchParams.watch_region || "US";

  if (movie instanceof Error) {
    throw new Error(`Failed to fetch movie data: ${movie}`);
  }
  if (countries instanceof Error) {
    throw new Error(`Failed to fetch country data: ${countries}`);
  }

  // Pre-render the server components
  const providerView = (
    <AvailabilityByProvider
      details={movie}
      selectedStreamingProviderId={selectedStreamingProvider}
      countries={countries}
    />
  );

  const countryView = (
    <AvailabilityByCountry
      details={movie}
      selectedCountry={selectedCountry}
      countries={countries}
    />
  );

  return (
    <div className="flex min-h-screen flex-col items-center">
      <DetailCard details={movie} user={user} />
      <AvailabilityToggle
        providerView={providerView}
        countryView={countryView}
      />
      <Recommendations recommendations={movie.recommendations} />
    </div>
  );
}
