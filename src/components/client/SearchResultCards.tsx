"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { movieSearchResult } from "@/server/actions/movies/types";

export default function SearchResultCards(
  cinema: movieSearchResult["results"][0],
) {
  /**
   * Card Responsive:
   *   On small screens, the image appears above the content and is centered
   *   On larger screens, the image is on the left side, taking up 1/3 of the card's width.
   * The right side of the card (or bottom on small screens) contains:
   *   A title (using `CardTitle`)
   *   A subtitle (using `CardDescription`)
   *   Main text content (inside `CardContent`)
   */
  return (
    <Card className="flex w-full flex-col items-center overflow-hidden sm:w-10/12 sm:flex-row sm:items-stretch">
      <div className="flex w-full justify-center sm:w-1/3 sm:justify-start">
        {/* imagge is 185x278 */}
        <img
          src={`https://image.tmdb.org/t/p/w185${cinema.poster_path}`}
          alt="Movie or show image"
          className="h-auto w-full max-w-[185px] object-cover"
        />
      </div>
      <div className="flex w-full flex-col sm:h-[278px] sm:w-2/3">
        <CardHeader className="text-center sm:text-left">
          <CardTitle>{cinema?.title}</CardTitle>
          <CardDescription>{cinema?.release_date}</CardDescription>
        </CardHeader>
        <CardContent className="text-center sm:text-left">
          <p className="line-clamp-6">{cinema?.overview}</p>
        </CardContent>
      </div>
    </Card>
  );
}
