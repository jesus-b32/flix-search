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
    <Card className="flex w-[95%] flex-col items-center border-none md:w-10/12 md:flex-row">
      <div className="flex h-auto max-h-[278px] w-auto max-w-[185px] justify-center md:justify-start">
        {/* imagge is 185x278 */}
        <Link
          href={"title" in cinema ? `/movie/${cinema.id}` : `/tv/${cinema.id}`}
        >
          {cinema?.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w185${cinema.poster_path}`}
              alt="Movie or show image"
              className="h-full w-full rounded-none object-contain md:rounded-l-lg"
            />
          ) : (
            <ImageOff className="h-[188px] w-[125px] rounded-none md:h-[278px] md:w-[185px] md:rounded-l-lg" />
          )}
        </Link>
      </div>
      <div className="flex h-fit w-full flex-col md:h-[278px] md:w-2/3">
        <CardHeader className="text-center md:text-left">
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
        <CardContent className="text-center md:text-left">
          <p className="line-clamp-6">{cinema?.overview || "No Overview"}</p>
        </CardContent>
      </div>
    </Card>
  );
}
