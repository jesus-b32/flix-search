// Next.js
import { type Metadata } from "next";

// Server Actions
import { getTvShowDetails } from "@/server/actions/tv/actions";

// Custom Components
import DetailCard from "@/components/detailPage/DetailCard";
import { getCountries } from "@/server/actions/actions";
import AvailabilityToggle from "@/components/client/AvailabilityToggle";
import AvailabilityByProvider from "@/components/detailPage/AvailabilityByProvider";
import AvailabilityByCountry from "@/components/detailPage/AvailabilityByCountry";
import Recommendations from "@/components/detailPage/Recommendations";
import { currentUser } from "@/lib/currentUser";

/**
 * The props for the tv details page.
 * @see https://developer.themoviedb.org/reference/tv-series-details
 * @returns the props for the tv details page
 */
type Props = {
  params: { id: string };
};

/**
 * The metadata for the tv details page.
 * @see https://developer.themoviedb.org/reference/tv-series-details
 * @returns the metadata for the tv details page
 */
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

/**
 * The tv details page.
 * @see https://developer.themoviedb.org/reference/tv-series-details
 * @returns the tv details page
 */
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
  const user = await currentUser();

  const TvShowId = Number(params.id);
  const TvShow = await getTvShowDetails(TvShowId);
  const countries = await getCountries();
  const selectedStreamingProvider = searchParams.streamingProvider;
  const selectedCountry = searchParams.watch_region || "US";

  if (TvShow instanceof Error) {
    throw new Error(`Failed to fetch movie data: ${TvShow}`);
  }
  if (countries instanceof Error) {
    throw new Error(`Failed to fetch country data: ${countries}`);
  }

  // Pre-render the server components
  const providerView = (
    <AvailabilityByProvider
      details={TvShow}
      selectedStreamingProviderId={selectedStreamingProvider}
      countries={countries}
    />
  );

  const countryView = (
    <AvailabilityByCountry
      details={TvShow}
      selectedCountry={selectedCountry}
      countries={countries}
    />
  );

  return (
    <div className="flex min-h-screen flex-col items-center">
      <DetailCard details={TvShow} user={user} />
      <AvailabilityToggle
        providerView={providerView}
        countryView={countryView}
      />
      <Recommendations recommendations={TvShow.recommendations} />
    </div>
  );
}
