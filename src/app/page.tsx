import Search from "@/components/client/Search";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center text-white">
      <div className="mt-4 flex flex-col items-center gap-6">
        <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">Welcome</span> to Flix
          Search
        </h1>
        <p className="text-2xl">Find your next movie or series</p>
      </div>

      {/* search bar component for movies and series searching*/}
      <Search />

      <div className="my-6 flex w-10/12 flex-col items-center gap-4">
        <img
          src="/streamingProviders.jpg"
          className="h-auto w-full"
          alt="Image of some streaming providers"
        />
        <h2 className="text-center text-2xl font-semibold">
          Movie and TV Show Searching made Easy
        </h2>
        <p className="text-center text-xl">
          Flix Search helps you find which streaming services have your favorite
          movies and series with a simple search.
        </p>
      </div>
    </main>
  );
}
