"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { type Option } from "@/components/ui/multi-selector";

// type definitions
import type {
  genresList,
  languagesList,
  streamingProviderList,
  watchProviderRegions,
} from "@/server/actions/types";

// icons
import { SlidersHorizontal } from "lucide-react";
import { format } from "date-fns";
import { UTCDate } from "@date-fns/utc";

// custom components
import FilterContent from "@/components/client/FilterContent";

/**
 * A component that displays the filter and sort options in discover pages.
 * Used in discover pages.
 *
 * @param genreList - the genre list of media
 * @param languageList - the language list of media
 * @param watchProviderRegionList - the watch provider region list
 * @param watchProviderList - the watch provider list
 * @param mediaType - the type of media: movie or tv
 * @returns a filter and sort component that displays the filter and sort options
 */
export default function FilterSort({
  genreList,
  languageList,
  watchProviderRegionList,
  watchProviderList,
  mediaType,
}: {
  genreList: genresList;
  languageList: languagesList;
  watchProviderRegionList: watchProviderRegions;
  watchProviderList: streamingProviderList;
  mediaType: "movie" | "tv";
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  //sorting options for TMDB API
  const sortOptions =
    mediaType === "movie"
      ? [
          { value: "popularity.asc", label: "Popularity (Low - High)" },
          { value: "popularity.desc", label: "Popularity (High - Low)" },
          { value: "vote_average.asc", label: "Rating (Low - High)" },
          { value: "vote_average.desc", label: "Rating (High - Low)" },
          { value: "primary_release_date.asc", label: "Release Date (Oldest)" },
          {
            value: "primary_release_date.desc",
            label: "Release Date (Newest)",
          },
          { value: "title.asc", label: "Title (A-Z)" },
          { value: "title.desc", label: "Title (Z-A)" },
        ]
      : [
          { value: "popularity.asc", label: "Popularity (Low - High)" },
          { value: "popularity.desc", label: "Popularity (High - Low)" },
          { value: "vote_average.asc", label: "Rating (Low - High)" },
          { value: "vote_average.desc", label: "Rating (High - Low)" },
          { value: "first_air_date.asc", label: "Air Date (Oldest)" },
          {
            value: "first_air_date.desc",
            label: "Air Date (Newest)",
          },
          { value: "name.asc", label: "Name (A-Z)" },
          { value: "name.desc", label: "Name (Z-A)" },
        ];

  // State of different sorting and filtering options
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [originalLanguage, setOriginalLanguage] = useState<string>("all");
  const [releaseDateGte, setReleaseDateGte] = useState<Date | null>(null);
  const [releaseDateLte, setReleaseDateLte] = useState<Date | null>(null);
  const [runtime, setRuntime] = useState([0, 400]);
  //{id: watchProviderId, value: watchProviderName, label: watchProviderName}
  const [watchProviders, setWatchProviders] = useState<Option[]>([]);
  const [watchRegion, setWatchRegion] = useState("US");
  const [isChanged, setIsChanged] = useState(false); //tracks if filter/sorting options has changed
  const [announcement, setAnnouncement] = useState(""); //for screen reader announcements

  // Whenever search params in URL changes, get the new sorting and filter options from the URL search params and update the state of those values if the search parameter exists
  useEffect(() => {
    const genresParam = searchParams.get("with_genres");
    const sortParam = searchParams.get("sort_by");
    const languageParam = searchParams.get("with_original_language");
    const watchRegionParam = searchParams.get("watch_region");
    const watchProviderParam = searchParams.get("with_watch_providers");
    const runtimeGteParam = searchParams.get("with_runtime.gte");
    const runtimeLteParam = searchParams.get("with_runtime.lte");
    // If param exists, create an array of selected genres and set it in state
    if (genresParam) setSelectedGenres(genresParam.split(","));
    if (sortParam) setSortBy(sortParam);
    if (languageParam) setOriginalLanguage(languageParam);
    if (watchProviderParam) {
      const watchProviderName = (watchProviderId: string) =>
        watchProviderList.results.find(
          (provider) => provider.provider_id.toString() === watchProviderId,
        )?.provider_name ?? "N/A";
      setWatchProviders(
        watchProviderParam.split("|").map((watchProviderId) => ({
          id: watchProviderId,
          value: watchProviderName(watchProviderId),
          label: watchProviderName(watchProviderId),
        })),
      );
    }
    if (watchRegionParam) setWatchRegion(watchRegionParam);
    if (runtimeGteParam && runtimeLteParam) {
      setRuntime([parseInt(runtimeGteParam), parseInt(runtimeLteParam)]);
    }

    if (mediaType === "movie") {
      const releaseDateGteParam = searchParams.get("primary_release_date.gte");
      const releaseDateLteParam = searchParams.get("primary_release_date.lte");

      if (releaseDateGteParam)
        setReleaseDateGte(new UTCDate(releaseDateGteParam));
      if (releaseDateLteParam)
        setReleaseDateLte(new UTCDate(releaseDateLteParam));
    } else {
      const firstAirDateGteParam = searchParams.get("first_air_date.gte");
      const firstAirDateLteParam = searchParams.get("first_air_date.lte");

      if (firstAirDateGteParam)
        setReleaseDateGte(new UTCDate(firstAirDateGteParam));
      if (firstAirDateLteParam)
        setReleaseDateLte(new UTCDate(firstAirDateLteParam));
    }
  }, [searchParams, watchProviderList.results, mediaType]);

  /**
   * Updates the selected genres by toggling the given genre in the list of
   * selected genres. If the genre is already in the list, it is removed; if it is
   * not in the list, it is added.
   *
   * @param {string} genre - The genre to be toggled.
   */
  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
    setIsChanged(true);
  };

  /**
   * Updates the sortBy state with the provided value and sets the isChanged
   * state to true, indicating that a change has been made to the sorting options.
   *
   * @param {string} value - The new sorting option to be applied.
   */
  const handleSortChange = (value: string) => {
    setSortBy(value);
    setIsChanged(true);
  };

  /**
   * Handles the search by updating the URL search parameters with the current
   * values of selected genres, sort by, and original language. If the selected
   * genres array is empty, the "with_genres" parameter is removed from the search
   * params. The "page" parameter is always set to 1.
   * When the search is handled, the isChanged state is set to false.
   */
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);

    // genres
    if (selectedGenres.length) {
      params.set("with_genres", selectedGenres.join(","));
    } else {
      params.delete("with_genres");
    }

    // original language
    if (originalLanguage && originalLanguage !== "all") {
      params.set("with_original_language", originalLanguage);
    } else {
      params.delete("with_original_language");
    }

    // runtime range
    if (
      runtime.length === 2 &&
      runtime[0] !== undefined &&
      runtime[1] !== undefined &&
      runtime[0] < runtime[1]
    ) {
      if (runtime[0] !== 0 || runtime[1] !== 400) {
        params.set("with_runtime.gte", runtime[0].toString());
        params.set("with_runtime.lte", runtime[1].toString());
      } else {
        params.delete("with_runtime.gte");
        params.delete("with_runtime.lte");
      }
    }

    // sort by
    params.set("sort_by", sortBy);

    //page number always set to 1 when submitting new filters
    params.set("page", "1");

    // watch provider
    if (watchProviders.length) {
      params.set(
        "with_watch_providers",
        watchProviders.map((watchProvider) => watchProvider.id).join("|"),
      );
    } else {
      params.delete("with_watch_providers");
    }

    // watch_region
    if (watchRegion) {
      params.set("watch_region", watchRegion);
    } else {
      params.delete("watch_region");
    }

    if (mediaType === "movie") {
      // release date greater than or equal
      if (releaseDateGte) {
        params.set(
          "primary_release_date.gte",
          format(releaseDateGte, "yyyy-MM-dd"),
        );
      } else {
        params.delete("primary_release_date.gte");
      }

      // release date less than or equal
      if (releaseDateLte) {
        params.set(
          "primary_release_date.lte",
          format(releaseDateLte, "yyyy-MM-dd"),
        );
      } else {
        params.delete("primary_release_date.lte");
      }
    } else {
      // release date greater than or equal
      if (releaseDateGte) {
        params.set("first_air_date.gte", format(releaseDateGte, "yyyy-MM-dd"));
      } else {
        params.delete("first_air_date.gte");
      }

      // release date less than or equal
      if (releaseDateLte) {
        params.set("first_air_date.lte", format(releaseDateLte, "yyyy-MM-dd"));
      } else {
        params.delete("first_air_date.lte");
      }
    }

    router.push(`${pathname}?${params.toString()}`);
    setIsChanged(false);
    setAnnouncement(
      `Filters and sort options applied. Showing ${mediaType === "movie" ? "movies" : "shows"} with current selections.`,
    );
  };

  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {announcement}
      </div>
      <Card className="w-[95%] border-none md:w-10/12 lg:w-full">
        <CardHeader>
          <CardTitle className="text-center font-bold">
            {mediaType === "movie" ? "Filter Movies" : "Filter Shows"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <form
            role="search"
            aria-label={`Filter and sort ${mediaType === "movie" ? "movies" : "shows"}`}
          >
            <div className="hidden lg:block">
              <FilterContent
                mediaType={mediaType}
                sortOptions={sortOptions}
                sortBy={sortBy}
                handleSortChange={handleSortChange}
                genreList={genreList}
                selectedGenres={selectedGenres}
                handleGenreChange={handleGenreChange}
                originalLanguage={originalLanguage}
                setOriginalLanguage={setOriginalLanguage}
                releaseDateGte={releaseDateGte}
                setReleaseDateGte={setReleaseDateGte}
                releaseDateLte={releaseDateLte}
                setReleaseDateLte={setReleaseDateLte}
                runtime={runtime}
                setRuntime={setRuntime}
                watchProviderRegionList={watchProviderRegionList}
                watchProviders={watchProviders}
                setWatchProviders={setWatchProviders}
                watchProviderList={watchProviderList}
                languageList={languageList}
                setIsChanged={setIsChanged}
              />
            </div>
          </form>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="w-full rounded-t-none"
                  aria-label="Open filters and sort options"
                >
                  <SlidersHorizontal
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  Filters & Sort
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="text-black">
                <SheetHeader>
                  <SheetTitle>
                    {mediaType === "movie" ? "Filter Movies" : "Filter Shows"}
                  </SheetTitle>
                  <SheetDescription>
                    Apply filters and sorting options to find your perfect{" "}
                    {mediaType === "movie" ? "movie" : "show"}.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4 flex h-[calc(100vh-8rem)] flex-col overflow-y-auto">
                  <form
                    role="search"
                    aria-label={`Filter and sort ${mediaType === "movie" ? "movies" : "shows"}`}
                  >
                    <FilterContent
                      mediaType={mediaType}
                      sortOptions={sortOptions}
                      sortBy={sortBy}
                      handleSortChange={handleSortChange}
                      genreList={genreList}
                      selectedGenres={selectedGenres}
                      handleGenreChange={handleGenreChange}
                      originalLanguage={originalLanguage}
                      setOriginalLanguage={setOriginalLanguage}
                      releaseDateGte={releaseDateGte}
                      setReleaseDateGte={setReleaseDateGte}
                      releaseDateLte={releaseDateLte}
                      setReleaseDateLte={setReleaseDateLte}
                      runtime={runtime}
                      setRuntime={setRuntime}
                      watchProviderRegionList={watchProviderRegionList}
                      watchProviders={watchProviders}
                      setWatchProviders={setWatchProviders}
                      watchProviderList={watchProviderList}
                      languageList={languageList}
                      setIsChanged={setIsChanged}
                    />
                  </form>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </CardContent>
      </Card>
      {isChanged && (
        <div
          className="fixed bottom-0 left-0 right-0 border-t bg-background p-4"
          role="region"
          aria-label="Filter actions"
        >
          <Button
            onClick={handleSearch}
            className="w-full"
            aria-describedby="filter-changes-description"
          >
            Apply Filters & Sort
          </Button>
          <div id="filter-changes-description" className="sr-only">
            Apply the current filter and sort selections to update the results
          </div>
        </div>
      )}
    </>
  );
}
