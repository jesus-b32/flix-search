"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";

// type definitions
import type { genresList, languagesList } from "@/server/actions/types";
import type { Dispatch, SetStateAction } from "react";

// icons
import {
  SlidersHorizontal,
  Check,
  ChevronsUpDown,
  Calendar as CalendarIcon,
} from "lucide-react";

import { format } from "date-fns";
import { UTCDate } from "@date-fns/utc";

//sorting options for TMDB API
const sortOptions = [
  { value: "popularity.asc", label: "Popularity (Low - High)" },
  { value: "popularity.desc", label: "Popularity (High - Low)" },
  { value: "vote_average.asc", label: "Rating (Low - High)" },
  { value: "vote_average.desc", label: "Rating (High - Low)" },
  { value: "primary_release_date.asc", label: "Release Date (Oldest)" },
  { value: "primary_release_date.desc", label: "Release Date (Newest)" },
  { value: "title.asc", label: "Title (A-Z)" },
  { value: "title.desc", label: "Title (Z-A)" },
];

export default function FilterSort({
  genreList,
  languageList,
}: {
  genreList: genresList;
  languageList: languagesList;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // State of different sorting and filtering options
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [originalLanguage, setOriginaLanguage] = useState("all");
  const [releaseDateGte, setReleaseDateGte] = useState<Date | null>(null);
  const [releaseDateLte, setReleaseDateLte] = useState<Date | null>(null);
  // runtimeGte = runtime[0]; runtimeLte = runtime[1]
  const [runtime, setRuntime] = useState([0, 400]);

  //state that tracks if filter or sorting options have been changed
  const [isChanged, setIsChanged] = useState(false);
  // open state of language select
  const [open, setOpen] = useState(false);

  // Whenever search params in URL changes, get the new sorting and filter options from the URL search params and update the state of those values if the search parameter exists
  useEffect(() => {
    const genresParam = searchParams.get("with_genres");
    const sortParam = searchParams.get("sort_by");
    const languageParam = searchParams.get("with_original_language");
    const releaseDateGteParam = searchParams.get("primary_release_date.gte");
    const releaseDateLteParam = searchParams.get("primary_release_date.lte");
    const runtimeGteParam = searchParams.get("with_runtime.gte");
    const runtimeLteParam = searchParams.get("with_runtime.lte");

    // If param exists, create an array of selected genres and set it in state
    if (genresParam) setSelectedGenres(genresParam.split(","));
    if (sortParam) setSortBy(sortParam);
    if (languageParam) setOriginaLanguage(languageParam);
    if (releaseDateGteParam)
      setReleaseDateGte(new UTCDate(releaseDateGteParam));
    if (releaseDateLteParam)
      setReleaseDateLte(new UTCDate(releaseDateLteParam));
    if (runtimeGteParam && runtimeLteParam) {
      setRuntime([parseInt(runtimeGteParam), parseInt(runtimeLteParam)]);
    }
  }, [searchParams]);

  /**
   * Updates the selected genres by toggling the given genre in the list of
   * selected genres. If the genre is already in the list, it is removed; if it is
   * not in the list, it is added.
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
    if (selectedGenres.length) {
      params.set("with_genres", selectedGenres.join(","));
    } else {
      params.delete("with_genres");
    }

    if (originalLanguage && originalLanguage !== "all") {
      params.set("with_original_language", originalLanguage);
    } else {
      params.delete("with_original_language");
    }

    if (releaseDateGte) {
      params.set(
        "primary_release_date.gte",
        format(releaseDateGte, "yyyy-MM-dd"),
      );
    } else {
      params.delete("primary_release_date.gte");
    }
    if (releaseDateLte) {
      params.set(
        "primary_release_date.lte",
        format(releaseDateLte, "yyyy-MM-dd"),
      );
    } else {
      params.delete("primary_release_date.lte");
    }

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
    params.set("sort_by", sortBy);
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
    setIsChanged(false);
  };

  /**
   * A component that renders a searchable and selectable popover list for
   * languages. It allows users to filter and select languages from the
   * provided languageList, updating the originalLanguage state and the
   * URL search parameters.
   * @returns A React component for selecting and searching through the given
   * languageList.
   */
  const LanguageSelect = () => (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {
            languageList.find(
              (language) => language.iso_639_1 === originalLanguage,
            )?.english_name
          }
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={"Select language..."} />
          <CommandList>
            <CommandEmpty>{"No languages found"}</CommandEmpty>
            <CommandGroup>
              {languageList.map((language) => (
                <CommandItem
                  key={language.iso_639_1}
                  value={language.english_name.toLowerCase()}
                  onSelect={(currentValue) => {
                    setOriginaLanguage(
                      languageList.find(
                        (language) =>
                          language.english_name.toLowerCase() === currentValue,
                      )?.iso_639_1 ?? "",
                    );
                    setOpen(false);
                    setIsChanged(true);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      originalLanguage === language.english_name.toLowerCase()
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {language.english_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );

  const DateSelector = ({
    date,
    setDate,
  }: {
    date: Date | null;
    setDate: Dispatch<SetStateAction<Date | null>>;
  }) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {date !== null ? (
              // format(April 29th, 2024) that will display when date selected
              format(date, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date ? date : undefined}
            onSelect={(date) => {
              setDate(date ? date : null);
              setIsChanged(true);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  };
  /**
   * The content of the filter sheet. It contains 3 sections for sorting,
   * selecting genres, and selecting the original language. The sorting options
   * are given as an array of objects with a value and label property.
   * The genre list is given as an array of objects with an id and name
   * property. The original language is given as a string.
   * @returns The content of the filter sheet.
   */
  const FilterContent = () => (
    <div className="w-full space-y-6 divide-y-2">
      <div className="">
        <h3 className="my-4 ml-4 font-semibold">Sort By</h3>
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full">
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
      <div className="">
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
      <div className="">
        <h3 className="my-4 ml-4 font-semibold">Language</h3>
        <LanguageSelect />
      </div>
      <div className="space-y-4">
        <h3 className="my-4 ml-4 font-semibold">Release Date</h3>
        <Label htmlFor="gte">From:</Label>
        <div id="gte" className="pb-4">
          <DateSelector date={releaseDateGte} setDate={setReleaseDateGte} />
        </div>
        <Label htmlFor="lte">To:</Label>
        <div id="lte">
          <DateSelector date={releaseDateLte} setDate={setReleaseDateLte} />
        </div>
      </div>
      <div className="flex flex-col items-center pb-6">
        <h3 className="mb-8 ml-4 mt-4 w-full font-semibold">Runtime</h3>
        <DualRangeSlider
          label={(value) => <span>{value}min</span>}
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
    </div>
  );

  return (
    <>
      <Card className="w-full divide-y-2">
        <CardHeader>
          <CardTitle className="text-center font-bold">Filter Movies</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="hidden lg:block">
            <FilterContent />
          </div>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters & Sort
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="text-black">
                <SheetHeader>
                  <SheetTitle>Filter Movies</SheetTitle>
                  <SheetDescription>
                    Apply filters and sorting options to find your perfect
                    movie.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </CardContent>
      </Card>
      {isChanged && (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4">
          <Button onClick={handleSearch} className="w-full">
            Apply Filters & Sort
          </Button>
        </div>
      )}
    </>
  );
}
