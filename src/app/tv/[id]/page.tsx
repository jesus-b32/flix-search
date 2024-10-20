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

export default async function TvDetails({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams: {
    streamingProvider: string;
    country: string;
  };
}) {
  const TvShowId = Number(params.id);
  const TvShow = await getTvShowDetails(TvShowId);
  const streamingProviders = await getTvShowProviders();
  const countries = await getCountries();
  // get the selected streaming provider from the search params
  // if not provided, default to '8'(Netflix)
  const selectedStreamingProvider = searchParams?.streamingProvider || "8";

  const selectedCountry = searchParams?.country || "US";

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
    <div className="flex min-h-screen flex-col items-center justify-center divide-y-2 divide-slate-300">
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
