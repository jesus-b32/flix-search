import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <div className="my-6 flex min-h-screen flex-col items-center gap-y-6">
      <h1 className="text-4xl font-bold md:w-10/12">About The Flix Search</h1>
      <section className="flex w-10/12 flex-col items-center md:items-start">
        <h2 className="text-2xl font-semibold">What is The Flix Search?</h2>
        <p className="text-justify">
          The Flix Search will help you easily find what streaming services host
          your favorite movies and shows. You can check the streaming
          availability of a movie or show by country to see all streaming
          platform that has that movie or show available. Another way to view
          streaming availability is by streaming platform. You can select a
          streaming platform and see which countries have the movie or show you
          want to watch available on that platform.
        </p>
      </section>

      <section className="flex w-10/12 flex-col items-center md:items-start">
        <h2 className="text-2xl font-semibold">
          How do I use The Flix Search?
        </h2>
        <p className="text-justify">
          Just simply search for what you want to watch. Select the movie or
          show you want to watch. Find out which streaming services has the
          movie or show available and in which countries. Save it to your
          watchlist.
        </p>
      </section>

      <section className="flex w-10/12 flex-col items-center md:items-start">
        <h2 className="text-2xl font-semibold">Movie and Show Data Source</h2>
        <p className="text-justify">
          The Flix Search uses The Movie Database (TMDB) and the TMDB APIs to
          access movie and show data., The Flix Search is not endorsed,
          certified, or otherwise approved by TMDB.{" "}
          <img
            src="/tmdb.svg"
            alt="TMDB Logo"
            height="15"
            width="100"
            className="inline-block"
          />
        </p>
      </section>

      <section className="flex w-10/12 flex-col items-center md:items-start">
        <h2 className="text-2xl font-semibold">Streaming Data Source</h2>
        <p className="text-justify">
          The Streaming data in The Flix Search comes from{" "}
          <a href="https://www.justwatch.com/" className="underline">
            JustWatch
          </a>
          . JustWatch makes it easy to find out where you can legally watch your
          favorite movies & shows online. Visit JustWatch for more information.{" "}
          <img
            src="/justwatch.svg"
            alt="Just Watch Logo"
            height="15"
            width="100"
            className="inline-block"
          />
        </p>
      </section>
    </div>
  );
}
