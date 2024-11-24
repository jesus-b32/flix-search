import { auth } from "@/auth";
import { getVideoList } from "@/data/videoList";
import WatchlistCard from "@/components/WatchlistCard";
import { getVideosFromList } from "@/data/videoList";

export default async function WatchlistPage() {
  const session = await auth();
  const watchlist = await getVideoList(session?.user?.id ?? "", "watchlist");

  const videos = await getVideosFromList(watchlist?.id ?? 0);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="my-5 text-2xl font-bold">Watchlist</h1>
      <div className="mb-5 flex w-full flex-col items-center gap-y-6">
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
