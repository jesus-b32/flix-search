"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { genresList, languagesList } from "@/server/actions/types";

const ratings = ["G", "PG", "PG-13", "R"];
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

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [originalLanguage, setOriginaLanguage] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const genresParam = searchParams.get("with_genres");
    const ratingsParam = searchParams.get("ratings");
    const sortParam = searchParams.get("sort_by");
    const languageParam = searchParams.get("with_original_language");

    /**
     * If param exists, create an array of selected genres and set it in state
     */
    if (genresParam) setSelectedGenres(genresParam.split(","));
    if (ratingsParam) setSelectedRatings(ratingsParam.split(","));
    if (sortParam) setSortBy(sortParam);
    if (languageParam) setOriginaLanguage(languageParam);
  }, [searchParams]);

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
    setIsChanged(true);
  };

  const handleRatingChange = (rating: string) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating],
    );
    setIsChanged(true);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setIsChanged(true);
  };

  const handleOriginalLanguageChange = (value: string) => {
    setOriginaLanguage(value);
    setIsChanged(true);
  };

  /**
   * Constructs a URLSearchParams object from the selected genres, ratings,
   * and sort options, then updates the browser's URL with these parameters.
   * Resets the isChanged state to false after the search is executed.
   */
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (selectedGenres.length) {
      params.set("with_genres", selectedGenres.join(","));
    } else {
      params.delete("with_genres");
    }
    if (selectedRatings.length) {
      params.set("ratings", selectedRatings.join(","));
    } else {
      params.delete("ratings");
    }
    params.set("sort_by", sortBy);
    if (originalLanguage)
      params.set("with_original_language", originalLanguage);
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
    setIsChanged(false);
  };

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
      <div className="pb-6">
        <h3 className="my-4 ml-4 font-semibold">Ratings</h3>
        <div className="ml-4 space-y-2">
          {ratings.map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onCheckedChange={() => handleRatingChange(rating)}
              />
              <Label htmlFor={`rating-${rating}`}>{rating}</Label>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <h3 className="my-4 ml-4 font-semibold">Language</h3>
        <Select
          value={originalLanguage}
          onValueChange={handleOriginalLanguageChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languageList.map((language) => (
              <SelectItem key={language.iso_639_1} value={language.iso_639_1}>
                {language.english_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
