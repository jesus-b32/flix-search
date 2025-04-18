import type { countryList } from "@/server/actions/types";
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
 * @param  details - movie or tv detail object
 * @param selectedCountry - iso_3166_1 code of selected country
 * @param countries - list of available countries used in the TMDB API
 * @returns - server component that displays country flags with the country name in a card
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
  const availableCountries = Object.keys(watchProviders);

  // will only show countries that have availability data for selected movie or tv show
  const filteredCountries = countries.filter((country) =>
    availableCountries.includes(country.iso_3166_1),
  ) as countryList;
  // handle case where US, the default country, is not in the list of available countries
  const watchProviderCountry =
    watchProviders?.[selectedCountry as keyof typeof watchProviders] ??
    watchProviders[availableCountries[0] as keyof typeof watchProviders];

  const selectedCountryName = availableCountries.includes(selectedCountry)
    ? countries.find((country) => country.iso_3166_1 === selectedCountry)
        ?.native_name
    : countries.find((country) => country.iso_3166_1 === availableCountries[0])
        ?.native_name;

  return (
    <>
      {availableCountries.length === 0 ? (
        <h1 className="mb-6 text-center text-xl font-bold">
          {`Wow! Looks like ${title} is not available on any streaming services in the world!`}
        </h1>
      ) : (
        <div className="flex w-full flex-col items-center justify-center py-6 md:w-10/12 md:justify-start">
          <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:justify-start">
            <span className="text-xl font-semibold">Select Country:</span>
            <SelectSearch data={filteredCountries} />
          </div>
          <div className="mt-6 flex w-full flex-col">
            <h2 className="mb-3 px-6 text-center text-xl font-bold md:px-0 md:text-left">
              {`${title} is available from the following providers in ${selectedCountryName}:`}
            </h2>
            {watchProviderCountry &&
              Object.entries(watchProviderCountry).map(
                ([providerType, providerDetails]) =>
                  typeof providerDetails !== "string" ? (
                    <div
                      key={providerType}
                      className="mt-4 flex flex-col gap-4"
                    >
                      <h3 className="text-center text-xl font-bold md:text-left">
                        {providerType === "flatrate"
                          ? "Stream"
                          : providerType.charAt(0).toUpperCase() +
                            providerType.slice(1)}
                      </h3>
                      <div className="grid grid-cols-1 justify-items-center gap-4 min-[370px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                        {providerDetails.map((provider) => (
                          <Card
                            key={provider.provider_id}
                            className="flex h-60 w-36 flex-col items-center border-none"
                          >
                            <div className="flex justify-center">
                              <img
                                alt={`${provider.provider_name} logo`}
                                src={`https://image.tmdb.org/t/p/w92${
                                  provider.logo_path
                                }`}
                                className="h-auto w-36 rounded-t-lg border-b border-slate-300 object-cover"
                              />
                            </div>
                            <div className="flex flex-col flex-wrap">
                              <CardHeader className="px-1 pt-2">
                                <CardTitle className="text-center text-xl">
                                  {provider?.provider_name ??
                                    "No provider name"}
                                </CardTitle>
                              </CardHeader>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : null,
              )}
          </div>
        </div>
      )}
    </>
  );
}
