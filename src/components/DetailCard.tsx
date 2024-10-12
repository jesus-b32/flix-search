import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ImageOff } from "lucide-react";
import Link from "next/link";
import type { movieDetails } from "@/server/actions/movies/types";
import type { tvDetails } from "@/server/actions/tv/types";

export default function DetailCard({
  details,
}: {
  details: movieDetails | tvDetails;
}) {
  return (
    <Card className="flex w-full flex-col items-center overflow-hidden lg:w-10/12 lg:flex-row lg:items-stretch">
      <div className="flex w-full justify-center lg:w-1/3 lg:justify-start">
        {/* imagge is 342x513 */}
        {details?.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w342${details.poster_path}`}
            alt="Movie or show image"
            className="h-auto w-full max-w-[342px] object-cover"
          />
        ) : (
          <ImageOff className="h-auto w-[342px] object-cover" />
        )}
      </div>
      <div className="flex w-full flex-col lg:h-auto lg:w-2/3">
        {"title" in details ? (
          <>
            <CardHeader className="text-center lg:text-left">
              <CardTitle className="text-3xl font-bold">
                {details?.title}
              </CardTitle>
              <CardDescription>
                {`${details?.release_date} | ${details?.runtime}min`}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center lg:text-left">
              <p>{`Genres: ${details?.genres.map((genre) => genre.name).join(", ") || "N/A"}`}</p>
              <h4 className="text-xl font-bold">Overview</h4>
              <p>{details?.overview}</p>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="text-center lg:text-left">
              <CardTitle className="text-3xl font-bold">
                {details?.name}
              </CardTitle>
              <CardDescription>
                {`${details?.first_air_date} | ${details?.number_of_seasons} seasons | ${details?.number_of_episodes} episodes`}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center lg:text-left">
              <p>{`Genres: ${details?.genres.map((genre) => genre.name).join(", ") || "N/A"}`}</p>
              <h4 className="text-xl font-bold">Overview</h4>
              <p>{details?.overview}</p>
            </CardContent>
          </>
        )}
      </div>
    </Card>
  );
}
