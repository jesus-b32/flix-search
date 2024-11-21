"use server";

import {
  addVideoToList,
  removeVideoFromList,
  insertVideotoDb,
} from "@/data/videoList";
import { type watchlist as watchlistType } from "@/server/actions/types";

export async function updateWatchlist(
  tmdbId: number,
  mediaType: "movie" | "tv",
  videoId: number,
  watchlist: watchlistType,
  isVideoInWatchlist: boolean | null,
) {
  if (watchlist) {
    if (isVideoInWatchlist) {
      await removeVideoFromList(videoId, watchlist.id);
    } else {
      const insertedVideoId =
        videoId === 0 ? await insertVideotoDb(tmdbId, mediaType) : 0;
      if (insertedVideoId) {
        await addVideoToList(insertedVideoId, watchlist.id);
      } else {
        await addVideoToList(videoId, watchlist.id);
      }
    }
  }
}
