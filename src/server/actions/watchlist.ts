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
        const removeResult = await removeVideoFromList(videoId, watchlist.id);

        // Handle error cases from removeVideoFromList
        if (removeResult instanceof Error) {
          console.error(
            "Error removing video from watchlist:",
            removeResult.message,
          );
          return;
        }
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

        // Handle error cases from insertVideotoDb
        if (insertedVideoId instanceof Error) {
          console.error(
            "Error inserting video to database:",
            insertedVideoId.message,
          );
          return;
        }

        if (insertedVideoId) {
          const addResult = await addVideoToList(insertedVideoId, watchlist.id);

          // Handle error cases from addVideoToList
          if (addResult instanceof Error) {
            console.error(
              "Error adding video to watchlist:",
              addResult.message,
            );
            return;
          }
        } else {
          const addResult = await addVideoToList(videoId, watchlist.id);

          // Handle error cases from addVideoToList
          if (addResult instanceof Error) {
            console.error(
              "Error adding video to watchlist:",
              addResult.message,
            );
            return;
          }
        }
      }
    }
  } catch (error) {
    console.error("Unexpected error in updateWatchlist:", error);
  }
}
