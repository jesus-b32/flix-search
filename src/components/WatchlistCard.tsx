import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ImageOff } from "lucide-react";
import Link from "next/link";

/**
 * Returns a card with the details of a movie or tv show that was searched
 * @param movie or tv show
 * @returns - A list card with title, poster image, and overview for movies or TV shows related to the search
 */
export default function WatchlistCard({
  cinema,
}: {
  cinema: {
    videoId: number;
    tmdbId: number;
    mediaType: "movie" | "tv";
    title: string;
    overview: string;
    releaseDate: string;
    posterPath: string;
  };
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
    <Card className="flex w-full flex-col items-center border-none md:w-10/12 md:flex-row">
      <div className="flex h-[278px] w-[185px] justify-center md:justify-start">
        {/* imagge is 185x278 */}
        <Link
          href={
            cinema.mediaType === "movie"
              ? `/movie/${cinema.tmdbId}`
              : `/tv/${cinema.tmdbId}`
          }
        >
          {cinema?.posterPath ? (
            <img
              src={`https://image.tmdb.org/t/p/w185${cinema.posterPath}`}
              alt="Movie or show image"
              className="h-full w-full rounded-none md:rounded-l-lg"
            />
          ) : (
            <ImageOff className="h-full w-full rounded-none md:rounded-l-lg" />
          )}
        </Link>
      </div>
      <div className="flex h-fit w-full flex-col md:h-[278px] md:w-2/3">
        <CardHeader className="text-center md:text-left">
          <CardTitle>
            {cinema.mediaType === "movie" ? (
              <Link href={`/movie/${cinema.tmdbId}`}>{cinema?.title}</Link>
            ) : (
              <Link href={`/tv/${cinema.tmdbId}`}>{cinema?.title}</Link>
            )}
          </CardTitle>
          <CardDescription>
            {cinema?.releaseDate || "No Release Date"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center md:text-left">
          <p className="line-clamp-6">{cinema?.overview || "No Overview"}</p>
        </CardContent>
      </div>
    </Card>
  );
}
