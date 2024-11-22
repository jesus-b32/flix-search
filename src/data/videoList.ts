import { db } from "@/server/db";
import { videosToVideoLists, videoLists, videos } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";

// getting, creating, and deleting video lists ///////////////////////////////
export const getVideoList = async (userId: string, name: string) => {
  try {
    const videoList = await db.query.videoLists.findFirst({
      where: and(eq(videoLists?.userId, userId), eq(videoLists?.name, name)),
    });

    return videoList;
  } catch {
    return null;
  }
};

export const createVideoList = async (userId: string, name: string) => {
  try {
    await db.insert(videoLists).values({
      userId,
      name,
    });

    return true;
  } catch {
    return null;
  }
};

export const deleteVideoList = async (id: number) => {
  try {
    await db.delete(videoLists).where(eq(videoLists.id, id));

    return true;
  } catch {
    return null;
  }
};
/////////////////////////////////////////////////////////////////////////////

// checking, adding, and removing videos from video lists /////////////////////
export const isVideoInList = async (videoId: number, videoListId: number) => {
  try {
    const foundVideo = await db.query.videosToVideoLists.findFirst({
      where: and(
        eq(videosToVideoLists?.videoId, videoId),
        eq(videosToVideoLists?.videoListId, videoListId),
      ),
    });

    if (!foundVideo) {
      return false;
    }

    return true;
  } catch {
    return null;
  }
};

export const getVideosFromList = async (videoListId: number) => {
  try {
    const videosfromList = await db
      .select({
        videoId: videos.id,
        tmdbId: videos.tmdbId,
        mediaType: videos.mediaType,
        title: videos.title,
        overview: videos.overview,
        releaseDate: videos.releaseDate,
        posterPath: videos.posterPath,
      })
      .from(videosToVideoLists)
      .innerJoin(videos, eq(videosToVideoLists.videoId, videos.id))
      .where(eq(videosToVideoLists.videoListId, videoListId));

    return videosfromList;
  } catch {
    return null;
  }
};

export const addVideoToList = async (videoId: number, videoListId: number) => {
  try {
    await db.insert(videosToVideoLists).values({
      videoId,
      videoListId,
    });

    return true;
  } catch {
    return null;
  }
};

export const removeVideoFromList = async (
  videoId: number,
  videoListId: number,
) => {
  try {
    await db
      .delete(videosToVideoLists)
      .where(
        and(
          eq(videosToVideoLists.videoId, videoId),
          eq(videosToVideoLists.videoListId, videoListId),
        ),
      );

    return true;
  } catch {
    return null;
  }
};
//////////////////////////////////////////////////////////////////////////////

export const insertVideotoDb = async (
  tmdbId: number,
  mediaType: "movie" | "tv",
  title: string,
  overview: string,
  releaseDate: string,
  posterPath: string,
) => {
  try {
    // example of video output looks like:  [ { id: 14 } ]
    const video = await db
      .insert(videos)
      .values({
        tmdbId,
        mediaType,
        title,
        overview,
        releaseDate,
        posterPath,
      })
      .returning({
        id: videos.id,
      });

    const videoId = video[0]?.id ?? 0;

    return videoId;
  } catch {
    return null;
  }
};

export const getVideo = async (tmdbId: number, mediaType: "movie" | "tv") => {
  try {
    const foundVideo = await db.query.videos.findFirst({
      where: and(eq(videos?.tmdbId, tmdbId), eq(videos?.mediaType, mediaType)),
    });

    return foundVideo;
  } catch {
    return null;
  }
};
