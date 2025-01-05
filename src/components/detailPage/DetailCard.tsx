import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { ImageOff } from "lucide-react";
import type { movieDetails } from "@/server/actions/movies/types";
import type { tvDetails } from "@/server/actions/tv/types";
import { getVideoList, isVideoInList, getVideo } from "@/data/videoList";
import WatchlistButton from "@/components/WatchlistButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Session } from "next-auth";

/**
 * Creates a server component that displays a movie or TV show's details
 * @param  details - movie or TV show details object
 * @returns - server component that displays the details in a card
 */
export default async function DetailCard({
  details,
  session,
}: {
  details: movieDetails | tvDetails;
  session: Session | null;
}) {
  // session is null if user is not logged in
  const mediaType = "title" in details ? "movie" : "tv";

  // return video object from db or is undefined if it doesn't exist
  const video = await getVideo(details.id, mediaType);
  const videoId = video?.id ?? "";

  /**
   * get watchlist from db if user is logged in;
   * code breaks if watchlist set to null
   */
  const watchlist = !session
    ? false
    : await getVideoList(session.user?.id ?? "", "watchlist");

  /**
   * check if video is in watchlist
   * if so return true; if not found return false
   */
  const isVideoInWatchlist = watchlist
    ? await isVideoInList(videoId, watchlist.id)
    : false;

  return (
    <Card className="mt-6 flex h-fit w-full flex-col items-center rounded-none border-none md:flex-row md:items-start">
      <div className="flex justify-center md:h-[513px] md:w-[342px] md:justify-start">
        {/* image is 342x513 */}
        {details?.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w342${details.poster_path}`}
            alt={
              "title" in details
                ? `${details.title} poster image`
                : `${details.name} poster image`
            }
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
              ? `${details?.release_date || "No Release Date"} | ${details?.runtime || "?"} minutes`
              : `${details?.first_air_date || "FIrst Air Date Unknown"} | ${details?.number_of_seasons || "?"} seasons | ${details?.number_of_episodes || "?"} episodes`}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center md:text-left">
          <p>{`Genres: ${details?.genres.map((genre) => genre.name).join(", ") || "N/A"}`}</p>
          <h4 className="text-xl font-bold">Overview</h4>
          <p>{details?.overview || "No Overview"}</p>
        </CardContent>
        <CardFooter className="flex justify-center md:justify-start">
          {session ? (
            <WatchlistButton
              tmdbId={details.id}
              mediaType={mediaType}
              title={"title" in details ? details.title : details.name}
              overview={details?.overview ?? ""}
              releaseDate={
                "title" in details
                  ? (details?.release_date ?? "")
                  : (details?.first_air_date ?? "")
              }
              posterPath={details?.poster_path ?? ""}
              userId={session?.user?.id ?? ""}
              videoId={videoId}
              watchlist={watchlist}
              isVideoInWatchlist={isVideoInWatchlist}
            />
          ) : (
            <Button asChild size={"sm"}>
              <Link href="/auth/login">Login to add to watchlist</Link>
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
