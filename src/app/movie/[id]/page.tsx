import {
  getMovieDetails,
  getMovieProviders,
} from "@/server/actions/movies/actions";
import DetailCard from "@/components/DetailCard";
import JustWatchAttribution from "@/components/JustWatchAttribution";
import { getCountries } from "@/server/actions/actions";
import AvailabilityByProvider from "@/components/AvailabilityByProvider";
import AvailabilityByCountry from "@/components/AvailabilityByCountry";
import Recommendations from "@/components/Recommendations";

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
  const movieId = Number(params.id);
  const movie = await getMovieDetails(movieId);
  const streamingProviders = await getMovieProviders();
  const countries = await getCountries();
  // get the selected streaming provider from the search params
  // if not provided, default to '8'(Netflix)
  const selectedStreamingProvider = searchParams?.streamingProvider || "8";

  const selectedCountry = searchParams?.watch_region || "US";

  if (movie instanceof Error) {
    throw new Error(`Failed to fetch movie data: ${movie}`);
  }
  if (streamingProviders instanceof Error) {
    throw new Error(
      `Failed to fetch streaming provider data: ${streamingProviders}`,
    );
  }
  if (countries instanceof Error) {
    throw new Error(`Failed to fetch country data: ${countries}`);
  }

  return (
    <div className="flex min-h-screen flex-col items-center divide-y-2 divide-slate-300">
      <DetailCard details={movie} />
      <JustWatchAttribution title={movie.title} />
      <AvailabilityByProvider
        // list of streaming providers for combo box
        streamingProviderList={streamingProviders}
        // will have countries that match the selected streaming provider
        details={movie}
        selectedStreamingProviderId={selectedStreamingProvider}
        countries={countries}
      />
      <AvailabilityByCountry
        details={movie}
        selectedCountry={selectedCountry}
        countries={countries}
      />
      <Recommendations recommendations={movie.recommendations} />
    </div>
  );
}
