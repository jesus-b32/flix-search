import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ImageOff } from "lucide-react";
import type { movieDetails } from "@/server/actions/movies/types";
import type { tvDetails } from "@/server/actions/tv/types";

/**
 * Creates a server component that displays a movie or TV show's details
 * @param  details - movie or TV show details object
 * @returns - server component that displays the details in a card
 */
export default function DetailCard({
  details,
}: {
  details: movieDetails | tvDetails;
}) {
  return (
    <Card className="mt-6 flex h-fit w-full flex-col items-center rounded-none md:flex-row md:items-start">
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
        {"title" in details ? (
          <>
            <CardHeader className="text-center md:text-left">
              <CardTitle className="text-3xl font-bold">
                {details?.title}
              </CardTitle>
              <CardDescription>
                {`${details?.release_date} | ${details?.runtime}min`}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center md:text-left">
              <p>{`Genres: ${details?.genres.map((genre) => genre.name).join(", ") || "N/A"}`}</p>
              <h4 className="text-xl font-bold">Overview</h4>
              <p>{details?.overview}</p>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="text-center md:text-left">
              <CardTitle className="text-3xl font-bold">
                {details?.name}
              </CardTitle>
              <CardDescription>
                {`${details?.first_air_date} | ${details?.number_of_seasons} seasons | ${details?.number_of_episodes} episodes`}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center md:text-left">
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
