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
 * Creates server component that displays all countries with availability of movie or TV show based on selected streaming provider.
 * Used in the movie and tv detail pages.
 *
 * @param details - movie or tv detail object
 * @param selectedStreamingProviderId - id of selected streaming provider
 * @param countries - list of available countries used in the TMDB API
 * @returns - server component that displays country flags with the country name in a card.
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

  /**
   * Extracts all streaming options from the watch providers data
   *
   * This code:
   * 1. Takes the watchProviders object (organized by country code)
   * 2. For each country, extracts the streaming options (flatrate, ads, or free)
   * 3. Filters out any null values (countries without streaming options)
   * 4. Returns an array of arrays, where each inner array contains provider objects
   *    for a specific country that offer the content via streaming (not rental/purchase)
   */
  const streamingProviders = Object.values(watchProviders)
    .map((WatchProviderCountry) => {
      return (
        WatchProviderCountry.flatrate ||
        WatchProviderCountry.ads ||
        WatchProviderCountry.free ||
        null
      );
    })
    .filter((WatchProviderDetail) => WatchProviderDetail !== null);

  const uniqueStreamingProviders: WatchProviderDetail[] = [];

  /**
   * Builds a unique list of streaming providers
   *
   * This code:
   * 1. Iterates through the nested arrays of streaming providers (from all countries)
   * 2. For each provider found, checks if it already exists in our unique list
   * 3. Only adds providers that haven't been seen before (based on provider_id)
   * 4. Results in uniqueStreamingProviders containing one entry for each distinct
   *    streaming service, regardless of how many countries it appears in
   */
  for (const providers of streamingProviders) {
    if (providers) {
      for (const providerDetail of providers) {
        //checks if the provider is already in the uniqueStreamingProviders array
        if (
          !uniqueStreamingProviders.some(
            (p) => p.provider_id === providerDetail.provider_id,
          )
        ) {
          uniqueStreamingProviders.push(providerDetail);
        }
      }
    }
  }

  /**
   * Sorts the unique streaming providers alphabetically by name
   *
   * This code:
   * 1. Takes the uniqueStreamingProviders array created earlier
   * 2. Sorts it alphabetically based on the provider_name property
   * 3. Returns a new sorted array that maintains all provider details
   *    but presents them in a user-friendly alphabetical order
   * 4. This sorted list will be used for display in the UI
   */
  const uniqueStreamingProvidersAlphabetical = uniqueStreamingProviders.sort(
    (a, b) => a.provider_name.localeCompare(b.provider_name),
  );

  const selectedStreamingProviderName =
    uniqueStreamingProvidersAlphabetical.find(
      (provider) =>
        provider.provider_id.toString() === selectedStreamingProviderId,
    )?.provider_name ?? uniqueStreamingProvidersAlphabetical[0]?.provider_name;

  const updatedSelectedStreamingProviderId = !selectedStreamingProviderId
    ? uniqueStreamingProvidersAlphabetical
        .find(
          (provider) =>
            provider.provider_name === selectedStreamingProviderName,
        )
        ?.provider_id.toString()
    : selectedStreamingProviderId;

  const uniqueStreamingProviderList: streamingProviderList = {
    results: uniqueStreamingProvidersAlphabetical,
  };

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
                    (providerDetails) =>
                      // ignore elements that are strings
                      typeof providerDetails !== "string" &&
                      providerDetails.some(
                        (provider) =>
                          provider.provider_id.toString() ===
                          updatedSelectedStreamingProviderId,
                      ),
                  );

                  //hasSelectedProvider prevents duplicate country cards by only rendering a country once if the selected provider is available there, regardless of how many different ways it's available (streaming, rental, purchase, etc.).
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
