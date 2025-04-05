import { type Metadata } from "next";

import {
  getMovieDetails,
  getMovieProviders,
} from "@/server/actions/movies/actions";
import DetailCard from "@/components/detailPage/DetailCard";
import JustWatchAttribution from "@/components/detailPage/JustWatchAttribution";
import { getCountries } from "@/server/actions/actions";
import AvailabilityByProvider from "@/components/detailPage/AvailabilityByProvider";
import AvailabilityByCountry from "@/components/detailPage/AvailabilityByCountry";
import Recommendations from "@/components/detailPage/Recommendations";
import { currentUser } from "@/lib/currentUser";

type Props = {
  params: { id: string };
};

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
      <DetailCard details={movie} user={user} />
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
