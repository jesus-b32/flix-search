// Custom Components
import Search from "@/components/client/Search";
import FeaturedContent from "@/components/FeaturedContent";

// React
import { Suspense } from "react";

/**
 * The home page.
 *
 * @returns the home page
 */
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center text-white">
      <div className="my-4 flex w-10/12 flex-col items-center gap-2">
        <h1 className="text-center text-4xl font-extrabold">The Flix Search</h1>
        <h2 className="w-full text-center text-xl font-semibold">
          Movie and TV Show Searching made Easy
        </h2>
        <p className="w-full text-center">
          The Flix Search helps you find which streaming services have your
          favorite movies and TV shows with a simple search.
        </p>
        {/* search bar component for movies and show searching*/}
        <Search />

        <img
          src="/streamingProviders.jpg"
          className="h-auto w-full rounded-lg md:w-10/12 lg:w-3/4 xl:w-2/3"
          alt="Image of some streaming providers"
        />
        <Suspense fallback={<div>Loading...</div>}>
          <FeaturedContent />
        </Suspense>
      </div>
    </main>
  );
}
