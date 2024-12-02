import { type Metadata } from "next";

import {
  getTvShowDetails,
  getTvShowProviders,
} from "@/server/actions/tv/actions";
import DetailCard from "@/components/DetailCard";
import JustWatchAttribution from "@/components/JustWatchAttribution";
import { getCountries } from "@/server/actions/actions";
import AvailabilityByProvider from "@/components/AvailabilityByProvider";
import AvailabilityByCountry from "@/components/AvailabilityByCountry";
import Recommendations from "@/components/Recommendations";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = Number(params.id);

  // fetch data
  const TvShow = await getTvShowDetails(id);
  if (TvShow instanceof Error) {
    throw new Error(`Failed to fetch TV show data: ${TvShow}`);
  }

  return {
    title: TvShow.name,
  };
}

export default async function TvDetails({
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
  const TvShowId = Number(params.id);
  const TvShow = await getTvShowDetails(TvShowId);
  const streamingProviders = await getTvShowProviders();
  const countries = await getCountries();
  // get the selected streaming provider from the search params
  // if not provided, default to '8'(Netflix)
  const selectedStreamingProvider = searchParams?.streamingProvider || "8";

  const selectedCountry = searchParams?.watch_region || "US";

  if (TvShow instanceof Error) {
    throw new Error(`Failed to fetch movie data: ${TvShow}`);
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
      <DetailCard details={TvShow} />
      <JustWatchAttribution title={TvShow.name} />
      <AvailabilityByProvider
        // list of streaming providers for combo box
        streamingProviderList={streamingProviders}
        // will have countries that match the selected streaming provider
        details={TvShow}
        selectedStreamingProviderId={selectedStreamingProvider}
        countries={countries}
      />
      <AvailabilityByCountry
        details={TvShow}
        selectedCountry={selectedCountry}
        countries={countries}
      />
      <Recommendations recommendations={TvShow.recommendations} />
    </div>
  );
}
