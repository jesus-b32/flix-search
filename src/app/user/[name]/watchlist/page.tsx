import { type Metadata } from "next";

import { getVideoList } from "@/data/videoList";
import WatchlistCard from "@/components/WatchlistCard";
import { getVideosFromList } from "@/data/videoList";
import { currentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "My Watchlist",
};

export default async function WatchlistPage() {
  const user = await currentUser();
  const watchlist = await getVideoList(user?.id ?? "", "watchlist");

  const videos = await getVideosFromList(watchlist?.id ?? "");

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
