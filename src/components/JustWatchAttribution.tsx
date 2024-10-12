export default function JustWatchAttribution({ title }: { title: string }) {
  return (
    <div className="mt-5 flex w-10/12 flex-col items-center justify-center lg:items-start">
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