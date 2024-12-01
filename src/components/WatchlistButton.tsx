"use client";

import { useRouter } from "next/navigation";
import { type watchlist as watchlistType } from "@/server/actions/types";
import { Button } from "@/components/ui/button";
import { updateWatchlist } from "@/server/actions/watchlist";
import { useState } from "react";

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
      >
        {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </Button>
    </form>
  );
}
