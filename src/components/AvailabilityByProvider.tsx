import type {
  streamingProviderList,
  countryList,
} from "@/server/actions/types";
import SelectSearch from "./client/SelectSearch";
import type { movieDetails } from "@/server/actions/movies/types";
import type { tvDetails } from "@/server/actions/tv/types";

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
      <div className="flex w-full items-center justify-center gap-4 lg:justify-start">
        <span className="text-xl font-semibold">
          Select Streaming Provider:
        </span>
        <SelectSearch
          data={streamingProviderList}
          defaultValue={selectedStreamingProviderId}
        />
      </div>
      <div className="mt-6 flex w-full flex-col">
        <h2 className="mb-3 text-2xl font-bold">
          {`${title} is available on ${selectedStreamingProviderName} in the following countries:`}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {!watchProviders ? (
            <p>No Streaming data available for title</p>
          ) : (
            Object.entries(watchProviders).map(([country, providerCountry]) =>
              Object.entries(providerCountry).map(
                ([providerType, providerDetails]) =>
                  typeof providerDetails !== "string"
                    ? providerDetails.map((provider) =>
                        provider.provider_id.toString() ===
                        selectedStreamingProviderId ? (
                          <span key={provider.provider_id}>
                            {
                              countries.find(
                                (nation) => nation.iso_3166_1 === country,
                              )?.native_name
                            }
                          </span>
                        ) : null,
                      )
                    : null,
              ),
            )
          )}
        </div>
      </div>
    </div>
  );
}
