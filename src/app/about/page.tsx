import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-y-6">
      <h1 className="mt-5 text-4xl font-bold md:w-10/12">About Flix Search</h1>
      <section className="flex w-full flex-col items-center md:w-10/12 md:items-start">
        <h2 className="text-2xl font-semibold">What is Flix Search?</h2>
        <p>
          Flix Search is a web application that will help you easily find what
          streaming services host your favorite movies and TV shows. You can
          check the streaming availability of a movie or TV show by country to
          see all streaming platform that has that movie or TV show available.
          Another way to view streaming availability is by streaming platform.
          You can select a streaming platform and see which countries have the
          movie or TV show you want to watch available on that platform.
        </p>
      </section>

      <section className="flex w-full flex-col items-center md:w-10/12 md:items-start">
        <h2 className="text-2xl font-semibold">How do I use Flix Search?</h2>
        <p>
          Just simply search for what you want to watch. Select the movie or TV
          show you want to watch. Find out which streaming services has the
          movie or TV show available and in which countries. Save it to your
          favorites or watchlist.
        </p>
      </section>

      <section className="flex w-full flex-col items-center md:w-10/12 md:items-start">
        <h2 className="text-2xl font-semibold">Movie and TV Data Source</h2>
        <p>
          This website uses TMDB and the TMDB APIs, but is not endorsed,
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

      <section className="flex w-full flex-col items-center md:w-10/12 md:items-start">
        <h2 className="text-2xl font-semibold">Streaming Data Source</h2>
        <p>
          The Streaming info in this application comes from{" "}
          <a href="https://www.justwatch.com/" className="underline">
            JustWatch
          </a>
          . Visit JustWatch for more information.{" "}
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
