import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ImageOff } from "lucide-react";

import type { movieSearchResult } from "@/server/actions/movies/types";
import type { tvSearchResult } from "@/server/actions/tv/types";
import Link from "next/link";

/**
 * Returns a card with the details of a movie or tv show that was searched
 * @param movie or tv show
 * @returns - A list card with title, poster image, and overview for movies or TV shows related to the search
 */
export default function SearchResultCards({
  cinema,
}: {
  cinema: movieSearchResult["results"][0] | tvSearchResult["results"][0];
}) {
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
    <Card className="flex w-full flex-col items-center overflow-hidden border-none sm:w-10/12 sm:flex-row sm:items-stretch">
      <div className="flex w-full justify-center sm:w-1/3 sm:justify-start">
        {/* imagge is 185x278 */}
        {"title" in cinema ? (
          <Link href={`/movie/${cinema.id}`}>
            {cinema?.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w185${cinema.poster_path}`}
                alt="Movie or show image"
                className="h-auto w-full max-w-[185px] rounded-l-lg"
              />
            ) : (
              <ImageOff className="h-auto w-[185px] rounded-l-lg" />
            )}
          </Link>
        ) : (
          <Link href={`/tv/${cinema.id}`}>
            {cinema?.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w185${cinema.poster_path}`}
                alt="Movie or show image"
                className="h-auto w-full max-w-[185px] rounded-l-lg"
              />
            ) : (
              <ImageOff className="h-auto w-[185px] rounded-l-lg" />
            )}
          </Link>
        )}
      </div>
      <div className="flex w-full flex-col sm:h-[278px] sm:w-2/3">
        <CardHeader className="text-center sm:text-left">
          <CardTitle>
            {"title" in cinema ? (
              <Link href={`/movie/${cinema.id}`}>{cinema?.title}</Link>
            ) : (
              <Link href={`/tv/${cinema.id}`}>{cinema?.name}</Link>
            )}
          </CardTitle>
          <CardDescription>
            {"release_date" in cinema
              ? cinema?.release_date || "No Release Date"
              : cinema?.first_air_date || "No First Air Date"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center sm:text-left">
          <p className="line-clamp-6">{cinema?.overview || "No Overview"}</p>
        </CardContent>
      </div>
    </Card>
  );
}
