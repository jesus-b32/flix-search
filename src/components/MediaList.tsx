import { ImageOff } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { movieSearchResult } from "@/server/actions/movies/types";
import type { tvSearchResult } from "@/server/actions/tv/types";
import Link from "next/link";

/**
 * Displays a list of movies or TV shows in a horizontal scrollable layout.
 * Similar to Recommendations component but for general movie/TV show lists.
 *
 * @param data - List of movies or TV shows
 * @param title - Title to display above the list
 */
export default function MediaList({
  data,
  title,
}: {
  data: movieSearchResult | tvSearchResult;
  title: string;
}) {
  return (
    data.results.length !== 0 && (
      <div className="flex w-full flex-col items-center py-6 md:items-start">
        <h2 className="mb-3 w-[90%] text-center text-xl font-semibold md:w-full md:text-left">
          {title}
        </h2>
        {/* Scrollable div */}
        <div
          className="w-[90%] rounded-lg bg-slate-700 md:w-full"
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            scrollbarWidth: "thin",
            scrollbarColor: "#64748b transparent",
          }}
        >
          {/* Scrollable content */}
          <div className="flex w-max space-x-4 p-4">
            {data.results.map((media) => (
              <Link
                key={media.id}
                href={
                  "title" in media ? `/movie/${media.id}` : `/tv/${media.id}`
                }
              >
                <Card className="flex h-[300px] w-[154px] flex-col border-none">
                  <div className="relative flex h-auto w-full justify-center">
                    {media.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w154${media.poster_path}`}
                        alt={
                          "title" in media
                            ? `${media.title} poster image`
                            : `${media.name} poster image`
                        }
                        className="h-auto w-full max-w-[154px] rounded-t-lg"
                      />
                    ) : (
                      <ImageOff className="h-auto w-full max-w-[154px] rounded-t-lg" />
                    )}
                    {/* Vote average rating overlay */}
                    <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm font-semibold text-white">
                        {media.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <CardHeader className="px-1 pt-2">
                      <CardTitle className="line-clamp-2 text-wrap text-center text-xl">
                        {"title" in media ? media.title : media.name}
                      </CardTitle>
                    </CardHeader>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
