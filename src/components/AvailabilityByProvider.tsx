import type {
  streamingProviderList,
  countryList,
} from "@/server/actions/types";
import SelectSearch from "./client/SelectSearch";
import type { movieDetails } from "@/server/actions/movies/types";
import type { tvDetails } from "@/server/actions/tv/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * flags from country-flag-icons repo
 * @see https://www.npmjs.com/package/country-flag-icons
 */

/**
 * Creates server component that displays all countries with availability of movie or TV show based on selected streaming provider
 * @param streamingProviderList - list of available streaming providers
 * @param details - movie or tv detail object
 * @param selectedStreamingProviderId - id of selected streaming provider
 * @param countries - list of available countries used in the TMDB API
 * @returns - server component that displays country flags with the country name in a card
 */
export default function AvailabilityByProvider({
  streamingProviderList,
  details,
  selectedStreamingProviderId,
  countries,
}: {
  streamingProviderList: streamingProviderList;
  details: movieDetails | tvDetails;
  selectedStreamingProviderId: string;
  countries: countryList;
}) {
  const title = "title" in details ? details.title : details.name;
  const watchProviders = details["watch/providers"].results;
  const selectedStreamingProviderName = streamingProviderList.results.find(
    (provider) =>
      provider.provider_id.toString() === selectedStreamingProviderId,
  )?.provider_name;

  return (
    <div className="mt-6 flex w-10/12 flex-col items-center justify-center lg:w-10/12 lg:justify-start">
      {!watchProviders ? null : Object.keys(watchProviders).length === 0 ? (
        <h1 className="text-2xl font-bold">
          {`No Streaming data available for ${title}`}
        </h1>
      ) : (
        <>
          <div className="flex w-full items-center justify-center gap-4 lg:justify-start">
            <span className="text-xl font-semibold">
              Select Streaming Provider:
            </span>
            <SelectSearch data={streamingProviderList} />
          </div>
          <div className="mt-6 flex w-full flex-col">
            <h2 className="mb-3 text-2xl font-bold">
              {`${title} is available on ${selectedStreamingProviderName} in the following countries:`}
            </h2>
            <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {!watchProviders
                ? null
                : Object.entries(watchProviders).map(
                    ([country, providerCountry]) =>
                      Object.values(providerCountry).map((providerDetails) =>
                        typeof providerDetails !== "string"
                          ? providerDetails.map((provider) =>
                              provider.provider_id.toString() ===
                              selectedStreamingProviderId ? (
                                <Card
                                  key={country}
                                  className="flex h-48 w-40 flex-col items-center"
                                >
                                  <div className="flex justify-center">
                                    <img
                                      alt="country flag"
                                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
                                      className="h-auto w-40 border border-black object-cover"
                                    />
                                  </div>
                                  <div className="flex flex-col flex-wrap">
                                    <CardHeader className="px-1 pt-2">
                                      <CardTitle className="text-center text-xl">
                                        {countries.find(
                                          (nation) =>
                                            nation.iso_3166_1 === country,
                                        )?.native_name ?? "N/A"}
                                      </CardTitle>
                                    </CardHeader>
                                  </div>
                                </Card>
                              ) : null,
                            )
                          : null,
                      ),
                  )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
