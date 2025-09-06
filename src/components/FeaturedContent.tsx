import { Suspense } from "react";
import MediaList from "@/components/MediaList";
import {
  getNowPlayingMovies,
  getComingSoonMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "@/server/actions/movies/actions";
import {
  getCurrentlyAiringTvShows,
  getComingSoonTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
} from "@/server/actions/tv/actions";

/**
 * Displays featured movie and TV show content on the homepage.
 * Shows multiple sections including now playing, coming soon, popular, and top rated content.
 */
export default function FeaturedContent() {
  return (
    <div className="flex w-full flex-col items-center">
      {/* Movies Section */}
      <div className="w-full">
        <Suspense
          fallback={<div className="text-white">Loading movies...</div>}
        >
          <MovieSections />
        </Suspense>
      </div>

      {/* TV Shows Section */}
      <div className="w-full">
        <Suspense
          fallback={<div className="text-white">Loading TV shows...</div>}
        >
          <TvSections />
        </Suspense>
      </div>
    </div>
  );
}

/**
 * Renders all movie sections
 */
async function MovieSections() {
  const [nowPlayingMovies, comingSoonMovies, popularMovies, topRatedMovies] =
    await Promise.all([
      getNowPlayingMovies(),
      getComingSoonMovies(),
      getPopularMovies(),
      getTopRatedMovies(),
    ]);

  return (
    <>
      {nowPlayingMovies && !(nowPlayingMovies instanceof Error) && (
        <MediaList data={nowPlayingMovies} title="Now Playing in Theaters" />
      )}
      {comingSoonMovies && !(comingSoonMovies instanceof Error) && (
        <MediaList data={comingSoonMovies} title="Coming Soon to Theaters" />
      )}
      {popularMovies && !(popularMovies instanceof Error) && (
        <MediaList data={popularMovies} title="Popular Movies" />
      )}
      {topRatedMovies && !(topRatedMovies instanceof Error) && (
        <MediaList data={topRatedMovies} title="Top Rated Movies" />
      )}
    </>
  );
}

/**
 * Renders all TV show sections
 */
async function TvSections() {
  const [
    currentlyAiringTvShows,
    comingSoonTvShows,
    popularTvShows,
    topRatedTvShows,
  ] = await Promise.all([
    getCurrentlyAiringTvShows(),
    getComingSoonTvShows(),
    getPopularTvShows(),
    getTopRatedTvShows(),
  ]);

  return (
    <>
      {currentlyAiringTvShows && !(currentlyAiringTvShows instanceof Error) && (
        <MediaList
          data={currentlyAiringTvShows}
          title="Currently Airing TV Shows"
        />
      )}
      {comingSoonTvShows && !(comingSoonTvShows instanceof Error) && (
        <MediaList data={comingSoonTvShows} title="Coming Soon TV Shows" />
      )}
      {popularTvShows && !(popularTvShows instanceof Error) && (
        <MediaList data={popularTvShows} title="Popular TV Shows" />
      )}
      {topRatedTvShows && !(topRatedTvShows instanceof Error) && (
        <MediaList data={topRatedTvShows} title="Top Rated TV Shows" />
      )}
    </>
  );
}
