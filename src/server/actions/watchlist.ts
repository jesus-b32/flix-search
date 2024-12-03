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
  title: string,
  overview: string,
  releaseDate: string,
  posterPath: string,
  videoId: string,
  watchlist: watchlistType,
  isVideoInWatchlist: boolean | null,
) {
  try {
    if (watchlist) {
      if (isVideoInWatchlist) {
        await removeVideoFromList(videoId, watchlist.id);
      } else {
        const insertedVideoId =
          videoId === ""
            ? await insertVideotoDb(
                tmdbId,
                mediaType,
                title,
                overview,
                releaseDate,
                posterPath,
              )
            : 0;
        if (insertedVideoId) {
          await addVideoToList(insertedVideoId, watchlist.id);
        } else {
          await addVideoToList(videoId, watchlist.id);
        }
      }
    }
  } catch {}
}
