// React
import { Suspense } from "react";

// Custom Components
import MediaList from "@/components/MediaList";

// Server Actions
import {
  getNowPlayingMovies,
  getComingSoonMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "@/server/actions/movies/actions";
import {
  getAiringTodayTvShows,
  getComingSoonTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
} from "@/server/actions/tv/actions";

/**
 * Displays featured movie and TV show content on the homepage.
 * Shows multiple sections including now playing, coming soon, popular, and top rated content.
 *
 * @returns - a featured content component that displays the featured movie and TV show content
 */
export default function FeaturedContent() {
  return (
    <div className="flex w-full flex-col items-center">
      {/* Movies Section */}
      <div className="w-full">
        <Suspense
          fallback={<div className="text-foreground">Loading movies...</div>}
        >
          <MovieSections />
        </Suspense>
      </div>

      {/* TV Shows Section */}
      <div className="w-full">
        <Suspense
          fallback={<div className="text-foreground">Loading TV shows...</div>}
        >
          <TvSections />
        </Suspense>
      </div>
    </div>
  );
}

/**
 * Renders all movie sections
 * Used in the home page.
 *
 * @returns - a movie sections component that displays the featured movie content
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
      {popularMovies && !(popularMovies instanceof Error) && (
        <MediaList data={popularMovies} title="Popular Movies" />
      )}
      {topRatedMovies && !(topRatedMovies instanceof Error) && (
        <MediaList data={topRatedMovies} title="Top Rated Movies" />
      )}
      {nowPlayingMovies && !(nowPlayingMovies instanceof Error) && (
        <MediaList data={nowPlayingMovies} title="Now Playing in Theaters" />
      )}
      {comingSoonMovies && !(comingSoonMovies instanceof Error) && (
        <MediaList data={comingSoonMovies} title="Coming Soon to Theaters" />
      )}
    </>
  );
}

/**
 * Renders all TV show sections
 * Used in the home page.
 *
 * @returns - a TV show sections component that displays the featured TV show content
 */
async function TvSections() {
  const [
    airingTodayTvShows,
    comingSoonTvShows,
    popularTvShows,
    topRatedTvShows,
  ] = await Promise.all([
    getAiringTodayTvShows(),
    getComingSoonTvShows(),
    getPopularTvShows(),
    getTopRatedTvShows(),
  ]);

  return (
    <>
      {popularTvShows && !(popularTvShows instanceof Error) && (
        <MediaList data={popularTvShows} title="Popular TV Shows" />
      )}
      {topRatedTvShows && !(topRatedTvShows instanceof Error) && (
        <MediaList data={topRatedTvShows} title="Top Rated TV Shows" />
      )}
      {airingTodayTvShows && !(airingTodayTvShows instanceof Error) && (
        <MediaList data={airingTodayTvShows} title="Airing Today TV Shows" />
      )}
      {comingSoonTvShows && !(comingSoonTvShows instanceof Error) && (
        <MediaList data={comingSoonTvShows} title="Airing Soon TV Shows" />
      )}
    </>
  );
}
