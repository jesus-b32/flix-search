/**
 * Renders an attribution component that attributes the source of the movie and TV show data to JustWatch.
 * @param title - The title of the movie or TV show.
 * @returns The rendered JSX element.
 */
export default function JustWatchAttribution({ title }: { title: string }) {
  return (
    <div className="mt-6 flex w-full flex-col items-center justify-center p-6 md:w-10/12 md:items-start md:px-0">
      <h2 className="text-2xl font-semibold">
        {`Discover where you can stream ${title}`} with{" "}
        <img
          src="/justwatch.svg"
          alt="Just Watch Logo"
          id="tmdb_logo"
          height="15"
          width="100"
          className="inline-block"
        />
      </h2>
      <p>
        JustWatch makes it easy to find out where you can legally watch your
        favorite movies & TV shows online. Visit{" "}
        <a href="https://www.justwatch.com/" className="underline">
          JustWatch
        </a>{" "}
        for more information.
      </p>
    </div>
  );
}
