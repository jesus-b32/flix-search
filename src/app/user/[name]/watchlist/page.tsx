// Next.js
import { type Metadata } from "next";

// Server Actions
import { getVideoList } from "@/data/videoList";
import { getVideosFromList } from "@/data/videoList";
import { currentUser } from "@/lib/currentUser";

// Custom Components
import WatchlistCard from "@/components/WatchlistCard";

/**
 * The metadata for the watchlist page.
 */
export const metadata: Metadata = {
  title: "My Watchlist",
};

/**
 * The watchlist page.
 *
 * @returns the watchlist page
 */
export default async function WatchlistPage() {
  const user = await currentUser();
  const watchlist = await getVideoList(user?.id ?? "", "watchlist");

  // Handle error cases from getVideoList
  if (watchlist instanceof Error) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center overflow-x-hidden">
        <h1 className="my-5 text-2xl font-bold">Watchlist</h1>
        <div className="mb-5 flex w-full flex-col items-center gap-y-6 px-4">
          <h2 className="semibold text-red-500">
            Error loading watchlist: {watchlist.message}
          </h2>
        </div>
      </div>
    );
  }

  const videos = await getVideosFromList(watchlist?.id ?? "");

  // Handle error cases from getVideosFromList
  if (videos instanceof Error) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center overflow-x-hidden">
        <h1 className="my-5 text-2xl font-bold">Watchlist</h1>
        <div className="mb-5 flex w-full flex-col items-center gap-y-6 px-4">
          <h2 className="semibold text-red-500">
            Error loading videos: {videos.message}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center overflow-x-hidden">
      <h1 className="my-5 text-2xl font-bold">Watchlist</h1>
      <div className="mb-5 flex w-full flex-col items-center gap-y-6 px-4">
        {!videos ? (
          <h2 className="semibold">Watchlist is empty</h2>
        ) : videos.length === 0 ? (
          <h2 className="semibold">Watchlist is empty</h2>
        ) : (
          videos.map((video) => (
            <WatchlistCard
              key={video.videoId}
              cinema={video}
              watchlist={watchlist}
              isVideoInWatchlist={true}
            />
          ))
        )}
      </div>
    </div>
  );
}
