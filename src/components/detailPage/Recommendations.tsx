import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { MovieRecommendations } from "@/server/actions/movies/types";
import type { TvRecommendations } from "@/server/actions/tv/types";
import Link from "next/link";

/**
 * Displays recommendations based on the provided list of movie or TV show recommendations.
 *
 * @param recommendations - List of movie or TV show recommendations
 */
export default function Recommendations({
  recommendations,
}: {
  recommendations: MovieRecommendations | TvRecommendations;
}) {
  /**
   * Display recommendations based on the provided list of movie or TV show recommendations. Recommendation results can be empty
   */
  return (
    <div className="flex w-full flex-col items-center py-6 md:w-10/12 md:items-start">
      <h2 className="mb-3 w-[90%] text-center text-xl font-semibold md:w-full md:text-left">
        Recommendations:
      </h2>
      <ScrollArea className="w-[90%] rounded-lg bg-slate-700 md:w-full">
        <div className="flex w-max space-x-4 p-4">
          {recommendations.results.length === 0 ? (
            <h1 className="text-xl font-bold">No Recommendations Available</h1>
          ) : (
            recommendations.results.map((recommendation) => (
              <Link
                key={recommendation.id}
                href={
                  "title" in recommendation
                    ? `/movie/${recommendation.id}`
                    : `/tv/${recommendation.id}`
                }
              >
                <Card className="flex h-[300px] w-[154px] flex-col border-none">
                  <div className="flex h-auto w-full justify-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w154${recommendation.poster_path}`}
                      alt={
                        "title" in recommendation
                          ? `${recommendation.title} poster image`
                          : `${recommendation.name} poster image`
                      }
                      className="h-auto w-full max-w-[154px] rounded-t-lg"
                    />
                  </div>
                  <div>
                    <CardHeader className="px-1 pt-2">
                      <CardTitle className="line-clamp-2 text-wrap text-center text-xl">
                        {"title" in recommendation
                          ? recommendation.title
                          : recommendation.name}
                      </CardTitle>
                    </CardHeader>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
