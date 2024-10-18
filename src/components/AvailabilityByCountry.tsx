import type { countryList } from "@/server/actions/types";
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
 * @param {movieDetails | tvDetails} details - movie or tv detail object
 * @param {string} selectedCountry - iso_3166_1 code of selected country
 * @param {countryList} countries - list of available countries used in the TMDB API
 * @returns {JSX.Element} - server component that displays country flags with the country name in a card
 */
export default function AvailabilityByCountry({
  details,
  selectedCountry,
  countries,
}: {
  details: movieDetails | tvDetails;
  selectedCountry: string;
  countries: countryList;
}) {
  const title = "title" in details ? details.title : details.name;
  const watchProviders = details["watch/providers"].results;
  const watchProviderCountry =
    watchProviders[selectedCountry as keyof typeof watchProviders];
  const selectedCountryName = countries.find(
    (country) => country.iso_3166_1 === selectedCountry,
  )?.native_name;

  return (
    <div className="mt-6 flex w-10/12 flex-col items-center justify-center lg:w-10/12 lg:justify-start">
      {!watchProviders ? null : Object.keys(watchProviders).length === 0 ? (
        <h1 className="text-2xl font-bold">
          {`No Streaming data available for ${title}`}
        </h1>
      ) : (
        <>
          <div className="flex w-full items-center justify-center gap-4 lg:justify-start">
            <span className="text-xl font-semibold">Select Country:</span>
            <SelectSearch data={countries} defaultValue={selectedCountry} />
          </div>
          <div className="mt-6 flex w-full flex-col">
            <h2 className="mb-3 text-2xl font-bold">
              {`${title} is available from the following providers in ${selectedCountryName}:`}
            </h2>
            {/* <div className=""> */}
            {Object.entries(watchProviderCountry).map(
              ([providerType, providerDetails]) =>
                typeof providerDetails !== "string" ? (
                  <div key={providerType} className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold">{providerType}</h3>
                    <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                      {providerDetails.map((provider) => (
                        <Card
                          key={provider.provider_id}
                          className="flex h-52 w-40 flex-col items-center"
                        >
                          <div className="flex justify-center">
                            <img
                              alt="provider logo"
                              src={`https://image.tmdb.org/t/p/w342${
                                provider.logo_path
                              }`}
                              className="h-auto w-40 border border-black object-cover"
                            />
                          </div>
                          <div className="flex flex-col flex-wrap">
                            <CardHeader className="px-1 pt-2">
                              <CardTitle className="text-center text-xl">
                                {provider?.provider_name ?? "No provider name"}
                              </CardTitle>
                            </CardHeader>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : null,
            )}
            {/* </div> */}
          </div>
        </>
      )}
    </div>
  );
}
