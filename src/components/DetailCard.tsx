import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ImageOff } from "lucide-react";
import type { movieDetails } from "@/server/actions/movies/types";
import type { tvDetails } from "@/server/actions/tv/types";
import { auth } from "@/auth";
import {
  getVideoList,
  addVideoToList,
  isVideoInList,
  removeVideoFromList,
  getVideo,
  insertVideotoDb,
} from "@/data/videoList";

/**
 * Creates a server component that displays a movie or TV show's details
 * @param  details - movie or TV show details object
 * @returns - server component that displays the details in a card
 */
export default async function DetailCard({
  details,
}: {
  details: movieDetails | tvDetails;
}) {
  const session = await auth();
  console.log("session: ", session);
  const mediaType = "title" in details ? "movie" : "tv";

  const video = await getVideo(details.id, mediaType);
  console.log("video: ", video);
  const videoId = video?.id ?? 0;

  // get watchlist from db; breaks code if I set to null
  const watchlist = !session
    ? false
    : await getVideoList(session.user?.id ?? "", "watchlist");

  console.log("watchlist: ", watchlist);

  const isVideoInWatchlist = watchlist
    ? await isVideoInList(videoId, watchlist.id)
    : false;

  console.log("isVideoInWatchlist: ", isVideoInWatchlist);

  return (
    <Card className="mt-6 flex h-fit w-full flex-col items-center rounded-none border-none md:flex-row md:items-start">
      <div className="flex justify-center md:h-[513px] md:w-[342px] md:justify-start">
        {/* imagge is 342x513 */}
        {details?.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w342${details.poster_path}`}
            alt="Movie or show image"
            className="h-full w-full"
          />
        ) : (
          <ImageOff className="h-full w-full" />
        )}
      </div>
      <div className="flex flex-col md:w-1/2 lg:w-7/12">
        <CardHeader className="text-center md:text-left">
          <CardTitle className="text-3xl font-bold">
            {"title" in details ? details.title : details.name}
          </CardTitle>
          <CardDescription>
            {"title" in details
              ? `${details?.release_date} | ${details?.runtime}min`
              : `${details?.first_air_date} | ${details?.number_of_seasons} seasons | ${details?.number_of_episodes} episodes`}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center md:text-left">
          <p>{`Genres: ${details?.genres.map((genre) => genre.name).join(", ") || "N/A"}`}</p>
          <h4 className="text-xl font-bold">Overview</h4>
          <p>{details?.overview}</p>
        </CardContent>
        <CardFooter className="flex justify-center md:justify-start">
          <form
            action={async () => {
              "use server";
              if (watchlist) {
                const isVideoInWatchlist2 = await isVideoInList(
                  videoId,
                  watchlist.id,
                );
                if (isVideoInWatchlist2) {
                  await removeVideoFromList(videoId, watchlist.id);
                } else if (!isVideoInWatchlist2) {
                  const insertedVideoId = await insertVideotoDb(
                    details.id,
                    mediaType,
                  );
                  if (insertedVideoId) {
                    await addVideoToList(insertedVideoId, watchlist.id);
                  }
                }
              }
            }}
          >
            <Button
              type="submit"
              variant={isVideoInWatchlist ? "destructive" : "default"}
              size={"sm"}
              disabled={!session}
            >
              {isVideoInWatchlist
                ? "Remove from Watchlist"
                : "Add to Watchlist"}
            </Button>
          </form>
        </CardFooter>
      </div>
    </Card>
  );
}
