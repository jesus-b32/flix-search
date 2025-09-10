import { db } from "@/server/db";
import { videosToVideoLists, videoLists, videos } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";

// getting, creating, and deleting video lists ///////////////////////////////
/**
 * Get a video list by user ID and name
 * @param userId - The user ID
 * @param name - The name of the video list
 * @returns - The video list if found, null if not found, or an Error if the request fails
 */
export const getVideoList = async (userId: string, name: string) => {
  // Input validation
  if (!userId || typeof userId !== "string" || userId.trim().length === 0) {
    return new Error("User ID is required and must be a non-empty string");
  }

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return new Error(
      "Video list name is required and must be a non-empty string",
    );
  }

  try {
    const videoList = await db.query.videoLists.findFirst({
      where: and(
        eq(videoLists.userId, userId.trim()),
        eq(videoLists.name, name.trim()),
      ),
    });

    return videoList;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in getVideoList:", {
      userId: userId.trim(),
      name: name.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching video list. Please try again later.",
    );
  }
};

/**
 * Create a new video list
 * @param userId - The user ID
 * @param name - The name of the video list
 * @returns - true if successful, null if already exists, or an Error if the request fails
 */
export const createVideoList = async (userId: string, name: string) => {
  // Input validation
  if (!userId || typeof userId !== "string" || userId.trim().length === 0) {
    return new Error("User ID is required and must be a non-empty string");
  }

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return new Error(
      "Video list name is required and must be a non-empty string",
    );
  }

  // Name length validation
  if (name.trim().length > 100) {
    return new Error("Video list name must be less than 100 characters");
  }

  try {
    await db.insert(videoLists).values({
      userId: userId.trim(),
      name: name.trim(),
    });

    return true;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in createVideoList:", {
      userId: userId.trim(),
      name: name.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    // Check for specific database errors
    if (error instanceof Error && error.message.includes("unique")) {
      return new Error(
        "A video list with this name already exists for this user",
      );
    }

    return new Error(
      "An unexpected error occurred while creating video list. Please try again later.",
    );
  }
};

/**
 * Delete a video list by ID
 * @param id - The video list ID to delete
 * @returns - true if successful, null if not found, or an Error if the request fails
 */
export const deleteVideoList = async (id: string) => {
  // Input validation
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    return new Error(
      "Video list ID is required and must be a non-empty string",
    );
  }

  try {
    await db.delete(videoLists).where(eq(videoLists.id, id.trim()));

    return true;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in deleteVideoList:", {
      id: id.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while deleting video list. Please try again later.",
    );
  }
};
/////////////////////////////////////////////////////////////////////////////

// checking, adding, and removing videos from video lists /////////////////////
/**
 * Check if a video is in a video list
 * @param videoId - The video ID to check
 * @param videoListId - The video list ID to check
 * @returns - true if video is in list, false if not, or an Error if the request fails
 */
export const isVideoInList = async (videoId: string, videoListId: string) => {
  // Input validation
  if (!videoId || typeof videoId !== "string" || videoId.trim().length === 0) {
    return new Error("Video ID is required and must be a non-empty string");
  }

  if (
    !videoListId ||
    typeof videoListId !== "string" ||
    videoListId.trim().length === 0
  ) {
    return new Error(
      "Video list ID is required and must be a non-empty string",
    );
  }

  try {
    const foundVideo = await db.query.videosToVideoLists.findFirst({
      where: and(
        eq(videosToVideoLists?.videoId, videoId.trim()),
        eq(videosToVideoLists?.videoListId, videoListId.trim()),
      ),
    });

    if (!foundVideo) {
      return false;
    }

    return true;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in isVideoInList:", {
      videoId: videoId.trim(),
      videoListId: videoListId.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while checking if video is in list. Please try again later.",
    );
  }
};

/**
 * Get all videos from a video list
 * @param videoListId - The video list ID
 * @returns - Array of videos if found, empty array if no videos, or an Error if the request fails
 */
export const getVideosFromList = async (videoListId: string) => {
  // Input validation
  if (
    !videoListId ||
    typeof videoListId !== "string" ||
    videoListId.trim().length === 0
  ) {
    return new Error(
      "Video list ID is required and must be a non-empty string",
    );
  }

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
      .where(eq(videosToVideoLists.videoListId, videoListId.trim()));

    return videosfromList;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in getVideosFromList:", {
      videoListId: videoListId.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching videos from list. Please try again later.",
    );
  }
};

/**
 * Add a video to a video list
 * @param videoId - The video ID to add
 * @param videoListId - The video list ID
 * @returns - true if successful, null if already exists, or an Error if the request fails
 */
export const addVideoToList = async (videoId: string, videoListId: string) => {
  // Input validation
  if (!videoId || typeof videoId !== "string" || videoId.trim().length === 0) {
    return new Error("Video ID is required and must be a non-empty string");
  }

  if (
    !videoListId ||
    typeof videoListId !== "string" ||
    videoListId.trim().length === 0
  ) {
    return new Error(
      "Video list ID is required and must be a non-empty string",
    );
  }

  try {
    await db.insert(videosToVideoLists).values({
      videoId: videoId.trim(),
      videoListId: videoListId.trim(),
    });

    return true;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in addVideoToList:", {
      videoId: videoId.trim(),
      videoListId: videoListId.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    // Check for specific database errors
    if (error instanceof Error && error.message.includes("unique")) {
      return new Error("Video is already in this list");
    }

    return new Error(
      "An unexpected error occurred while adding video to list. Please try again later.",
    );
  }
};

/**
 * Remove a video from a video list
 * @param videoId - The video ID to remove
 * @param videoListId - The video list ID
 * @returns - true if successful, null if not found, or an Error if the request fails
 */
export const removeVideoFromList = async (
  videoId: string,
  videoListId: string,
) => {
  // Input validation
  if (!videoId || typeof videoId !== "string" || videoId.trim().length === 0) {
    return new Error("Video ID is required and must be a non-empty string");
  }

  if (
    !videoListId ||
    typeof videoListId !== "string" ||
    videoListId.trim().length === 0
  ) {
    return new Error(
      "Video list ID is required and must be a non-empty string",
    );
  }

  try {
    await db
      .delete(videosToVideoLists)
      .where(
        and(
          eq(videosToVideoLists.videoId, videoId.trim()),
          eq(videosToVideoLists.videoListId, videoListId.trim()),
        ),
      );

    return true;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in removeVideoFromList:", {
      videoId: videoId.trim(),
      videoListId: videoListId.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while removing video from list. Please try again later.",
    );
  }
};
//////////////////////////////////////////////////////////////////////////////

/**
 * Insert a video into the database
 * @param tmdbId - The TMDB ID of the video
 * @param mediaType - The type of media (movie or tv)
 * @param title - The title of the video
 * @param overview - The overview/description of the video
 * @param releaseDate - The release date of the video
 * @param posterPath - The poster path of the video
 * @returns - The video ID if successful, 0 if failed, or an Error if the request fails
 */
export const insertVideotoDb = async (
  tmdbId: number,
  mediaType: "movie" | "tv",
  title: string,
  overview: string,
  releaseDate: string,
  posterPath: string,
) => {
  // Input validation
  if (typeof tmdbId !== "number" || tmdbId <= 0 || !Number.isInteger(tmdbId)) {
    return new Error("TMDB ID must be a positive integer");
  }

  if (!mediaType || (mediaType !== "movie" && mediaType !== "tv")) {
    return new Error("Media type must be either 'movie' or 'tv'");
  }

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return new Error("Title is required and must be a non-empty string");
  }

  if (
    !overview ||
    typeof overview !== "string" ||
    overview.trim().length === 0
  ) {
    return new Error("Overview is required and must be a non-empty string");
  }

  if (
    !releaseDate ||
    typeof releaseDate !== "string" ||
    releaseDate.trim().length === 0
  ) {
    return new Error("Release date is required and must be a non-empty string");
  }

  if (
    !posterPath ||
    typeof posterPath !== "string" ||
    posterPath.trim().length === 0
  ) {
    return new Error("Poster path is required and must be a non-empty string");
  }

  // Title length validation
  if (title.trim().length > 200) {
    return new Error("Title must be less than 200 characters");
  }

  // Overview length validation
  if (overview.trim().length > 1000) {
    return new Error("Overview must be less than 1000 characters");
  }

  try {
    // example of video output looks like:  [ { id: 14 } ]
    const video = await db
      .insert(videos)
      .values({
        tmdbId,
        mediaType,
        title: title.trim(),
        overview: overview.trim(),
        releaseDate: releaseDate.trim(),
        posterPath: posterPath.trim(),
      })
      .returning({
        id: videos.id,
      });

    const videoId = video[0]?.id ?? 0;

    return videoId;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in insertVideotoDb:", {
      tmdbId,
      mediaType,
      title: title.trim(),
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    // Check for specific database errors
    if (error instanceof Error && error.message.includes("unique")) {
      return new Error(
        "A video with this TMDB ID and media type already exists",
      );
    }

    return new Error(
      "An unexpected error occurred while inserting video to database. Please try again later.",
    );
  }
};

/**
 * Get a video by TMDB ID and media type
 * @param tmdbId - The TMDB ID of the video
 * @param mediaType - The type of media (movie or tv)
 * @returns - The video if found, null if not found, or an Error if the request fails
 */
export const getVideo = async (tmdbId: number, mediaType: "movie" | "tv") => {
  // Input validation
  if (typeof tmdbId !== "number" || tmdbId <= 0 || !Number.isInteger(tmdbId)) {
    return new Error("TMDB ID must be a positive integer");
  }

  if (!mediaType || (mediaType !== "movie" && mediaType !== "tv")) {
    return new Error("Media type must be either 'movie' or 'tv'");
  }

  try {
    const foundVideo = await db.query.videos.findFirst({
      where: and(eq(videos?.tmdbId, tmdbId), eq(videos?.mediaType, mediaType)),
    });

    return foundVideo;
  } catch (error) {
    // Log database errors for debugging
    console.error("Database error in getVideo:", {
      tmdbId,
      mediaType,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Error(
      "An unexpected error occurred while fetching video. Please try again later.",
    );
  }
};
