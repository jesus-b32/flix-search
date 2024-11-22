"use client";

import { useRouter } from "next/navigation";
import { type watchlist as watchlistType } from "@/server/actions/types";
import { Button } from "@/components/ui/button";
import { updateWatchlist } from "@/server/actions/watchlist";

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
  videoId: number;
  watchlist: watchlistType;
  isVideoInWatchlist: boolean | null;
}) {
  const router = useRouter();
  return (
    <form
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
        type="submit"
        variant={isVideoInWatchlist ? "destructive" : "default"}
        size={"sm"}
        disabled={userId === ""}
      >
        {isVideoInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </Button>
    </form>
  );
}
