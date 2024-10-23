"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

const genres = ["Action", "Comedy", "Drama", "Sci-Fi", "Horror"];
const ratings = ["G", "PG", "PG-13", "R"];
const sortOptions = [
  { value: "title-asc", label: "Title (A-Z)" },
  { value: "title-desc", label: "Title (Z-A)" },
  { value: "year-asc", label: "Year (Oldest)" },
  { value: "year-desc", label: "Year (Newest)" },
  { value: "rating-asc", label: "Rating (Low to High)" },
  { value: "rating-desc", label: "Rating (High to Low)" },
];

export default function MovieFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("title-asc");
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const genresParam = searchParams.get("genres");
    const ratingsParam = searchParams.get("ratings");
    const sortParam = searchParams.get("sort");

    if (genresParam) setSelectedGenres(genresParam.split(","));
    if (ratingsParam) setSelectedRatings(ratingsParam.split(","));
    if (sortParam) setSortBy(sortParam);
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

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedGenres.length) params.set("genres", selectedGenres.join(","));
    if (selectedRatings.length)
      params.set("ratings", selectedRatings.join(","));
    params.set("sort", sortBy);

    router.push(`?${params.toString()}`);
    setIsChanged(false);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-medium">Genres</h3>
        <div className="space-y-2">
          {genres.map((genre) => (
            <div key={genre} className="flex items-center space-x-2">
              <Checkbox
                id={`genre-${genre}`}
                checked={selectedGenres.includes(genre)}
                onCheckedChange={() => handleGenreChange(genre)}
              />
              <Label htmlFor={`genre-${genre}`}>{genre}</Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-medium">Ratings</h3>
        <div className="space-y-2">
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
      <div>
        <h3 className="mb-4 text-sm font-medium">Sort By</h3>
        <RadioGroup value={sortBy} onValueChange={handleSortChange}>
          {sortOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <Card className="mx-auto w-full max-w-sm lg:mx-0">
        <CardHeader>
          <CardTitle>Filter Movies</CardTitle>
        </CardHeader>
        <CardContent>
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
              <SheetContent>
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
    </div>
  );
}
