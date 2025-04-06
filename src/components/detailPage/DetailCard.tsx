import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { ImageOff } from "lucide-react";
import type { movieDetails } from "@/server/actions/movies/types";
import type { tvDetails } from "@/server/actions/tv/types";
import { getVideoList, isVideoInList, getVideo } from "@/data/videoList";
import WatchlistButton from "@/components/WatchlistButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ExtendedUser } from "next-auth";
import { timeConvert } from "@/lib/timeConvert";

/**
 * Creates a server component that displays a movie or TV show's details
 * @param  details - movie or TV show details object
 * @returns - server component that displays the details in a card
 */
export default async function DetailCard({
  details,
  user,
}: {
  details: movieDetails | tvDetails;
  user: ExtendedUser | undefined;
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
  const watchlist = !user
    ? false
    : await getVideoList(user?.id ?? "", "watchlist");

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
            {"title" in details
              ? `${details.title} ${details.release_date ? `(${details.release_date.slice(0, 4)})` : ""}`
              : `${details.name} ${details.first_air_date ? `(${details.first_air_date.slice(0, 4)})` : ""}`}
          </CardTitle>
          <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            {details.vote_average ? (
              <Badge>{`⭐ ${details.vote_average.toFixed(1)}/10`}</Badge>
            ) : null}
            {details.vote_count ? (
              <Badge>{`${details.vote_count.toLocaleString()} votes`}</Badge>
            ) : null}
            {"title" in details ? (
              <>
                {details.runtime ? (
                  <Badge>{timeConvert(details.runtime)}</Badge>
                ) : null}
              </>
            ) : (
              <>
                {details.number_of_seasons ? (
                  <Badge>{`${details.number_of_seasons} ${details.number_of_seasons <= 1 ? "Season" : "Seasons"} ${details.number_of_episodes} ${details.number_of_episodes <= 1 ? "Episode" : "Episodes"}`}</Badge>
                ) : null}
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="py-3 text-center md:text-left">
          {details.genres.length > 0 && (
            <>
              <h4 className="text-lg font-semibold">
                {details.genres.length > 1 ? "Genres" : "Genre"}
              </h4>
              <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                {details.genres.map((genre) => (
                  <Badge key={genre.id}>{genre.name}</Badge>
                ))}
              </div>
            </>
          )}
          <h4 className="pt-3 text-lg font-semibold">Overview</h4>
          <p>{details?.overview || "No Overview"}</p>
        </CardContent>
        <CardFooter className="flex flex-col justify-center gap-2 md:flex-row md:justify-start">
          {"title" in details && details.imdb_id ? (
            <Button asChild size={"sm"} className="bg-yellow-500">
              <Link href={`https://www.imdb.com/title/${details.imdb_id}/`}>
                IMDb
              </Link>
            </Button>
          ) : null}
          {user ? (
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
              userId={user?.id ?? ""}
              videoId={videoId}
              watchlist={watchlist}
              isVideoInWatchlist={isVideoInWatchlist}
            />
          ) : (
            <Button asChild size={"sm"}>
              <Link href="/auth/login">+ Watchlist</Link>
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
