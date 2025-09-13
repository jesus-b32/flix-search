"use client";

// UI Components
import { Button } from "@/components/ui/button";

// Next.js Router
import { useRouter } from "next/navigation";
import { type watchlist as watchlistType } from "@/server/actions/types";
import { updateWatchlist } from "@/server/actions/watchlist";

// React
import { useState } from "react";

/**
 * A button that allows users to add or remove a movie or TV show from their watchlist.
 * Used in the movie and TV show detail pages.
 *
 * @param tmdbId - the TMDB ID of the movie or TV show
 * @param mediaType - the type of media: movie or tv
 * @param title - the title of the movie or TV show
 * @param overview - the overview of the movie or TV show
 * @param releaseDate - the release date of the movie or TV show
 * @param posterPath - the poster path of the movie or TV show
 * @param userId - the user ID
 * @param videoId - the video ID
 * @param watchlist - the watchlist of the user
 * @param isVideoInWatchlist - whether the movie or TV show is in the watchlist
 */
export default function WatchlistButton({
  tmdbId,
  mediaType,
  title,
  overview,
  releaseDate,
  posterPath,
  userId,
  videoId,
  watchlist,
  isVideoInWatchlist,
}: {
  tmdbId: number;
  mediaType: "movie" | "tv";
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  userId: string;
  videoId: string;
  watchlist: watchlistType;
  isVideoInWatchlist: boolean | null;
}) {
  const router = useRouter();
  const [inWatchlist, setInWatchlist] = useState(isVideoInWatchlist ?? false);
  return (
    <form
      className="w-full md:w-auto"
      action={async () => {
        await updateWatchlist(
          tmdbId,
          mediaType,
          title,
          overview,
          releaseDate,
          posterPath,
          videoId,
          watchlist,
          isVideoInWatchlist,
        );
        router.refresh();
      }}
    >
      <Button
        onClick={() => {
          setInWatchlist(!inWatchlist);
        }}
        type="submit"
        variant={inWatchlist ? "destructive" : "default"}
        size={"sm"}
        disabled={userId === ""}
        className="w-full md:w-auto"
      >
        {inWatchlist ? "- Watchlist" : "+ Watchlist"}
      </Button>
    </form>
  );
}
