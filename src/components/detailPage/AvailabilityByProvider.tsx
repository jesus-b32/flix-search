import type {
  streamingProviderList,
  countryList,
  WatchProviderDetail,
} from "@/server/actions/types";
import SelectSearch from "@/components/client/SelectSearch";
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
  details,
  selectedStreamingProviderId,
  countries,
}: {
  details: movieDetails | tvDetails;
  selectedStreamingProviderId: string;
  countries: countryList;
}) {
  const title = "title" in details ? details.title : details.name;
  const watchProviders = details["watch/providers"].results;

  const streamingProviders = Object.values(watchProviders)
    .map((provider) => {
      return provider.flatrate || provider.ads || provider.free || null;
    })
    .filter((provider) => provider !== null);

  const uniqueStreamingProviders: WatchProviderDetail[] = [];

  for (const providers of streamingProviders) {
    if (providers) {
      for (const provider of providers) {
        //checks if the provider is already in the uniqueStreamingProviders array
        if (
          !uniqueStreamingProviders.some(
            (p) => p.provider_id === provider.provider_id,
          )
        ) {
          uniqueStreamingProviders.push(provider);
        }
      }
    }
  }

  const selectedStreamingProviderName =
    uniqueStreamingProviders.find(
      (provider) =>
        provider.provider_id.toString() === selectedStreamingProviderId,
    )?.provider_name ?? uniqueStreamingProviders[0]?.provider_name;

  const uniqueStreamingProviderList: streamingProviderList = {
    results: uniqueStreamingProviders,
  };

  const updatedSelectedStreamingProviderId = uniqueStreamingProviderList.results
    .find(
      (provider) => provider.provider_name === selectedStreamingProviderName,
    )
    ?.provider_id.toString();

  return (
    <>
      {Object.keys(watchProviders).length === 0 ? (
        <h1 className="mb-6 text-center text-xl font-bold">
          {`Wow! Looks like ${title} is not available on any streaming services in the world!`}
        </h1>
      ) : (
        <div className="flex w-full flex-col items-center justify-center py-6 md:w-10/12 md:justify-start">
          <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:justify-start">
            <span className="text-xl font-semibold">
              Select Streaming Provider:
            </span>
            <SelectSearch data={uniqueStreamingProviderList} />
          </div>
          <div className="mt-6 flex w-full flex-col">
            <h2 className="mb-3 px-6 text-center text-xl font-bold md:px-0 md:text-left">
              {`${title} is available on ${selectedStreamingProviderName} in the following countries:`}
            </h2>
            <div className="grid grid-cols-1 justify-items-center gap-4 min-[370px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {/* gets all the provider categories ("flatrate", "rent", "buy") for a country */}
              {Object.entries(watchProviders).map(
                ([country, providerCountry]) => {
                  // Check if the selected streaming provider exists in any category for this country
                  const hasSelectedProvider = Object.values(
                    providerCountry,
                  ).some(
                    //checks if at least one category contains our provider
                    (providerDetails) =>
                      typeof providerDetails !== "string" &&
                      providerDetails.some(
                        //checks if any provider in the category has an ID matching our selected provider
                        (provider) =>
                          provider.provider_id.toString() ===
                          updatedSelectedStreamingProviderId,
                      ),
                  );

                  //This prevents duplicate country cards by only rendering a country once if the selected provider is available there, regardless of how many different ways it's available (streaming, rental, purchase, etc.).
                  return hasSelectedProvider ? (
                    <Card
                      key={country}
                      className="flex h-48 w-40 flex-col items-center border-none"
                    >
                      <div className="flex justify-center">
                        <img
                          alt={`${
                            countries.find(
                              (nation) => nation.iso_3166_1 === country,
                            )?.native_name ?? "N/A"
                          } flag`}
                          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
                          className="h-auto w-40 rounded-t-lg border-b border-slate-300 object-cover"
                        />
                      </div>
                      <div className="flex flex-col flex-wrap">
                        <CardHeader className="px-1 pt-2">
                          <CardTitle className="text-center text-xl">
                            {countries.find(
                              (nation) => nation.iso_3166_1 === country,
                            )?.native_name ?? "N/A"}
                          </CardTitle>
                        </CardHeader>
                      </div>
                    </Card>
                  ) : null;
                },
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
