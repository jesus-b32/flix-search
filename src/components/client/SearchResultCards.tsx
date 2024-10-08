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
   *   On small screens, the image appears above the content.
   *   On larger screens, the image is on the left side, taking up 1/3 of the card's width.
   * The right side of the card (or bottom on small screens) contains:
   *   A title (using `CardTitle`)
   *   A subtitle (using `CardDescription`)
   *   Main text content (inside `CardContent`)
   */
  return (
    <Card className="flex w-9/12 flex-col overflow-hidden sm:flex-row">
      <div className="w-48">
        <img
          src={`https://image.tmdb.org/t/p/w185${cinema.poster_path}`}
          alt="Movie or show image"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col sm:w-2/3">
        <CardHeader>
          <CardTitle>{cinema?.title}</CardTitle>
          <CardDescription>{cinema?.release_date}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{cinema?.overview}</p>
        </CardContent>
      </div>
    </Card>
  );
}
