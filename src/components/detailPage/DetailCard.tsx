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
    <Card className="mt-6 flex h-fit w-[90%] flex-col items-center border-none md:w-10/12 md:flex-row md:items-start">
      <div className="flex h-[513px] w-[342px] justify-center md:justify-start">
        {/* image is 342x513 */}
        {details?.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w342${details.poster_path}`}
            alt={
              "title" in details
                ? `${details.title} poster image`
                : `${details.name} poster image`
            }
            className="h-full w-full rounded-lg"
          />
        ) : (
          <ImageOff className="max-[379px]:h-[225px] max-[379px]:w-[150px] min-[380px]:h-[513px] min-[380px]:w-[342px]" />
        )}
      </div>
      <div className="flex flex-col md:w-1/2 lg:w-7/12">
        <CardHeader className="pb-0 text-center md:text-left">
          <CardTitle className="font-bold">
            {"title" in details ? details.title : details.name}
          </CardTitle>
          <CardDescription>
            {"title" in details
              ? `${details?.release_date || "No Release Date"} | ${details?.runtime || "?"} minutes`
              : `${details?.first_air_date || "FIrst Air Date Unknown"} | ${details?.number_of_seasons || "?"} seasons | ${details?.number_of_episodes || "?"} episodes`}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-3 text-center md:text-left">
          <h4 className="text-lg font-semibold">Genres</h4>
          <p>{`${details?.genres.map((genre) => genre.name).join(", ") || "N/A"}`}</p>
          <h4 className="text-lg font-semibold">Overview</h4>
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
