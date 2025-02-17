"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import MultipleSelector, { type Option } from "@/components/ui/multi-selector";
import DateSelector from "@/components/client/DateSelector";
import SelectList from "@/components/client/SelectList";
import SelectSearch from "@/components/client/SelectSearch";

import type {
  genresList,
  languagesList,
  streamingProviderList,
  watchProviderRegions,
} from "@/server/actions/types";
import { type Dispatch, type SetStateAction } from "react";

interface FilterContentProps {
  mediaType: "movie" | "tv";
  sortOptions: { value: string; label: string }[];
  sortBy: string;
  handleSortChange: (value: string) => void;
  genreList: genresList;
  selectedGenres: string[];
  handleGenreChange: (genre: string) => void;
  originalLanguage: string;
  setOriginalLanguage: Dispatch<SetStateAction<string>>;
  releaseDateGte: Date | null;
  setReleaseDateGte: Dispatch<SetStateAction<Date | null>>;
  releaseDateLte: Date | null;
  setReleaseDateLte: Dispatch<SetStateAction<Date | null>>;
  runtime: number[];
  setRuntime: (value: number[]) => void;
  watchProviderRegionList: watchProviderRegions;
  watchProviders: Option[];
  setWatchProviders: (value: Option[]) => void;
  watchProviderList: streamingProviderList;
  languageList: languagesList;
  setIsChanged: (value: boolean) => void;
}

export default function FilterContent({
  mediaType,
  sortOptions,
  sortBy,
  handleSortChange,
  genreList,
  selectedGenres,
  handleGenreChange,
  originalLanguage,
  setOriginalLanguage,
  releaseDateGte,
  setReleaseDateGte,
  releaseDateLte,
  setReleaseDateLte,
  runtime,
  setRuntime,
  watchProviderRegionList,
  watchProviders,
  setWatchProviders,
  watchProviderList,
  languageList,
  setIsChanged,
}: FilterContentProps) {
  return (
    <div className="mb-96 w-full space-y-6 divide-y-2">
      <div className="w-full">
        <h3 className="my-4 ml-4 font-semibold">Sort By</h3>
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="ml-4 w-10/12">
            <SelectValue placeholder="Select a sorting option" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full">
        <h3 className="my-4 ml-4 font-semibold">Genres</h3>
        <div className="ml-4 space-y-2">
          {genreList.genres.map((genre) => (
            <div key={genre.id} className="flex items-center space-x-2">
              <Checkbox
                id={genre.id.toString()}
                checked={selectedGenres.includes(genre.id.toString())}
                onCheckedChange={() => handleGenreChange(genre.id.toString())}
              />
              <Label htmlFor={genre.id.toString()}>{genre.name}</Label>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        <h3 className="my-4 ml-4 font-semibold">Language</h3>
        <SelectList
          list={languageList}
          currentValue={originalLanguage}
          setCurrentValue={setOriginalLanguage}
          className="ml-4 w-10/12"
          onValueChange={() => setIsChanged(true)}
        />
      </div>
      <div className="w-full space-y-4">
        <h3 className="my-4 ml-4 font-semibold">
          {mediaType === "movie" ? "Release Date" : "First Air Date"}
        </h3>
        <Label htmlFor="gte" className="ml-4">
          From:
        </Label>
        <div id="gte" className="ml-4 w-10/12 pb-4">
          <DateSelector
            date={releaseDateGte}
            setDate={setReleaseDateGte}
            setIsChanged={setIsChanged}
          />
        </div>
        <Label htmlFor="lte" className="ml-4">
          To:
        </Label>
        <div id="lte" className="ml-4 w-10/12">
          <DateSelector
            date={releaseDateLte}
            setDate={setReleaseDateLte}
            setIsChanged={setIsChanged}
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h3 className="mb-8 ml-4 mt-4 w-full font-semibold">
          Runtime(minutes)
        </h3>
        <DualRangeSlider
          label={(value) => <span>{value}</span>}
          value={runtime}
          onValueChange={(value) => {
            setRuntime(value);
            setIsChanged(true);
          }}
          min={0}
          max={400}
          step={5}
          minStepsBetweenThumbs={10}
          className="w-10/12"
        />
      </div>
      <div className="w-full space-y-4 pt-6">
        <h3 className="ml-4 font-semibold">Where to Watch</h3>
        <SelectSearch
          data={watchProviderRegionList.results}
          className="ml-4 w-10/12"
        />
        <MultipleSelector
          value={watchProviders}
          onChange={(value) => {
            setWatchProviders(value);
            setIsChanged(true);
          }}
          defaultOptions={watchProviderList.results.map((provider) => ({
            label: provider.provider_name,
            value: provider.provider_name.toLowerCase(),
            id: provider.provider_id.toString(),
          }))}
          placeholder="Watch Providers"
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              no results found.
            </p>
          }
          className="ml-4 w-10/12"
        />
      </div>
    </div>
  );
}
